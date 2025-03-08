import {useMemo, useState, useCallback} from "react";
import {TColumn} from "../../../../../../components/ui/DataGrid";
import {useUsers} from "../../../../../../hooks/memberships/useUsers";
import {TUserDto, TUserForm} from "../../../../../../models/memberships/user";
import {TAlertState} from "../../../../../../types/alert";
import {TSortOrder} from "../../../../../../types/sortDataGrid";
import {ITEMS_PER_PAGE} from "../../../../../../utils/constants";
import {formatDateDayMothYear} from "../../../../../../utils/date";
import {TSortFieldUser} from "../../../types/sortFieldUser";
import {
	ERROR_CREATE_MESSAGE,
	ERROR_DELETE_MESSAGE,
	ERROR_UPDATE_MESSAGE,
	SUCCESS_CREATE_MESSAGE,
	SUCCESS_DELETE_MESSAGE,
	SUCCESS_UPDATE_MESSAGE,
} from "../../../utils/constants";

export function useUserManagement() {
	const {
		users,
		isLoading,
		isError,
		createUser,
		updateUser,
		deleteUser,
		mutate,
	} = useUsers();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
	const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
	const [currentData, setCurrentData] = useState<TUserDto | null>(null);
	const [alert, setAlert] = useState<TAlertState | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [sortField, setSortField] = useState<TSortFieldUser>("name");
	const [sortOrder, setSortOrder] = useState<TSortOrder>("asc");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [appliedSearchTerm, setAppliedSearchTerm] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isRetrying, setIsRetrying] = useState<boolean>(false);

	const columns: TColumn<TUserDto>[] = [
		{key: "name", header: "Nombre"},
		{key: "rut", header: "Rut"},
		{key: "email", header: "Correo electronico"},
		{
			key: "birthDate",
			header: "Fecha de nacimiento",
			render: (user) => formatDateDayMothYear(user.birthDate),
		},
	];

	const filteredAndSortedRoles = useMemo(() => {
		return (users || [])
			.filter((user) => {
				const searchLower = appliedSearchTerm.toLowerCase();
				if (
					user.name.toLowerCase().includes(searchLower) ||
					user.email?.toLowerCase().includes(searchLower) ||
					(user.rut && user.rut.toLowerCase().includes(searchLower))
				) {
					return true;
				}

				// Buscar por fecha de nacimiento
				if (user.birthDate) {
					const date = new Date(user.birthDate);

					// Formato DD/MM/YYYY
					const formattedDate = formatDateDayMothYear(user.birthDate);
					if (formattedDate.includes(appliedSearchTerm)) {
						return true;
					}

					// Formato YYYY-MM-DD
					const isoDate = date.toISOString().split("T")[0];
					if (isoDate.includes(appliedSearchTerm)) {
						return true;
					}

					// Buscar solo por año
					const year = date.getFullYear().toString();
					if (year.includes(appliedSearchTerm)) {
						return true;
					}

					// Buscar por mes/año (MM/YYYY)
					const month = (date.getMonth() + 1).toString().padStart(2, "0");
					const monthYear = `${month}/${date.getFullYear()}`;
					if (monthYear.includes(appliedSearchTerm)) {
						return true;
					}
				}

				return false;
			})
			.sort((a, b) => {
				const valA = a[sortField];
				const valB = b[sortField];

				// Si los valores son booleanos, los convertimos a números (false = 0, true = 1)
				if (typeof valA === "boolean" && typeof valB === "boolean") {
					return (
						(valA === valB ? 0 : valA ? 1 : -1) * (sortOrder === "asc" ? 1 : -1)
					);
				}

				// Si los valores son fechas, convertimos a timestamps
				if (sortField === "birthDate") {
					if (valA && valB) {
						const dateA = new Date(valA);
						const dateB = new Date(valB);

						if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
							return (
								(dateA.getTime() - dateB.getTime()) *
								(sortOrder === "asc" ? 1 : -1)
							);
						}
					}
					return 0;
				}

				// Convertimos cualquier otro valor a string para comparación
				const strA = String(valA).toLowerCase();
				const strB = String(valB).toLowerCase();

				return strA.localeCompare(strB) * (sortOrder === "asc" ? 1 : -1);
			});
	}, [users, sortField, sortOrder, appliedSearchTerm]);

	const totalPages = Math.ceil(filteredAndSortedRoles.length / ITEMS_PER_PAGE);

	const currentUsers = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredAndSortedRoles.slice(
			startIndex,
			startIndex + ITEMS_PER_PAGE,
		);
	}, [filteredAndSortedRoles, currentPage]);

	const handleCreate = useCallback(() => {
		setCurrentData(null);
		setIsModalOpen(true);
	}, []);

	const handleEdit = useCallback((data: TUserDto) => {
		setCurrentData(data);
		setIsModalOpen(true);
	}, []);

	const handleDeleteConfirmation = (id: string) => {
		setSectionToDelete(id);
		setIsConfirmModalOpen(true);
	};

	const handleRetry = async () => {
		setIsRetrying(true);
		try {
			await mutate();
		} finally {
			setIsRetrying(false);
		}
	};

	const handleDelete = (): void => {
		if (sectionToDelete !== null) {
			setIsDeleting(true);

			deleteUser(sectionToDelete)
				.then(() => {
					setAlert({
						message: SUCCESS_DELETE_MESSAGE,
						type: "success",
					});
					if (currentUsers.length === 1 && currentPage > 1) {
						setCurrentPage(currentPage - 1);
					}
				})
				.catch(() => {
					setAlert({
						message: ERROR_DELETE_MESSAGE,
						type: "error",
					});
				})
				.finally(() => {
					setIsDeleting(false);
				});
		}
		setIsConfirmModalOpen(false);
		setSectionToDelete(null);
	};

	const handleSubmit = async (data: TUserForm) => {
		setIsSubmitting(true);
		console.log(data);

		const action = currentData ? updateUser : createUser;
		const successMessage = currentData
			? SUCCESS_UPDATE_MESSAGE
			: SUCCESS_CREATE_MESSAGE;
		const errorMessage = currentData
			? ERROR_UPDATE_MESSAGE
			: ERROR_CREATE_MESSAGE;

		action({
			...data,
			id: currentData?.id,
			birthDate: new Date(data.birthDate + "T00:00:00"),
		})
			.then((result) => {
				if (typeof result !== "string") {
					setAlert({message: successMessage, type: "success"});
					setIsSubmitting(false);
					setIsModalOpen(false);
					if (!currentData) {
						setCurrentPage(
							Math.ceil((filteredAndSortedRoles.length + 1) / ITEMS_PER_PAGE),
						);
					}
				} else {
					setAlert({message: result, type: "error"});
					setIsSubmitting(false);
				}
			})
			.catch(() => {
				setAlert({message: errorMessage, type: "error"});
				setIsSubmitting(false);
			});
	};

	const handleSort = useCallback(
		(field: TSortFieldUser) => {
			if (field === sortField) {
				setSortOrder(sortOrder === "asc" ? "desc" : "asc");
			} else {
				setSortField(field);
				setSortOrder("asc");
			}
		},
		[sortField, sortOrder],
	);

	const handleSearch = () => {
		setAppliedSearchTerm(searchTerm);
		setCurrentPage(1);
	};

	const handleClearSearch = () => {
		setSearchTerm("");
		setAppliedSearchTerm("");
		setCurrentPage(1);
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);
	};

	return {
		handleSearch,
		handleCreate,
		handleDelete,
		handleDeleteConfirmation,
		handleClearSearch,
		handleEdit,
		handleSort,
		handleSubmit,
		currentUsers,
		filteredAndSortedRoles,
		isConfirmModalOpen,
		isDeleting,
		isError,
		alert,
		isModalOpen,
		isSubmitting,
		isLoading,
		appliedSearchTerm,
		searchTerm,
		setIsConfirmModalOpen,
		setAlert,
		currentData,
		currentPage,
		sortField,
		sortOrder,
		setSearchTerm,
		totalPages,
		goToPage,
		setIsModalOpen,
		columns,
		isRetrying,
		handleRetry,
		setSortOrder,
		setSortField,
	};
}

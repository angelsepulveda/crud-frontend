import React, {createContext, useContext} from "react";
import {ReactNode} from "react";
import {TColumn} from "../../../../../../components/ui/DataGrid";
import {TUserDto, TUserForm} from "../../../../../../models/memberships/user";
import {TAlertState} from "../../../../../../types/alert";
import {TSortOrder} from "../../../../../../types/sortDataGrid";
import {TSortFieldUser} from "../../../types/sortFieldUser";
import {useUserManagement} from "../hooks/useUserManagement";

type UserManagementContextType = {
	handleSearch: () => void;
	handleCreate: () => void;
	handleDelete: () => void;
	handleDeleteConfirmation: (id: string) => void;
	handleClearSearch: () => void;
	handleEdit: (data: TUserDto) => void;
	handleSort: (field: TSortFieldUser) => void;
	handleSubmit: (data: TUserForm) => void;
	currentUsers: TUserDto[];
	filteredAndSortedRoles: TUserDto[];
	isConfirmModalOpen: boolean;
	isDeleting: boolean;
	isError: boolean;
	alert: TAlertState | null;
	isModalOpen: boolean;
	isSubmitting: boolean;
	isLoading: boolean;
	appliedSearchTerm: string;
	searchTerm: string;
	setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAlert: React.Dispatch<React.SetStateAction<TAlertState | null>>;
	currentData: TUserDto | null;
	currentPage: number;
	sortField: TSortFieldUser;
	sortOrder: TSortOrder;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	totalPages: number;
	goToPage: (page: number) => void;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	columns: TColumn<TUserDto>[];
	isRetrying: boolean;
	handleRetry: () => void;
};

export const UserManagementContext = createContext<
	UserManagementContextType | undefined
>(undefined);

type TUserManagementProviderProps = {
	children: ReactNode;
};

export const UserManagementProvider = ({
	children,
}: TUserManagementProviderProps) => {
	const {
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
	} = useUserManagement();

	const value = {
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
	};

	return (
		<UserManagementContext.Provider value={value}>
			{children}
		</UserManagementContext.Provider>
	);
};

export const useUserManagementContext = () => {
	const context = useContext(UserManagementContext);
	if (context === undefined) {
		throw new Error(
			"useUserManagementContext must be used within a UserManagementProvider",
		);
	}
	return context;
};

import {useState} from "react";
import {Edit, Trash2} from "lucide-react";
import {Button} from "../../../../../../components/ui/Button";
import {DataGrid} from "../../../../../../components/ui/DataGrid";
import {PaginationButtons} from "../../../../../../components/ui/PaginationButtons";
import {TUserDto} from "../../../../../../models/memberships/user";
import {useUserManagementContext} from "../contexts/UserManagementContext";
import {UserDataGridMobile} from "./UserDataGridMobile";
import {UserMobileSortControls} from "./UserMobileSortControls";

export const UserDataGridContainer = () => {
	const {
		columns,
		totalPages,
		currentUsers,
		handleSort,
		currentPage,
		goToPage,
		handleDeleteConfirmation,
		handleEdit,
		sortField,
		sortOrder,
	} = useUserManagementContext();
	const renderActions = (data: TUserDto) => (
		<>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => handleEdit(data)}
				icon={<Edit size={18} />}
				className="mr-2"
			>
				Editar
			</Button>
			<Button
				variant="danger"
				size="sm"
				onClick={() => handleDeleteConfirmation(data.id ?? "")}
				icon={<Trash2 size={18} />}
			>
				Eliminar
			</Button>
		</>
	);

	return (
		<>
			<div className="hidden md:block">
				<DataGrid
					data={currentUsers}
					columns={columns}
					sortField={sortField}
					sortOrder={sortOrder}
					onSort={handleSort}
					actions={renderActions}
				/>
			</div>
			<div className="md:hidden">
				<UserMobileSortControls />
			</div>
			<UserDataGridMobile renderActions={renderActions} />
			<PaginationButtons
				currentPage={currentPage}
				goToPage={goToPage}
				totalPages={totalPages}
			/>
		</>
	);
};

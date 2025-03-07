import {Edit, Trash2} from "lucide-react";
import {Button} from "../../../../../../components/ui/Button";
import {DataGrid, TColumn} from "../../../../../../components/ui/DataGrid";
import {PaginationButtons} from "../../../../../../components/ui/PaginationButtons";
import {TUserDto} from "../../../../../../models/memberships/user";
import {TSortField, TSortOrder} from "../../../../../../types/sortDataGrid";
import {UserDataGridMobile} from "./UserDataGridMobile";

type TUserDataGridContainerProps = {
	columns: TColumn<TUserDto>[];
	totalPages: number;
	currentUsers: TUserDto[];
	handleSort: (field: TSortField) => void;
	currentPage: number;
	goToPage: (page: number) => void;
	handleDeleteConfirmation: (id: string) => void;
	handleEdit: (data: TUserDto) => void;
	sortField: TSortField;
	sortOrder: TSortOrder;
};

export const UserDataGridContainer = ({
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
}: TUserDataGridContainerProps) => {
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
			<UserDataGridMobile users={currentUsers} renderActions={renderActions} />
			<PaginationButtons
				currentPage={currentPage}
				goToPage={goToPage}
				totalPages={totalPages}
			/>
		</>
	);
};

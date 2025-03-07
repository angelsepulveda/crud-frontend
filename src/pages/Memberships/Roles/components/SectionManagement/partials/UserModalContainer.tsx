import {Dispatch, SetStateAction} from "react";
import {ConfirmationModal} from "../../../../../../components/ui/ConfirmationModal";
import {Modal} from "../../../../../../components/ui/Modal";
import {TUserDto, TUserForm} from "../../../../../../models/memberships/user";
import {MESSAGE_DELETE_SECTION} from "../../../utils/constants";
import {UserForm} from "./UserForm";

type TUserModalContainerProps = {
	currentData: TUserDto | null;
	isModalOpen: boolean;
	isConfirmModalOpen: boolean;
	handleDelete: VoidFunction;
	handleSubmit: (data: TUserForm) => void;
	isSubmitting: boolean;
	setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
	isDeleting: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const UserModalContainer = ({
	currentData,
	isConfirmModalOpen,
	isModalOpen,
	handleDelete,
	handleSubmit,
	isSubmitting,
	setIsConfirmModalOpen,
	isDeleting,
	setIsModalOpen,
}: TUserModalContainerProps) => {
	return (
		<>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
					{currentData ? "Editar un usuario" : "Registrar nuevo usuario"}
				</h2>
				<UserForm
					user={currentData}
					onSubmit={handleSubmit}
					isSubmitting={isSubmitting}
				/>
			</Modal>

			<ConfirmationModal
				isOpen={isConfirmModalOpen}
				onClose={() => setIsConfirmModalOpen(false)}
				onConfirm={handleDelete}
				confirmText="Eliminar"
				text="Eliminar"
				cancelText="Cancelar"
				message={MESSAGE_DELETE_SECTION}
				isDeleting={isDeleting}
			/>
		</>
	);
};

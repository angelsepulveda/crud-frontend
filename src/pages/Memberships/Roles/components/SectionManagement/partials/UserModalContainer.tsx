import {ConfirmationModal} from "../../../../../../components/ui/ConfirmationModal";
import {Modal} from "../../../../../../components/ui/Modal";
import {MESSAGE_DELETE_SECTION} from "../../../utils/constants";
import {useUserManagementContext} from "../contexts/UserManagementContext";
import {UserForm} from "./UserForm";

export const UserModalContainer = () => {
	const {
		currentData,
		isConfirmModalOpen,
		isModalOpen,
		handleDelete,
		setIsConfirmModalOpen,
		isDeleting,
		setIsModalOpen,
	} = useUserManagementContext();

	return (
		<>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
					{currentData ? "Editar un usuario" : "Registrar nuevo usuario"}
				</h2>
				<UserForm />
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

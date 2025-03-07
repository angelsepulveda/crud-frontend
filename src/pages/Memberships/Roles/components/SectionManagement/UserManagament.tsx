import {Plus} from "lucide-react";
import {Button} from "../../../../../components/ui/Button";
import {LoadingState} from "../../../../../components/ui/DataGrid";
import {SearchGrid} from "../../../../../components/ui/SearchGrid";
import {SideAlert} from "../../../../../components/ui/SideAlert";
import {
	LOADING_SECTIONS_MESSAGE,
	REGISTER_SECTION,
	SECTIONS_TITLE,
} from "../../utils/constants";
import {useUserManagement} from "./hooks/useUserManagement";
import {UserDataGridContainer} from "./partials/UserDataGridContainer";
import {UserModalContainer} from "./partials/UserModalContainer";
import {UserRetry} from "./partials/UserRetry";

export const UserManagement = () => {
	const {
		handleEdit,
		handleClearSearch,
		handleDelete,
		handleCreate,
		handleDeleteConfirmation,
		handleSearch,
		handleSort,
		handleSubmit,
		isDeleting,
		isConfirmModalOpen,
		isModalOpen,
		isLoading,
		isError,
		isSubmitting,
		alert,
		appliedSearchTerm,
		searchTerm,
		setAlert,
		setIsConfirmModalOpen,
		currentData,
		currentPage,
		currentUsers,
		totalPages,
		setSearchTerm,
		goToPage,
		sortOrder,
		sortField,
		setIsModalOpen,
		columns,
		isRetrying,
		handleRetry,
	} = useUserManagement();

	if (isError) {
		return <UserRetry isRetrying={isRetrying} handleRetry={handleRetry} />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{alert && (
				<SideAlert
					message={alert.message}
					type={alert.type}
					onClose={() => setAlert(null)}
				/>
			)}

			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					{SECTIONS_TITLE}
				</h2>
				<Button onClick={handleCreate} icon={<Plus size={18} />}>
					{REGISTER_SECTION}
				</Button>
			</div>
			<SearchGrid
				handleClearSearch={handleClearSearch}
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				appliedSearchTerm={appliedSearchTerm}
				setSearchTerm={setSearchTerm}
			/>
			{isLoading ? (
				<LoadingState message={LOADING_SECTIONS_MESSAGE} />
			) : (
				<UserDataGridContainer
					goToPage={goToPage}
					handleSort={handleSort}
					currentUsers={currentUsers}
					handleDeleteConfirmation={handleDeleteConfirmation}
					handleEdit={handleEdit}
					sortField={sortField}
					sortOrder={sortOrder}
					currentPage={currentPage}
					columns={columns}
					totalPages={totalPages}
				/>
			)}
			<UserModalContainer
				setIsModalOpen={setIsModalOpen}
				setIsConfirmModalOpen={setIsConfirmModalOpen}
				isDeleting={isDeleting}
				handleDelete={handleDelete}
				handleSubmit={handleSubmit}
				currentData={currentData}
				isSubmitting={isSubmitting}
				isConfirmModalOpen={isConfirmModalOpen}
				isModalOpen={isModalOpen}
			/>
		</div>
	);
};

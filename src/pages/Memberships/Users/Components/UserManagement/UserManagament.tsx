import {FileSpreadsheet, Plus} from "lucide-react";
import {Button} from "../../../../../components/ui/Button";
import {LoadingState} from "../../../../../components/ui/DataGrid";
import {SearchGrid} from "../../../../../components/ui/SearchGrid";
import {SideAlert} from "../../../../../components/ui/SideAlert";
import {
	LOADING_SECTIONS_MESSAGE,
	REGISTER_SECTION,
	SECTIONS_TITLE,
} from "../../utils/constants";
import {useUserManagementContext} from "../contexts/UserManagementContext";
import {UserDataGridContainer} from "../partials/UserDataGridContainer";
import {UserModalContainer} from "../partials/UserModalContainer";
import {UserRetry} from "../partials/UserRetry";

export const UserManagement = () => {
	const {
		handleClearSearch,
		handleCreate,
		handleSearch,
		isLoading,
		isError,
		alert,
		appliedSearchTerm,
		searchTerm,
		setAlert,
		setSearchTerm,
		isDownloading,
		handleDownloadExcel,
		currentUsers,
	} = useUserManagementContext();

	if (isError) {
		return <UserRetry />;
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

			<div className="mb-6 flex flex-col space-y-4 sm:space-y-0 md:flex-row md:items-center md:justify-between">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					{SECTIONS_TITLE}
				</h2>
				<div className="flex flex-col space-y-2 sm:space-y-0 md:flex-row md:space-x-2">
					<Button
						onClick={handleDownloadExcel}
						icon={<FileSpreadsheet size={18} />}
						variant="secondary"
						isLoading={isDownloading}
						disabled={currentUsers.length === 0}
						className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
					>
						Exportar Excel
					</Button>
					<Button onClick={handleCreate} icon={<Plus size={18} />}>
						{REGISTER_SECTION}
					</Button>
				</div>
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
				<UserDataGridContainer />
			)}
			<UserModalContainer />
		</div>
	);
};

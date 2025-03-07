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
import {useUserManagementContext} from "./contexts/UserManagementContext";
import {UserDataGridContainer} from "./partials/UserDataGridContainer";
import {UserModalContainer} from "./partials/UserModalContainer";
import {UserRetry} from "./partials/UserRetry";

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
				<UserDataGridContainer />
			)}
			<UserModalContainer />
		</div>
	);
};

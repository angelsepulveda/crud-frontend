import {UserManagement} from "./components/SectionManagement/UserManagament";
import {UserManagementProvider} from "./components/SectionManagement/contexts/UserManagementContext";

export const UsersPage = () => {
	return (
		<UserManagementProvider>
			<UserManagement />
		</UserManagementProvider>
	);
};

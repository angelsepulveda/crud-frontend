import {UserManagement} from "./Components/UserManagement/UserManagament";
import {UserManagementProvider} from "./Components/contexts/UserManagementContext";

export const UsersPage = () => {
	return (
		<UserManagementProvider>
			<UserManagement />
		</UserManagementProvider>
	);
};

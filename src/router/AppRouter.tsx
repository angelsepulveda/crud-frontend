import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import PrivateLayout from "../components/layouts/PrivateLayout/PrivateLayout";
import LoginPage from "../pages/Memberships/Login/LoginPage";
import {UsersPage} from "../pages/Memberships/Users/UsersPage";
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRouter";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={<PublicRoute element={<LoginPage />} />}
				/>
				<Route path="/" element={<PrivateRoute element={<PrivateLayout />} />}>
					<Route index element={<PrivateRoute element={<UsersPage />} />} />
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;

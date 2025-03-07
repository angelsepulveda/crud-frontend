import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateLayout from "./components/layouts/PrivateLayout/PrivateLayout";
import {UsersPage} from "./pages/Memberships/Roles/UsersPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PrivateLayout />}>
				<Route index element={<UsersPage />} />
			</Route>
		</Routes>
	</BrowserRouter>,
);

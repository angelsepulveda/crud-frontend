import {useState} from "react";
import {Outlet} from "react-router";
import {ThemeProvider} from "../../../themes/ThemeProvider";
import {Sidebar} from "./partials/Sidebar/Sidebar";
import {TopBar} from "./partials/Topbar/Topbar";

export const PrivateLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	return (
		<ThemeProvider>
			<div className="flex h-screen bg-gray-100 dark:bg-gray-900">
				<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
				<div className="flex flex-1 flex-col overflow-hidden">
					<TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900">
						<Outlet />
					</main>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default PrivateLayout;

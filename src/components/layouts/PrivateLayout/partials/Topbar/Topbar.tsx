import {Dispatch, SetStateAction, useState} from "react";
import {LogOut, Menu} from "lucide-react";
import {useNavigate} from "react-router";
import {authService} from "../../../../../services/memberships/authService";
import {ThemeToggle} from "./ThemeToggle";

type TTopbarProps = {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const TopBar = ({sidebarOpen, setSidebarOpen}: TTopbarProps) => {
	const [profileOpen, setProfileOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await authService.logout();
			navigate("/login");
		} catch (error) {
			console.error("Failed to logout:", error);
		}
	};

	return (
		<header className="flex items-center justify-between bg-white px-6 py-4 shadow dark:bg-gray-800">
			<div className="flex items-center">
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="text-gray-500 focus:outline-none dark:text-gray-400 lg:hidden"
				>
					<Menu size={24} />
				</button>
			</div>

			<div className="flex items-center">
				<ThemeToggle />
				<div className="relative ml-2">
					<button
						onClick={() => setProfileOpen(!profileOpen)}
						className="relative z-10 block h-8 w-8 overflow-hidden rounded-full shadow focus:outline-none"
					>
						<img
							className="h-full w-full object-cover"
							src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
							alt="Your avatar"
						/>
					</button>
					{profileOpen && (
						<div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-md bg-white shadow-xl dark:bg-gray-800">
							<button
								onClick={handleLogout}
								className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-800"
							>
								<LogOut size={18} className="mr-2 inline" />
								Cerrar sesión
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

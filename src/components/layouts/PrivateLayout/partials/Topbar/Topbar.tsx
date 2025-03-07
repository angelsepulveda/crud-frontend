import {Dispatch, SetStateAction} from "react";
import {Menu} from "lucide-react";
import {ThemeToggle} from "./ThemeToggle";

type TTopbarProps = {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const TopBar = ({sidebarOpen, setSidebarOpen}: TTopbarProps) => {
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
			</div>
		</header>
	);
};

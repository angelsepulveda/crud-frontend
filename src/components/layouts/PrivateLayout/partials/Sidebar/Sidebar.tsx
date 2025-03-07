import {Dispatch, SetStateAction} from "react";
import {X} from "lucide-react";
import {NavigationMenu} from "./NavigationMenu";
import SidebarLogo from "./SIdebarLogo";

type TSIdebarProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({open, setOpen}: TSIdebarProps) => {
	return (
		<div
			className={`${
				open ? "translate-x-0" : "-translate-x-full"
			} fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-white shadow-lg transition duration-300 dark:bg-gray-800 lg:static lg:inset-0 lg:translate-x-0`}
		>
			<div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
				<div className="flex items-center">
					<SidebarLogo />
				</div>
				<button
					onClick={() => setOpen(false)}
					className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 lg:hidden"
				>
					<X size={24} />
				</button>
			</div>
			<NavigationMenu />
		</div>
	);
};

import {Home} from "lucide-react";
import {MenuItem} from "./MenuItem";

export const NavigationMenu = () => {
	return (
		<nav className="mt-5 px-2">
			<MenuItem icon={Home} title="Users" href="/users" />
		</nav>
	);
};

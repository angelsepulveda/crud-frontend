import {useTheme} from "next-themes";

export default function SidebarLogo() {
	const {theme} = useTheme();

	return (
		<span
			className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"} `}
		>
			{theme === "dark" ? "Logo Blanco" : "Logo"}
		</span>
	);
}

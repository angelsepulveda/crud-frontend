import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Sun, Moon} from "lucide-react";

export const ThemeToggle = () => {
	const {theme, setTheme} = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	console.log("theme", theme);

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
		>
			{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	);
};

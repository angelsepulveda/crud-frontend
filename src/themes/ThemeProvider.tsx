import {ReactNode, useEffect, useState} from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

type TThemeProviderProps = {
	children: ReactNode;
};

export const ThemeProvider = ({children}: TThemeProviderProps) => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <>{children}</>;
	}

	return (
		<NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
			{children}
		</NextThemesProvider>
	);
};

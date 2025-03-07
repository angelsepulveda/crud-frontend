const NoDataSVG = () => (
	<svg
		className="mx-auto mb-4 h-48 w-48 text-gray-400"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
		<line x1="3" y1="9" x2="21" y2="9" />
		<line x1="9" y1="21" x2="9" y2="9" />
	</svg>
);

export const NoDataMessage = () => (
	<div className="py-12 text-center">
		<NoDataSVG />
		<h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
			No hay datos disponibles
		</h3>
		<p className="text-gray-500 dark:text-gray-400">
			No hay registros para mostrar en este momento.
		</p>
	</div>
);

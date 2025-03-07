import {Dispatch, SetStateAction} from "react";
import {Search} from "lucide-react";
import {Button} from "./Button";

type TSearchGridProps = {
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
	handleSearch: VoidFunction;
	handleClearSearch: VoidFunction;
	appliedSearchTerm: string;
};

export const SearchGrid = ({
	appliedSearchTerm,
	searchTerm,
	handleClearSearch,
	handleSearch,
	setSearchTerm,
}: TSearchGridProps) => {
	return (
		<div className="mb-4 flex items-center">
			<div className="relative mr-2 flex-grow">
				<input
					type="text"
					placeholder="Buscar.."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full items-end rounded-lg border bg-white py-2 pl-10 pr-4 text-gray-700 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
				/>
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Search className="h-5 w-5 text-gray-400" />
				</div>
			</div>
			<Button onClick={handleSearch}>Buscar</Button>
			{appliedSearchTerm && (
				<Button
					variant="secondary"
					onClick={handleClearSearch}
					className="ml-2"
				>
					Limpiar
				</Button>
			)}
		</div>
	);
};

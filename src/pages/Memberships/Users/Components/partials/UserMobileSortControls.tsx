import {useState} from "react";
import {ChevronDown, ChevronUp, SortAsc, SortDesc} from "lucide-react";
import {TSortFieldUser} from "../../types/sortFieldUser";
import {useUserManagementContext} from "../contexts/UserManagementContext";

const sortOptions = [
	{value: "name", label: "Nombre"},
	{value: "email", label: "Correo electronico"},
	{value: "rut", label: "RUT"},
	{value: "dateBirth", label: "Fecha de nacimiento"},
];

export const UserMobileSortControls = () => {
	const [showMobileSortOptions, setShowMobileSortOptions] =
		useState<boolean>(false);
	const {sortField, sortOrder, setSortField, setSortOrder} =
		useUserManagementContext();

	return (
		<div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
			<div className="mb-2 flex items-center justify-between">
				<h3 className="font-medium text-gray-700 dark:text-gray-300">
					Opciones de Ordenamiento
				</h3>
				<button
					onClick={() => setShowMobileSortOptions(!showMobileSortOptions)}
					className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
				>
					{showMobileSortOptions ? (
						<ChevronUp size={20} />
					) : (
						<ChevronDown size={20} />
					)}
				</button>
			</div>

			{showMobileSortOptions && (
				<div className="mt-3 space-y-3">
					<div>
						<label
							htmlFor="mobile-sort-field"
							className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Ordenar por
						</label>
						<select
							id="mobile-sort-field"
							value={sortField}
							onChange={(e) => setSortField(e.target.value as TSortFieldUser)}
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
						>
							{sortOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>

					<div className="flex space-x-2">
						<button
							onClick={() => setSortOrder("asc")}
							className={`flex items-center rounded-md px-3 py-2 ${
								sortOrder === "asc"
									? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
									: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							<SortAsc size={18} className="mr-1" />
							Ascendente
						</button>
						<button
							onClick={() => setSortOrder("desc")}
							className={`flex items-center rounded-md px-3 py-2 ${
								sortOrder === "desc"
									? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
									: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							<SortDesc size={18} className="mr-1" />
							Descendente
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

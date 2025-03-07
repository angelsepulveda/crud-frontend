import {ReactNode} from "react";
import {ChevronUp, ChevronDown} from "lucide-react";
import {NoDataMessage} from "./NoDataMessage";

export type TColumn<T> = {
	key: keyof T;
	header: string;
	render?: (item: T) => React.ReactNode;
};

type TDataGridProps<T> = {
	data: T[];
	columns: TColumn<T>[];
	sortField?: keyof T;
	sortOrder?: "asc" | "desc";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSort?: (field: any) => void;
	actions?: (item: T) => ReactNode;
};

export function DataGrid<T>({
	data,
	columns,
	sortField,
	sortOrder,
	onSort,
	actions,
}: TDataGridProps<T>) {
	const renderSortIcon = (field: keyof T) => {
		if (sortField !== field) return null;
		return sortOrder === "asc" ? (
			<ChevronUp size={18} />
		) : (
			<ChevronDown size={18} />
		);
	};

	if (data.length === 0) {
		return <NoDataMessage />;
	}

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800">
				<thead className="bg-gray-50 dark:bg-gray-700">
					<tr>
						{columns.map((column) => (
							<th
								key={column.key as string}
								className="cursor-pointer px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200"
								onClick={() => onSort && onSort(column.key)}
							>
								<div className="flex items-center">
									{column.header}
									{renderSortIcon(column.key)}
								</div>
							</th>
						))}
						{actions && (
							<th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
								Acciones
							</th>
						)}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{data.map((item, index) => (
						<tr
							key={index}
							className="transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700"
						>
							{columns.map((column) => (
								<td
									key={column.key as string}
									className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200"
								>
									{column.render
										? column.render(item)
										: (item[column.key] as React.ReactNode)}
								</td>
							))}
							{actions && (
								<td className="px-4 py-3 text-sm">{actions(item)}</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

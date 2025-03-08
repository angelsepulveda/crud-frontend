import {useRef, useState} from "react";
import {ChevronDown, LucideIcon} from "lucide-react";
import {Link, useLocation} from "react-router";
import {TSubItem} from "./menuItem.d";

type TMenuItemProps = {
	icon: LucideIcon;
	title: string;
	href?: string;
	subItems?: TSubItem[];
};

export const MenuItem = ({
	icon: Icon,
	title,
	href,
	subItems = [],
}: TMenuItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const location = useLocation();

	const isActive =
		href === location.pathname ||
		subItems.some((item) => item.href === location.pathname);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="mb-2">
			<button
				className={`flex w-full items-center rounded-md px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-800 ${
					isActive ? "bg-blue-100 dark:bg-blue-800" : ""
				}`}
				onClick={toggleOpen}
			>
				<Icon className="mr-2" size={18} />
				<span className="flex-grow text-left">{title}</span>
				{subItems.length > 0 && (
					<ChevronDown
						className={`ml-auto transform transition-transform duration-200 ${
							isOpen ? "rotate-180" : ""
						}`}
						size={18}
					/>
				)}
			</button>
			{subItems.length > 0 && (
				<div
					className="overflow-hidden transition-all duration-300 ease-in-out"
					style={{
						maxHeight: isOpen ? `${menuRef.current?.scrollHeight}px` : "0",
					}}
					ref={menuRef}
				>
					<div className="mt-2 pl-4">
						{subItems.map((item, index) => (
							<Link to={item.href} key={index}>
								<span
									className={`flex items-center rounded-md px-4 py-2 text-gray-600 transition-colors duration-200 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-800 ${
										item.href === location.pathname
											? "bg-blue-100 dark:bg-blue-800"
											: ""
									}`}
								>
									{item.title}
								</span>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

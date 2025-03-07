import {X} from "lucide-react";

type TModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
	children: React.ReactNode;
};

export const Modal = ({isOpen, onClose, children}: TModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="w-full max-w-md rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800">
				<div className="mb-4 flex justify-end">
					<button
						onClick={onClose}
						className="text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						<X size={24} />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

import {AlertTriangle} from "lucide-react";
import {Button} from "./Button";

type ConfirmationModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
	onConfirm: VoidFunction;
	message: string;
	isDeleting: boolean;
	confirmText: string;
	cancelText: string;
	text: string;
};

export const ConfirmationModal = ({
	isOpen,
	onClose,
	onConfirm,
	message,
	isDeleting,
	confirmText,
	cancelText,
	text,
}: ConfirmationModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
				<div className="mb-4 flex items-center">
					<AlertTriangle className="mr-2 text-yellow-500" size={24} />
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						{text}
					</h3>
				</div>
				<p className="mb-6 text-gray-700 dark:text-gray-300">{message}</p>
				<div className="flex justify-end space-x-4">
					<Button variant="secondary" onClick={onClose} disabled={isDeleting}>
						{cancelText}
					</Button>
					<Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	);
};

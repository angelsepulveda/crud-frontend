import {AlertTriangle, RefreshCw} from "lucide-react";
import {Button} from "../../../../../../components/ui/Button";

type TUserRetryProps = {
	isRetrying: boolean;
	handleRetry: VoidFunction;
};

export const UserRetry = ({handleRetry, isRetrying}: TUserRetryProps) => {
	return (
		<div className="mb-5 flex flex-col items-center justify-center rounded-lg bg-white px-4 py-12 shadow-md dark:bg-gray-800">
			<div className="mb-6 rounded-full bg-red-100 p-6 dark:bg-red-900/30">
				<AlertTriangle size={64} className="text-red-500 dark:text-red-400" />
			</div>
			<h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
				No se pudo cargar los datos
			</h3>
			<p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
				Encontramos un problema al intentar cargar los datos del usuario. Esto
				podría deberse a un problema de red o un error en el servidor.
			</p>
			<Button
				onClick={handleRetry}
				isLoading={isRetrying}
				icon={!isRetrying && <RefreshCw size={18} />}
			>
				{isRetrying ? "Reintentando..." : "Intentar de nuevo"}
			</Button>
		</div>
	);
};

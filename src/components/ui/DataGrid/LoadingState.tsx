import {Loader2} from "lucide-react";

type TLoadingStateProps = {
	message: string;
};

export const LoadingState = ({message}: TLoadingStateProps) => (
	<div className="flex items-center justify-center py-8">
		<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
		<span className="ml-2 text-gray-600 dark:text-gray-400">{message}</span>
	</div>
);

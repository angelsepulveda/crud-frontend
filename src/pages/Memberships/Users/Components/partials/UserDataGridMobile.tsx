import {JSX} from "react";
import {NoDataMessage} from "../../../../../components/ui/DataGrid";
import {TUserDto} from "../../../../../models/memberships/user";
import {formatDateDayMothYear} from "../../../../../utils/date";
import {useUserManagementContext} from "../contexts/UserManagementContext";

type TUserDataGridMobileProps = {
	renderActions: (user: TUserDto) => JSX.Element;
};

export const UserDataGridMobile = ({
	renderActions,
}: TUserDataGridMobileProps) => {
	const {currentUsers} = useUserManagementContext();

	if (currentUsers.length === 0) {
		return (
			<div className="space-y-4 md:hidden">
				<NoDataMessage />
			</div>
		);
	}

	return (
		<div className="space-y-4 md:hidden">
			{currentUsers.map((user: TUserDto) => (
				<div
					key={user.id}
					className="rounded-lg bg-white p-4 shadow transition duration-150 ease-in-out dark:bg-gray-800"
				>
					<h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
						{user.name}
					</h3>
					<p className="mb-1 text-gray-600 dark:text-gray-300">{user.rut}</p>
					<p className="mb-1 text-gray-600 dark:text-gray-300">{user.email}</p>
					<p className="mb-1 text-gray-600 dark:text-gray-300">
						{formatDateDayMothYear(user.birthDate)}
					</p>
					<div className="flex justify-end">{renderActions(user)}</div>
				</div>
			))}
		</div>
	);
};

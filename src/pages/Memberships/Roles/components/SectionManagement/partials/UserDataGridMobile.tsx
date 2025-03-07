import {JSX} from "react";
import {NoDataMessage} from "../../../../../../components/ui/DataGrid";
import {TUserDto} from "../../../../../../models/memberships/user";

type TUserDataGridMobileProps = {
	users: TUserDto[];
	renderActions: (user: TUserDto) => JSX.Element;
};

export const UserDataGridMobile = ({
	users,
	renderActions,
}: TUserDataGridMobileProps) => {
	if (users.length === 0) {
		return (
			<div className="space-y-4 md:hidden">
				<NoDataMessage />
			</div>
		);
	}

	return (
		<div className="space-y-4 md:hidden">
			{users.map((user: TUserDto) => (
				<div
					key={user.id}
					className="rounded-lg bg-white p-4 shadow transition duration-150 ease-in-out dark:bg-gray-800"
				>
					<h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
						{user.name}
					</h3>
					<div className="flex justify-end">{renderActions(user)}</div>
				</div>
			))}
		</div>
	);
};

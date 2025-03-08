import useSWR from "swr";
import {TRegisterUserPayload, TUserDto} from "../../models/memberships/user";
import {userService} from "../../services/memberships/userService";

const fetcher = async () => {
	return await userService.getAll();
};

export function useUsers() {
	const {
		data: users,
		error,
		mutate,
	} = useSWR<TUserDto[]>("/api/users", fetcher);

	const createUser = async (data: TRegisterUserPayload) => {
		try {
			const response = await userService.create(data);

			if (typeof response !== "string") {
				mutate([...(users || []), response as TUserDto], false);
				return response;
			}
			return response;
		} catch (error) {
			console.error("Error creating user  :", error);
			throw error;
		}
	};

	const updateUser = async (data: TUserDto) => {
		try {
			const response = await userService.update(data);
			mutate(
				users?.map((user: TUserDto) => (user.id === data.id ? data : user)),
				false,
			);
			return response;
		} catch (error) {
			console.error("Error updating user:", error);
			throw error;
		}
	};

	const deleteUser = async (id: string) => {
		try {
			await userService.delete(id);
			mutate(
				users?.filter((user: TUserDto) => user.id !== id),
				false,
			);
		} catch (error) {
			console.error("Error deleting user:", error);
			throw error;
		}
	};

	return {
		users,
		isLoading: !error && !users,
		isError: error,
		createUser,
		updateUser,
		deleteUser,
		mutate,
	};
}

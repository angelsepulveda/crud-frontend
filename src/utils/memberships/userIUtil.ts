import { errorTitlesUser } from "../../exceptions/memberships/users/userException";

export const mapperErrorUser = async (response: Response, defaultMsg: string) => {
	const dataError = await response.json();

	if (errorTitlesUser.includes(dataError?.title)) {
		return dataError.detail;
	}

	throw new Error(defaultMsg);
}
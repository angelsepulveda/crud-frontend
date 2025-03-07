import {TNullable} from "../shared/nullable";

export type TUserDto = {
	id?: string;
	name: string;
	rut: string;
	email: TNullable<string>;
	birthDate: Date;
};

export type TRegisterUserPayload = Omit<TUserDto, "id">;

export type TUserForm = {
	id?: string;
	name: string;
	rut: string;
	email: TNullable<string>;
	birthDate: string;
};

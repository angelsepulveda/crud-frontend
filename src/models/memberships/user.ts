import {TNullable} from "../../types/nullable";

export type TUserDto = {
	id: TNullable<string>;
	name: string;
	rut: string;
	email: TNullable<string>;
	birthDate: Date;
};

export type TRegisterUserPayload = Omit<TUserDto, "id">;

export type TUserForm = {
	id: TNullable<string>;
	name: string;
	rut: string;
	email: TNullable<string>;
	birthDate: string;
};

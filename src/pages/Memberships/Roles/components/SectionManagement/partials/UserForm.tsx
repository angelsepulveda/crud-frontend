import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "../../../../../../components/ui/Button";
import {InputCustom} from "../../../../../../components/ui/Input";
import {TUserDto, TUserForm} from "../../../../../../models/memberships/user";
import {TNullable} from "../../../../../../models/shared/nullable";

type TUserFormProps = {
	user: TNullable<TUserDto>;
	onSubmit: (user: TUserForm) => void;
	isSubmitting: boolean;
};

export const UserForm = ({user, onSubmit, isSubmitting}: TUserFormProps) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<TUserForm>({
		defaultValues: user
			? {
					name: user.name,
					email: user.email,
					birthDate: user.birthDate
						? new Date(user.birthDate).toISOString().split("T")[0]
						: "",
					rut: user.rut,
				}
			: {
					name: "",
					email: "",
					rut: "",
					birthDate: "",
				},
	});

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				email: user.email,
				birthDate: user.birthDate
					? new Date(user.birthDate).toISOString().split("T")[0]
					: "",
				rut: user.rut,
			});
		} else {
			reset();
		}
	}, [user, reset]);

	const onSubmitForm: SubmitHandler<TUserForm> = (data) => {
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
			<InputCustom
				label="Nombre"
				id="name"
				{...register("name", {
					required: "Es requerido",
					maxLength: {
						value: 50,
						message: "no puede superar los 50 caracteres",
					},
				})}
				error={errors.name}
			/>
			<InputCustom
				label="Rut"
				id="rut"
				{...register("rut", {
					required: "Es requerido",
					maxLength: {
						value: 50,
						message: "no puede superar los 50 caracteres",
					},
				})}
				error={errors.rut}
			/>
			<InputCustom
				label="Correo electronico"
				id="email"
				{...register("email", {
					maxLength: {
						value: 256,
						message: "no puede superar los 256 caracteres",
					},
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: "Correo electrico invalido",
					},
				})}
				type="email"
				error={errors.email}
			/>
			<InputCustom
				label="Fecha de nacimiento"
				id="birthDate"
				{...register("birthDate", {
					required: "Es requerido",
				})}
				type="date"
				error={errors.birthDate}
			/>
			<Button type="submit" isLoading={isSubmitting}>
				{user ? "Editar" : "Registrar"}
			</Button>
		</form>
	);
};

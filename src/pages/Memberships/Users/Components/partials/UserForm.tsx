import {Button} from "../../../../../components/ui/Button";
import {InputCustom} from "../../../../../components/ui/Input";
import {validateRut} from "../../../../../utils/rut";
import {useUserForm} from "../hooks/useUserForm";

export const UserForm = () => {
	const {onSubmitForm, register, handleSubmit, isSubmitting, errors, user} =
		useUserForm();
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
					validate: (value) => validateRut(value) || "Rut invalido",
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

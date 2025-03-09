import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {TUserForm} from "../../../../../models/memberships/user";
import {formatRut} from "../../../../../utils/rut";
import {useUserManagementContext} from "../contexts/UserManagementContext";

export const useUserForm = () => {
	const {
		handleSubmit: onSubmit,
		currentData: user,
		isSubmitting,
	} = useUserManagementContext();

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
		watch,
		setValue,
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

	const rutValue = watch("rut");

	useEffect(() => {
		if (rutValue) {
			const formatted = formatRut(rutValue);
			if (formatted !== rutValue) {
				setValue("rut", formatted);
			}
		}
	}, [rutValue, setValue]);

	return {
		onSubmitForm,
		register,
		handleSubmit,
		isSubmitting,
		errors,
		user,
	};
};

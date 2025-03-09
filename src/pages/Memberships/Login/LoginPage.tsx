import {useNavigate} from "react-router";
import {GoogleLogin} from "@react-oauth/google";

const LoginPage = () => {
	const navigate = useNavigate();
	const handleLoginSuccess = async (credentialResponse: any) => {
		try {
			const {credential} = credentialResponse;

			const response = await fetch("https://localhost:7148/auth/login-google", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({token: credential}),
			});

			if (!response.ok) {
				throw new Error("Error en la autenticación");
			}

			const data = await response.json();

			localStorage.setItem("token", data.token);
			navigate("/");
		} catch (error) {
			console.error("Error al autenticar:", error);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
						Iniciar sesión
					</h1>
					<p className="text-gray-600 dark:text-gray-300">
						Continúa con tu cuenta de Google
					</p>
				</div>
				<div className="flex justify-center">
					<GoogleLogin
						onSuccess={handleLoginSuccess}
						useOneTap
						shape="rectangular"
						text="signin_with"
						size="large"
						logo_alignment="left"
						theme="outline"
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

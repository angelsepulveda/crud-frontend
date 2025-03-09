import {useNavigate} from "react-router";
import {GoogleLogin, CredentialResponse} from "@react-oauth/google";
import {authService} from "../../../services/memberships/authService";

const LoginPage = () => {
	const navigate = useNavigate();

	const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
		try {
			const {credential} = credentialResponse;
			if (credential) {
				const token = await authService.loginWithGoogle(credential);
				localStorage.setItem("token", token);
				navigate("/");
			}
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

import {useState} from "react";
import {useNavigate} from "react-router";
import {GoogleLogin, CredentialResponse} from "@react-oauth/google";
import {authService} from "../../../services/memberships/authService";
import {GoogleSpinner} from "./components/GoogleSpinner";

const LoginPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
		setIsLoading(true);
		try {
			const {credential} = credentialResponse;
			if (credential) {
				const token = await authService.loginWithGoogle(credential);
				localStorage.setItem("token", token);
				navigate("/");
			}
		} catch (error) {
			console.error("Error al autenticar:", error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
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
					{isLoading ? (
						<div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-6 dark:border-gray-600">
							<div className="flex items-center justify-center space-x-3">
								<GoogleSpinner size={28} />
								<span className="font-medium text-gray-700 dark:text-gray-200">
									Iniciando sesión con Google...
								</span>
							</div>
							<p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
								Serás redirigido automáticamente
							</p>
						</div>
					) : (
						<GoogleLogin
							onSuccess={handleLoginSuccess}
							useOneTap
							shape="rectangular"
							text="signin_with"
							size="large"
							logo_alignment="left"
							theme="outline"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

import {createRoot} from "react-dom/client";
import {GoogleOAuthProvider} from "@react-oauth/google";
import AppRouter from "./router/AppRouter";
import "./index.css";

const clientId =
	"1068911687738-5p7gtlmkrnoaddlbodvdegmem47sssi0.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId={clientId}>
		<AppRouter />
	</GoogleOAuthProvider>,
);

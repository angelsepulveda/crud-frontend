import {ReactNode} from "react";
import {Navigate} from "react-router";

type TPublicRouteProps = {
	element: ReactNode;
};

const PublicRoute = ({element}: TPublicRouteProps) => {
	const token = localStorage.getItem("token");

	if (token) {
		return <Navigate to="/" replace />;
	}

	return element;
};

export default PublicRoute;

import {ReactNode} from "react";
import {Navigate} from "react-router";

type TPrivateRouteProps = {
	element: ReactNode;
};

const PrivateRoute = ({element}: TPrivateRouteProps) => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return element;
};

export default PrivateRoute;

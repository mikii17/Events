import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectionLayout = () => {
    const { auth } = useAuth();
    const { pathname } = useLocation();

    if (auth === undefined) {
        return <div>Loading...</div>;
    }

    if (auth === null) {
        const redirectTo = btoa(pathname); // btoa: base64 encode
        return <Navigate to={`/login?redirectTo=${redirectTo}`} replace/>;
    }

    return <Outlet />;
}

export default ProtectionLayout
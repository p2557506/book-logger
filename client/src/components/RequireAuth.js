import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return(
        //Checks if there is a user
        auth
        ? <Outlet/>
        : <Navigate to="/signin" state={{from:location}} replace/>
    );
}
export default RequireAuth
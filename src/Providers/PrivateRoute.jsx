import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {

    const {user, loading}= useContext(AuthContext)

    if(loading){
        return <p>Loading...</p>
    }
    if(user){
        return children ;
    }

    return <Navigate to='/' replace/>
};

export default PrivateRoute;
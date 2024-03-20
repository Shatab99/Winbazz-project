import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useGetUserByEmailQuery } from "../Redux/features/EndPoints/userApi";
import { Navigate } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const email = user?.email;
    const { data: currentUser, isLoading } = useGetUserByEmailQuery(email)
    const role = currentUser?.role

    if (loading || isLoading) {
        return <p className="flex flex-col items-center justify-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></p>
    }

    if (user && role === 'admin') {
        return children
    }

    return <Navigate to={'/'} replace />

};

export default AdminRoute;
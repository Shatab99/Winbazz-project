
import { Outlet } from "react-router-dom";
import { useGetAllUserQuery } from "../../Redux/features/EndPoints/userApi";
import SideNav from "./SideNav";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const Profile = () => {
    const { data: users, isLoading } = useGetAllUserQuery()
    const { user } = useContext(AuthContext)
    const email = user?.email
    const Admin = users?.filter(item => item?.email === email)

    if (isLoading) {
        return <p className="flex flex-col items-center justify-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></p>
    }
    const isAdmin = Admin[0]?.role

    return (
        <>
            <div className="text-lg w-full text-center bg-black p-2 font-semibold text-orange-300 relative">
                <p className="">{isAdmin === "admin" ? "Admin Panel" : "Your Profile"}</p>
                {isAdmin === 'admin' && <SideNav />}
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Profile;
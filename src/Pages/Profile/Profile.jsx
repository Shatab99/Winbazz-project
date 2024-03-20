
import { Outlet } from "react-router-dom";
import { useGetUserByEmailQuery } from "../../Redux/features/EndPoints/userApi";
import SideNav from "./SideNav";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const Profile = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser } = useGetUserByEmailQuery(email)

    const isAdmin = currentUser?.role

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
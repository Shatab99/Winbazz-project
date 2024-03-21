import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Navbars/Navbar";
import BottomNav from "./Pages/Navbars/BottomNav";
import { useContext } from "react";
import { AuthContext } from "./Providers/AuthProvider";


const Root = () => {

    const { user } = useContext(AuthContext)

    return (
        <>
            <div>
                {user && !user?.emailVerified && <p className="bg-red-100 text-center p-2 text-red-600 font-bold"> Please Verify your Email From {user.email} !! </p>}
                <Navbar />
                <Outlet />
                <BottomNav />
            </div>
        </>
    );
};

export default Root;
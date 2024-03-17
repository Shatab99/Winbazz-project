import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Navbars/Navbar";
import BottomNav from "./Pages/Navbars/BottomNav";


const Root = () => {
    return (
        <>
            <Navbar/>
            <Outlet />
            <BottomNav/>
        </>
    );
};

export default Root;
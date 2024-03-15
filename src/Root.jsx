import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Navbar";


const Root = () => {
    return (
        <>
            <Navbar>
                <Outlet/>
            </Navbar>
        </>
    );
};

export default Root;
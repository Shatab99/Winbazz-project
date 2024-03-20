import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

const SideNav = () => {
    return (
        <div>
            <div className="drawer z-50">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="">                <HiMenuAlt1  className="text-2xl absolute -top-6"/></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-screen  bg-base-200 text-base-content ">
                        {/* Sidebar content here */}
                        <li><h1 className="text-3xl font-semibold">Admin Panel</h1></li>
                        <li className="mt-7"><Link to={'/profile'}>Admin Home</Link></li>
                        <li className=""><Link to={'/profile/users'}>Users</Link></li>
                        <li className=""><Link to={'/profile/depositReq'}>Deposite Requets</Link></li>
                        <li className=""><Link to={'/profile/withdrawReq'}>Withdraw Requets</Link></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
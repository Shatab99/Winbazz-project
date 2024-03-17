import { useContext, useState } from 'react';
import logo from '../assets/Logo/logo.png'
import UserLogModal from './LogInRegistration/UserLogModal';
import { AuthContext } from '../Providers/AuthProvider';
import { GoPlusCircle } from "react-icons/go";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [showReg, setShowReg] = useState(false)
    const { user,logOut } = useContext(AuthContext)

    const handleLogOut =()=>{
        logOut().then(res=> console.log(res)).catch(err=> console.log(err.message))
    }   

    const nav = <>
        {
            user ? <>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                        <p className='font-semibold'>Hey , {user?.displayName}</p>
                    </div>
                    <ul tabIndex={0} className="menu z-40 menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a onClick={handleLogOut}>Logout</a></li>
                    </ul>
                </div>
            </>
                :
                <>
                    <button onClick={() => setIsOpen(true)} className='font-bold' >Log In</button>
                    <button onClick={() => {
                        setIsOpen(true);
                        setShowReg(true);
                    }} className='font-bold btn btn-sm bg-[#F27125] text-white hover:bg-orange-600'>Registration</button>
                </>
        }
    </>

    return (
        <div>
            <UserLogModal isOpen={isOpen} setIsOpen={setIsOpen} showReg={showReg} setShowReg={setShowReg} />
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <img src={logo} alt="" className='w-24 lg:w-36' />
                </div>
                <div className='navbar-center'>
                    {
                        user && <>
                            <div className='border-2 border-orange-600 px-3 rounded-3xl flex items-center gap-1'>
                                <GoPlusCircle />
                                <p>৳ 0.00 Tk</p>
                            </div>
                        </>
                    }
                </div>
                <div className="navbar-end gap-3">
                    {nav}
                </div>
            </div>
        </div >
    );
};

export default Navbar;
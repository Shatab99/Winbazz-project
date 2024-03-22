import { useContext, useState } from 'react';
import logo from '../../assets/Logo/logo.png'
import UserLogModal from '../LogInRegistration/UserLogModal';
import { AuthContext } from '../../Providers/AuthProvider';
import { GoPlusCircle } from "react-icons/go";
import { FaBell } from "react-icons/fa";
import { useGetUserByEmailQuery } from '../../Redux/features/EndPoints/userApi';
import { VscLoading } from "react-icons/vsc";




const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [showReg, setShowReg] = useState(false)
    const { user, logOut } = useContext(AuthContext)
    const email = user?.email;
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email)

    const credit = currentUser?.credit


    const handleLogOut = () => {
        logOut().then(res => console.log(res)).catch(err => console.log(err.message))
    }

    const userName = user?.displayName?.split(' ')[0]

    const nav = <>
        {
            user ? <>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                        <p className='font-semibold flex items-center gap-1 '><span className='text-sm'>Hey, {userName}</span> <FaBell className='text-2xl' /></p>
                    </div>
                    <ul tabIndex={0} className="menu z-40 menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={handleLogOut}>Logout</a></li>
                    </ul>
                </div>
            </>
                :
                <>
                    <button onClick={() => setIsOpen(true)} className='font-bold btn btn-outline btn-sm text-white ' >Log In</button>
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
                            {
                                isLoading ? <div className='border-2 border-orange-600 px-6 py-1 rounded-3xl flex items-center '>
                                    <VscLoading className='animate-spin font-bold text-white'/>
                                </div> :
                                    <div onClick={() => refetch()} className='border-2 border-orange-600 px-3 rounded-3xl flex items-center gap-1 '>
                                        <GoPlusCircle />
                                        <p className='font-semibold'>  {credit === 0 ? '0.00' : credit} BDT</p>
                                    </div>
                            }
                        </>
                    }
                </div>
                <div className="navbar-end gap-3 ml-2">
                    {nav}
                </div>
            </div>
        </div >
    );
};

export default Navbar;
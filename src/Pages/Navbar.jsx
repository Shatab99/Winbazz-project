import { useState } from 'react';
import logo from '../assets/Logo/logo.png'
import UserLogModal from './LogInRegistration/UserLogModal';

const Navbar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [showReg, setShowReg] = useState(false)

    const nav = <>
        <li><button onClick={() => setIsOpen(true)} className='font-bold' >Log In</button></li>
        <li><button onClick={() => {
            setIsOpen(true);
            setShowReg(true);
        }} className='font-bold'>Registration</button></li>
    </>

    return (
        <div>
            <UserLogModal isOpen={isOpen} setIsOpen={setIsOpen} showReg={showReg} setShowReg={setShowReg} />
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="lg:flex-1 px-2 mx-2"><img src={logo} alt="Error" className='w-28 ' /></div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {nav}
                            </ul>
                        </div>
                    </div>
                    {children}
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {nav}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
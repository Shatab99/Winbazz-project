import { useState } from 'react';
import logo from '../assets/Logo/logo.png'
import UserLogModal from './LogInRegistration/UserLogModal';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [showReg, setShowReg] = useState(false)

    const nav = <>
        <button onClick={() => setIsOpen(true)} className='font-bold hidden lg:block' >Log In</button>
        <button onClick={() => {
            setIsOpen(true);
            setShowReg(true);
        }} className='font-bold btn btn-sm bg-[#F27125] text-white hover:bg-orange-600'>Registration</button>
    </>

    return (
        <div>
            <UserLogModal isOpen={isOpen} setIsOpen={setIsOpen} showReg={showReg} setShowReg={setShowReg} />
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <img src={logo} alt="" className='w-36' />
                </div>
                <div className="navbar-end gap-3">
                    {nav}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
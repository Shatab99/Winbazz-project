import logo from '../../assets/Logo/logo.png'
import { BsBank } from "react-icons/bs";
import { TbRating18Plus } from "react-icons/tb";
import { FaFacebookF,FaTelegram,FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className=" p-10 bg-base-300 text-base-content">
            <div className='footer mb-7'>
                <nav className='flex flex-col items-center'>
                    <h6 className="footer-title">Payment Methods</h6>
                    <BsBank className='text-7xl text-yellow-600' />
                </nav>
                <nav className='flex flex-col items-center'>
                    <h6 className="footer-title">Community Website</h6>
                    <TbRating18Plus className='text-7xl text-yellow-600' />
                </nav>
                <nav>
                    <h6 className="footer-title">Find Us</h6>
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebookF className='text-4xl text-yellow-600'/>
                        <FaTelegram className='text-4xl text-yellow-600'/>
                        <FaInstagram className='text-4xl text-yellow-600'/>
                        <RiYoutubeLine className='text-4xl text-yellow-600'/>
                    </div>
                </nav>
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-5'>
                <img src={logo} alt="" className='w-36' />
                <p>Copyright © 2024 <span className='text-yellow-600 font-semibold'>winbaz88</span> All right reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
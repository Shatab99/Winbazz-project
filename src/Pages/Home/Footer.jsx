import logo from '../../assets/Logo/logo.png'
import { BsBank } from "react-icons/bs";
import { TbRating18Plus } from "react-icons/tb";
import { FaFacebookF, FaTelegram, FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className=" py-10 px-0 bg-base-300 text-base-content mb-20 lg:mb-0">
            <div className='flex flex-col items-center mb-7 gap-4'>

                <div className='flex justify-between items-start w-full text-gray-600'>
                    <nav className='flex flex-col items-center w-full'>
                        <h6 className="text-lg font-semibold mb-2">Payment Methods</h6>
                        <BsBank className='text-5xl text-yellow-600' />
                    </nav>
                    <nav className='flex flex-col items-center w-full'>
                        <h6 className="text-lg w-full font-semibold mb-2">Community Website</h6>
                        <TbRating18Plus className='text-5xl text-yellow-600' />
                    </nav>
                </div>

                <nav>
                    <h6 className="footer-title text-center">Find Us</h6>
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebookF className='text-4xl text-yellow-600' />
                        <FaTelegram className='text-4xl text-yellow-600' />
                        <FaInstagram className='text-4xl text-yellow-600' />
                        <RiYoutubeLine className='text-4xl text-yellow-600' />
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
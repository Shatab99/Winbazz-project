import { GiWallet } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ImUsers } from "react-icons/im";

const BottomNav = () => {

    const { user } = useContext(AuthContext)

    return (

        <>
            {
                user ? <div className="w-full lg:hidden">
                    <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white text-black shadow px-2">
                        <div  className="flex justify-center">
                            <Link to={'/refer'} className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <ImUsers className="text-2xl" />
                                <span className="tab tab-home block text-xs text-black font-bold">Refer</span>
                            </Link>
                            <Link to={'/deposite'} className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <GiWallet className="text-2xl" />
                                <span className="tab tab-kategori block text-xs text-black font-bold">Deposit</span>
                            </Link>
                            <Link to={'/'} className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <IoHome className="text-2xl" />
                                <span className="tab tab-explore block text-xs text-black font-bold">Home</span>
                            </Link>
                            <Link to={'/withdraw'} className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <BiMoneyWithdraw className="text-2xl" />
                                <span className="tab tab-explore block text-xs text-black font-bold">Withdraw</span>
                            </Link>
                            <Link to={'/profile/home'} className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <FaUser className="text-2xl" />
                                <span className="tab tab-explore block text-xs text-black font-bold">Profile</span>
                            </Link>

                        </div>
                    </section>
                </div>:
                <div className="w-full lg:hidden fixed bottom-0 p-4 bg-orange-50">
                    <p className="text-center font-semibold animate-pulse text-black">Please log In or Register </p>
                </div>
            }
        </>

    );
};

export default BottomNav;
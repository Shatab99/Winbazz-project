import { FaRegMessage } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const BottomNav = () => {

    const { user } = useContext(AuthContext)

    return (

        <>
            {
                user ? <div className="w-full lg:hidden">
                    <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-orange-50 shadow px-2">
                        <div id="tabs" className="flex justify-center">
                            <Link href="#" className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <FaRegMessage className="text-3xl" />
                                <span className="tab tab-home block text-xs">Messages</span>
                            </Link>
                            <Link href="#" className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <GiWallet className="text-3xl" />
                                <span className="tab tab-kategori block text-xs">Deposite</span>
                            </Link>
                            <Link href="#" className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <IoHome className="text-3xl" />
                                <span className="tab tab-explore block text-xs">Home</span>
                            </Link>
                            <Link href="#" className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <BiMoneyWithdraw className="text-3xl" />
                                <span className="tab tab-explore block text-xs">Withdraw</span>
                            </Link>
                            <Link href="#" className="w-full focus:text-orange-500 hover:text-orange-500 flex items-center flex-col text-center pt-2 pb-1">
                                <FaUser className="text-3xl" />
                                <span className="tab tab-explore block text-xs">Profile</span>
                            </Link>

                        </div>
                    </section>
                </div>:
                <div className="w-full lg:hidden fixed bottom-0 p-4 bg-orange-50">
                    <p className="text-center font-semibold animate-pulse">Please log In or Register </p>
                </div>
            }
        </>

    );
};

export default BottomNav;
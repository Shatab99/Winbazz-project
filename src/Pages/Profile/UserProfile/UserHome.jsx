import { useContext } from "react";
import { useGetUserByEmailQuery } from "../../../Redux/features/EndPoints/userApi";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const UserHome = () => {

    const { user , logOut } = useContext(AuthContext)
    const email = user?.email

    const handleLogOut = ()=>{
        logOut()
        .then(res=>{
            console.log(res.user)
            toast.success("Successfully Logged Out !!")
        })
        .catch(err=> console.log(err.message))
    }

    const { data: currentUser, isLoading } = useGetUserByEmailQuery(email)

    return (
        <div className="flex flex-col items-center justify-center my-12 gap-5">
            {
                isLoading ? <p className="flex flex-col items-center justify-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></p> :
                    <>
                        <div className="space-y-1">
                            <FaRegCircleUser className="mx-auto text-7xl" />
                            <p className="text-lg font-semibold ">Name : {currentUser.name}</p>
                            <p className="text-lg font-semibold ">Email : {currentUser.email}</p>
                            <div className="flex justify-center">
                                <button onClick={handleLogOut} className="btn btn-wide btn-sm bg-red-700 text-white hover:bg-red-900">Log Out</button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 ">
                            <Link to='/profile/history' className="border-2 p-5 rounded-xl border-orange-600">
                                <FaHistory className="text-5xl"/>
                                <p>History</p>
                            </Link>
                            <Link to={'/profile/pending'} className="border-2 p-5 rounded-xl border-orange-600">
                            <MdPendingActions className="text-5xl"/>
                                Pending
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
};

export default UserHome;
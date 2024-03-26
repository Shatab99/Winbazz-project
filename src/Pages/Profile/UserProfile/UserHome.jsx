import { useContext } from "react";
import { useGetAdminPhoneQuery, useGetUserByEmailQuery, useUpadteAdminPhoneMutation} from "../../../Redux/features/EndPoints/userApi";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading";


const UserHome = () => {

    const { user, logOut } = useContext(AuthContext)
    const email = user?.email

    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res.user)
                toast.success("Successfully Logged Out !!")
            })
            .catch(err => console.log(err.message))
    }

    const { data: currentUser, isLoading } = useGetUserByEmailQuery(email)
    const id = '6602e8f1c672bbb1984c7384'
    const {data : adminPhones, refetch , isLoading : adminLoading }=useGetAdminPhoneQuery(id)
    const [upadteAdminPhone,]= useUpadteAdminPhoneMutation()
    
    // const [updatePhone,] = useUpdatePhoneMutation()

    const handleUpdateNum = e =>{
        e.preventDefault()
        const phone = e.target.phone.value;
        upadteAdminPhone({phone})
        e.target.reset()
        refetch()
    }


    return (
        <div className="flex flex-col items-center justify-center mt-6 mb-24 gap-5">
            {
                isLoading && adminLoading ? <Loading /> :
                    <>
                        <div className="space-y-1">
                            <FaRegCircleUser className="mx-auto text-7xl" />
                            <p className="text-lg font-semibold ">Name : {currentUser?.name}</p>
                            <p className="text-lg font-semibold ">Email : {currentUser?.email}</p>
                            <div className="flex justify-center">
                                <button onClick={handleLogOut} className="btn btn-wide btn-sm bg-red-700 text-white hover:bg-red-900">Log Out</button>
                            </div>
                        </div>
                        {
                            currentUser.role === 'admin' ?
                                <div className="flex flex-col items-center">
                                    <form onSubmit={handleUpdateNum} className="flex flex-col items-center gap-3  font-bold">
                                        <h1>Update Your Send Money Number <br />(Include Rocket Extra Digit) </h1>
                                        <input name="phone" type="number" placeholder={adminPhones?.phone} className="input input-bordered w-full max-w-xs font-bold text-white" />
                                        <button className="btn btn-sm btn-wide bg-orange-700">Change Number</button>
                                    </form>
                                </div>
                                :
                                <>
                                    <div className="flex items-center justify-center gap-4 ">
                                        <Link to='/profile/history' className="border-2 p-5 rounded-xl border-orange-600">
                                            <FaHistory className="text-5xl" />
                                            <p>History</p>
                                        </Link>
                                        <Link to={'/profile/pending'} className="border-2 p-5 rounded-xl border-orange-600">
                                            <MdPendingActions className="text-5xl" />
                                            Pending
                                        </Link>
                                    </div>
                                </>
                        }
                    </>
            }
        </div>
    );
};

export default UserHome;
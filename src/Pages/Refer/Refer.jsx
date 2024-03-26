import { useContext, useState } from "react";
import { useGetReferUsersQuery, useGetUserByEmailQuery } from "../../Redux/features/EndPoints/userApi";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";
import ReferModal from "./ReferModal";
import ReferUsersModal from "./ReferUsersModal";
import Loading from "../../Components/Loading";


const Refer = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading } = useGetUserByEmailQuery(email)
    const [copy, setCopy] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenRu, setIsOpenRu] = useState(false)
    const referCode = currentUser?._id.slice(0, 7)
    const { data: referedUsers } = useGetReferUsersQuery(referCode)
    console.log(referedUsers)

    const handleCopy = () => {
        navigator.clipboard.writeText(copy)
            .then(() => {
                toast.success('Copied to clipboard !!')
            })
            .catch(err => {
                console.error('Error copying text:', err);
                // Handle error, optionally provide feedback to the user
            });
    }

    return (
        <div className="mb-28">
            <h1 className="text-lg w-full text-center bg-white p-2 font-bold text-black">Refer To Earn</h1>
            {
                isLoading ? <Loading /> :
                    <>
                        <div className="max-w-xs mx-auto flex flex-col items-center font-bold text-2xl mt-4 gap-3">
                            <div>Your Refered Code </div>
                            <div onClick={() => {
                                setCopy(referCode)
                                handleCopy()
                            }} className="btn btn-lg btn-outline rounded-full  text-5xl">{referCode}</div>
                            <p>Tap to copy refer code </p>
                            <button onClick={() => setIsOpen(true)} className="btn bg-blue-800 btn-wide text-lg">Share <FaShare /></button>
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-3">
                            <h1 className="text-xl font-bold">Your Refer Count </h1>
                            <div className="text-6xl font-extrabold border-2 p-2 rounded-full w-20 h-20 flex justify-center">
                                <p>{referedUsers?.length}</p>
                            </div>
                            <button onClick={() => setIsOpenRu(true)} className="font-bold btn btn-wide bg-orange-600">See All Refered Users</button>
                        </div>
                    </>
            }
            <ReferModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <ReferUsersModal referedUsers={referedUsers} isOpen={isOpenRu} setIsOpen={setIsOpenRu} />
        </div>
    );
};

export default Refer;
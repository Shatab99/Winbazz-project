import { useContext, useState } from "react";
import { useGetUserByEmailQuery } from "../../Redux/features/EndPoints/userApi";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";
import ReferModal from "./ReferModal";


const Refer = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser } = useGetUserByEmailQuery(email)
    const [copy, setCopy] = useState('')
    const [isOpen, setIsOpen]= useState(false)
    const referCode = currentUser?._id.slice(0, 7)
    console.log(copy)


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
        <div>
            <h1 className="text-lg w-full text-center bg-white p-2 font-bold text-black">Refer To Earn</h1>
            <div className="max-w-xs mx-auto flex flex-col items-center font-bold text-2xl mt-4 gap-3">
                <div>Your Refered Code </div>
                <div onClick={() => {
                    setCopy(referCode)
                    handleCopy()
                }} className="btn btn-lg btn-outline rounded-full  text-5xl">{referCode}</div>
                <p>Tap to copy refer code </p>
                <button onClick={()=>setIsOpen(true)} className="btn bg-blue-800 btn-wide text-lg">Share <FaShare/></button>
            </div>
            <ReferModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Refer;
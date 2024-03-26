import { useState } from "react";
import Modal from "../../Components/Modal";
// import { FaRegMessage } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useGetReferUsersQuery, useUpdateCredMutation, useWithdrawCredMutation } from "../../Redux/features/EndPoints/userApi";



const ShowUserModal = ({ isOpen, setIsOpen, user, refetch }) => {

    const [amount, setAmount] = useState(null)
    const { email, name, credit, role, _id } = user
    const refer = _id?.slice(0,7)

    const [updateCred,] = useUpdateCredMutation()
    const [withdrawCred,] = useWithdrawCredMutation()
    const {data : referedUsers }= useGetReferUsersQuery(refer)

    const handleMinus = () => {
        withdrawCred({ email, credit: { amount } })
        refetch()
        setIsOpen(false)
        setAmount(0)
    }
    const handlePlus = () => {
        updateCred({ email, credit: { amount } })
        refetch()
        setIsOpen(false)
        setAmount(0)
    }


    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-center mb-4 font-bold text-xl">{`${name}'s`} Details </h1>
            <div className="flex flex-col items-start gap-3">
                <p>{role === 'admin' ? 'Admin' : 'User'} Name : {name}</p>
                <p>Email : {email}</p>
                <p>Balance : {credit} BDT</p>
                <p>Refered Code : {refer}</p>
                <p>Refer Count : {referedUsers?.length}</p>
                <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount Here" className="input input-bordered w-full max-w-xs" />
                <div className="flex items-center gap-3 mx-auto">
                    <button disabled={!amount} onClick={handleMinus} className="btn btn-circle  bg-orange-700 text-white hover:bg-orange-900 "> <FaMinus /></button>
                    <button disabled={!amount}  onClick={handlePlus} className="btn btn-circle   bg-green-700 text-white hover:bg-orange-900 "> <FaPlus /></button>
                </div>
                {/* <button disabled={user.role === 'admin'} className="btn btn-sm btn-wide text-white bg-blue-600 hover:bg-blue-800 "><FaRegMessage className="text-lg" /> Send Message to {user.name}</button> */}
            </div>
        </Modal>
    );
};

export default ShowUserModal;
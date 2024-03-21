import { useNavigate, useParams } from "react-router-dom";
import bkash from "../../assets/Icons/BKash-Icon-Logo.wine.svg"
import nagad from "../../assets/Icons/Nagad-Logo.wine.png"
import rocket from "../../assets/Icons/rocket-logo.png"
import upay from "../../assets/Icons/upay-icon.png"
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import { useSubmitDepositMutation } from "../../Redux/features/EndPoints/depositApi";



const DepositConfirm = () => {
    const {user}= useContext(AuthContext)
    const { amount, method } = useParams(null)
    const [phone, setPhone]= useState(null)
    const [transactionId, setTransactionId]= useState()
    const navigate = useNavigate()
    const [submitDeposit,{data, error}]=useSubmitDepositMutation()

    console.log(data)
    console.log(error)

    const handleSubmit = ()=>{
        const name = user?.displayName
        const email = user?.email
        submitDeposit({
            name , email , amount , method ,phone ,transactionId
        })
        navigate('/')
        toast.success("Requested !! Wait For Moment To Confirm ",{duration : 6000})
    }

    return (
        <div className="">
            <p className="text-lg w-full text-center bg-black p-2 font-semibold text-orange-300">Complete Your Deposit</p>
            <p className="text-lg w-full text-center bg-yellow-300 p-2 font-semibold text-black">Send Money to {method}</p>
            <div className="mt-6 mb-12 max-w-sm mx-auto flex flex-col items-center gap-3 px-4">
                {method === 'Bkash' && <img src={bkash} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                {method === 'Nagad' && <img src={nagad} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                {method === 'Rocket' && <img src={rocket} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                {method === 'Upay' && <img src={upay} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                <p className="text-center font-semibold">Please make your transfer to the current {method} number shown below. Ensure you have entered the correct transaction ID.</p>
                <div className="flex flex-col items-start gap-3 font-semibold">
                    <div>Amount : {amount} BDT</div>
                    <div>{method}  : <span className="bg-yellow-200 py-2 px-2 rounded-lg text-black">{method === "Rocket" ? '017193663774' : '01719366377'}</span></div>
                    <div className="flex items-center gap-2">
                        <p>Send-Money From : </p>
                        <input onChange={(e)=>setPhone(e.target.value)} type="number" placeholder="Phone Number" className="input input-bordered input-sm  max-w-xs" />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Transaction-Id : </p>
                        <input onChange={(e)=>setTransactionId(e.target.value)} type="text" placeholder="Transaction ID here " className="input input-bordered input-sm  max-w-xs" />
                    </div>
                </div>
                <button disabled={!phone || !transactionId } onClick={handleSubmit} className="mt-4 btn btn-sm btn-wide bg-blue-800 hover:bg-blue-950 text-white">Submit</button>
                <button onClick={()=>navigate('/')} className="btn btn-sm btn-wide bg-red-800 hover:bg-red-950 text-white">Cancel</button>
            </div>
        </div>
    );
};

export default DepositConfirm;
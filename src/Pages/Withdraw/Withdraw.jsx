import { useContext, useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import bikash from '../../assets/Icons/BKash-Icon-Logo.wine.svg'
import nagad from '../../assets/Icons/Nagad-Logo.wine.png'
import upay from '../../assets/Icons/upay-icon.png'
import rocket from '../../assets/Icons/rocket-logo.png'
import WithdrawModal from "./WithdrawModal";
import { AuthContext } from "../../Providers/AuthProvider";
import { useGetUserByEmailQuery } from "../../Redux/features/EndPoints/userApi";


const Withdraw = () => {
    const [amount, setAmount] = useState(0)
    const [method, setMethod] = useState(null)
    const [phone, setPhone] = useState(null)
    const [err, setErr] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useContext(AuthContext)
    const email = user?.email;
    const name = user?.displayName
    const {data: currentUser, isLoading, refetch} = useGetUserByEmailQuery(email)


    const balance = currentUser?.credit;

    useEffect(() => {
        if (amount === 0) {
            setErr('')
        }
        else if (amount < 800) {
            setErr('Minimum 800 BDT')
        }
        else if (amount > balance) {
            setErr('Not Enough Balance')
        }

        else {
            setErr('')
        }
    }, [setErr, amount, balance])




    return (
        <div className="mx-auto mb-24">
            <h1 className="text-lg w-full text-center bg-white p-2 font-bold text-black">Make Your Withdraw Here</h1>
            <div onClick={()=> refetch()} className="max-w-xs mx-auto bg-white px-6 py-4 my-6 rounded-xl flex flex-col items-center gap-1">
                {
                    isLoading ? <p className="flex flex-col items-center justify-center text-black "><span className="loading loading-spinner loading-lg"></span></p> : <>
                        <p className="text-black font-bold text-xl flex items-center gap-2">
                            <span>Balance</span> <IoReload />
                        </p>
                        <p className="text-orange-600 font-bold">
                            ৳ {balance} BDT
                        </p>
                    </>
                }
            </div>
            <div className="flex flex-col items-start max-w-xs justify-center mx-auto gap-5">
                <p>Select Amount <span className="text-red-600">*</span></p>
                <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Minimum 800 BDT - Maximum 30000 BDT " className="input input-bordered w-full max-w-xs text-sm font-bold" />
                <p className="text-red-700">{err}</p>
                <p>Select Payment Methods <span className="text-red-600">*</span></p>
                <div className='flex flex-wrap items-center justify-start mt-4 gap-2'>
                    <img onClick={() => setMethod('Bkash')} src={bikash} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Bkash' && 'border-orange-400'} rounded-xl`} />
                    <img onClick={() => setMethod('Nagad')} src={nagad} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Nagad' && 'border-orange-400'} rounded-xl`} />
                    <img onClick={() => setMethod('Upay')} src={upay} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Upay' && 'border-orange-400'} rounded-xl`} />
                    <img onClick={() => setMethod('Rocket')} src={rocket} alt="" className={`w-24 h-20 border-2 rounded-2xl ${method === 'Rocket' && 'border-orange-400'} rounded-xl`} />
                </div>
                <div className="w-full mb-3">
                    <p className="mb-4">Enter Phone Number <span className="text-red-600">*</span></p>
                    <input onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Enter your phone Number " className="input input-bordered w-full max-w-sm " />
                </div>
                <button onClick={() => setIsOpen(true)} disabled={!amount || amount < 800 || amount > balance || !method || phone?.length !== 11 | !phone} className="btn bg-blue-700 text-white w-full ">Withdraw</button>
            </div>
            <WithdrawModal isOpen={isOpen} setIsOpen={setIsOpen} method={method} email ={email} amount={amount} phone={phone} name={name} />
        </div>
    );
};

export default Withdraw;
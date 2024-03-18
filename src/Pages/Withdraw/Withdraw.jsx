import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";


const Withdraw = () => {

    const balance = 980;
    const [amount, setAmount] = useState(0)
    const [err, setErr] = useState('')

    useEffect(() => {
        if (amount === 0) {
            setErr('')
        }
        else if (amount < 500) {
            setErr('Minimum 500 BDT')
        }
        else if (amount > balance) {
            setErr('Not Enought Balance')
        }

        else {
            setErr('')
        }
    }, [setErr, amount, balance])


    return (
        <div className="mx-auto mb-24">
            <h1 className="text-lg w-full text-center bg-black p-2 font-semibold text-orange-300">Make Your Withdraw Here</h1>
            <div className="max-w-xs mx-auto bg-[#333333] px-6 py-4 my-6 rounded-xl flex flex-col items-center gap-3">
                <p className="text-white text-xl flex items-center gap-5">
                    <span>Balance</span> <IoReload />
                </p>
                <p className="text-orange-300">
                    ৳ {balance} BDT
                </p>
            </div>
            <div className="flex flex-col items-start max-w-xs justify-center mx-auto gap-5">
                <p>Select Amount <span className="text-red-600">*</span></p>
                <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Minimum 500 BDT - Maximum 30000 BDT " className="input input-bordered w-full max-w-xs" />
                <p className="text-red-700">{err}</p>
                <p>Select Payment Method <span className="text-red-600">*</span></p>
                <select className="select select-bordered w-full max-w-xs">
                    <option>Bkash</option>
                    <option>Nagad</option>
                    <option>Upay</option>
                    <option>Rocket</option>
                </select>
                <button disabled={!amount || amount < 500 || amount > balance} className="btn bg-blue-700 text-white w-full ">Withdraw</button>
            </div>
        </div>
    );
};

export default Withdraw;
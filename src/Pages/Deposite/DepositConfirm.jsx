import { useNavigate, useParams } from "react-router-dom";
import bkash from "../../assets/Icons/BKash-Icon-Logo.wine.svg"
import nagad from "../../assets/Icons/Nagad-Logo.wine.png"
import rocket from "../../assets/Icons/rocket-logo.png"
import upay from "../../assets/Icons/upay-icon.png"


const DepositConfirm = () => {
    const { amount, method } = useParams()
    const navigate = useNavigate()

    console.log(amount, method)

    return (
        <div className="">
            <p className="text-lg w-full text-center bg-black p-2 font-semibold text-orange-300">Complete Your Deposit</p>
            <div className="my-12 max-w-sm mx-auto flex flex-col items-center gap-3 px-4">
                {method === 'Bkash' && <img src={bkash} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                {method === 'Nagad' && <img src={nagad} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                {method === 'Rocket' && <img src={rocket} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                {method === 'Upay' && <img src={upay} alt="" className="w-36 h-36 rounded-full border-2 border-orange-600" />}
                <p className="text-center font-semibold">Please make your transfer to the current {method} number shown below. Ensure you have entered the correct transaction ID.</p>
                <div className="flex flex-col items-start gap-3 font-semibold">
                    <div>Amount : {amount} BDT</div>
                    <div>{method} Agent : 01719366377</div>
                    <div className="flex items-center gap-2">
                        <p>Send-Money From : </p>
                        <input type="number" placeholder="Phone Number" className="input input-bordered input-sm  max-w-xs" />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Transaction-Id : </p>
                        <input type="text" placeholder="Transaction ID here " className="input input-bordered input-sm  max-w-xs" />
                    </div>
                </div>
                <button  className="mt-4 btn btn-sm btn-wide bg-blue-800 hover:bg-blue-950 text-white">Submit</button>
                <button onClick={()=>navigate('/')} className="btn btn-sm btn-wide bg-red-800 hover:bg-red-950 text-white">Cancel</button>
            </div>
        </div>
    );
};

export default DepositConfirm;
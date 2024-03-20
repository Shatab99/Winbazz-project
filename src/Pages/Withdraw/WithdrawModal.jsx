import Modal from "../../Components/Modal";
import bikash from '../../assets/Icons/BKash-Icon-Logo.wine.svg'
import nagad from '../../assets/Icons/Nagad-Logo.wine.png'
import upay from '../../assets/Icons/upay-icon.png'
import rocket from '../../assets/Icons/rocket-logo.png'
import { useSubmitDepositMutation } from "../../Redux/features/EndPoints/depositApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WithdrawModal = ({ isOpen, setIsOpen, email, amount, method, phone, name }) => {

    const [submitDeposit,] = useSubmitDepositMutation()
    const navigate = useNavigate()

    const handleSubmit = () => {
        submitDeposit({ email, amount, method, phone, name, category: "Withdraw" })
        navigate('/')
        toast.success("Your Withdraw Requested ! Please wait for a moment . ", { duration: 6000 })
    }


    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
                <div className="p-3 flex flex-col items-center gap-4 w-full">
                    {method === 'Bkash' && <img src={bikash} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                    {method === 'Nagad' && <img src={nagad} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                    {method === 'Upay' && <img src={upay} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                    {method === 'Rocket' && <img src={rocket} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                    <div className="flex flex-col items-start text-lg gap-2">
                        <p>Payment Method : {method} </p>
                        <p>Payment Amount : ৳ {amount} BDT </p>
                        <p>Please Be sure you want to withdraw in <span className="font-semibold">{phone}</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => {
                            setIsOpen(false)
                            handleSubmit()
                        }} className="btn btn-sm bg-green-700 text-white hover:bg-green-800">Yes, I am Sure</button>
                        <button onClick={() => setIsOpen(false)} className="btn btn-sm bg-red-700 text-white hover:bg-red-800">Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default WithdrawModal;
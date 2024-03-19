import Modal from "../../Components/Modal";
import bikash from '../../assets/Icons/BKash-Icon-Logo.wine.svg'
import nagad from '../../assets/Icons/Nagad-Logo.wine.png'
import upay from '../../assets/Icons/upay-icon.png'
import rocket from '../../assets/Icons/rocket-logo.png'
import { useDeleteDepositMutation } from "../../Redux/features/EndPoints/depositApi";
import { useUpdateCredMutation } from "../../Redux/features/EndPoints/userApi";
import toast from "react-hot-toast";


const DepositReqModal = ({ isOpen, setIsOpen, deposit }) => {

    const { method, amount, transactionId, phone, _id, email } = deposit
    const [deleteDeposit,] = useDeleteDepositMutation()
    const [updateCred] = useUpdateCredMutation()

    const hadleUpdate = () => {
        updateCred({ email, credit: {amount} })
        deleteDeposit(_id)
        toast.success("Successfully Deposited to User !!")
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="p-3 flex flex-col items-center gap-4 w-full">
                {method === 'Bkash' && <img src={bikash} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                {method === 'Nagad' && <img src={nagad} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                {method === 'Upay' && <img src={upay} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                {method === 'Rocket' && <img src={rocket} alt="" className="rounded-full border-orange-400 border-2 w-24 h-24" />}
                <div className="flex flex-col items-start text-lg gap-2 font-semibold">
                    <p>Phone Number : {phone} </p>
                    <p>Payment Amount : ৳ {amount} BDT </p>
                    <p>Transaction Id : {transactionId} </p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsOpen(false)} className="btn btn-sm bg-red-700 text-white hover:bg-red-800">Cancel</button>
                    <button onClick={() => {
                        hadleUpdate();
                        setIsOpen(false);
                    }} className="btn btn-sm bg-blue-600 text-white hover:bg-blue-800">Confirm</button>
                </div>
            </div>
        </Modal>
    );
};

export default DepositReqModal;
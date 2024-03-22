import Modal from "../../../Components/Modal";
import winnerGif from '../../../assets/Icons/Game Icons/winnerGif.gif'
import loseGif from '../../../assets/Icons/Game Icons/loseGif.gif'
import { useUpdateCredMutation } from "../../../Redux/features/EndPoints/userApi";


const WinModal = ({ isOpen, setIsOpen, isWin, email, bet, refetch }) => {

    const amount = 2 * parseInt(bet)
    const [updateCred,] = useUpdateCredMutation()

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            {
                isWin ? <div className="flex flex-col items-center gap-4">
                    <img src={winnerGif} alt="" />
                    <p className="text-center font-bold text-lg">Congrs !! You have winned {amount} BDT </p>
                    <button onClick={() => {
                        updateCred({ email, credit: { amount } });
                        refetch();
                        setIsOpen(false)
                    }} className="btn btn-sm btn-wide bg-green-800 text-white">Claim Reward</button>
                </div> : <div className="flex flex-col items-center gap-2">
                    <img src={loseGif} alt="" />
                    <p className="text-center font-bold text-lg">Sorry !! Better luck next time </p>
                    <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-wide bg-green-800 text-white">Spin Again</button>
                </div>
            }
        </Modal >
    );
};

export default WinModal;
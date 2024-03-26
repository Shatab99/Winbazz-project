import Modal from "../../../Components/Modal";
import WinGif from "../../../assets/Icons/Ludo/winGIFLudo.gif"
import LoseGif from "../../../assets/Icons/Ludo/loseGIfLudo.gif"


const LudoResult = ({ isOpen, setIsOpen, isWin, bet }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            {
                isWin ? <div className="flex flex-col items-center gap-3 font-bold">
                    <img src={WinGif} alt="" />
                    <p>Congrss ! You win {2 * bet} BDT </p>
                    <button onClick={()=> setIsOpen(false)} className="btn btn-sm btn-wide bg-green-700">Play Again</button>
                </div> :
                    <div className="flex flex-col items-center gap-3 font-bold">
                        <img src={LoseGif} alt="" />
                        <p>Sorry ! You Lose {bet} BDT </p>
                        <button onClick={()=> setIsOpen(false)} className="btn btn-sm btn-wide bg-green-700">Play Again</button>
                    </div>
            }
        </Modal>
    );
};

export default LudoResult;
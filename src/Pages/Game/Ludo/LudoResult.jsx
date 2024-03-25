import Modal from "../../../Components/Modal";
import WinGif from "../../../assets/Icons/Ludo/winGIFLudo.gif"
import LoseGif from "../../../assets/Icons/Ludo/loseGIfLudo.gif"


const LudoResult = ({ isOpen, setIsOpen, isWin, bet }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            {
                isWin ? <div className="flex flex-col items-center">
                    <img src={WinGif} alt="" />
                    <p>Congrss ! You win {2 * bet} BDT </p>
                </div> :
                    <div className="flex flex-col items-center">
                        <img src={LoseGif} alt="" />
                        <p>Sorry ! You Lose {bet} BDT </p>
                    </div>
            }
        </Modal>
    );
};

export default LudoResult;
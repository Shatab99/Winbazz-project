import Modal from "../../../Components/Modal";
import winGif from "../../../assets/Icons/GameIcons/winnerGif2.gif"
import loseGif from "../../../assets/Icons/GameIcons/loseGif.gif"


const WinModalCoin = ({ isOpen, setIsOpen, isWin, betAmount }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <div>
                {
                    isWin ?
                        <div className="flex flex-col items-center gap-3">
                            <img src={winGif} alt="" />
                            <p className="font-bold">Congrss !! You Win {betAmount * 2} BDT ...</p>
                            <button onClick={()=> setIsOpen(false)} className="btn btn-sm btn-wide bg-green-700">Play Again</button>
                        </div>
                        :
                        <div className="flex flex-col items-center gap-3">
                            <img src={loseGif} alt="" />
                            <p className="font-bold">Sorry !! You lose {betAmount} BDT ...</p>
                            <button onClick={()=> setIsOpen(false)}  className="btn btn-sm btn-wide bg-green-700">Play Again</button>
                        </div>
                }
            </div>
        </Modal>
    );
};

export default WinModalCoin;
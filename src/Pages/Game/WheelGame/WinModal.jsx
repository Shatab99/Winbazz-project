import { useEffect, useState } from "react";
import Modal from "../../../Components/Modal";
import winnerGif from '../../../assets/Icons/GameIcons/winnerGif.gif'
// import loseGif from '../../../assets/Icons/Game Icons/loseGif.gif'



const WinModal = ({ isOpen, setIsOpen, result, selectedNumbers, refetch, betAmount }) => {

    const [winMoney, setWinMoney] = useState()

    useEffect(() => {
        if (selectedNumbers.includes(result)) {
            if (result >= 3) {
                setWinMoney(10 * betAmount)
            }
            else {
                setWinMoney(2 * betAmount)
            }
        }
    }, [selectedNumbers, winMoney, betAmount, result])



    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <div className="flex flex-col items-center gap-4">
                <img src={winnerGif} alt="" />
                <p className="text-center font-bold text-lg"> {selectedNumbers?.includes(result) && 'Congras !! '}The Lucky Number is {result} and  {selectedNumbers?.includes(result) ? `you won ${winMoney} BDT ` : 'you lose '} !! </p>
                <button onClick={() => {
                    refetch()
                    setIsOpen(false)
                }} className="btn btn-sm btn-wide bg-green-800 text-white">Play Again</button>
            </div>
        </Modal >
    );
};

export default WinModal;
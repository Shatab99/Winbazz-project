import { useState } from "react";


const AviatorResult = ({ setIsResult, setGameData, updateByAviator, gameData, email, rbAmount, lbAmount, cashOutLb, cashOutRb, setLBet,setRBet, setDisAblePlay }) => {

    const Amount = (lbAmount*cashOutLb) +(cashOutRb * rbAmount)

    const [playAgain, setPlayAgain] = useState(false)

    return (
        <div className="flex flex-col items-center">
            {
                playAgain ? <>
                    <div className="flex flex-col gap-3 font-bold items-center">
                        <h1>You have won {Amount} BDT from this bet !!</h1>
                        <button className="btn bg-green-800 btn-sm btn-wide" onClick={() => {
                            setGameData({ email, rbAmount, lbAmount, cashOutLb, cashOutRb });
                            setLBet('Select')
                            setRBet('Select')
                            updateByAviator(gameData)
                            setDisAblePlay(false)
                            setIsResult(false)
                        }}>Play again</button>
                    </div>
                </> :
                    <>
                        <div className="flex flex-col items-center gap-6">
                            <h1 className="text-xl font-bold">Tap the See Result to know more !! </h1>
                            <button className="btn bg-blue-800 btn-sm btn-wide" onClick={() => {
                                setGameData({ email, rbAmount, lbAmount, cashOutLb, cashOutRb });
                                setPlayAgain(true);
                            }}>see result</button>
                        </div>
                    </>
            }

        </div>
    );
};

export default AviatorResult;
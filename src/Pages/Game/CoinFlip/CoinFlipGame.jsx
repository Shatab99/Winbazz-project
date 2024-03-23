import { useState } from 'react';
import "./coinStyle.css";
import HeadImg from '../../../assets/Icons/CoinFlip/Head.png';
import TailImg from '../../../assets/Icons/CoinFlip/Tail.png';
import CoinImg from '../../../assets/Icons/CoinFlip/CoinIcon.png';

const CoinFlipGame = () => {
    const [result, setResult] = useState('');
    const [isFlipping, setIsFlipping] = useState(false);

    const flipCoin = () => {
        setIsFlipping(true);

        // Simulate a delay before setting the result
        setTimeout(() => {
            // Generate a random number (0 or 1) to represent heads or tails
            const randomNumber = Math.floor(Math.random() * 2);

            // Set the result based on the random number
            if (randomNumber === 0) {
                setResult('Heads');
            } else {
                setResult('Tails');
            }

            setIsFlipping(false);
        }, 3000); // 2 seconds
    };

    return (
        <div className="p-2 text-center">
            <h1 className="text-2xl font-bold mb-4">Coin Flip Game</h1>
            <div className="flex flex-col justify-center items-center gap-4">
                {result ? (
                    <div className={`w-32 h-32 relative overflow-hidden transform transition-transform ${isFlipping ? 'animate-flip' : ''}`}>
                        <img src={result === 'Heads' ? HeadImg : TailImg} alt="" className="absolute inset-0 opacity-100" />
                    </div>
                ) : (
                    <img src={CoinImg} alt="Initial coin icon" className={`w-32 h-32 ${isFlipping ? 'animate-flip' : ''}`} />
                )}
                <p>{result}</p>
                <button onClick={flipCoin} className="btn btn-wide bg-blue-500 text-white hover:bg-blue-600">Flip Coin</button>
            </div>
        </div>
    );
};

export default CoinFlipGame;

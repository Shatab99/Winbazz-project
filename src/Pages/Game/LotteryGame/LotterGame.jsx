import { useContext, useState } from 'react';
import './lottery.css';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useGetUserByEmailQuery, useUpdateCredMutation, useWithdrawCredMutation } from '../../../Redux/features/EndPoints/userApi';
import { AuthContext } from '../../../Providers/AuthProvider';

function LotteryGame() {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [winningNumbers, setWinningNumbers] = useState([]);
    const [message, setMessage] = useState('');
    const [playAgain, setPlayAgain] = useState(false)
    const [bet, setBet]= useState(null)
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email)
    const cred = currentUser?.credit
    const [updateCred,] = useUpdateCredMutation()
    const [withdrawCred,] = useWithdrawCredMutation()
    
    // Function to generate random winning numbers

    const generateWinningNumbers = () => {
        let numbers = [];
        while (numbers.length < 3) {
            const randomNumber = Math.floor(Math.random() * 10) + 1; // Generating numbers from 1 to 10
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        setWinningNumbers(numbers);
    };


    // Function to handle number selection
    const selectNumber = (number) => {
        if (selectedNumbers.length < 3 && !selectedNumbers.includes(number)) {
            setSelectedNumbers([...selectedNumbers, number]);
        }
        else {
            setSelectedNumbers(selectedNumbers.filter((num) => num !== number))
        }
    };

    // Function to reset the game
    const resetGame = () => {
        // setMessage('');
        setPlayAgain(true)
    };

    // Function to start a new game
    const startNewGame = () => {

        resetGame(); // Reset the game state
    };

    // Function to check for winning numbers
    const checkWinningNumbers = () => {
        generateWinningNumbers(); 
        console.log(winningNumbers)
        if (selectedNumbers.length === 3) {
            const matchedNumbers = selectedNumbers.filter(number =>
                winningNumbers.includes(number)
            );
            console.log(matchedNumbers)
            if (matchedNumbers.length === 3) {
                setMessage('Congratulations! You win!');
                updateCred({email , credit : {amount : 2 * bet}})
                startNewGame()
            } else {
                setMessage('Sorry, you did not win. Try again!');
                withdrawCred({email , credit : {amount : bet}})
                startNewGame()
            }
        }
    };



    return (
        <div className="p-2 text-center">
            <div className='flex items-center justify-between mb-4 '>
                <div className='border-2 border-white font-bold px-4 py-1 rounded-full text-sm '>
                    {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                </div>
                <h1 className="text-xl text-center font-bold">Lottery Game!</h1>
                <Link to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
                    Exit
                </Link>
            </div>
            <div className="flex flex-col justify-center ">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center">
                        {winningNumbers.length !== 0 && <h2 className="font-bold mb-2">Winning Numbers</h2>}
                        <div className="flex space-x-2">
                            {winningNumbers.map((number, index) => (
                                <div
                                    key={index}
                                    className="bg-yellow-400 text-white font-bold p-4 rounded-full"
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                        {message && <p className="mt-4 font-bold text-xl">{message}</p>}
                        {
                            selectedNumbers.length !== 0 && <div className=' flex flex-col items-center gap-2'>
                                <h1>Your Selected Number</h1>
                                <div className='flex items-center gap-2'>
                                    {
                                        selectedNumbers.map(num => <>
                                            <p className='border-2 p-2 rounded-xl'>{num}</p>
                                        </>)
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    {/* betting Part */}
                    <h1>Select Amount to bet</h1>
                    <div className='grid grid-cols-3 gap-3'>
                        <button onClick={() => setBet(20)} className={`btn btn-outline btn-circle  ${bet === 20 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>20</button>
                        <button onClick={() => setBet(30)} className={`btn btn-outline btn-circle  ${bet === 30 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>30</button>
                        <button onClick={() => setBet(50)} className={`btn btn-outline btn-circle  ${bet === 50 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>50</button>
                        <button onClick={() => setBet(100)} className={`btn btn-outline btn-circle  ${bet === 100 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>100</button>
                        <button onClick={() => setBet(200)} className={`btn btn-outline btn-circle  ${bet === 200 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>200</button>
                        <button onClick={() => setBet(500)} className={`btn btn-outline btn-circle  ${bet === 500 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>500</button>
                    </div>
                    <h2 className="font-bold mb-2">Select 3 Lucky Numbers To Win 2x</h2>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                            <div
                                key={number}
                                className={`cursor-pointer  p-4 rounded-full border-2 border-gray-300 ${selectedNumbers.includes(number) ? 'bg-blue-500 text-white' : ''
                                    }`}
                                onClick={() => selectNumber(number)}
                            >
                                {number}
                            </div>
                        ))}
                    </div>
                    {
                        playAgain ? <button
                            className="btn bg-green-500 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setSelectedNumbers([]);
                                refetch()
                                setPlayAgain(false);
                            }}
                        >
                            Play Again
                        </button> : <button disabled={!bet || cred < bet || selectedNumbers.length <3 }
                            className="btn bg-green-500 text-white font-bold py-2 px-4 rounded"
                            onClick={()=>{
                                checkWinningNumbers()
                                refetch()
                            }}
                        >
                            Check Lottery
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default LotteryGame;

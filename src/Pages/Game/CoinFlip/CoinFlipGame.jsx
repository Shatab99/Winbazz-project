import { useContext, useEffect, useState } from 'react';
import "./coinStyle.css";
import HeadImg from '../../../assets/Icons/CoinFlip/Head.png';
import TailImg from '../../../assets/Icons/CoinFlip/Tail.png';
import CoinImg from '../../../assets/Icons/CoinFlip/CoinIcon.png';
import CoinBg from '../../../assets/Icons/CoinFlip/CoinFlipTheme.jpg'
import { AuthContext } from '../../../Providers/AuthProvider';
import { useGetUserByEmailQuery, useUpdateCredMutation, useWithdrawCredMutation } from '../../../Redux/features/EndPoints/userApi';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import LowBalWarning from '../../../Components/LowBalWarning';
import WinModalCoin from './WinModalCoin';

const CoinFlipGame = () => {
    const [result, setResult] = useState('');
    const [isFlipping, setIsFlipping] = useState(false);
    const [bet, setBet] = useState()
    const [back, setBack] = useState(null)
    // const [err, setErr] = useState()
    const [isOpenLb, setIsOpenLb] = useState(false)
    const [isOpen , setIsOpen] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email)
    const [updateCred,] = useUpdateCredMutation()
    const [withdrawCred,] = useWithdrawCredMutation()
    const cred = currentUser?.credit
    const betAmount = parseInt(bet)

    useEffect(() => {
        if (cred < 20) {
            setIsOpenLb(true)
        }
    }, [])

    useEffect(() => {
        if (cred < betAmount) {
            setIsOpenLb(true)
        }
    }, [cred, betAmount])

    const flipCoin = () => {
        setIsFlipping(true);

        // Simulate a delay before setting the result
        setTimeout(() => {
            // Generate a random number (0 or 1) to represent heads or tails
            const randomNumber = Math.floor(Math.random() * 2);
            if (back === randomNumber) {
                updateCred({ email, credit: { amount: 2 * betAmount } })
                setIsOpen(true)
                setIsWin(true)
            }
            else {
                withdrawCred({email, credit : {amount : betAmount}})
                setIsOpen(true)
                setIsWin(false)
            }
            // Set the result based on the random number
            randomNumber === 0 ? setResult('Head !!') : setResult('Tail !!');

            setIsFlipping(false);
        }, 3000);
        setTimeout(() => {
            refetch();
        }, 3100)
    };

    return (
        <div className="p-2 text-center  min-h-screen text-black" style={{ backgroundImage: `url(${CoinBg})` }}>
            <div className='flex items-center justify-between mb-4 '>
                <div className='border-2 border-black font-bold px-4 py-1 rounded-full text-sm '>
                    {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                </div>
                <h1 className="text-xl text-center font-bold">Flip The Coin !</h1>
                <Link to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
                    Exit
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                {result ? (
                    <div className={`w-36 h-36 relative overflow-hidden transform transition-transform ${isFlipping ? 'animate-flip' : ''}`}>
                        <img src={result === 'Head !!' ? HeadImg : TailImg} alt="" className="absolute inset-0 opacity-100" />
                    </div>
                ) : (
                    <img src={CoinImg} alt="Initial coin icon" className={`w-32 h-32 ${isFlipping ? 'animate-flip' : ''}`} />
                )}
                <p className='font-bold text-lg'>{isFlipping ? 'Flipping...' : result}</p>
                <div className='max-w-sm mx-auto'>
                    <h1 className='text-lg font-bold text-center mb-3'>Select Amount To bet</h1>
                    {/* Bet Amount Part */}
                    <div className='grid grid-cols-3 gap-3'>
                        <button onClick={() => setBet(20)} className={`btn btn-outline btn-circle  ${bet === 20 ? 'bg-orange-600 text-white' : 'text-black border-4'} font-semibold`}>20</button>
                        <button onClick={() => setBet(30)} className={`btn btn-outline btn-circle  ${bet === 30 ? 'bg-orange-600 text-white' : 'text-black border-4'} font-semibold`}>30</button>
                        <button onClick={() => setBet(50)} className={`btn btn-outline btn-circle  ${bet === 50 ? 'bg-orange-600 text-white' : 'text-black border-4'} font-semibold`}>50</button>
                        <button onClick={() => setBet(100)} className={`btn btn-outline btn-circle  ${bet === 100 ? 'bg-orange-600 text-white' : 'text-black border-4'} font-semibold`}>100</button>
                        <button onClick={() => setBet(200)} className={`btn btn-outline btn-circle  ${bet === 200 ? 'bg-orange-600 text-white' : 'text-black border-4'} font-semibold`}>200</button>
                        <button onClick={() => setBet(500)} className={`btn btn-outline btn-circle  ${bet === 500 ? 'bg-orange-600 text-white' : 'text-black border-4'} font-semibold`}>500</button>
                    </div>
                </div>
                {/* Head tail Part */}
                <div>
                    <h1 className='text-lg font-bold text-center mb-3'>Choose the Coins Back</h1>
                    <div className='flex items-center gap-3'>
                        <div className=''>
                            <img onClick={() => setBack(0)} src={HeadImg} alt="" className={`w-24 border-8 ${back === 0 && 'border-orange-800'} rounded-full `} />
                            <p className='font-bold'>Head</p>
                        </div>
                        <div>
                            <img onClick={() => setBack(1)} src={TailImg} alt="" className={`w-24 border-8 ${back === 1 && 'border-orange-800'} rounded-full `} />
                            <p className='font-bold'>Tail</p>
                        </div>
                    </div>
                </div>
                <button onClick={flipCoin} className="btn btn-wide bg-blue-500 text-white hover:bg-blue-600" disabled={back === null || !bet || isFlipping || isLoading || cred < betAmount} >Flip Coin</button>
            </div>
            <LowBalWarning isOpenLb={isOpenLb} setIsOpenLb={setIsOpenLb} />
            <WinModalCoin isOpen={isOpen} setIsOpen={setIsOpen} isWin={isWin} betAmount={betAmount} />
        </div>
    );
};

export default CoinFlipGame;

import { useContext, useEffect, useState } from 'react';
import wheelSpin from '../../../assets/Icons/Game Icons/wheelSpin.png'
import WinModal from './WinModal';
import { useGetUserByEmailQuery, useWithdrawCredMutation } from '../../../Redux/features/EndPoints/userApi';
import { AuthContext } from '../../../Providers/AuthProvider';
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom';



const WheelGame = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const [num, setNum] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const [bet, setBet] = useState()
    const [err, setErr] = useState('')
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email)
    const [withdrawCred,] = useWithdrawCredMutation()
    const cred = currentUser?.credit

    
    // console.log(bet)

    useEffect(() => {
        if (bet > cred) {
            setErr('Not Enough Balance !')
        }
        else{
            setErr('')
        }
    }, [bet, cred])

    const startSpin = () => {
        setIsSpinning(true);
        // Simulate spinning logic
        setTimeout(() => {
            const randomResult = Math.floor(Math.random() * 11)
            setResult(randomResult)
            refetch();
            if (num === randomResult) {
                setIsWin(true)
                setIsOpen(true)
            }
            else {
                setIsWin(false)
                setIsOpen(true)
                withdrawCred({ email, credit: { amount: bet } })
            }
            setIsSpinning(false);
        }, 3000); // 3 seconds
    };

    return (
        <div className="max-w-sm mx-auto pt-4 px-1 rounded-lg shadow-lg mb-6">
            <div className='flex items-center justify-between mb-4 '>
                <div className='border-2 font-bold px-4 py-1 rounded-full text-sm '>
                    {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                </div>
                <h1 className="text-xl text-center font-bold">Spin the Wheel !</h1>
                <Link to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
                    Exit
                </Link>
            </div>
            <div className='flex flex-col gap-3'>
                <div className=''>
                    <div className={`relative mx-auto w-72 h-72 border-4 border-gray-300 rounded-full transition-transform duration-300 ${isSpinning ? 'animate-spin' : ''}`}>
                        <img src={wheelSpin} alt="" className='bg-white rounded-full' />
                        <p className={`absolute animate-bounce top-[40%] ${result < 10 ? 'left-[45%]' : 'left-[41%]'} text-5xl font-bold`}>{isSpinning ? '' : result}</p>
                    </div>
                </div>
                {/*Bet Part */}
                <div className='max-w-sm mx-auto'>
                    <h1 className='text-lg font-bold text-center mb-2'>Select Amount To bet</h1>
                    <div className='grid grid-cols-5 gap-3'>
                        <button onClick={() => setBet(10)} className={`btn btn-outline btn-circle  ${bet === 10 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-bold`}>10</button>
                        <button onClick={() => setBet(20)} className={`btn btn-outline btn-circle  ${bet === 20 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>20</button>
                        <button onClick={() => setBet(30)} className={`btn btn-outline btn-circle  ${bet === 30 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>30</button>
                        <button onClick={() => setBet(50)} className={`btn btn-outline btn-circle  ${bet === 50 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>50</button>
                        <button onClick={() => setBet(100)} className={`btn btn-outline btn-circle  ${bet === 100 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>100</button>
                        <button onClick={() => setBet(200)} className={`btn btn-outline btn-circle  ${bet === 200 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>200</button>
                        <button onClick={() => setBet(500)} className={`btn btn-outline btn-circle  ${bet === 500 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>500</button>
                        <button onClick={() => setBet(1000)} className={`btn btn-outline btn-circle  ${bet === 1000 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>1000</button>
                        <button onClick={() => setBet(2000)} className={`btn btn-outline btn-circle  ${bet === 2000 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>2000</button>
                        <button onClick={() => setBet(5000)} className={`btn btn-outline btn-circle  ${bet === 5000 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>5000</button>
                    </div>
                </div>

                <p className='text-red-400 font-bold text-lg text-center'>{err}</p>

                {/* Select Number */}
                <div className='px-4'>
                    <h1 className='text-lg font-bold text-center animate-bounce mb-2'>Select Your Lucky Number</h1>
                    <div className='grid grid-cols-4 gap-2'>
                        <div onClick={() => setNum(0)} className={`btn btn-sm  font-bold ${num === 0 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>0</span> (2x)</div>
                        <div onClick={() => setNum(1)} className={`btn btn-sm  font-bold ${num === 1 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>1</span> (2x)</div>
                        <div onClick={() => setNum(2)} className={`btn btn-sm  font-bold ${num === 2 ? 'bg-black border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'} text-xs`}> <span className='text-lg'>2</span> (2x)</div>
                        <div onClick={() => setNum(3)} className={`btn btn-sm  font-bold ${num === 3 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>3</span> (3x)</div>
                        <div onClick={() => setNum(4)} className={`btn btn-sm  font-bold ${num === 4 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>4</span> (4x)</div>
                        <div onClick={() => setNum(5)} className={`btn btn-sm  font-bold ${num === 5 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>5</span> (5x)</div>
                        <div onClick={() => setNum(6)} className={`btn btn-sm  font-bold ${num === 6 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>6</span> (6x)</div>
                        <div onClick={() => setNum(7)} className={`btn btn-sm  font-bold ${num === 7 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>7</span> (7x)</div>
                        <div onClick={() => setNum(8)} className={`btn btn-sm  font-bold ${num === 8 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>8</span> (8x)</div>
                        <div onClick={() => setNum(9)} className={`btn btn-sm  font-bold ${num === 9 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>9</span> (9x)</div>
                        <div onClick={() => setNum(10)} className={`btn col-span-2 btn-sm  font-bold ${num === 10 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}  `}><span className='text-lg'>10</span> <p>(10x)</p></div>
                        <div onClick={() => setNum(11)} className={`btn col-span-4 btn-sm  font-bold ${num === 11 ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>11</span> <p>(11x)</p></div>

                    </div>
                </div>

                <div className='flex justify-center'>
                    <button onClick={() => {
                        startSpin();
                    }} disabled={isSpinning || num === null || !bet || bet > cred} className="btn btn-wide bg-green-600 text-lg mt-5">
                        Spin
                    </button>
                </div>
            </div>
            <WinModal isOpen={isOpen} setIsOpen={setIsOpen} isWin={isWin} email={email} bet={bet} refetch={refetch} />
        </div>
    );
};

export default WheelGame;

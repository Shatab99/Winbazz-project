import { useContext, useEffect, useState } from 'react';
import wheelSpin from '../../../assets/Icons/GameIcons/wheelSpin.png'
import WinModal from './WinModal';
import { useGetUserByEmailQuery } from '../../../Redux/features/EndPoints/userApi';
import { AuthContext } from '../../../Providers/AuthProvider';
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useUpdateByGameMutation } from '../../../Redux/features/EndPoints/depositApi';
import LowBalWarning from '../../../Components/LowBalWarning';
import SpinBg from "../../../assets/Icons/GameIcons/SpinBg.jpg"



const WheelGame = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenLb, setIsOpenLb] = useState(false)
    const [bet, setBet] = useState()
    const [err, setErr] = useState('')
    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email)
    const cred = currentUser?.credit
    const numLen = selectedNumbers.length;
    const [updateByGame,] = useUpdateByGameMutation()

    const betAmount = parseInt(bet)

    useEffect(() => {
        if (cred < 10) {
            setIsOpenLb(true)
        }
    }, [])

    useEffect(() => {
        if ((bet * numLen) > cred) {
            setErr('Not Enough Balance !')
        }
        else {
            setErr('')
        }
    }, [bet, cred, numLen])

    const startSpin = () => {
        setIsSpinning(true);
        // Simulate spinning logic
        setTimeout(() => {
            const randomResult = Math.floor(Math.random() * 11)
            setResult(randomResult)
            setIsOpen(true)
            updateByGame({ randomResult, email, selectedNumbers, betAmount })
            setIsSpinning(false);
        }, 2000);
        setTimeout(() => {
            refetch()
        }, 2100)
    };


    const toggleNumberSelection = (number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };

    return (
            <div className="max-w-sm mx-auto pt-4 min-h-screen px-1 pb-6 " style={{ backgroundImage: `url(${SpinBg})`, backgroundAttachment: 'fixed', backgroundSize : 'cover', backgroundPosition : 'center' , top: '0', left : '0', height : '100%', width : '100%'}} >
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
                        <div className={`relative mx-auto w-44 h-44 border-4 border-gray-300 rounded-full transition-transform duration-300 ${isSpinning ? 'animate-spin' : ''}`}>
                            <img src={wheelSpin} alt="" className='bg-white rounded-full' />
                            <p className={`absolute animate-bounce top-[40%] ${result < 10 ? 'left-[44%]' : 'left-[38%]'} text-4xl font-bold`}>{isSpinning ? '' : result}</p>
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
                    <div className='px-1'>
                        <h1 className='text-lg font-bold text-center animate-bounce mb-2'>Select Your Lucky Number</h1>
                        <div className='grid grid-cols-3 gap-x-1 gap-y-2'>
                            <div onClick={() => toggleNumberSelection(0)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(0) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>0</span>(2x)</div>
                            <div onClick={() => toggleNumberSelection(1)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(1) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>1</span>(2x)</div>
                            <div onClick={() => toggleNumberSelection(2)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(2) ? 'bg-black border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'} text-xs`}> <span className='text-lg'>2</span>(2x)</div>
                            <div onClick={() => toggleNumberSelection(3)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(3) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>3</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(4)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(4) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>4</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(5)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(5) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>5</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(6)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(6) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>6</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(7)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(7) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>7</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(8)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(8) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>8</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(9)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(9) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-lg'>9</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(10)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(10) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}  `}><span className='text-sm'>10</span>(10x)</div>
                            <div onClick={() => toggleNumberSelection(11)} className={`btn btn-sm  font-bold ${selectedNumbers.includes(11) ? 'bg-black text-xs border-2 border-yellow-400 text-yellow-400' : 'bg-white text-black'}`}><span className='text-sm'>11</span>(10x)</div>

                        </div>
                    </div>

                    <div className='flex justify-center'>
                        {
                            isLoading ? '' : <button onClick={() => {
                                startSpin();
                                refetch();
                            }} disabled={isSpinning || selectedNumbers.length === 0 || !bet || bet * numLen > cred} className="btn btn-wide bg-green-600 text-lg mb-6">
                                Spin
                            </button>
                        }
                    </div>
                </div>
                <WinModal isOpen={isOpen} setIsOpen={setIsOpen} email={email} result={result} selectedNumbers={selectedNumbers} refetch={refetch} betAmount={betAmount} />
                <LowBalWarning isOpenLb={isOpenLb} setIsOpenLb={setIsOpenLb} />
            </div>

    );
};

export default WheelGame;

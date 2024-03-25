import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useGetUserByEmailQuery } from '../../../Redux/features/EndPoints/userApi';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import FlyingPlaneAnimation from "../../../assets/Animations/FlyingPlaneAnimation.json"
import BlustAnimation from "../../../assets/Animations/BlustAnimation.json"
import Lottie from 'lottie-react';
import AviatorBg from "../../../assets/Icons/Aviator/AviatorBg.jpg"
import AviatorSky from "../../../assets/Icons/Aviator/AviatorSky.gif"
import RBAModal from './RBAModal';
import LBAModal from './LBAModal';
import { useUpdateByAviatorMutation } from '../../../Redux/features/EndPoints/depositApi';
import AviatorResult from './AviatorResult';
import CashOutAudio from "../../../assets/Audios/Aviator/CashOut.mp3"
import FlyingAudio from "../../../assets/Audios/Aviator/FlyingAudio.mp3"
import AviatorBgM from "../../../assets/Audios/Aviator/AviatorBgMusic.mp3"

const AviatorGame = () => {
    const [planePosition, setPlanePosition] = useState(0);
    const [isOpenRb, setIsOpenRb] = useState(false)
    const [rBet, setRBet] = useState('Select')
    const [isOpenlb, setIsOpenlb] = useState(false)
    const [lBet, setLBet] = useState('Select')
    const [multiplier, setMultiplier] = useState(0);
    const [isFlying, setIsFlying] = useState(false);
    const [crashPosition, setCrashPosition] = useState(null);
    const [gameData, setGameData] = useState({})
    const [welcome, setWelcome] = useState(true)
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email);
    const cred = currentUser?.credit;
    const [cashOutRb, setCashOutRb] = useState(0)
    const [cashOutLb, setCashOutLb] = useState(0)
    const [disAbledLB, setDisAbledLB] = useState(false)
    const [disAbledRB, setDisAbledRB] = useState(false)
    const [updateByAviator,] = useUpdateByAviatorMutation()
    const [isResult, setIsResult] = useState(false)
    const [err, setErr] = useState(null)
    const [disAblePlay, setDisAblePlay] = useState(false)
    const [cashOutSound] = useState(new Audio(CashOutAudio))
    const [FlyingSound] = useState(new Audio(FlyingAudio))
    const [BGMmusic] = useState(new Audio(AviatorBgM))

    useEffect(() => {
        BGMmusic.loop = true;
        BGMmusic.volume = 0.1;
        BGMmusic.play()

        return () => {
            BGMmusic.pause();
            // BGMmusic.currentTime = 0;
        }
    },)


    useEffect(() => {
        if (isFlying) {
            FlyingSound.volume = 0.5;
            FlyingSound.play()
        }
        else {
            FlyingSound.pause();
            FlyingSound.currentTime = 0;
        }
    }, [FlyingSound, isFlying])



    const randomTime = (lBet >= 100) || (rBet >= 100) ? Math.floor(Math.random() * 1500) + 100 : Math.floor(Math.random() * 15000) + 100

    const rbAmount = parseFloat(rBet)
    const lbAmount = parseFloat(lBet)

    useEffect(() => {
        if (lbAmount > cred) {
            setErr("Not Enough Balance")
        }
        else if (rbAmount > cred) {
            setErr("Not Enough Balance")
        }
        else if (rbAmount + lbAmount > cred) {
            setErr("Not Enough Balance")
        }
        else {
            setErr(null)
        }
    }, [lbAmount, rbAmount, err, cred])

    const handleAudio = () => {
        cashOutSound.volume = 0.5; // Adjust the volume if needed
        cashOutSound.play();
    }


    useEffect(() => {
        if (isFlying) {
            const interval = setInterval(() => {
                if (planePosition < crashPosition) {
                    setPlanePosition(prevPosition => prevPosition + 1);
                    setMultiplier(prevMultiplier => Number((prevMultiplier + 0.1).toFixed(2)));
                } else {
                    setIsFlying(false);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isFlying, planePosition, crashPosition, multiplier]);


    const handleTakeoff = () => {
        setDisAblePlay(true)
        setMultiplier(0)
        setPlanePosition(0);
        setDisAbledLB(false)
        setDisAbledRB(false)
        setWelcome(false)
        setCashOutLb(0)
        setCashOutRb(0)
        const randomCrashPosition = Math.floor(Math.random() * 51) + 50;
        setCrashPosition(randomCrashPosition);
        setIsFlying(true);

        setTimeout(() => {
            setIsResult(true);
            setIsFlying(false);
        }, randomTime);
        setTimeout(() => {
            refetch()
        }, randomTime + 150)
    };

    return (
        <>
            <div className='px-1 py-2 mx-auto min-h-screen'
                style={{ backgroundImage: `url(${AviatorBg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', top: '0', left: '0', height: '100%', width: '100%' }}
            >
                <div className='flex items-center justify-between mb-4 '>
                    <div className='border-2 border-white font-bold px-4 py-1 rounded-full text-sm '>
                        {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                    </div>
                    <h1 className="text-xl text-center font-bold">Aviator Game !</h1>
                    <Link onClick={()=>updateByAviator(gameData)} to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
                        Exit
                    </Link>
                </div>
                <div className='flex flex-col items-center gap-8 mt-16'>
                    <div className='mx-auto rounded-2xl' style={{ position: 'relative', height: '270px', width: '90%', backgroundImage: `url(${AviatorSky})` }}>
                        {
                            welcome ?
                                <div className='absolute flex flex-col items-center  text-black top-[40%] text-xl font-bold left-[10%] animate-bounce'>
                                    <p>Hit the play button to bet</p>
                                    <div className='top-16 left-[50%]' style={{
                                        position: 'absolute',
                                        transform: 'translateX(-50%)',
                                    }}>
                                        <Lottie
                                            animationData={FlyingPlaneAnimation}
                                            className='w-24'
                                        />
                                    </div>
                                </div>
                                : <div style={{
                                    position: 'absolute',
                                    bottom: `${planePosition}px`,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                }}>
                                    <Lottie
                                        animationData={isFlying ? FlyingPlaneAnimation : BlustAnimation}
                                        className='w-24'
                                    />
                                </div>
                        }
                        {isFlying && (
                            <div className='text-red-800 font-bold absolute text-3xl bottom-3 left-3 '>
                                <p>{multiplier}x</p>
                            </div>
                        )}
                        {crashPosition && !isFlying && (
                            <div className='text-red-800 font-bold absolute text-3xl bottom-3 left-3 '>
                                <p>{multiplier}x</p> {/* Display the last multiplier */}
                            </div>
                        )}
                    </div>

                    {/* Betting Part */}

                    {
                        isResult ? <AviatorResult setIsResult={setIsResult} updateByAviator={updateByAviator} gameData={gameData} setGameData={setGameData}
                            email={email} rbAmount={rbAmount} lbAmount={lbAmount} cashOutLb={cashOutLb} cashOutRb={cashOutRb} setRBet={setRBet} setLBet={setLBet}
                            setDisAblePlay={setDisAblePlay}

                        /> :

                            <>
                                <div className='flex items-center justify-center gap-4 w-full'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-bold text-lg text-center'>{cashOutLb.toFixed(2)} x</p>
                                        <button disabled={isFlying} onClick={() => {
                                            setIsOpenlb(true);
                                            refetch();
                                        }} className='btn bg-gray-300 text-black font-bold'>{lBet} BDT</button>
                                        <button disabled={!isFlying || disAbledLB} onClick={() => {
                                            setCashOutLb(multiplier);
                                            setDisAbledLB(true);
                                            handleAudio();
                                        }} className='btn  bg-gray-300 text-black font-bold'>Cash Out</button>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-bold text-lg text-center'>{cashOutRb.toFixed(2)} x</p>
                                        <button disabled={isFlying} onClick={() => {
                                            setIsOpenRb(true);
                                            refetch();
                                        }} className='btn  bg-gray-300 text-black font-bold'>{rBet} BDT</button>
                                        <button disabled={!isFlying || disAbledRB} onClick={() => {
                                            setCashOutRb(multiplier);
                                            setDisAbledRB(true);
                                            handleAudio();
                                        }} className='btn  bg-gray-300 text-black font-bold'>Cash Out</button>
                                    </div>
                                </div>

                                <p>{err}</p>
                                <button onClick={handleTakeoff} disabled={isFlying || rBet === 'Select' || lBet === 'Select' || err || disAblePlay} className='btn btn-sm bg-green-700 btn-wide'>
                                    {isFlying ? 'Flying...' : 'Play'}
                                </button>
                            </>
                    }
                </div>
                <RBAModal isOpen={isOpenRb} setIsOpen={setIsOpenRb} rBet={rBet} setRBet={setRBet} />
                <LBAModal isOpen={isOpenlb} setIsOpen={setIsOpenlb} lBet={lBet} setLBet={setLBet} />
            </div>
        </>
    );
};

export default AviatorGame;

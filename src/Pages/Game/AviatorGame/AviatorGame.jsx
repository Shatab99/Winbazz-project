import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useGetUserByEmailQuery } from '../../../Redux/features/EndPoints/userApi';
import { VscLoading } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import FlyingPlaneAnimation from "../../../assets/Animations/FlyingPlaneAnimation.json"
import BlustAnimation from "../../../assets/Animations/BlustAnimation.json"
import Lottie from 'lottie-react';
import AviatorBg from "../../../assets/Icons/Aviator/AviatorBg.jpg"
import AviatorSky from "../../../assets/Icons/Aviator/AviatorSky.jpg"

const AviatorGame = () => {
    const [planePosition, setPlanePosition] = useState(0);
    const [multiplier, setMultiplier] = useState(0);
    const [isFlying, setIsFlying] = useState(false);
    const [crashPosition, setCrashPosition] = useState(null);
    const [welcome, setWelcome] = useState(true)
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const { data: currentUser, isLoading } = useGetUserByEmailQuery(email);
    const cred = currentUser?.credit;


    useEffect(() => {
        if (isFlying) {
            const interval = setInterval(() => {
                if (planePosition < crashPosition) {
                    setPlanePosition(prevPosition => prevPosition + 1);
                    setMultiplier(prevMultiplier => prevMultiplier + 0.1);
                } else {
                    setIsFlying(false);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isFlying, planePosition, crashPosition, multiplier]);


    const randomTime = Math.floor(Math.random() * 15000) + 100;

    const handleTakeoff = () => {
        setMultiplier(0)
        setPlanePosition(0);
        setWelcome(false)
        const randomCrashPosition = Math.floor(Math.random() * 51) + 50;
        setCrashPosition(randomCrashPosition);
        setIsFlying(true);

        setTimeout(() => {
            setIsFlying(false);
        }, randomTime);
    };

    return (
        <div  className='px-1 pt-2 mx-auto min-h-screen' 
        style={{ backgroundImage: `url(${AviatorBg})`, backgroundAttachment: 'fixed', backgroundSize : 'cover', backgroundPosition : 'center' , top: '0', left : '0', height : '100%', width : '100%'}}
        >
            <div className='flex items-center justify-between mb-4 '>
                <div className='border-2 border-white font-bold px-4 py-1 rounded-full text-sm '>
                    {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                </div>
                <h1 className="text-xl text-center font-bold">Aviator Game !</h1>
                <Link to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
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
                            <p>{multiplier.toFixed(2)}x</p>
                        </div>
                    )}
                    {crashPosition && !isFlying && (
                        <div className='text-red-800 font-bold absolute text-3xl bottom-3 left-3 '>
                            <p>{multiplier?.toFixed(2)}x</p> {/* Display the last multiplier */}
                        </div>
                    )}
                </div>

                {/* Betting Part */}

                <div className='flex items-center justify-center gap-4 w-full'>
                    <div className='flex flex-col gap-2'>
                        <button className='btn btn-sm bg-gray-300 text-black font-bold'>Select Amount</button>
                        <button className='btn btn-sm bg-gray-300 text-black font-bold'>Cash Out</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button className='btn btn-sm bg-gray-300 text-black font-bold'>Select Amount</button>
                        <button className='btn btn-sm bg-gray-300 text-black font-bold'>Cash Out</button>
                    </div>
                </div>


                <button onClick={handleTakeoff} disabled={isFlying} className='btn btn-sm bg-green-700 btn-wide'>
                    {isFlying ? 'Flying...' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default AviatorGame;

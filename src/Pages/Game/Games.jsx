import { Link } from 'react-router-dom';
import wheelIcon from '../../assets/Icons/GameIcons/wheelIcon.jpg'
import CoinIcon from '../../assets/Icons/CoinFlip/CoinIcon.jpg'
import AviatorIcon from "../../assets/Icons/Aviator/AviatorIcon.jpg"
import LudoIcon from "../../assets/Icons/Ludo/ludoIcon.jpg"
import LotteryIcon from '../../assets/Icons/LotteryGame/LotteryIcon.jpg'
import SlotIcon from '../../assets/Icons/SlotGame/SlotIcon.jpg'


const Games = () => {
    return (
        <div className="max-w-4xl mx-auto my-2">
            <h1 className="text-lg font-bold text-start ml-2 ">Hot Games 🔥</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
                <Link to={'/wheelGame'} className='flex flex-col items-center '>
                    <img src={wheelIcon} alt="" className='w-20 h-20 rounded-full p-2'/>
                    <p className='font-semibold'>Mega Wheel</p>
                </Link>
                <Link to={'/coinFlip'} className='flex flex-col items-center '>
                    <img src={CoinIcon} alt="" className='w-20 h-20 rounded-full '/>
                    <p className='font-semibold'>Coin Flip</p>
                </Link>
                <Link to={'/aviatorGame'} className='flex flex-col items-center '>
                    <img src={AviatorIcon} alt="" className='w-20 h-20 rounded-full p-2'/>
                    <p className='font-semibold'>Aviator</p>
                </Link>
                <Link to={'/ludo'} className='flex flex-col items-center '>
                    <img src={LudoIcon} alt="" className='w-20 h-20 rounded-full p-2'/>
                    <p className='font-semibold'>Ludo</p>
                </Link>
                <Link to={'/lotteryGame'} className='flex flex-col items-center '>
                    <img src={LotteryIcon} alt="" className='w-20 h-20 rounded-full p-2'/>
                    <p className='font-semibold'>Lottery Game</p>
                </Link>
                <Link to={'/slotGame'} className='flex flex-col items-center '>
                    <img src={SlotIcon} alt="" className='w-20 h-20 rounded-full p-2'/>
                    <p className='font-semibold'>Slot Game</p>
                </Link>
            </div>
        </div>
    );
};

export default Games;
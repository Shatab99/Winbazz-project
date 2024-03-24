import { Link } from 'react-router-dom';
import wheelIcon from '../../assets/Icons/GameIcons/wheelIcon.png'
import CoinIcon from '../../assets/Icons/CoinFlip/CoinIcon.png'


const Games = () => {
    return (
        <div className="max-w-4xl mx-auto my-2">
            <h1 className="text-lg font-bold text-start ml-2 ">Hot Games 🔥</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
                <Link to={'/wheelGame'} className='flex flex-col items-center '>
                    <img src={wheelIcon} alt="" className='w-20'/>
                    <p className='font-semibold'>Spin to earn</p>
                </Link>
                <Link to={'/coinFlip'} className='flex flex-col items-center '>
                    <img src={CoinIcon} alt="" className='w-20'/>
                    <p className='font-semibold'>Flip to earn</p>
                </Link>
            </div>
        </div>
    );
};

export default Games;
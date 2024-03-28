import { useContext, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useGetUserByEmailQuery, useUpdateCredMutation, useWithdrawCredMutation } from "../../../Redux/features/EndPoints/userApi";
import "./Dice.css"
import Dice1 from '../../../assets/Icons/Ludo/1.png'
import Dice2 from '../../../assets/Icons/Ludo/2.png'
import Dice3 from '../../../assets/Icons/Ludo/3.png'
import Dice4 from '../../../assets/Icons/Ludo/4.png'
import Dice5 from '../../../assets/Icons/Ludo/5.png'
import Dice6 from '../../../assets/Icons/Ludo/6.png'
import LudoResult from "./LudoResult";
import LowBalWarning from "../../../Components/LowBalWarning";
import StartSound from "../../../assets/Audios/Ludo/startSound.mp3"


const Ludo = () => {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading, refetch } = useGetUserByEmailQuery(email)
    const cred = currentUser?.credit
    const [number, setNumber] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [bet, setBet] = useState()
    const [betNum, setBetNum] = useState(null)
    const [updateCred,] = useUpdateCredMutation()
    const [withdrawCred,] = useWithdrawCredMutation()
    const [isOpenLudo, setIsOpenLudo] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const [isOpenLb, setIsOpenLb] = useState(false)
    const [err, setErr]= useState(null)
    const [startSound] = useState(new Audio(StartSound))

    useEffect(() => {
        if (cred < 20) {
            setIsOpenLb(true)
        }
    }, [])

    useEffect(()=>{
        if(rolling){
            startSound.play()
        }
    },[rolling, startSound])

    useEffect(()=>{
        if(bet > cred){
            setErr("Not Enough Balance !!")
        }
        else {
            setErr(null)
        }
    },[err, bet, cred])



    const rollDice = () => {
        setRolling(true);
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            setNumber(randomNumber);

            if (randomNumber === betNum) {
                updateCred({ email, credit: { amount: 2 * bet } })
                setIsWin(true)
            }
            else {
                withdrawCred({ email, credit: { amount: bet } })
                setIsWin(false)
            }
            setRolling(false);
            setIsOpenLudo(true)
        }, 2000);
        setTimeout(() => {
            refetch()
        }, 2100)
    };

    return (
        <div className="px-2 py-2">
            <div className='flex items-center justify-between mb-4 '>
                <div className='border-2 border-white font-bold px-4 py-1 rounded-full text-sm '>
                    {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                </div>
                <h1 className="text-xl text-center font-bold">Roll The Ludo !</h1>
                <Link to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
                    Exit
                </Link>
            </div>
            <div className="dice-container  gap-4">
                <div className={`dice ${rolling ? 'rolling' : ''}`}>
                    {number === 1 && <img src={Dice1} alt="" />}
                    {number === 2 && <img src={Dice2} alt="" />}
                    {number === 3 && <img src={Dice3} alt="" />}
                    {number === 4 && <img src={Dice4} alt="" />}
                    {number === 5 && <img src={Dice5} alt="" />}
                    {number === 6 && <img src={Dice6} alt="" />}
                    {!number && <p className="text-lg font-bold text-black">Roll dice</p>}
                </div>
                <div className="text-3xl font-bold -mt-4">
                    {number}
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
                {/* Selcet Number part */}
                <h1>Select Lucky Number Of Dice</h1>
                <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => setBetNum(1)} className={`btn font-bold btn-circle ${betNum === 1 ? 'text-white bg-black border-2 border-orange-400' : 'border-black '}`}>
                        <img src={Dice1} alt="" className="rounded-full p-1 " />
                    </button>
                    <button onClick={() => setBetNum(2)} className={`btn font-bold btn-circle ${betNum === 2 ? 'text-white bg-black border-2 border-orange-400' : 'border-black '}`}>
                        <img src={Dice2} alt="" className="rounded-full p-1 " />
                    </button>
                    <button onClick={() => setBetNum(3)} className={`btn font-bold btn-circle ${betNum === 3 ? 'text-white bg-black border-2 border-orange-400' : 'border-black '}`}>
                        <img src={Dice3} alt="" className="rounded-full p-1 " />
                    </button>
                    <button onClick={() => setBetNum(4)} className={`btn font-bold btn-circle ${betNum === 4 ? 'text-white bg-black border-2 border-orange-400' : 'border-black '}`}>
                        <img src={Dice4} alt="" className="rounded-full p-1 " />
                    </button>
                    <button onClick={() => setBetNum(5)} className={`btn font-bold btn-circle ${betNum === 5 ? 'text-white bg-black border-2 border-orange-400' : 'border-black '}`}>
                        <img src={Dice5} alt="" className="rounded-full p-1 " />
                    </button>
                    <button onClick={() => setBetNum(6)} className={`btn font-bold btn-circle ${betNum === 6 ? 'text-white bg-black border-2 border-orange-400' : 'border-black '}`}>
                        <img src={Dice6} alt="" className="rounded-full p-1 " />
                    </button>

                </div>
                <p className="font-bold text-red-400 animate-pulse">{err}</p>
                <button onClick={rollDice} disabled={rolling || isLoading || !bet || !betNum || err } className="btn btn-sm bg-green-800 btn-wide">
                    {rolling ? 'Rolling...' : 'Roll Dice'}
                </button>
            </div>
            <LudoResult isOpen={isOpenLudo} setIsOpen={setIsOpenLudo} isWin={isWin} bet={bet} />
            <LowBalWarning isOpenLb={isOpenLb} setIsOpenLb={setIsOpenLb} />
        </div>
    );
};

export default Ludo;
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useGetUserByEmailQuery } from "../../../Redux/features/EndPoints/userApi";
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";


const DropingBall = () => {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: currentUser, isLoading,  } = useGetUserByEmailQuery(email)
    const cred = currentUser?.credit
    const [bet, setBet] = useState(null)


    return (
        <div className="p-2 ">
            <div className='flex items-center justify-between mb-4 '>
                <div className='border-2 border-white font-bold px-4 py-1 rounded-full text-sm '>
                    {isLoading ? <VscLoading className='animate-spin' /> : `${cred} BDT`}
                </div>
                <h1 className="text-xl text-center font-bold">Drop The Ball !</h1>
                <Link to={'/'} className='btn btn-sm bg-red-700 rounded-2xl'>
                    Exit
                </Link>
            </div>
            {/* Selecting amount to bet */}
            <div className="flex flex-col items-center gap-2 font-bold">
                <h1>Select Amount to bet</h1>
                <div className='grid grid-cols-3 gap-3'>
                    <button onClick={() => setBet(20)} className={`btn btn-outline btn-circle  ${bet === 20 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>20</button>
                    <button onClick={() => setBet(30)} className={`btn btn-outline btn-circle  ${bet === 30 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>30</button>
                    <button onClick={() => setBet(50)} className={`btn btn-outline btn-circle  ${bet === 50 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>50</button>
                    <button onClick={() => setBet(100)} className={`btn btn-outline btn-circle  ${bet === 100 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>100</button>
                    <button onClick={() => setBet(200)} className={`btn btn-outline btn-circle  ${bet === 200 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>200</button>
                    <button onClick={() => setBet(500)} className={`btn btn-outline btn-circle  ${bet === 500 ? 'bg-orange-600 text-white' : 'text-white border-4'} font-semibold`}>500</button>
                </div>
            </div>
            {/* Select lucky number part */}

        </div>
    );
};

export default DropingBall;
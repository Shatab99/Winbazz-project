import InfiniteScroll from "react-infinite-scroll-component";
import { useDeleteDepositMutation, useGetAllDepositsQuery } from "../../Redux/features/EndPoints/depositApi";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import DepositReqModal from "./DepositReqModal";
import { useState } from "react";
import Loading from "../../Components/Loading";


const DepositRequest = () => {

    const { data: deposits, isLoading } = useGetAllDepositsQuery()
    const [deleteDeposit,] = useDeleteDepositMutation()
    const [deposit, setDeposit]= useState({})
    const [isOpen, setIsOpen]= useState(false)



    return (
        <div>
            <h1 className="text-center font-semibold text-xl mt-2">Deposit Requests</h1>
            <InfiniteScroll dataLength={10} next={deposits} height={500}>
                <div className="grid grid-cols-1 gap-3 mt-3 px-2">
                    {
                        isLoading ? <Loading/> :
                            deposits.map((deposit) => <>
                                <div className="border-2 rounded-lg p-4 flex items-center justify-between ">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold">{deposit.email}</p>
                                        <p className="text-sm">{deposit.phone}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={()=>deleteDeposit(deposit._id)} className="btn btn-sm btn-circle bg-red-700 text-white text-lg"><ImCross /></button>
                                            <button onClick={()=>{
                                                setDeposit(deposit);
                                                setIsOpen(true)
                                            }} className="btn btn-sm btn-circle bg-green-700 text-white text-lg"><FaCheck /></button>
                                        </div>
                                    </div>
                                </div>
                            </>)
                    }
                </div>
            </InfiniteScroll>
            <DepositReqModal deposit={deposit} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default DepositRequest;
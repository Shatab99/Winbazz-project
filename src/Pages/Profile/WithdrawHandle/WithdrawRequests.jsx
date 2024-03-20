import InfiniteScroll from "react-infinite-scroll-component";
import { useDeleteDepositMutation, useGetAllWithdrawsQuery } from "../../../Redux/features/EndPoints/depositApi";
import Loading from "../../../Components/Loading";
import Empty from "../../../Components/Empty";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import WithdrawReqModal from "./WithdrawReqModal";


const WithdrawRequests = () => {

    const { data: withdraws, isLoading } = useGetAllWithdrawsQuery()
    const [deleteDeposit,] = useDeleteDepositMutation()
    const [withdraw, setWithdraw] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    console.log(withdraws)
    console.log(withdraw)

    return (
        <div className="mb-12">
            <h1 className="text-xl font-semibold text-center">Withdraw Requests</h1>
            <InfiniteScroll dataLength={10} next={withdraws} height={500}>
                <div className="grid grid-cols-1 gap-3 mt-3 px-2 ">
                    {
                        isLoading ? <Loading /> :
                            withdraws?.length === 0 ? <Empty /> : withdraws?.map((deposit) => <>
                                <div className="border-2 rounded-lg p-4 flex items-center justify-between ">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold">{deposit.email}</p>
                                        <p className="text-sm">{deposit.phone}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => deleteDeposit(deposit._id)} className="btn btn-sm btn-circle bg-red-700 text-white text-lg"><ImCross /></button>
                                            <button onClick={() => {
                                                setWithdraw(deposit);
                                                setIsOpen(true)
                                            }} className="btn btn-sm btn-circle bg-green-700 text-white text-lg"><FaCheck /></button>
                                        </div>
                                    </div>
                                </div>
                            </>)
                    }
                </div>
            </InfiniteScroll>
            <WithdrawReqModal withdraw={withdraw} isOpen={isOpen} setIsOpen={setIsOpen} deleteDeposit={deleteDeposit} />
        </div>
    );
};

export default WithdrawRequests;
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteHistoryMutation, useSeeHistoryQuery } from "../../../Redux/features/EndPoints/depositApi";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../Components/Loading";
import { ImCheckmark, ImCross } from "react-icons/im";
import toast from "react-hot-toast";
import Empty from "../../../Components/Empty";


const History = () => {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: history, isLoading } = useSeeHistoryQuery(email)
    const [deleteHistory, { data, error }] = useDeleteHistoryMutation()

    console.log(data)
    console.log(error)


    const handleDelete = () => {
        deleteHistory(email)
        toast.success("History Cleared !! ")
    }

    return (
        <div className="mb-16">
            <div className="flex items-center justify-between mt-2">
                <Link to={'/profile/home'} className="ml-2 btn btn-xs btn-circle">
                    <FaArrowCircleLeft className="text-2xl text-orange-600" />
                </Link>
                <h1 className="text-center font-semibold text-lg ">Payment History</h1>
                <div onClick={handleDelete} className="btn btn-sm mr-2 text-white bg-red-700 hover:bg-red-900">
                    Clear
                </div>
            </div>
            <InfiniteScroll dataLength={10} next={history} height={500}>
                {
                    isLoading ? <Loading /> :
                        <div className="grid grid-cols-1 gap-3 mt-3 px-2">
                            {
                                history.length === 0 ?
                                    <Empty />
                                    : history.map((deposit) => <>
                                        <div className="border-2 rounded-lg p-4 flex items-center justify-between ">
                                            <div className="flex flex-col items-center font-semibold">
                                                <p>Amount </p>
                                                <p className={`${deposit.category === "Deposit" ? 'text-green-700' : 'text-red-700'}`}>{deposit.category === "Deposit" ? "+" : "-"} {deposit.amount} BDT</p>
                                            </div>
                                            <div className={`border-2 ${deposit.category === "Deposit" ? "text-green-700 border-green-700 " : " text-orange-600 border-orange-600"
                                                }   px-3 py-1 rounded-full text-xs`}>
                                                {deposit.category}
                                            </div>
                                            <div>
                                                {
                                                    deposit.confirm ? <button className="btn btn-sm  bg-green-700 text-white hover:bg-green-800">Approved <ImCheckmark /></button> : <button className="btn btn-sm  bg-red-700 text-white hover:bg-red-800">Canceled <ImCross /></button>
                                                }
                                            </div>
                                        </div>
                                    </>)
                            }
                        </div>
                }
            </InfiniteScroll>

        </div>
    );
};

export default History;
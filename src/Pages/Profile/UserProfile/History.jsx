import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSeeHistoryQuery } from "../../../Redux/features/EndPoints/depositApi";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../Components/Loading";

const History = () => {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: history, isLoading } = useSeeHistoryQuery(email)

    return (
        <div>
            <div className="flex items-center justify-between mt-2">
                <Link to={'/profile/home'} className="ml-2 btn btn-xs btn-circle">
                    <FaArrowCircleLeft className="text-2xl text-orange-600" />
                </Link>
                <h1 className="text-center font-semibold text-lg mr-2">Payment History</h1>
                <div></div>
            </div>
            <InfiniteScroll dataLength={10} next={history} height={500}>
                {
                    isLoading ? <Loading /> :
                        <div className="grid grid-cols-1 gap-3 mt-3 px-2">
                            {
                                history.map((deposit) => <>
                                    <div className="border-2 rounded-lg p-4 flex items-center justify-between ">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold">{deposit.transactionId}</p>
                                            <p className="text-sm">{deposit.phone}</p>
                                        </div>
                                        <div>
                                            <p>Amount : {deposit.amount}</p>
                                        </div>
                                        <div className="border-2 text-orange-600 border-orange-600  px-3 py-1 rounded-full">
                                            Completed
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
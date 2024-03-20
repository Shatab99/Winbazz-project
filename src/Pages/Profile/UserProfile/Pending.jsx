import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePendigHistoryQuery } from "../../../Redux/features/EndPoints/depositApi";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../Components/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const Pending = () => {

    const { user } = useContext(AuthContext)
    const email = user?.email
    const { data: pendings, isLoading } = usePendigHistoryQuery(email)

    return (
        <div className="mb-24">
            <div className="flex items-center justify-between mt-2">
                <Link to={'/profile/home'} className="ml-2 btn btn-xs btn-circle">
                    <FaArrowCircleLeft className="text-2xl text-orange-600" />
                </Link>
                <h1 className="text-center font-semibold text-lg mr-2">Pending Amount</h1>
                <div></div>
            </div>
            <InfiniteScroll dataLength={10} next={pendings} height={500}>
                {
                    isLoading ? <Loading /> :
                        <div className="grid grid-cols-1 gap-3 mt-3 px-2">
                            {
                                pendings.map((deposit) => <>
                                    <div className="border-2 rounded-lg p-4 flex items-center justify-between ">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold">{deposit.transactionId}</p>
                                            <p className="text-sm">{deposit.phone}</p>
                                        </div>
                                        <div>
                                            <p>Amount : {deposit.amount}</p>
                                        </div>
                                        <div className="bg-orange-600 text-white px-3 py-1 rounded-full">
                                            {deposit.status}
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

export default Pending;
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "../../Components/Modal";


const ReferUsersModal = ({ isOpen, setIsOpen, referedUsers }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center gap-2">
                <h1>Your Refered Users </h1>
                <div>
                    <InfiniteScroll dataLength={10} next={referedUsers} height={200}>
                        {
                            referedUsers?.map(user => <>
                                <div className="border-2 p-2 rounded-lg">
                                    <p>Name : {user.name}</p>
                                    <p>Email : {user.email}</p>
                                </div>
                            </>)
                        }
                    </InfiniteScroll>
                </div>
            </div>
        </Modal>
    );
};

export default ReferUsersModal;
import Modal from "../../Components/Modal";
import Login from "./Login";
import Registration from "./Registration";


const UserLogModal = ({isOpen, setIsOpen, showReg , setShowReg}) => {
    

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setShowReg={setShowReg}>
                {
                    showReg ? <Registration/>:<Login/>
                }
            </Modal>
        </>
    );
};

export default UserLogModal;
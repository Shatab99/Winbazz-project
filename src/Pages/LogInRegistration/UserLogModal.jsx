import Modal from "../../Components/Modal";
import Login from "./Login";
import Registration from "./Registration";


const UserLogModal = ({isOpen, setIsOpen, showReg , setShowReg}) => {
    

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setShowReg={setShowReg}>
                {
                    showReg ? <Registration setShowReg={setShowReg} setIsOpen={setIsOpen}/>:<Login setShowReg={setShowReg} setIsOpen={setIsOpen}/>
                }
            </Modal>
        </>
    );
};

export default UserLogModal;
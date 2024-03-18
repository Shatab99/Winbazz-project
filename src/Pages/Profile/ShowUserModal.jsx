import Modal from "../../Components/Modal";
import { FaRegMessage } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const ShowUserModal = ({ isOpen, setIsOpen, user }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-center mb-4 font-bold text-xl">{`${user.name}'s`} Details </h1>
            <div className="flex flex-col items-start gap-3">
                <p>User Name : {user.name}</p>
                <p>Email : {user.email}</p>
                <button className="btn btn-sm btn-wide bg-orange-700 text-white hover:bg-orange-900 ">Make Admin</button>
                <div className="flex items-center justify-center w-full gap-5">
                    <button className="btn btn-circle text-white bg-blue-600 hover:bg-blue-800 "><FaRegMessage className="text-lg" /></button>
                    <button className="btn  btn-circle text-white bg-red-600 hover:bg-red-800"><MdDeleteForever className="text-lg"/></button>
                </div>
            </div>
        </Modal>
    );
};

export default ShowUserModal;
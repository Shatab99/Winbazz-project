import Modal from "../../Components/Modal";
import { FaRegMessage } from "react-icons/fa6";
// import { MdDeleteForever } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";



const ShowUserModal = ({ isOpen, setIsOpen, user }) => {

    // const [deleteUserDb,{data, error}] = useDeleteUserDbMutation()

    // const handleDelete = (id) => {
    //     deleteUser(auth.currentUser)
    //         .then(res => {
    //             console.log(res.user)
    //             deleteUserDb(id)
    //             toast.success('User Deleted !!')
    //         })
    //         .catch(err => console.log(err.message))
    // }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-center mb-4 font-bold text-xl">{`${user.name}'s`} Details </h1>
            <div className="flex flex-col items-start gap-3">
                <p>{user.role === 'admin' ? 'Admin' : 'User'} Name : {user.name}</p>
                <p>Email : {user.email}</p>
                <p>Balance : {user.credit} BDT</p>
                <button disabled={user.role === 'admin'} className="btn btn-sm btn-wide bg-orange-700 text-white hover:bg-orange-900 "> <GrUserAdmin className="text-lg"/> Make Admin</button>
                <button disabled={user.role === 'admin'} className="btn btn-sm btn-wide text-white bg-blue-600 hover:bg-blue-800 "><FaRegMessage className="text-lg" /> Send Message to {user.name}</button>
                <div className="flex items-center justify-center w-full gap-5">
                    {/* <button onClick={(id) => handleDelete(user._id)} disabled={user.role === 'admin'} className="btn  btn-circle text-white bg-red-600 hover:bg-red-800"><MdDeleteForever className="text-lg" /></button> */}
                </div>
            </div>
        </Modal>
    );
};

export default ShowUserModal;
import { useState } from "react";
import { useGetAllUserQuery } from "../../Redux/features/EndPoints/userApi";
import ShowUserModal from "./ShowUserModal";

const Users = () => {

    const { data: users, isLoading } = useGetAllUserQuery()
    const [isOpen, setIsOpen] = useState(false)
    const [userModal, setUserModal] = useState({})


    return (
        <div className="max-w-sm mx-auto mt-3 mb-12 px-2">
            <h1 className="text-center text-xl font-semibold  ">All Users</h1>
            <div className="grid grid-cols-1 gap-2 mt-3">
                {
                    isLoading ? <p className="flex flex-col items-center justify-center min-h-screen "><span className="loading loading-spinner loading-lg"></span></p> :
                        users.map((user, index) => <>
                            <div onClick={() => {
                                setUserModal(user)
                                setIsOpen(true)
                            }} className="border-2 rounded-lg p-4 flex items-center justify-between ">
                                <p>{index + 1}</p>
                                <div className="flex flex-col">
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-xs">{user.email}</p>
                                </div>
                                <div>
                                    {
                                        user.role === 'admin' ? <div className="badge text-orange-600 badge-outline">Admin</div> :
                                            <div className="badge badge-primary badge-outline">User</div>
                                    }
                                </div>
                            </div>
                        </>)
                }
            </div>
            <ShowUserModal isOpen={isOpen} setIsOpen={setIsOpen} user={userModal} />

        </div>
    );
};

export default Users;
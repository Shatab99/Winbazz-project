import { MdEmail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { VscLoading } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useCreatUserMutation } from "../../Redux/features/EndPoints/userApi";
import { MdBarcodeReader } from "react-icons/md";


const Registration = ({ setIsOpen, setShowReg }) => {

    const { register, loading, setLoading } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const [pass, setPass] = useState(0)
    const [check, setCheck] = useState(false)
    const [createUser, { data, error }] = useCreatUserMutation()

    console.log(data)
    console.log(error)


    const handleRegister = e => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const refered = form.refer.value
        const password = form.password.value
        register(email, password)
            .then(res => {
                console.log(res)
                createUser({ name, email, refered })
                updateProfile(res.user, {
                    displayName: name
                })
                    .then(res => {
                        console.log("updated", res.user)
                    })
                    .catch(err => {
                        console.log(err.message)
                    })

                sendEmailVerification(res.user)
                    .then(() => {
                        toast.success("Verification Link Sent To Your Mail !!")
                    })
                toast.success("Successfully Registered !!")
                setLoading(false)
                setIsOpen(false)

            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }

    return (
        <>
            <h1 className="text-2xl text-center font-semibold mb-6">Sign Up</h1>
            <form onSubmit={handleRegister} className="flex flex-col items-center gap-4 ">
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name="name" className="grow" placeholder="Username" required />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdEmail />
                    <input type="email" name="email" className="grow " placeholder="Email" required />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUnlockKeyhole />
                    <div className="relative ">
                        {
                            pass === 0 ? <p></p> :
                                showPass ?
                                    <FaEyeSlash onClick={() => setShowPass(false)} className="absolute right-0 top-0 text-2xl cursor-pointer" />
                                    :
                                    <FaEye onClick={() => setShowPass(true)} className="absolute right-0 top-0 text-2xl cursor-pointer" />
                        }
                        <input name="password" onChange={(e) => setPass(e.target.value.length)} type={showPass ? 'text' : 'password'} className="grow" placeholder="Password" required />
                    </div>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdBarcodeReader />
                    <input type="number" name="refer" className="grow " placeholder="Refer Code (Optional)" />
                </label>
                <div className="form-control">
                    <label className="cursor-pointer label gap-2">
                        <input onClick={() => setCheck(!check)} type="checkbox" className="checkbox checkbox-success" />
                        <span className="label-text">I am of legal age and I agree with terms and condition</span>
                    </label>
                </div>
                {
                    loading ? <button className="btn w-full">
                        <VscLoading className="text-2xl font-bold animate-spin" />
                    </button> :
                        <button disabled={!check} className="btn w-full bg-orange-600 hover:bg-orange-800 text-white">
                            Register
                        </button>
                }
                <p>Already Have Account ? <span onClick={() => setShowReg(false)} className="font-bold text-blue-800 cursor-pointer">Log In</span></p>
            </form>
        </>
    );
};

export default Registration;
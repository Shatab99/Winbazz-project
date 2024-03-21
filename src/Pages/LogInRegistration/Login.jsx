import { MdEmail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase";


const Login = ({ setShowReg, setIsOpen }) => {

    const [showPass, setShowPass] = useState(false)
    const [pass, setPass] = useState(0)
    const { logIn, setLoading, loading } = useContext(AuthContext)
    const [email, setEmail] = useState('')

    const handleLogIn = e => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const email = form.email.value
        const password = form.password.value
        logIn(email, password)
            .then(res => {
                console.log(res.user)
                toast.success("Succfully Logged In !!")
                setIsOpen(false)
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }

    const handlePasswordReset = () => {
        if(!email){
            toast.error("Please Provide Your Email")
        }
        sendPasswordResetEmail(auth, email)
            .then(()=>{
                toast.success("Check Your Email to Reset Password !!")
            })
            .catch(err=>{
                toast.error(err.message)
            })
    }

    return (
        <>
            <h1 className="text-2xl text-center font-semibold mb-6">Sign In</h1>
            <form onSubmit={handleLogIn} className="flex flex-col items-center gap-4 ">
                <label className="input input-bordered flex items-center gap-2 relative border-orange-600 border-2">
                    <MdEmail />
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="grow " placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 border-orange-600 border-2">
                    <FaUnlockKeyhole />
                    <div className="relative ">
                        {
                            pass === 0 ? <p></p> :
                                showPass ?
                                    <FaEyeSlash onClick={() => setShowPass(false)} className="absolute right-0 top-0 text-2xl cursor-pointer" />
                                    :
                                    <FaEye onClick={() => setShowPass(true)} className="absolute right-0 top-0 text-2xl cursor-pointer" />
                        }
                        <input name="password" onChange={(e) => setPass(e.target.value.length)} type={showPass ? 'text' : 'password'} className="grow" placeholder="Password" />
                    </div>
                </label>
                <p onClick={handlePasswordReset} className="">Forget Password</p>
                {
                    loading ? <button className="btn w-full">
                        <VscLoading className="text-2xl font-bold animate-spin" />
                    </button> : <button className="btn w-full bg-orange-600 hover:bg-orange-800 text-white">
                        Log In
                    </button>
                }
                <p>
                    {`Don't`} have Account ? <span onClick={() => setShowReg(true)} className="font-bold text-blue-800 cursor-pointer">Register</span>
                </p>
            </form>
        </>
    );
};

export default Login;
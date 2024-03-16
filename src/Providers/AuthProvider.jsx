import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [loading , setLoading]= useState(true)
    const [user, setUser]= useState(null)

    const logIn = (email , password) =>{
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
    }

    const register = (email , password) =>{
        setLoading(true)
        createUserWithEmailAndPassword(auth , email ,password)
    }

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            return unSub();
        }
    }, [])

    const info={
        logIn, register, loading, setLoading, user
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
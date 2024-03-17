import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [loading , setLoading]= useState(true)

    const logIn = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = (email , password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email ,password)
    }

    const logOut = ()=>{
        return signOut(auth)
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
        logIn, register, loading, setLoading, user, logOut
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
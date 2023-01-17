import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { auth } from "../../firebase"

export const AuthContext = React.createContext({
    currentUser: null,
    signUp: () => { },
    logIn: () => { },
    logOut: () => { },
    loading: true,
    avatarUrl: '',
    setAvatarUrl: () => { }
})

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [avatarUrl, setAvatarUrl] = useState('')
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        loading,
        avatarUrl,
        setAvatarUrl
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
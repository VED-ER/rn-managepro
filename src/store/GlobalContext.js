import { documentId, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { usersCollectionRef } from "../../firebase";
import downloadImage from "../utils/downloadImage";

export const GlobalContext = createContext({
    cachedImages: {},
    cacheImage: () => { },
    users: [],
    setUsers: () => { },
    userIds: [],
    setUsersIds: () => { }
})

export const GlobalContextProvider = ({ children }) => {
    const [cachedImages, setCachedImages] = useState({})
    const [users, setUsers] = useState([])
    const [usersIds, setUsersIds] = useState([])

    const cacheImage = async (uri) => {
        if (cachedImages[uri]) {
            return cachedImages[uri]
        } else {
            try {
                const img = await downloadImage(uri)
                setCachedImages(prevCachedImages => ({ ...prevCachedImages, [uri]: img }))
                return img
            } catch (error) {
                Alert.alert(error.message)
            }
        }
    }

    useEffect(() => {
        let unsubscribe
        if (usersIds.length > 0) {
            const usersq = query(usersCollectionRef, where(documentId(), 'in', usersIds))
            unsubscribe = onSnapshot(usersq, (snapshot) => {
                const usersData = []
                snapshot.docs.forEach(doc => {
                    usersData.push({ ...doc.data(), id: doc.id })
                })
                setUsers(usersData)
            }, (error) => {
                Alert.alert(error.message)
            })
        }
        return unsubscribe
    }, [usersIds])

    const value = {
        cachedImages,
        cacheImage,
        users,
        setUsers,
        usersIds,
        setUsersIds
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
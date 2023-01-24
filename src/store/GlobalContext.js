import { createContext, useState } from "react";
import { Alert } from "react-native";
import downloadImage from "../utils/downloadImage";

export const GlobalContext = createContext({
    cachedImages: {},
    cacheImage: () => { }
})

export const GlobalContextProvider = ({ children }) => {
    const [cachedImages, setCachedImages] = useState({})

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

    const value = {
        cachedImages,
        cacheImage
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
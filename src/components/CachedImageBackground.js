import { ImageBackground } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GlobalContext } from '../store/GlobalContext'

const CachedImageBackground = ({ source, children, ...props }) => {
    const [imageSource, setImageSource] = useState(null)
    const { cacheImage, cachedImages } = useContext(GlobalContext)

    const uri = useMemo(() => source.uri, [source.uri])

    const downloadAndCacheImage = async () => {
        const img = await cacheImage(uri)
        setImageSource({ uri: img })
    }

    useEffect(() => {
        if (cachedImages[uri]) {
            setImageSource({ uri: cachedImages[uri] })
        } else {
            if (uri) {
                downloadAndCacheImage()
            }
        }
    }, [uri])

    return (
        <ImageBackground source={imageSource} {...props} >
            {children}
        </ImageBackground>
    )
}

export default CachedImageBackground
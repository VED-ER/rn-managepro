import { Image } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import {  GlobalContext } from '../store/GlobalContext'

const CachedImage = ({ source, children, ...props }) => {
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
        <Image source={imageSource} {...props} />
    )
}

export default CachedImage
import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import CachedImage from './CachedImage'

const Avatar = ({ style, imageUri, imageStyle }) => {
    return (
        <View style={[styles.container, style]}>
            {imageUri ?
                <CachedImage
                    source={{ uri: imageUri }}
                    style={[styles.image, imageStyle]}
                    resizeMode={'cover'}
                />
                :
                <Image
                    source={require('../assets/defaultuser.png')}
                    style={[styles.image, imageStyle]}
                    resizeMode={'cover'}
                />
            }
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Variables.colors.black.light100
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 40
    }
})
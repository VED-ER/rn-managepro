import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const Avatar = ({ style, imageUri, imageStyle }) => {

    const source = imageUri ? { uri: imageUri } : require('../assets/defaultuser.png')

    return (
        <View style={[styles.container, style]}>
            <Image
                source={source}
                style={[styles.image, imageStyle]}
                resizeMode={'cover'}
            />
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
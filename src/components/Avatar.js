import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const Avatar = ({ style, textStyle, imageUri, imageStyle }) => {
    return (
        <View style={[styles.container, style]}>
            {
                imageUri
                    ?
                    <Image
                        source={{ uri: imageUri }}
                        style={[styles.image, imageStyle]}
                        resizeMode={'cover'}
                    />
                    :
                    <Text style={textStyle}>VE</Text>
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
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const Avatar = ({ style, textStyle }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={textStyle}>VE</Text>
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Variables.colors.black.light100
    }
})
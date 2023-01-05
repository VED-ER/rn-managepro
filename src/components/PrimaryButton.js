import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const PrimaryButton = ({ text, onPress, textStyle, style }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => ([styles.button, style, pressed && { opacity: 0.5 }])}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </Pressable>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: Variables.colors.brand.default,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 100,
        maxHeight: 60
    },
    text: {
        color: Variables.colors.white,
        textAlign: 'center',
        fontSize: 16
    }
})
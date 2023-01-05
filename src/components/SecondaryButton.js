import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoogleLogo } from './svg'
import { Variables } from '../styles/theme'

const SecondaryButton = ({ onPress, style, text, textStyle, LeftIcon }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => ([styles.button, style, pressed && { opacity: 0.5 }])}>
            {LeftIcon ? LeftIcon : null}
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </Pressable>
    )
}

export default SecondaryButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Variables.colors.black.light100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 60,
        flex: 1
    },
    text: {
        color: Variables.colors.black.dark900,
        textAlign: 'center',
        fontSize: 16
    }
})
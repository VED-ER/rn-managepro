import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import SvgCheckMarkSvgrepoCom from './svg/CheckMarkSvgrepoCom'

const Checkbox = ({ checked, onPress, style }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => ([styles.checkbox, style, pressed && { opacity: 0.5 }])}>
            {checked ? <SvgCheckMarkSvgrepoCom width={12} height={12} /> : null}
        </Pressable>
    )
}

export default Checkbox

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: Variables.colors.black.light100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
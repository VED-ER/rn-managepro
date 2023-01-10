import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const SettingsListItem = ({ name, RightComponent, onPress, style }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => ([styles.container, style, pressed && { opacity: 0.5 }])}>
            <Text style={styles.settingsText}>{name}</Text>
            {RightComponent || <Switch style={{}} />}
        </Pressable>
    )
}

export default SettingsListItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingsText: {
        color: Variables.colors.black.dark900,
        fontSize: 16
    }
})
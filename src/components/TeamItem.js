import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import Avatar from './Avatar'

const TeamItem = ({ name, photoUri, IconRight, id, onIconPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Avatar style={styles.avatar} imageUri={photoUri} />
                <Text style={styles.name}>{name}</Text>
            </View>
            <Pressable style={({ pressed }) => (pressed && { opacity: 0.5 })} onPress={() => onIconPress(id)}>
                {IconRight}
            </Pressable>
        </View>
    )
}

export default TeamItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40
    },
    name: {
        fontSize: 16,
        color: Variables.colors.black.dark900,
        fontWeight: '600',
        marginLeft: 20
    },
    avatar: {
        width: 30,
        height: 30
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
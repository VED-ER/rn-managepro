import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import Avatar from './Avatar'

const AvatarList = ({ data }) => {
    return (
        <View style={styles.container}>
            {data?.map((item, index) => {
                if (index > 3) return
                return (<Avatar
                    imageUri={item}
                    key={index}
                    textStyle={styles.avatarTextStyle}
                    style={[styles.teamAvatarStyle, { marginLeft: index > 0 ? -5 : 0 }]}
                />)
            }
            )}
            {data?.length > 4 && <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{data?.length - 4}</Text>
            </View>}
        </View>
    )
}

export default AvatarList

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    avatarTextStyle: {
        fontSize: 10,
        color: Variables.colors.white
    },
    teamAvatarStyle: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Variables.colors.white,
        backgroundColor: Variables.colors.brand.dark700
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        width: 25,
        height: 25,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Variables.colors.white,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlayText: {
        color: Variables.colors.white,
        fontSize: 11,
        position: 'absolute',
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ManageProIcon } from './svg'
import { Variables } from '../styles/theme'

const Logo = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <ManageProIcon width={34} height={34} fill={Variables.colors.black.dark900} />
            <Text style={styles.manage}>Manage<Text style={styles.pro}>Pro</Text></Text>
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    manage: {
        color: Variables.colors.black.dark900,
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    pro: {
        color: Variables.colors.brand.default
    }
})
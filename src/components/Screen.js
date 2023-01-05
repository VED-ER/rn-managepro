import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Variables } from '../styles/theme'

const Screen = ({ children, style, withSafeArea }) => {
    return (
        <>
            {withSafeArea ?
                <SafeAreaView style={[styles.container, style]}>
                    {children}
                </SafeAreaView>
                :
                <View style={[styles.container, style]}>
                    {children}
                </View>
            }
        </>
    )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Variables.colors.white
    }
})
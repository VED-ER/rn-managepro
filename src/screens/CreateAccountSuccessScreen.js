import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import PrimaryButton from '../components/PrimaryButton'

const CreateAccountSuccessScreen = () => {
    return (
        <Screen withSafeArea style={{ justifyContent: 'space-between' }}>
            <Image
                source={require('../assets/create-account-success.png')}
                style={{ marginTop: 100 }}
            />
            <View>
                <Text style={styles.subtitle}>Create Account Success</Text>
                <Text style={styles.title}>Let's Manage Your Task!</Text>
            </View>
            <PrimaryButton text={'Create Workspace'} />
        </Screen>
    )
}

export default CreateAccountSuccessScreen

const styles = StyleSheet.create({
    title: {
        color: Variables.colors.black.dark900,
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 100
    },
    subtitle: {
        fontSize: 16,
        color: Variables.colors.black.light300,
        fontWeight: 'bold'
    },
})
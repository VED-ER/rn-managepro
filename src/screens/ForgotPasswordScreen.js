import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import InputPrimary from '../components/InputPrimary'
import PrimaryButton from '../components/PrimaryButton'

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')

    return (
        <Screen style={{ paddingVertical: 70 }}>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.subtitle}>Forgot Password?</Text>
                        <Text style={styles.title}>Enter Your Account Email</Text>
                        <InputPrimary
                            placeholder={'Email'}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={styles.forgotPasswordText}>Enter Email address to reset your password</Text>
                    </View>
                    <PrimaryButton text={'Next'} />
                </View>
            </ScrollView>
        </Screen>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
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
    rememberMeText: {
        color: Variables.colors.black.light300,
        fontSize: 14,
        marginLeft: 10
    },
    forgotPasswordText: {
        fontSize: 14,
        color: Variables.colors.black.light300,
        fontWeight: 'bold',
        marginTop: 30
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
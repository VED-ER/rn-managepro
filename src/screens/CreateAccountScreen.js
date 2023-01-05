import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import InputPrimary from '../components/InputPrimary'
import PrimaryButton from '../components/PrimaryButton'
import { CREATE_ACCOUNT_SUCCESS } from '../navigations/routes'

const CreateAccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')

    return (
        <Screen withSafeArea>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.subtitle}>Create Account</Text>
                        <Text style={styles.title}>What's Your Email Address?</Text>
                        <InputPrimary
                            placeholder={'Email'}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <PrimaryButton text={'Next'} onPress={() => navigation.navigate(CREATE_ACCOUNT_SUCCESS)} />
                </View>
            </ScrollView>
        </Screen>
    )
}

export default CreateAccountScreen

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
        color: Variables.colors.black.light300
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
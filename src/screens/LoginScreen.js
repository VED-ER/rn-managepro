import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import { Eye, EyeSlash } from '../components/svg'
import InputPrimary from '../components/InputPrimary'
import Checkbox from '../components/Checkbox'
import SignInContainer from '../components/SignInContainer'
import { FORGOT_PASSWORD } from '../navigations/routes'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [rememberMe, setRememberMe] = useState(false)

    const onIconRightPress = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const onCheckboxPress = () => {
        setRememberMe(!rememberMe)
    }

    return (
        <Screen>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.subtitle}>Sign In To Your Account</Text>
                        <Text style={styles.title}>Enter Your Account Details</Text>
                    </View>
                    <View>
                        <InputPrimary
                            placeholder={'Email'}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <InputPrimary
                            style={{ marginTop: 25 }}
                            placeholder={'Password'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureTextEntry}
                            IconRight={secureTextEntry ? <EyeSlash width={24} height={24} /> : <Eye width={24} height={24} />}
                            onIconRightPress={onIconRightPress}
                        />
                        <View style={styles.checkboxWrapper}>
                            <View style={styles.checkboxContainer}>
                                <Checkbox checked={rememberMe} onPress={onCheckboxPress} />
                                <Text style={styles.rememberMeText}>Remember me</Text>
                            </View>
                            <Pressable onPress={() => { navigation.navigate(FORGOT_PASSWORD) }}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </Pressable>
                        </View>
                    </View>
                    <SignInContainer />
                </View>
            </ScrollView>
        </Screen>
    )
}

export default LoginScreen

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
        marginBottom: 40
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
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    }
})
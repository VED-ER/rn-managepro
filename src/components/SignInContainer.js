import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FacebookLogo, GoogleLogo } from './svg'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import { Variables } from '../styles/theme'
import { CREATE_ACCOUNT } from '../navigations/routes'
import { useNavigation } from '@react-navigation/native'

const SignInContainer = ({ onSignInPress }) => {
    const navigation = useNavigation()

    return (
        <View>
            <PrimaryButton text={'Sign In'} onPress={onSignInPress} />
            <View style={styles.buttonsContainer}>
                <SecondaryButton
                    text={'Google'}
                    style={{ marginRight: 10 }}
                    LeftIcon={<GoogleLogo width={24} height={24} />}
                    textStyle={{ marginLeft: 15 }}
                />
                <SecondaryButton
                    text={'Facebook'}
                    style={{ marginLeft: 10 }}
                    LeftIcon={<FacebookLogo width={24} height={24} />}
                    textStyle={{ marginLeft: 15 }}
                />
            </View>
            <Text style={styles.bottomText}>
                Join with us.
                <Text
                    style={styles.createAccountText}
                    onPress={() => navigation.navigate(CREATE_ACCOUNT)}
                > Create Account</Text>
            </Text>
        </View>
    )
}

export default SignInContainer

const styles = StyleSheet.create({
    bottomText: {
        textAlign: 'center',
        marginTop: 35
    },
    createAccountText: {
        color: Variables.colors.brand.default
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 25
    },
})
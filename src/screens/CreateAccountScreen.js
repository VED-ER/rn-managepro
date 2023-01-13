import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Screen from '../components/Screen';
import { Variables } from '../styles/theme';
import InputPrimary from '../components/InputPrimary';
import PrimaryButton from '../components/PrimaryButton';
import { CREATE_ACCOUNT_SUCCESS } from '../navigations/routes';
import { AuthContext } from '../store/AuthContext';

const CreateAccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { signUp, currentUser } = useContext(AuthContext);

    const handleCreateAccountPress = async () => {

        if (!username) {
            Alert.alert('Username error', 'Please enter a username you want to use');
            return;
        }

        if (username.length < 5) {
            Alert.alert('Username error', 'Username length must be at least 6 characters');
            return;
        }

        try {
            await signUp(email, password);
            navigation.navigate(CREATE_ACCOUNT_SUCCESS);

        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: Variables.colors.white,
                padding: 20,
            }}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            keyboardVerticalOffset={50}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                bounces={false}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 70 }}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.subtitle}>Create Account</Text>
                        <Text style={styles.title}>What's Your Email Address?</Text>
                        <InputPrimary
                            placeholder={'Email'}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={{ padding: 15 }} />
                        <InputPrimary
                            placeholder={'Username'}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <View style={{ padding: 15 }} />
                        <InputPrimary
                            placeholder={'Password'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <PrimaryButton style={{ marginTop: 20 }} text={'Next'} onPress={handleCreateAccountPress} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // borderWidth: 1
    },
    title: {
        color: Variables.colors.black.dark900,
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 70
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
});
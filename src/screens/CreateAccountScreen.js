import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { Variables } from '../styles/theme';
import InputPrimary from '../components/InputPrimary';
import PrimaryButton from '../components/PrimaryButton';
import { CREATE_ACCOUNT_SUCCESS } from '../navigations/routes';
import { AuthContext } from '../store/AuthContext';
import { updateProfile } from 'firebase/auth';
import { addUserToFirebase } from '../../firebase';
import Avatar from '../components/Avatar';
import * as ImagePicker from 'expo-image-picker';
import uploadAvatarAsync from '../utils/uploadAvatarAsync';

const DEFUALT_AVATAR_URI = 'gs://rn-managepro.appspot.com/avatars/userdefault.png'

const CreateAccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(false)

    const defaultAvatar = require('../assets/userdefault.png')

    const { signUp } = useContext(AuthContext);

    const handleCreateAccountPress = async () => {
        setLoading(true)

        if (!username) {
            Alert.alert('Username error', 'Please enter a username you want to use');
            return;
        }

        if (username.length < 5) {
            Alert.alert('Username error', 'Username length must be at least 5 characters');
            return;
        }

        try {
            // signing up the user
            const user = await signUp(email, password);

            const photoURL = avatar?.uri ? avatar.uri : DEFUALT_AVATAR_URI

            // uploading an avatar if the user picked one
            if (photoURL !== DEFUALT_AVATAR_URI) {
                console.log('uploading avatar async');
                await uploadAvatarAsync(photoURL, user.user)
            }

            // updating the profile to username and avatar uri
            await updateProfile(user.user, { displayName: username, photoURL })

            // adding user to users collection
            addUserToFirebase({
                name: username,
                online: true,
                photoURL
            })

            navigation.navigate(CREATE_ACCOUNT_SUCCESS);

        } catch (error) {
            Alert.alert(error.message);
        }
        finally {
            setLoading(false)
        }
    };

    const onChooseAvatarPress = async () => {
        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('No access', 'Sorry we need camera roll permissions. Please enable the permission in settings.');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.2
        });

        if (!result.canceled) {
            setAvatar({ uri: result.assets[0].uri })
        }
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: Variables.colors.white,
                paddingHorizontal: 20,
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
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Image
                                source={avatar ? avatar : defaultAvatar}
                                style={styles.avatar}
                            />
                            <PrimaryButton text={'Choose avatar'} style={{ flex: 1, marginLeft: 40 }} onPress={onChooseAvatarPress} />
                        </View>
                    </View>
                    <PrimaryButton disabled={loading} style={{ marginTop: 20 }} text={'Next'} onPress={handleCreateAccountPress} />
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
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: Variables.colors.brand.default
    }
});
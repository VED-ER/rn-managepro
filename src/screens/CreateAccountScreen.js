import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { GlobalContext } from '../store/GlobalContext';

const CreateAccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('')
    const [loading, setLoading] = useState(false)

    const { signUp, setCurrentUser } = useContext(AuthContext);
    const { cacheImage } = useContext(GlobalContext)

    const handleCreateAccountPress = async () => {


        if (!username) {
            Alert.alert('Username error', 'Please enter a username you want to use');
            return;
        }

        if (username.length < 5) {
            Alert.alert('Username error', 'Username length must be at least 5 characters');
            return;
        }
        setLoading(true)
        try {
            // signing up the user
            const user = await signUp(email, password);

            // uploading an avatar
            const photoURL = await uploadAvatarAsync(selectedAvatar, user.user)

            // updating the profile to username and avatar uri
            await updateProfile(user.user, { displayName: username, photoURL: photoURL })

            setCurrentUser(user => ({ ...user, photoURL }))

            // adding user to users collection
            await addUserToFirebase({
                name: username,
                online: true,
                photoURL: photoURL
            },
                user.user.uid
            )

            // downloading an avatar
            if (selectedAvatar)
                await cacheImage(photoURL)


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
            setSelectedAvatar(result.assets[0].uri)
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
                            <Avatar imageUri={selectedAvatar} style={styles.avatar} />
                            <PrimaryButton
                                disabled={loading}
                                text={'Choose avatar'}
                                style={{ flex: 1, marginLeft: 40 }}
                                onPress={onChooseAvatarPress}
                            />
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
        borderWidth: 2,
        borderColor: Variables.colors.brand.default
    }
});
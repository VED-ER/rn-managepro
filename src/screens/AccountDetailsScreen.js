import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import Screen from '../components/Screen';
import * as ImagePicker from 'expo-image-picker';
import uploadAvatarAsync from '../utils/uploadAvatarAsync';
import { AuthContext } from '../store/AuthContext';
import Avatar from '../components/Avatar';
import { Variables } from '../styles/theme';
import InputPrimary from '../components/InputPrimary';
import { updateProfile } from 'firebase/auth';
import downloadImage from '../utils/downloadImage';
import { updateUserCollection } from '../../firebase';
import { Edit } from '../components/svg';

const AccountDetailsScreen = () => {
    const { currentUser, setCurrentUser, setAvatarUrl, avatarUrl } = useContext(AuthContext);
    const [username, setUsername] = useState(currentUser.displayName);
    const [email, setEmail] = useState(currentUser.email);

    const handleUploadAvatarPress = async () => {

        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('No access', 'Sorry we need camera roll permissions. Please enable the permission in settings.');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.2,
        });
        // console.log(JSON.stringify(result, null, 2));

        if (!result.canceled) {
            try {
                const photoURL = await uploadAvatarAsync(result.assets[0].uri, currentUser)
                const img = await downloadImage(photoURL)
                setAvatarUrl(img)
                await updateProfile(currentUser, { photoURL })

                setCurrentUser(user => ({ ...user, photoURL }))

                await updateUserCollection({ photoURL }, currentUser.uid)
            } catch (error) {
                Alert.alert(error.message)
            }
        }
    };

    return (
        <Screen>
            <ScrollView>
                <View style={styles.avatarContainer}>
                    <Avatar imageUri={avatarUrl} style={styles.avatar} imageStyle={styles.avatarImage} />
                    <Pressable
                        onPress={handleUploadAvatarPress}
                        style={({ pressed }) => ([styles.avatarEditContainer, pressed && { opacity: 0.9 }])}
                    >
                        <Edit width={20} height={20} color={Variables.colors.white} />
                    </Pressable>
                </View>
                <View style={{ padding: 15 }} />
                <InputPrimary
                    placeholder={'Username'}
                    value={username}
                    onChangeText={setUsername}
                />
                <View style={{ padding: 15 }} />
                <InputPrimary
                    placeholder={'Email'}
                    value={email}
                    onChangeText={setEmail}
                />
                {/* password is left to do */}
            </ScrollView>
        </Screen>
    );
};

export default AccountDetailsScreen;

const styles = StyleSheet.create({
    avatarContainer: {
        alignSelf: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Variables.colors.brand.default,
        // alignSelf: 'center'
    },
    avatarImage: {
        borderRadius: 100
    },
    avatarEditContainer: {
        width: 30,
        height: 30,
        backgroundColor: Variables.colors.brand.default,
        borderRadius: 30,
        position: 'absolute',
        bottom: 0,
        right: 0,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
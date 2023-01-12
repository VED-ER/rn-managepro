import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Screen from '../components/Screen'
import PrimaryButton from '../components/PrimaryButton'
import * as ImagePicker from 'expo-image-picker';
import uploadAvatarAsync from '../utils/uploadAvatarAsync';
import { AuthContext } from '../store/AuthContext';

const AccountDetailsScreen = () => {
    const { currentUser, setAvatarUrl } = useContext(AuthContext)

    const handleUploadAvatarPress = async () => {

        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert('No access', 'Sorry we need camera roll permissions. Please enable the permission in settings.')
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        // console.log(JSON.stringify(result, null, 2));

        if (!result.canceled) {
            uploadAvatarAsync(result.assets[0].uri, currentUser).then(setAvatarUrl)
        }
    }

    return (
        <Screen>
            <Text>demo</Text>
            <PrimaryButton text={'Upload avatar image'} onPress={handleUploadAvatarPress} />
        </Screen>
    )
}

export default AccountDetailsScreen

const styles = StyleSheet.create({})
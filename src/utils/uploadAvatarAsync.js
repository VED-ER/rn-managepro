import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";
import { storage } from "../../firebase";
import 'react-native-get-random-values';
import { v4 as uuidV4 } from "uuid"

const uploadAvatarAsync = async (file, currentUser) => {
    const response = await fetch(file)
    const blobFile = await response.blob()

    const avatarId = uuidV4()
    const filePath = `avatars/${currentUser.uid}/${currentUser.email}-avatar-${avatarId}.png`

    const fileRef = ref(storage, filePath)

    try {
        const snapshot = await uploadBytes(fileRef, blobFile)
        const photoURL = await getDownloadURL(snapshot.ref)

        await updateProfile(currentUser, { photoURL })
        return photoURL
    } catch (error) {
        Alert.alert('Error occured', error.message)
    }
}

export default uploadAvatarAsync
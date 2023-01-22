import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";
import { storage } from "../../firebase";
import 'react-native-get-random-values';
import { v4 as uuidV4 } from "uuid"

const uploadProjectCover = async (file, project) => {
    if (!file) return ''
    const response = await fetch(file)
    const blobFile = await response.blob()

    const coverId = uuidV4()
    const filePath = `projectCovers/${project.name}-${project.id}/cover-${coverId}.png`

    const fileRef = ref(storage, filePath)

    try {
        const snapshot = await uploadBytes(fileRef, blobFile)
        const photoURL = await getDownloadURL(snapshot.ref)

        return photoURL
    } catch (error) {
        Alert.alert('Error occured', error.message)
    }
}

export default uploadProjectCover
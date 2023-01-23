import ImageColors from 'react-native-image-colors';

const getImageColors = async () => {
    try {
        const result = await ImageColors.getColors(uri);
        return result;
    } catch (e) {
        Alert.alert(e.message);
    }
}

export default getImageColors
const getImageDimensions = async (uri) => {
    return new Promise((resolve, reject) => {
        Image.getSize(uri, (width, height) => resolve({ width, height }), () => reject('Error getting image dimensions'));
    });
}

export default getImageDimensions
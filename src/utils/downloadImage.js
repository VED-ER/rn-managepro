
const downloadImage = async (imageUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob();

            const reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onloadend = () => {
                resolve(reader.result)
            }
        } catch (err) {
            reject(err)
        }
    })
}

export default downloadImage
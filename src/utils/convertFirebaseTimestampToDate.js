
const convertFirebaseTimestampToDate = (timestamp) => {
    if (!timestamp) return null

    return new Date((timestamp.seconds + timestamp.nanoseconds * 10 ** -9) * 1000)
}

export default convertFirebaseTimestampToDate
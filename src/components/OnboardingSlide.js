import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const OnboardingSlide = ({ image, title }) => {
    const width = useWindowDimensions().width

    return (
        <View style={[styles.container, { width }]}>
            <Image
                source={image}
                style={styles.imageStyle}
                resizeMode={'contain'}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default OnboardingSlide

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 65,
        color: Variables.colors.black.dark900
    },
    imageStyle: {
        alignSelf: 'center',
        flex:1
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { onboardingSlides } from '../data/constants'
import { Variables } from '../styles/theme'

const OnboardingPaginator = ({ currentSlideIndex }) => {
    return (
        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
            {onboardingSlides.map((_, index) => <View key={index} style={[styles.paginationDot, currentSlideIndex === index ? styles.activeDot : {}]} />)}
        </View>
    )
}

export default OnboardingPaginator

const styles = StyleSheet.create({
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: Variables.colors.brand.light100,
        marginRight: 10
    },
    activeDot: {
        backgroundColor: Variables.colors.brand.default
    }
})
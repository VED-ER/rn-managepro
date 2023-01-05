import { FlatList, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Screen from '../components/Screen'
import OnboardingSlide from '../components/OnboardingSlide'
import { onboardingSlides } from '../data/constants'
import OnboardingPaginator from '../components/OnboardingPaginator'
import { Variables } from '../styles/theme'
import SignInContainer from '../components/SignInContainer'
import { LOGIN } from '../navigations/routes'

const OnboardingScreen = ({navigation}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    const renderItem = ({ item }) => <OnboardingSlide title={item.title} image={item.image} currentSlideIndex={currentSlideIndex} />

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentSlideIndex(viewableItems[0]?.index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const signInBtnHandler = () => {
        navigation.navigate(LOGIN)
    }

    const handleCreateAccountPress = () => {
        console.log('create account press');
    }

    return (
        <Screen withSafeArea style={styles.screenStyle}>
            <FlatList
                data={onboardingSlides}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                viewabilityConfig={viewConfig}
                onViewableItemsChanged={viewableItemsChanged}
                bounces={false}
            />
            <View style={styles.bottomContainer}>
                <OnboardingPaginator currentSlideIndex={currentSlideIndex} />
                <SignInContainer onSignInPress={signInBtnHandler} onCreateAccountPress={handleCreateAccountPress} />
            </View>
        </Screen>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    bottomContainer: {
        paddingHorizontal: 20
    },
    screenStyle: {
        paddingTop: 100,
        paddingHorizontal: 0,
    }
})


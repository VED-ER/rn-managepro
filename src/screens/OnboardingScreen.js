import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Screen from '../components/Screen'
import OnboardingSlide from '../components/OnboardingSlide'
import { onboardingSlides } from '../data/constants'
import OnboardingPaginator from '../components/OnboardingPaginator'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { FacebookLogo, GoogleLogo } from '../components/svg'
import { Variables } from '../styles/theme'

const OnboardingScreen = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    const renderItem = ({ item }) => <OnboardingSlide title={item.title} image={item.image} currentSlideIndex={currentSlideIndex} />

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentSlideIndex(viewableItems[0]?.index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const signInBtnHandler = () => {
        console.log('sign in');
    }

    const handleCreateAccountPress = () => {
        console.log('create account press');
    }

    return (
        <Screen style={styles.screenStyle}>
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
                <PrimaryButton text={'Sign In'} onPress={signInBtnHandler} />
                <View style={styles.buttonsContainer}>
                    <SecondaryButton
                        text={'Google'}
                        style={{ marginRight: 10 }}
                        LeftIcon={<GoogleLogo width={24} height={24} />}
                        textStyle={{ marginLeft: 15 }}
                    />
                    <SecondaryButton
                        text={'Facebook'}
                        style={{ marginLeft: 10 }}
                        LeftIcon={<FacebookLogo width={24} height={24} />}
                        textStyle={{ marginLeft: 15 }}
                    />
                </View>
                <Text style={styles.bottomText}>Join with us. <Text style={styles.createAccountText} onPress={handleCreateAccountPress}>Create Account</Text></Text>
            </View>
        </Screen>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    bottomText: {
        textAlign: 'center',
        marginTop: 35
    },
    createAccountText: {
        color: Variables.colors.brand.default
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 25
    },
    bottomContainer: {
        paddingHorizontal: 20
    },
    screenStyle: {
        paddingTop: 100,
        paddingHorizontal: 0,
    }
})


import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainNavigator from './navigations/MainNavigator'
import { AuthContextProvider } from './store/AuthContext'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

const Main = () => {
    return (
        <AuthContextProvider>
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </AuthContextProvider>
    )
}

export default Main
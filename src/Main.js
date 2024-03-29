import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainNavigator from './navigations/MainNavigator'
import { AuthContextProvider } from './store/AuthContext'
import * as SplashScreen from 'expo-splash-screen';
import { GlobalContextProvider } from './store/GlobalContext';
import { Host } from 'react-native-portalize';

SplashScreen.preventAutoHideAsync()

const Main = () => {
    return (
        <AuthContextProvider>
            <GlobalContextProvider>
                <NavigationContainer>
                    <Host>
                        <MainNavigator />
                    </Host>
                </NavigationContainer>
            </GlobalContextProvider>
        </AuthContextProvider>
    )
}

export default Main
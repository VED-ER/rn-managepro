import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useCallback, useContext, useEffect, useState } from "react";
import BackButton from "../components/header/BackButton";
import ProjectDetailsHeaderRight from "../components/header/ProjectDetailsHeaderRight";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateAccountSuccessScreen from "../screens/CreateAccountSuccessScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProjectDetailsScreen from "../screens/ProjectDetailsScreen";
import { AuthContext } from "../store/AuthContext";
import { ACCOUNT_DETAILS, CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS, CREATE_PROJECT, EDIT_PROJECT, FORGOT_PASSWORD, LOGIN, MAIN, ONBOARDING, PROJECT_DETAILS, TAB } from "./routes";
import TabNavigator from "./TabNavigator";
import * as SplashScreen from 'expo-splash-screen';
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import { Alert } from "react-native";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import { GlobalContext } from "../store/GlobalContext";
import EditProjectScreen from "../screens/EditProjectScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ navigation }) => {

    useFocusEffect(useCallback(() => {
        console.log('In TRANSITION END USE EFFECT');
        const unsubscribe = navigation.addListener('transitionEnd', (e) => {
            SplashScreen.hideAsync();
        });

        return unsubscribe;
    }, []));

    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => <BackButton />,
            headerShadowVisible: false,
            title: '',
        }}>
            <Stack.Screen
                name={TAB}
                component={TabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={CREATE_PROJECT}
                component={CreateProjectScreen}
            />
            <Stack.Screen
                name={PROJECT_DETAILS}
                component={ProjectDetailsScreen}
            // options={{
            //     headerRight: () => <ProjectDetailsHeaderRight />
            // }}
            />
            <Stack.Screen
                name={EDIT_PROJECT}
                component={EditProjectScreen}
            />
            <Stack.Screen
                name={ACCOUNT_DETAILS}
                component={AccountDetailsScreen}
                options={{
                    title: 'Account Details',
                    headerTitleAlign: 'center',
                    // headerRight: ()=> //pencil
                }}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    const { currentUser, loading } = useContext(AuthContext);
    const { cacheImage } = useContext(GlobalContext)

    const navigation = useNavigation();

    useEffect(() => {
        const initializeApp = async () => {
            if (currentUser) {
                try {
                    if (currentUser?.photoURL) {
                        await cacheImage(currentUser.photoURL)
                    }

                    navigation.reset({ index: 0, routes: [{ name: MAIN }] });
                } catch (error) {
                    Alert.alert(error.message)
                }
            } else {
                SplashScreen.hideAsync()
            }

        }

        if (!loading) {
            initializeApp()
        }
    }, [loading]);

    return (
        <>
            <StatusBar style="auto" />
            <Stack.Navigator screenOptions={{
                headerLeft: () => <BackButton />,
                headerShadowVisible: false,
                title: '',
            }}>
                <Stack.Screen
                    name={ONBOARDING}
                    component={OnboardingScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={LOGIN}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name={CREATE_ACCOUNT}
                    component={CreateAccountScreen}
                />
                <Stack.Screen
                    name={CREATE_ACCOUNT_SUCCESS}
                    component={CreateAccountSuccessScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={FORGOT_PASSWORD}
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen
                    name={MAIN}
                    component={AppNavigator}
                    options={{
                        headerShown: false,
                        // animation: 'none'
                    }}
                />
            </Stack.Navigator>
        </>
    );
};

export default MainNavigator;
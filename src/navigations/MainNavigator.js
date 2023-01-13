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
import { ACCOUNT_DETAILS, CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS, FORGOT_PASSWORD, LOGIN, MAIN, ONBOARDING, PROJECT_DETAILS, TAB } from "./routes";
import TabNavigator from "./TabNavigator";
import * as SplashScreen from 'expo-splash-screen';
import AccountDetailsScreen from "../screens/AccountDetailsScreen";

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
                name={PROJECT_DETAILS}
                component={ProjectDetailsScreen}
                options={{
                    headerRight: () => <ProjectDetailsHeaderRight />
                }}
            />
            <Stack.Screen
                name={ACCOUNT_DETAILS}
                component={AccountDetailsScreen}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    const [inited, setInited] = useState(false);
    const { currentUser, loading } = useContext(AuthContext);

    const navigation = useNavigation();

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                // simulating loading
                setInited(true);
                if (currentUser) {
                    navigation.reset({ index: 0, routes: [{ name: MAIN }] });
                    // console.log('CAS ', currentUser);
                }
                // SplashScreen.hideAsync();
            }, 500);
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
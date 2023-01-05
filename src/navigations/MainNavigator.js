import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/header/BackButton";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateAccountSuccessScreen from "../screens/CreateAccountSuccessScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS, FORGOT_PASSWORD, LOGIN, ONBOARDING } from "./routes";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerLeft: () => <BackButton />,
                    headerShadowVisible: false,
                    title: ''
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
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default MainNavigator
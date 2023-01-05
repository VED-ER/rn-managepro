import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/header/BackButton";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { FORGOT_PASSWORD, LOGIN, ONBOARDING } from "./routes";

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
                        name={FORGOT_PASSWORD}
                        component={ForgotPasswordScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default MainNavigator
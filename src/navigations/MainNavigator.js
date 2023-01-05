import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import OnboardingScreen from "../screens/OnboardingScreen";
import { ONBOARDING } from "./routes";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={ONBOARDING}
                        component={OnboardingScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default MainNavigator
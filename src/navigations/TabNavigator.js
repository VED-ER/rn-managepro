import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Avatar from "../components/Avatar";
import Logo from "../components/Logo";
import HomeScreen from "../screens/HomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import { CREATE_PROJECT, HOME, MESSAGE, PROFILE, PROJECTS } from "./routes";


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: ''
            }}>
            <Tab.Screen
                name={HOME}
                component={HomeScreen}
                options={{
                    headerLeft: () => <Logo style={{ marginLeft: 20 }} />,
                    headerRight: () => <Avatar style={{ marginRight: 20 }} />
                }}
            />
            <Tab.Screen
                name={PROJECTS}
                component={ProjectsScreen}
            />
            {/* <Tab.Screen
                name={CREATE_PROJECT}
                component={HomeScreen}
            /> */}
            <Tab.Screen
                name={MESSAGE}
                component={MessagesScreen}
            />
            <Tab.Screen
                name={PROFILE}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator
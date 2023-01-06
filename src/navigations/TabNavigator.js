import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Avatar from "../components/Avatar";
import CreateProjectModal from "../components/CreateProjectModal";
import Logo from "../components/Logo";
import { Hometab, Message, Projectstab, Setting4 } from "../components/svg";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import HomeScreen from "../screens/HomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import { Variables } from "../styles/theme";
import { CREATE_PROJECT, HOME, MESSAGE, PROFILE, PROJECTS } from "./routes";

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: '',
                tabBarActiveTintColor: Variables.colors.brand.default,
                tabBarInactiveTintColor: Variables.colors.black.light200,
                tabBarShowLabel: false,
                headerStyle: {
                    height: 130
                }
            }}>
            <Tab.Screen
                name={HOME}
                component={HomeScreen}
                options={{
                    headerLeft: () => <Logo style={{ marginLeft: 20 }} />,
                    headerRight: () => <Avatar style={{ marginRight: 20 }} />,
                    tabBarIcon: ({ color, size }) => (<Hometab width={size} height={size} color={color} />),


                }}
            />
            <Tab.Screen
                name={PROJECTS}
                component={ProjectsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (<Projectstab width={size} height={size} color={color} />),
                    headerTitle: 'My Projects',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        color: Variables.colors.black.dark900,
                        fontSize: 18,
                        // fontWeight: 'bold'
                    },
                    headerRight: () => (<View style={{ marginRight: 20 }}><Setting4 width={24} height={24} /></View>)
                }}
            />
            <Tab.Screen
                name={CREATE_PROJECT}
                component={CreateProjectScreen}
                options={{
                    tabBarButton: () => <CreateProjectModal />
                }}
            />
            <Tab.Screen
                name={MESSAGE}
                component={MessagesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (<Message width={size} height={size} color={color} />),
                }}
            />
            <Tab.Screen
                name={PROFILE}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Avatar style={{ width: 30, height: 30, borderColor: color, borderWidth: focused ? 2 : 0 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator
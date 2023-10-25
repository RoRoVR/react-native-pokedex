import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/home/Home";
import Notification from "../pages/Notification";
import Settings from "../pages/Settings";

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonDetails } from "../pages/home/components/PokemonDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackHome() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Main' component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
            name='PokemonDetails' 
            component={PokemonDetails}
            options={{ 
                headerShown: false
            }}
            />
        </Stack.Navigator>
    );
}

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="Home" component={StackHome}
                options={{
                    tabBarIcon: ({ focused }) => (<Entypo name="home" size={24} color={focused ? '#0FB455' : '#8B8C8B'} />),
                    headerShown: false
                }}
            />
            <Tab.Screen name="Notification" component={Notification}
                options={{
                    tabBarIcon: ({ focused }) => (<Ionicons name="notifications" size={24} color={focused ? '#0FB455' : '#8B8C8B'} />)
                }}
            />
            <Tab.Screen name="Settings" component={Settings}
            screenOptions={() => ({
                tabBarShowLabel: false
            })}
                options={{
                    tabBarIcon: ({ focused }) => (<Ionicons name="settings" size={24} color={focused ? '#0FB455' : '#8B8C8B'} />)
                }}
            />
        </Tab.Navigator>
    );
}



export default function BottonTab() {
    return (
        <NavigationContainer>
            <StackHome />
        </NavigationContainer>
    );
}
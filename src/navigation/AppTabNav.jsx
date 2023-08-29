import HomeScreen from '../screens/HomeScreen';
import React, { useCallback } from 'react';
import MapScreen from "../screens/MapScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CartScreen from '../screens/CartScreen';
import CartStack from './CartStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

function AppTabNav() {

    const IconComponent = useCallback((Icon, name, color, size)=>(
        <Icon 
            name={name}
            color={color}
            size={size}
        />
    ),[])

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => IconComponent(FontAwesome5,'home', color, size),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({ color, size }) => IconComponent(FontAwesome5,'map-marked-alt', color, size),
                }}
            />
            <Tab.Screen
                name="Carrito"
                component={CartStack}
                options={{
                    tabBarLabel: 'Carrito',
                    tabBarIcon: ({ color, size }) => IconComponent(FontAwesome5,'shopping-cart', color, size),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppTabNav;

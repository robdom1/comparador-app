import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import React, { useCallback, useContext } from 'react';
import MapScreen from "../screens/MapScreen";
import AppTabNav from './AppTabNav';
import RouteScreen from '../screens/RouteScreen';
import CartStack from './CartStack';
import { Button } from '@rneui/base';
import { View, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function AppStack() {

  const { logout } = useContext(AuthContext);

  const IconComponent = useCallback((Icon, name, color, size) => (
    <Icon
      name={name}
      color={color}
      size={size}
    />
  ), [])
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Button color={"white"} onPress={() => navigation.navigate("Carrito")}>
                {IconComponent(FontAwesome5, 'shopping-cart', "black", 20)}
              </Button>
              <Button color={"white"} onPress={() => {
                Alert.alert(
                  "Cerrar Sesión",
                  "Desea cerrar sesión?",
                  [
                    {
                      text: 'Cancel',
                      onPress: () => { },
                      style: 'cancel',
                    },
                    {
                      text: 'Ok',
                      onPress: () => logout(),
                    },
                  ]
                )
              }}>
                {IconComponent(FontAwesome5, 'user-circle', "black", 20)}
              </Button>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: 'Mapa' }}
      />
      <Stack.Screen
        name="Carrito"
        component={CartStack}
      />
      <Stack.Screen 
        name="Route" 
        component={RouteScreen} 
        options={{ title: 'Ruta' }}
        />
    </Stack.Navigator>
  );
}

export default AppStack;

import LoginScreen from '../screens/LoginScreen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name={'Register'}
        options={{headerShown: false}}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;

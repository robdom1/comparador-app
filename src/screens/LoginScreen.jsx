import { Button, Text } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Input } from '@rneui/themed';
import { useAuthService } from '../hooks/services/useAuthService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/Login/InputField';
import CustomButton from '../components/Login/CustomButton';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuthService();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 60,
          }}>
          Iniciar sesión
        </Text>

        <InputField
          label={'Nombre de usuario'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={usernameInput => setUsername(usernameInput)}
          value={username}
        />

        <InputField
          label={'Contraseña'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          onChangeText={passwordInput => setPassword(passwordInput)}
          value={password}
        />

        <CustomButton label={"Iniciar Sesión"} onPress={() => login(username, password)} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Nuevo en la app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;


import { Button, Image, Input, Text } from '@rneui/base';
import React, { createRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, SafeAreaView, Alert } from 'react-native';
import CustomButton from '../components/Login/CustomButton';
import InputField from '../components/Login/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthService } from '../hooks/services/useAuthService';

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const emailInputRef = createRef();
  const usernameInputRef = createRef();
  const nameInputRef = createRef();
  const lastNameInputRef = createRef();
  const passwordInputRef = createRef();
  const validatePasswordInputRef = createRef();

  const { register } = useAuthService();

  const handleRegister = () => {
    setErrortext('');
    if (!name) {
      Alert.alert('Validación', 'Por favor, ingrese su nombre');
      return;
    }

    if (!lastName) {
      Alert.alert('Validación', 'Por favor, ingrese su apellido');
      return;
    }

    if (!email) {
      Alert.alert('Validación', 'Por favor, ingrese su correo electrónico');
      return;
    }

    if (!username) {
      Alert.alert('Validación', 'Por favor, ingrese su nombre de usuario');
      return;
    }

    if (!password) {
      Alert.alert('Validación', 'Por favor, ingrese su contraseña');
      return;
    }

    if (!validatePassword) {
      Alert.alert('Validación', 'Por favor, confirme su contraseña');
      return;
    }

    if (email.length > 50){
      Alert.alert('Validación', 'Su correo debe tener menos de 50 caracteres');
      return;
    }

    if (username.length < 3 || username.length > 20){
      Alert.alert('Validación', 'Su nombre de usuario debe tener entre 3 y 20 caracteres');
      return;
    }

    if (password.length < 6){
      Alert.alert('Validación', 'Su contraseña debe tener más de 6 caracteres');
      return;
    }

    if (password !== validatePassword){
      Alert.alert('Validación', 'Su contraseña y confirmación no son iguales');
      return;
    }

    register(username, email, password, name, lastName);
  }


  return (

    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 60,
            marginTop: 110,
          }}>
          Registrarse
        </Text>


        <InputField
          label={'Nombre'}
          onChangeText={nameInput => setName(nameInput)}
          value={name}
          innerRef={nameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            lastNameInputRef.current && lastNameInputRef.current.focus()
          }
          blurOnSubmit={false}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={'Apellido'}
          onChangeText={lastNameInput => setLastName(lastNameInput)}
          value={lastName}
          innerRef={lastNameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
          blurOnSubmit={false}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={'Correo Electrónico'}
          onChangeText={emailInput => setEmail(emailInput)}
          value={email}
          innerRef={emailInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            usernameInputRef.current && usernameInputRef.current.focus()
          }
          blurOnSubmit={false}
          icon={
            <MaterialIcons
              name="email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Nombre de Usuario'}
          onChangeText={usernameInput => setUsername(usernameInput)}
          value={username}
          innerRef={usernameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={'Contraseña'}
          onChangeText={passwordInput => setPassword(passwordInput)}
          value={password}
          innerRef={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            validatePasswordInputRef.current && validatePasswordInputRef.current.focus()
          }
          blurOnSubmit={false}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <InputField
          label={'Confirmar contraseña'}
          onChangeText={passwordConfirmationInput => setValidatePassword(passwordConfirmationInput)}
          value={validatePassword}
          innerRef={validatePasswordInputRef}
          returnKeyType="next"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        {errortext !== '' ? (
          <Text style={styles.errorTextStyle}>
            {errortext}
          </Text>
        ) : null}

        <CustomButton label={'Registrarse'} onPress={() => handleRegister()} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Ya estás registrado?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

    // <View style={styles.container}>
    //   <Text h1>Registrar Usuario</Text>
    //   <KeyboardAvoidingView enabled>
    //     <View style={styles.SectionStyle}>
    //       <Input
    //         style={styles.inputStyle}
    //         underlineColorAndroid="#f000"
    //         placeholder="Correo electrónico"
    //         placeholderTextColor="#8b9cb5"
    //         returnKeyType="next"
    //         keyboardType="email-address"
    //         value={email}
    //         onChangeText={emailInput => setEmail(emailInput)}
    //         onSubmitEditing={() =>
    //           usernameInputRef.current && usernameInputRef.current.focus()
    //         }
    //         blurOnSubmit={false}
    //       />
    //     </View>
    //     <View style={styles.SectionStyle}>
    //       <Input
    //           style={styles.inputStyle}
    //           onChangeText={usernameInput => setUsername(usernameInput)}
    //           underlineColorAndroid="#f000"
    //           placeholder="Nombre de usuario"
    //           placeholderTextColor="#8b9cb5"
    //           ref={usernameInputRef}
    //           returnKeyType="next"
    //           onSubmitEditing={() =>
    //             nameInputRef.current && nameInputRef.current.focus()
    //           }
    //           blurOnSubmit={false}
    //           value={username}
    //         />
    //     </View>
    //     <View style={styles.SectionStyle}>
    //       <Input
    //         style={styles.inputStyle}
    //         onChangeText={nameInput => setName(nameInput)}
    //         underlineColorAndroid="#f000"
    //         placeholder="Nombre"
    //         autoCapitalize="sentences"
    //         placeholderTextColor="#8b9cb5"
    //         ref={nameInputRef}
    //         returnKeyType="next"
    //         onSubmitEditing={() =>
    //           lastNameInputRef.current && lastNameInputRef.current.focus()
    //         }
    //         blurOnSubmit={false}
    //         value={name}
    //       />
    //     </View>
    //     <View style={styles.SectionStyle}>
    //       <Input
    //         style={styles.inputStyle}
    //         onChangeText={lastNameInput => setLastName(lastNameInput)}
    //         underlineColorAndroid="#f000"
    //         placeholder="Apellido"
    //         autoCapitalize="sentences"
    //         placeholderTextColor="#8b9cb5"
    //         ref={lastNameInputRef}
    //         returnKeyType="next"
    //         onSubmitEditing={() =>
    //           passwordInputRef.current && passwordInputRef.current.focus()
    //         }
    //         blurOnSubmit={false}
    //         value={lastName}
    //       />
    //     </View>
    //     <View style={styles.SectionStyle}>
    //       <Input
    //         style={styles.inputStyle}
    //         onChangeText={passwordInput => setPassword(passwordInput)}
    //         underlineColorAndroid="#f000"
    //         placeholder="Contraseña"
    //         placeholderTextColor="#8b9cb5"
    //         ref={passwordInputRef}
    //         secureTextEntry={true}
    //         returnKeyType="next"
    //         onSubmitEditing={() =>
    //           validatePasswordInputRef.current && validatePasswordInputRef.current.focus()
    //         }
    //         blurOnSubmit={false}
    //         value={password}
    //       />
    //     </View>
    //     <View style={styles.SectionStyle}>
    //       <Input
    //         style={styles.inputStyle}
    //         onChangeText={validatePasswordInput => setValidatePassword(validatePasswordInput)}
    //         underlineColorAndroid="#f000"
    //         placeholder="Confirmar Contraseña"
    //         placeholderTextColor="#8b9cb5"
    //         ref={validatePasswordInputRef}
    //         secureTextEntry={true}
    //         returnKeyType="next"
    //         onSubmitEditing={Keyboard.dismiss}
    //         blurOnSubmit={false}
    //         value={validatePassword}
    //       />
    //     </View>
    //     <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    //       <Text style={styles.text_button}>Ya tienes usuario?</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //         style={styles.buttonStyle}
    //         activeOpacity={0.5}
    //         onPress={() => {}}>
    //         <Text style={styles.buttonTextStyle}>REGISTER</Text>
    //       </TouchableOpacity>
    //     <Button
    //       buttonStyle={styles.loginBtn}
    //       containerStyle={styles.loginBtnContainer}
    //       title="Iniciar Sesión"
    //       onPress={() => login(username, password)}
    //     />
    //   </KeyboardAvoidingView>
    // </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputView: {
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  text_button: {
    height: 30,
  },
  loginBtnContainer: {
    width: '80%',
    height: 50,
    marginTop: 30,
  },
  loginBtn: {
    borderRadius: 25,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});

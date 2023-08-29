import EncryptedStorage from 'react-native-encrypted-storage';
import { useContext } from 'react';
import { AxiosContext } from '../../context/AxiosContext';
import { AuthContext } from '../../context/AuthContext';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';

const API_URL = '/auth';

export function useAuthService(){
  const {publicAxios} = useContext(AxiosContext);
  const {setUserInfo} = useContext(AuthContext);

	const login = async (username, password) => {

		try {
			const response = await publicAxios.post(API_URL + '/login', {
				username,
				password,
			});

			if (response?.data?.token) {
				const retrievedUserInfo = response.data;
				setUserInfo(retrievedUserInfo);
				await EncryptedStorage.setItem('userInfo', JSON.stringify(retrievedUserInfo));
			}
		} catch (error) {

			if (!error?.response){
				console.error(`Login error ${error.message}`);
				return;
			}

			if (error.response.status === 403){
				Alert.alert('Validación', 'Usuario o contraseña incorrectos');
			} else if (error.response.status === 400) {
				let errorMessage;
				if (Array.isArray(error.response.data.message)){
					errorMessage = error.response.data.message.join('\n');
				} else {
					errorMessage = error.response.data.message;
				}
				Alert.alert('Validación', errorMessage);
			}
		}
	};

	const register = async (username, email, password, nombre, apellido) => {
		try {
			const response = await publicAxios.post(API_URL + '/register', {
				username,
				email,
				password,
				nombre,
				apellido,
			});

			if (response?.data?.token) {
				const retrievedUserInfo = response.data;
				setUserInfo(retrievedUserInfo);
				await EncryptedStorage.setItem('userInfo', JSON.stringify(retrievedUserInfo));
				Toast.show("Usuario Registrado", Toast.SHORT);
				return;
			}
		} catch (error) {

			if (!error?.response){
				console.error(`Register error ${error.message}`);
				return;
			}

			if (error.response.status === 403){
				Alert.alert('Validación', 'Usuario o contraseña incorrectos');
			} else if (error.response.status === 400) {
				let errorMessage;
				if (Array.isArray(error.response.data.message)){
					errorMessage = error.response.data.message.join('\n');
				} else {
					errorMessage = error.response.data.message;
				}
				Alert.alert('Validación', errorMessage);
			}
		}
	};

  return { login, register };
}


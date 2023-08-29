/* eslint-disable react-hooks/exhaustive-deps */
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppStack from './AppStack';

function AppNav() {
	const {userInfo, setUserInfo} = useContext(AuthContext);
	const [status, setStatus] = useState('loading');

	const isLoggedIn = useCallback(async () => {
		console.log('isLoggedIn');
		try {
			const value = await EncryptedStorage.getItem('userInfo');
			const retrievedUserInfo = JSON.parse(value);

			setUserInfo(retrievedUserInfo);
			setStatus('success');

		} catch (e) {
			setStatus('error');
			console.log(`isLoggedIn error ${e.message}`);
			setUserInfo(null);
		}
	}, []);

	useEffect(() => {
		isLoggedIn();
	}, [isLoggedIn]);

	if (status === 'loading') {
		return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<ActivityIndicator size={'large'} />
		</View>
		);
	}

	return (
		<NavigationContainer>
			{userInfo !== null ? <AppStack/> : <AuthStack />}
		</NavigationContainer>
	);
}

export default AppNav;

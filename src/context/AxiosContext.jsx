import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { createContext, useContext } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Config from "react-native-config";

export const AxiosContext = createContext(null);

const API_URL = `http://${Config.BACKEND_SERVER || '10.0.2.2'}:8080`;

export const AxiosProvider = ({ children }) => {
    const { getAccessToken, getRefreshToken, setUserInfo, userInfo, logout } = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: API_URL,
    });

    const publicAxios = axios.create({
        baseURL: API_URL,
    });

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${getAccessToken()}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = failedRequest => {

        console.log('refreshing');
        const data = {
            refreshToken: getRefreshToken(),
        };

        const options = {
            method: 'POST',
            data,
            url: API_URL + '/auth/refreshtoken',
        };

        return axios(options)
            .then(async tokenRefreshResponse => {
                failedRequest.response.config.headers.Authorization = 'Bearer ' + tokenRefreshResponse.data.accessToken;

                setUserInfo({
                    ...userInfo,
                    token: tokenRefreshResponse.data.accessToken,
                });

                await EncryptedStorage.setItem('userInfo', JSON.stringify({
                    ...userInfo,
                    token: tokenRefreshResponse.data.accessToken,
                }));

                return Promise.resolve();
            })
            .catch(e => {
                logout();
            });
    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    return (
        <AxiosContext.Provider
            value={{
                authAxios,
                publicAxios,
            }}>
            {children}
        </AxiosContext.Provider>
    );
};


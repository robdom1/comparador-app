import React, {createContext, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);

  const logout = async () => {
    await EncryptedStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  const getAccessToken = () => {
    return userInfo?.token;
  };

  const getRefreshToken = () => {
    return userInfo?.refreshToken;
  };


  return (
    <AuthContext.Provider value={{logout, userInfo, getAccessToken, getRefreshToken, setUserInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

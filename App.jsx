import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './components/SignUp';
import Preference from './components/Preference';
import News from './components/News';
import {AppContext} from './components/Context/ContextAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStack, AuthenticatedStack} from './components/navigation/stack';
import LoadingScreen from './components/miscellaneous/LoadingScreen';
import {AppRegistry} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {StatusBar} from 'react-native';

const App = () => {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState({});
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [refreshFeed, setRefreshFeed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const netConnection = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });
  }, []);

  useEffect(() => {
    const isLoggedIn = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('CodingBytes'));
      setUser(data);
      setIsTryingLogin(false);
    };

    isLoggedIn();
  }, []);

  return (
    <NativeBaseProvider>
      <StatusBar
        backgroundColor={darkMode ? '#333' : '#eee'}
        animated={true}
        barStyle={darkMode ? 'default' : 'dark-content'}
      />
      {isTryingLogin && <LoadingScreen />}
      {!isTryingLogin && (
        <AppContext.Provider
          value={{
            user,
            setUser,
            setRefreshFeed,
            refreshFeed,
            darkMode,
            setDarkMode,
            connected,
          }}>
          <NavigationContainer>
            {user === null && <AuthStack />}
            {user && <AuthenticatedStack />}
          </NavigationContainer>
        </AppContext.Provider>
      )}
    </NativeBaseProvider>
  );
};

export default App;

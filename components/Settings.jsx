import React, {useContext} from 'react';
import {Box, Switch, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image, Linking, Platform, TouchableOpacity} from 'react-native';
import {AppContext} from './Context/ContextAPI';
import VersionInfo from 'react-native-version-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingFeed from './SettingFeed';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Settings = ({navigation}) => {
  let {user, setUser, setRefreshFeed, refreshFeed, darkMode, setDarkMode} =
    useContext(AppContext);

  // Open playstore function
  const openPlayStore = () => {
    const packageName = Platform.OS === 'android' ? 'ByteBuddy' : 'ByteBuddy';
    try {
      Linking.openURL(`market://details?id=${packageName}`);
    } catch (error) {
      console.error('An error occurred: ', error);
      // Fallback to opening the store in the browser
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${packageName}`,
      );
    }
  };

  // Logout user function

  const logoutUser = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('CodingBytes');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const changePreferences = () => {
    try {
      navigation.navigate('Preference', {updateFeed: true});
    } catch (e) {
      console.log(e);
    }
  };

  const showSavedItems = () => {
    try {
      navigation.navigate('News', {showSavedItems: true});
    } catch (e) {
      console.log(e);
    }
  };

  const contributeConcepts = () => {
    try {
      navigation.navigate('Contribute');
    } catch (e) {
      console.log(e);
    }
  };

  const changeDarkMode = async () => {
    try {
      // await AsyncStorage.setItem('DARKMODE', JSON.stringify(data));
      let DARKMODE = await AsyncStorage.getItem('DARKMODE') || null;
      if (DARKMODE === null) {
        await AsyncStorage.setItem('DARKMODE', 'TRUE');
      } else if (DARKMODE === 'TRUE') {
        await AsyncStorage.setItem('DARKMODE', 'FALSE');
      } else if (DARKMODE === 'FALSE') {
        await AsyncStorage.setItem('DARKMODE', 'TRUE');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={'100%'}
      h={'100%'}
      bgColor={darkMode ? '#222' : '#f5f5f5'}
      pl={5}
      pr={5}
      pt={12}>
      <Box
        display={'flex'}
        w={'100%'}
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Box>
          <Box></Box>
          <Text
            fontSize={20}
            fontWeight={500}
            color={'#007dfe'}
            fontFamily={'Nunito'}>
            ByteBuddy
          </Text>
        </Box>
        <Box
          display={'flex'}
          flexDir={'row'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}>
          <Text pt={2}>
            <AntDesign
              name="arrowright"
              size={25}
              color={'#007DFE'}
              onPress={() => navigation.navigate('News')}
            />
          </Text>
        </Box>
      </Box>
      {/*  */}
      <Box mt={10} gap={6}>
        {/* First */}
        <SettingFeed
          leftIcon={'bookmark'}
          rightIcon={'chevron-thin-right'}
          title={'Saved Items'}
          func={showSavedItems}
        />
        {/* Second */}
        <SettingFeed
          leftIcon={'user'}
          rightIcon={'chevron-thin-right'}
          title={'Personalise Feed'}
          func={changePreferences}
        />

        {/* Dark Mode */}
        <Box
          w={'100%'}
          display={'flex'}
          bgColor={darkMode ? '#333' : '#fff'}
          borderWidth={0.3}
          borderColor={darkMode ? '#777' : '#bbb'}
          //   shadow={1}
          p={5}
          borderRadius={7}
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Box display={'flex'} flexDir={'row'} alignItems={'center'} gap={4}>
            <MaterialIcons
              name={'dark-mode'}
              color={darkMode ? '#f1f1f1' : '#777'}
              size={25}
            />
            <Text
              fontSize={18}
              color={darkMode ? '#f1f1f1' : '#222'}
              fontFamily={'Nunito'}>
              Dark mode
            </Text>
          </Box>
          <Box>
            {/* Toggle icon */}
            <Switch
              onTrackColor={'#007DFE'}
              isChecked={darkMode}
              onToggle={() => {
                changeDarkMode();
                setDarkMode(!darkMode);
              }}
            />
          </Box>
        </Box>
        {/* Contribute */}
        <SettingFeed
          leftIcon={'puzzle-piece'}
          rightIcon={'chevron-thin-right'}
          title={'Contribute'}
          func={contributeConcepts}
        />
        {/* Third */}
        <SettingFeed
          leftIcon={'star'}
          rightIcon={'chevron-thin-right'}
          title={'Rate our app'}
          func={openPlayStore}
        />
        {/* Forth */}
        <SettingFeed
          leftIcon={'logout'}
          rightIcon={'chevron-thin-right'}
          title={'Logout'}
          func={logoutUser}
        />
      </Box>
      {/* App version */}
      <Box w={'100%'} display={'flex'} alignItems={'center'} mt={5}>
        <Text
          color={darkMode ? '#f1f1f1' : '#999'}
          fontWeight={300}
          fontFamily={'Nunito'}>
          App version : 1.0.4
        </Text>
      </Box>
    </Box>
  );
};

export default Settings;

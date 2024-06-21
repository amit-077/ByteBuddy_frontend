import axios from 'axios';
import {
  Box,
  Button,
  Image,
  Input,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import React, {useContext, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BackHandler} from 'react-native';
import {AppContext} from './Context/ContextAPI';
import {url} from './utils/constant';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  GoogleAuthProvider,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  let {user, setUser, darkMode, setDarkMode} = useContext(AppContext);

  // useEffect(() => {
  //   const navigateUser = () => {
  //     if (user?.token) {
  //       navigation.navigate('News');
  //     }
  //   };

  //   navigateUser();
  // }, [user]);

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const showToast = message => {
    toast.show({description: message});
  };

  const navigateToNews = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'News'}],
    });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '857126373557-4i8ujv645krjtkevcahh4ihftu07g3bk.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const googleSign = async (name, email) => {
    setLoading(true);
    try {
      let {data} = await axios.post(`${url}/googleSignUp`, {name, email});
      console.log(data);
      setUser(data);
      await AsyncStorage.setItem('CodingBytes', JSON.stringify(data));
      navigateToHome();``
    } catch (e) {
      if (e.response.status === 400) {
        showToast('User exists, please login');
      }
    }
    setLoading(false);
  };

  const loginUser = async () => {
    if (!userData.email || !userData.password) {
      console.log('Please provide all credentials');
      showToast('Enter all the fields');
      return;
    }
    setLoading(true);
    try {
      const {data} = await axios.post(`${url}/login`, {
        userData,
      });
      console.log(data);
      setUser(data);
      await AsyncStorage.setItem('CodingBytes', JSON.stringify(data));
      navigateToNews();
    } catch (e) {
      e.response.status === 401
        ? showToast('User does not exist')
        : e.response.status === 400
        ? showToast('Wrong credentials')
        : showToast('Error while signing up');
    }
    setLoading(false);
  };

  const googleLogin = async email => {
    setLoading(true);
    try {
      let {data} = await axios.post(`${url}/googleLogin`, {email});
      console.log(data);
      setUser(data);
      await AsyncStorage.setItem('CodingBytes', JSON.stringify(data));
      navigateToNews();
    } catch (e) {
      if (e.response.status === 400) {
        navigation.navigate('SignUp');
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Box w={'100%'} h={'100%'} bgColor={darkMode ? '#333' : '#fff'}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={{
            bgColor: '#fff',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Box mt={5}>
            <Image
              alt="SignUp Image"
              source={require('../assets/signup.jpg')}
              width={'100%'}
              height={300} // 250, for google login button
            />
          </Box>
          <Box paddingLeft={5} paddingRight={5}>
            <Box>
              <Text
                fontSize={30}
                fontWeight={'500'}
                fontFamily={'Nunito'}
                color={darkMode ? '#f5f5f5' : '#333'}>
                Login
              </Text>
            </Box>
            {/* Inputs */}
            <Box>
              <Box mt={5} display={'flex'} flexDir={'column'} gap={3}>
                <Input
                  variant="underlined"
                  color={darkMode ? '#f5f5f5' : '#333'}
                  placeholder="Email ID"
                  fontFamily={'Nunito'}
                  name="email"
                  value={userData.email}
                  fontSize={15}
                  borderColor={'#e1e1e1'}
                  pl={2}
                  InputLeftElement={
                    <AntDesign name="mail" size={20} color={'#e1e1e1'} />
                  }
                  onChangeText={e => {
                    setUserData(prevVal => {
                      return {...prevVal, email: e};
                    });
                  }}
                />
                <Input
                  variant="underlined"
                  placeholder="Password"
                  fontFamily={'Nunito'}
                  name="password"
                  value={userData.password}
                  type={show ? 'text' : 'password'}
                  fontSize={15}
                  borderColor={'#e1e1e1'}
                  pl={2}
                  color={darkMode ? '#f5f5f5' : '#333'}
                  onChangeText={e => {
                    setUserData(prevVal => {
                      return {...prevVal, password: e};
                    });
                  }}
                  InputLeftElement={
                    <IonIcon
                      name="lock-closed-outline"
                      size={20}
                      color={'#e1e1e1'}
                    />
                  }
                  InputRightElement={
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setShow(!show);
                      }}>
                      <IonIcon
                        name={show ? 'eye-off' : 'eye'}
                        size={20}
                        color={'#e1e1e1'}
                        style={{paddingRight: 15}}
                      />
                    </TouchableOpacity>
                  }
                />
              </Box>
              <Box>
                <Text></Text>
              </Box>
              <Box mt={7}>
                <Button
                  isLoading={loading}
                  bg={'#007DFE'}
                  _pressed={{bg: '#268ffc'}}
                  onPress={() => {
                    loginUser();
                  }}>
                  <Text color={'#f5f5f5'} fontSize={18} fontFamily={'Nunito'}>
                    Login
                  </Text>
                </Button>
              </Box>
              {/* Google Signin Button */}
              <Pressable
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 15,
                  position: 'relative',
                }}
                onPress={() => {
                  console.log('Pressed');
                }}>
                <Pressable
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    zIndex: 999,
                  }}
                  onPress={async () => {
                    try {
                      let data = await onGoogleButtonPress();
                      let {email} = data.additionalUserInfo.profile;
                      googleLogin(email);
                    } catch (e) {
                      console.log(e);
                    }
                  }}>
                  {/* <Text>Login</Text> */}
                </Pressable>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  disabled={loading}
                />
              </Pressable>

              <Box
                w={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={3}>
                <Text
                  fontFamily={'Nunito'}
                  color={darkMode ? '#f5f5f5' : '222'}>
                  Don't have an account ?{' '}
                  <Text
                    fontWeight={'500'}
                    color={'#007DFE'}
                    onPress={() => {
                      navigation.navigate('SignUp');
                    }}>
                    Sign Up
                  </Text>
                </Text>
              </Box>
            </Box>
          </Box>
        </KeyboardAvoidingView>
      </Box>
    </SafeAreaView>
  );
};

export default Login;

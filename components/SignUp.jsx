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

const SignUp = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  let {user, setUser, darkMode, setDarkMode} = useContext(AppContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '857126373557-4i8ujv645krjtkevcahh4ihftu07g3bk.apps.googleusercontent.com',
    });
  }, []);

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

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Preference'}],
    });
  };

  const registerUser = async () => {
    if (!userData.name || !userData.email || !userData.password) {
      console.log('Please provide all credentials');
      showToast('Enter all the fields');
      return;
    }
    setLoading(true);
    try {
      const {data} = await axios.post(`${url}/register`, {
        userData,
      });
      console.log(data);
      setUser(data);
      await AsyncStorage.setItem('CodingBytes', JSON.stringify(data));
      navigateToHome();
    } catch (e) {
      e.response.status === 400
        ? showToast('User already exist')
        : showToast('Error while signing up');
    }
    setLoading(false);
  };

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
      navigateToHome();
    } catch (e) {
      if (e.response.status === 400) {
        showToast('User exists, please login');
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box w={'100%'} h={'100%'} bgColor={darkMode ? '#333' : '#fff'}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={{
              bgColor: '#fff',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Box mt={3}>
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
                  Register
                </Text>
              </Box>
              {/* Inputs */}
              <Box>
                <Box mt={5} display={'flex'} flexDir={'column'} gap={3}>
                  <Input
                    variant="underlined"
                    color={darkMode ? '#f5f5f5' : '#333'}
                    fontFamily={'Nunito'}
                    placeholder="Name"
                    name="name"
                    value={userData.name}
                    fontSize={15}
                    borderColor={'#e1e1e1'}
                    pl={2}
                    InputLeftElement={
                      <AntDesign name="user" size={20} color={'#e1e1e1'} />
                    }
                    onChangeText={e => {
                      setUserData(prevVal => {
                        return {...prevVal, name: e};
                      });
                    }}
                  />
                  <Input
                    variant="underlined"
                    placeholder="Email ID"
                    fontFamily={'Nunito'}
                    color={darkMode ? '#f5f5f5' : '#333'}
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
                {/* Register button */}
                <Box mt={5}>
                  <Button
                    isLoading={loading}
                    bg={'#007DFE'}
                    _pressed={{bg: '#268ffc'}}
                    onPress={() => {
                      registerUser();
                    }}>
                    <Text color={'#f5f5f5'} fontSize={18} fontFamily={'Nunito'}>
                      Register
                    </Text>
                  </Button>
                </Box>
                {/* Google Signin Button */}
                <Box w={'100%'} mt={4} display={'flex'} alignItems={'center'}>
                  <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    disabled={loading}
                    onPress={async () => {
                      let data = await onGoogleButtonPress();
                      let {name, email} = data.additionalUserInfo.profile;
                      if (name && email) {
                        googleSign(name, email);
                      }
                    }}
                  />
                </Box>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  pb={10}
                  pt={5}>
                  <Text
                    fontFamily={'Nunito'}
                    color={darkMode ? '#f5f5f5' : '222'}>
                    Already have an account ?{' '}
                    <Text
                      fontWeight={'500'}
                      color={'#007DFE'}
                      onPress={() => {
                        navigation.navigate('Login');
                      }}>
                      Login
                    </Text>
                  </Text>
                </Box>
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

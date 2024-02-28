import {Box, Button, Image, Text} from 'native-base';
import React, {useContext, useEffect, useRef, useState} from 'react';
import NewsHeader from './miscellaneous/NewsHeader';
import Carousel from 'react-native-snap-carousel';
import {Dimensions, DrawerLayoutAndroid, LogBox, Pressable} from 'react-native';
import SingleItem from './miscellaneous/SingleItem';
import axios from 'axios';
import {AppContext} from './Context/ContextAPI';
import LottieView from 'lottie-react-native';
import {useRoute} from '@react-navigation/native';
import {url} from './utils/constant';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  GoogleAuthProvider,
} from '@react-native-google-signin/google-signin';

const News = ({navigation}) => {
  const windowHeight = Dimensions.get('window').height;


  const route = useRoute();
  const showSavedItems = route?.params?.showSavedItems;

  const [savedItems, setSavedItems] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  let {user, setUser, refreshFeed, darkMode, setDarkMode, connected} =
    useContext(AppContext);
  const [dataItems, setDataItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);

    try {
      const {data} = await axios.get(`${url}/getFeed?token=${user?.token}`);
      setDataItems(data);
      // To get all saved items
      const data1 = await axios.get(`${url}/getAllSaved?token=${user?.token}`);
      setSavedItems(data1.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchSavedItems = async () => {
    setLoading(true);

    try {
      const {data} = await axios.get(
        `${url}/getSavedItems?token=${user?.token}`,
      );
      setDataItems(data.savedItems);
      console.log(data.savedItems);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    showSavedItems ? fetchSavedItems() : getData();
    // fetchSavedItems();
  }, [refreshFeed, showSavedItems]);

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

  return (
    <Box w={'100%'} h={'100%'} bgColor={darkMode ? '#222' : '#f5f5f5'}>
      {/*  */}
      <NewsHeader navigationNews={navigation} showSavedItems={showSavedItems} />
      {!connected && (
        <Box
          w={'100%'}
          h={'100%'}
          display={'flex'}
          alignItems={'center'}
          bgColor={'#fff'}
          gap={2}
          pb={20}
          justifyContent={'center'}>
          <Image
            source={require('../assets/offline5.png')}
            height={300}
            width={300}
            alt="offline image"
          />
        </Box>
      )}
      {showSavedItems && dataItems.length == 0 && (
        <Box
          w={'100%'}
          h={'100%'}
          justifyContent={'center'}
          pb={20}
          alignItems={'center'}>
          <Text fontSize={16} color={'#888'}>
            You haven't begun saving anything.
          </Text>
          <Text fontSize={16} color={'#888'}>
            Begin right away!
          </Text>
        </Box>
      )}
      {!loading && connected && (
        <Box w={'100%'} mt={5}>
          <Carousel
            layout="stack"
            removeClippedSubviews={false}
            snapToStart={true}
            data={dataItems}
            firstItem={dataItems.length - 1}
            layoutCardOffset={18}
            sliderHeight={windowHeight}
            enableSnap={true}
            renderItem={({item, index}) => {
              return (
                <SingleItem
                  item={item}
                  index={index}
                  showSavedItems={showSavedItems}
                  isSaved={savedItems.savedItems.includes(item._id)}
                  windowHeight={windowHeight}
                />
              );
            }}
            itemHeight={windowHeight}
            vertical={true}
            onSnapToItem={index => {
              setActiveIndex(index);
            }}
          />
        </Box>
      )}
      {loading && connected && (
        <Box
          w={'100%'}
          h={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          pb={20}>
          <Box position={'relative'}>
            <LottieView
              source={require('./loader1.json')}
              autoPlay
              loop
              style={{width: 110, height: 100}}
            />
            <Text
              position={'absolute'}
              bottom={2}
              fontWeight={400}
              color={'#444'}>
              {showSavedItems
                ? 'Fetching saved items...'
                : 'Loading your feed...'}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default News;

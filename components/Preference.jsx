import {
  ActivityIndicator,
  BackHandler,
  Pressable,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Badge, Box, Button, ScrollView, Text, useToast} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios, {all} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './Context/ContextAPI';
import {useRoute} from '@react-navigation/native';
import {url} from './utils/constant';

const Preference = ({navigation}) => {
  const route = useRoute();
  const updateFeed = route?.params?.updateFeed;
  // If updateFeed is true, it means that user want to update the feed.

  const suggestedTopics = [
    'AI',
    'Blockchain',
    'Data Science',
    'Programming Languages',
    'Web3',
    'Cyber Security',
    'Javascript',
    'Web Development',
    'Machine Learning',
    'Databases',
    'Operating Systems',
  ];

  const moreTopics = [
    'Algorithms',
    'Cloud Computing',
    'Big Data',
    'Python',
    'Nodejs',
    'Git',
    'GitHub',
    'Typescript',
    'NextJS',
    'GraphQL',
    'Swift',
    'Go',
    'Kotlin',
    'SQL',
    'ReactJS',
    'React-Native',
    'Ruby',
    'MongoDB',
    'Redis',
    'Java',
    'Flutter',
    'Dart',
    'Security',
    'API',
    'Linux',
    'Open Source',
  ];

  const lastBackPressedTime = useRef(0);

  const toast = useToast();

  const {user, setUser, setRefreshFeed, darkMode, setDarkMode} =
    useContext(AppContext);

  const pressBackTwice = () => {
    const currentTime = new Date().getTime();

    // Check if the back button was pressed within 2 seconds
    if (currentTime - lastBackPressedTime.current < 2000) {
      // If pressed within 2 seconds, exit the app
      BackHandler.exitApp();
      return true;
    }

    // If not pressed within 2 seconds, show a message
    lastBackPressedTime.current = currentTime;
    toast.show({description: 'Press back again to exit', duration: 1000});
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', pressBackTwice);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', pressBackTwice);
    };
  }, []);

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);

  useEffect(() => {
    const getSelectedTopics = async () => {
      setFeedLoading(true);
      try {
        const {data} = await axios.get(`${url}/getUser?token=${user?.token}`);
        setSelectedTopics(data[0].feed);
      } catch (e) {
        console.log(e);
      }
      setFeedLoading(false);
    };

    updateFeed && getSelectedTopics();
  }, []);

  const showToast = message => {
    toast.show({description: message});
  };

  const clearNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'News'}],
    });
  };

  const setUserTopics = async allTopics => {
    setLoading(true);
    if (allTopics) {
      topicsArray = ['*'];
    } else {
      topicsArray = selectedTopics;
    }
    try {
      const {data} = await axios.post(
        `${url}/updateTopics?token=${user.token}`,
        {
          topicsArray,
        },
      );
      console.log(data);
      if (data) {
        showToast('Feed updated');
        setRefreshFeed(prevVal => {
          return !prevVal;
        });
        updateFeed && navigation.goBack();
        !updateFeed && clearNavigation();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      {feedLoading && (
        <Box
          w={'100%'}
          h={'100%'}
          display={'flex'}
          justifyContent={'center'}
          bgColor={darkMode ? '#222' : '#f5f5f5'}
          alignItems={'center'}>
          <ActivityIndicator size={'40'} color={'#007DFE'} />
        </Box>
      )}
      {!feedLoading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            w={'100%'}
            h={'100%'}
            position={'relative'}
            bgColor={darkMode ? '#222' : '#f5f5f5'}>
            {
              <Box
                mt={12}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                alignItems={'center'}
                pl={3}
                pr={5}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <AntDesign name="arrowleft" size={25} color={'#007DFE'} />
                </TouchableOpacity>
                {!updateFeed && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      // navigation.navigate('News');
                      setUserTopics(true);
                    }}>
                    <Text
                      fontWeight={600}
                      color={'#007DFE'}
                      fontSize={15}
                      fontFamily={'Nunito'}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                )}
              </Box>
            }
            {/* Heading */}
            <Box paddingLeft={5} paddingRight={5} marginTop={7}>
              <Box>
                <Text
                  fontSize={18}
                  color={darkMode ? '#f1f1f1' : '#222'}
                  fontFamily={'Nunito'}>
                  What topics capture your interest ?
                </Text>
              </Box>
              <Box mt={1}>
                <Text
                  fontSize={15}
                  color={darkMode ? '#bbb' : '#222'}
                  fontFamily={'Nunito'}>
                  Select at least 5 topics interest you the most.
                </Text>
              </Box>
              {/* Suggested Topics */}
              <Box marginTop={7}>
                <Text
                  fontSize={17}
                  fontWeight={500}
                  fontFamily={'Nunito'}
                  color={darkMode ? '#f1f1f1' : '#111'}>
                  Suggested topics for you.
                </Text>
              </Box>
              {/* Different suggested topics */}
              <Box
                display={'flex'}
                flexDir={'row'}
                flexWrap={'wrap'}
                gap={3}
                mt={3}>
                {suggestedTopics.map((e, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        if (
                          selectedTopics.length >= 10 &&
                          !selectedTopics.includes(e)
                        ) {
                          showToast('Only 10 topics can be selected.');
                          return;
                        }
                        if (!selectedTopics.includes(e)) {
                          setSelectedTopics(prevVal => {
                            return [...prevVal, e];
                          });
                        } else {
                          setSelectedTopics(prevVal => {
                            return prevVal.filter(item => {
                              return item != e;
                            });
                          });
                        }
                      }}>
                      <Box
                        bgColor={
                          selectedTopics.includes(e)
                            ? '#007DFE'
                            : darkMode
                            ? '#333'
                            : 'rgba(239,239,239,1)'
                        }
                        paddingLeft={4}
                        paddingRight={4}
                        paddingTop={1}
                        paddingBottom={1}
                        borderWidth={0.5}
                        borderColor={darkMode ? '#666' : '#d1d1d1'}
                        borderRadius={5}>
                        <Text
                          fontWeight={500}
                          fontFamily={'Nunito'}
                          color={
                            selectedTopics.includes(e)
                              ? '#f5f5f5'
                              : darkMode
                              ? '#f5f5f5'
                              : '#333'
                          }>
                          {e}
                        </Text>
                      </Box>
                    </Pressable>
                  );
                })}
              </Box>
              {/* More topics */}
              {/* Suggested Topics */}
              <Box marginTop={8}>
                <Text
                  fontSize={17}
                  fontWeight={500}
                  fontFamily={'Nunito'}
                  color={darkMode ? '#f1f1f1' : '#111'}>
                  More topics for you.
                </Text>
              </Box>
              {/* Different more topics */}
              <Box
                display={'flex'}
                flexDir={'row'}
                flexWrap={'wrap'}
                gap={3}
                mt={3}>
                {moreTopics.map((e, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        if (
                          selectedTopics.length >= 10 &&
                          !selectedTopics.includes(e)
                        ) {
                          showToast('Only 10 topics can be selected.');

                          return;
                        }
                        if (!selectedTopics.includes(e)) {
                          setSelectedTopics(prevVal => {
                            return [...prevVal, e];
                          });
                        } else {
                          setSelectedTopics(prevVal => {
                            return prevVal.filter(item => {
                              return item != e;
                            });
                          });
                        }
                      }}>
                      <Box
                        bgColor={
                          selectedTopics.includes(e)
                            ? '#007DFE'
                            : darkMode
                            ? '#333'
                            : 'rgba(239,239,239,1)'
                        }
                        paddingLeft={4}
                        paddingRight={4}
                        paddingTop={1}
                        paddingBottom={1}
                        borderWidth={0.5}
                        borderColor={darkMode ? '#666' : '#d1d1d1'}
                        borderRadius={5}>
                        <Text
                          fontWeight={500}
                          fontFamily={'Nunito'}
                          color={
                            selectedTopics.includes(e)
                              ? '#f5f5f5'
                              : darkMode
                              ? '#f5f5f5'
                              : '#333'
                          }>
                          {e}
                        </Text>
                      </Box>
                    </Pressable>
                  );
                })}
              </Box>
              <Box w={'100%'} h={25}></Box>
            </Box>
            {/* Next Button */}
            <Box position={'relative'} mb={12} w={'100%'}>
              <TouchableOpacity activeOpacity={0.9}>
                {/* <Box
                bgColor={'#007DFE'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'center'}
                gap={2}
                alignItems={'center'}
                paddingTop={2}
                paddingBottom={2}>
                <Text color={'#f5f5f5'} fontSize={18}>
                  Select topics
                </Text>
                </Box> */}
                <Button
                  isLoading={loading}
                  borderBottomLeftRadius={0}
                  borderBottomRightRadius={0}
                  bg={'#007DFE'}
                  _pressed={{bg: '#268ffc'}}
                  onPress={() => {
                    if (selectedTopics.length < 5) {
                      showToast('Select at least 5 topics.');
                      return;
                    }
                    setUserTopics(false);
                  }}>
                  <Text color={'#f5f5f5'} fontSize={18} fontFamily={'Nunito'}>
                    {updateFeed ? 'Update Topics' : 'Select topics'}
                  </Text>
                </Button>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Preference;

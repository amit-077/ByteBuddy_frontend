import React, {useContext} from 'react';
import {Box, Text, useToast} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable, TouchableOpacity} from 'react-native';
import {AppContext} from '../Context/ContextAPI';

const NewsHeader = ({navigationNews, showSavedItems}) => {
  let {
    user,
    setUser,
    setRefreshFeed,
    refreshFeed,
    darkMode,
    setDarkMode,
    connected,
  } = useContext(AppContext);

  const toast = useToast();

  function showToast(message) {
    toast.show({description: message});
  }

  return (
    <SafeAreaView>
      <Box w={'100%'}>
        <Box
          w={'100%'}
          bgColor={darkMode ? '#333' : '#eee'}
          pt={3}
          pb={3}
          display={'flex'}
          pl={3}
          pr={3}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexDir={'row'}>
          <Pressable
            onPress={() => {
              if (!connected) {
                showToast('No internet connection');
                return;
              }
              navigationNews.navigate('Settings');
            }}>
            <Box>
              <Text>
                <FontAwesome6
                  name="bars-staggered"
                  color={'#007DFE'}
                  size={20}
                />
              </Text>
            </Box>
          </Pressable>
          <Box>
            <Text
              fontSize={16}
              fontWeight={600}
              fontFamily={'Nunito'}
              color={darkMode ? '#f1f1f1' : '#333'}
              pl={2}
              pr={2}
              borderBottomWidth={2.5}
              borderColor={'#007DFE'}
              paddingBottom={0.6}
              borderRadius={3}>
              {showSavedItems ? 'Saved Items' : 'My Feed'}
            </Text>
          </Box>
          <Box>
            {showSavedItems ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigationNews.navigate('News');
                }}>
                <Text>
                  <AntDesign name="arrowright" color={'#007DFE'} size={24} />
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setRefreshFeed(prevVal => {
                    return !prevVal;
                  });
                }}>
                <Text>
                  <MaterialCommunityIcons
                    name="refresh"
                    color={'#007DFE'}
                    size={24}
                  />
                </Text>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default NewsHeader;

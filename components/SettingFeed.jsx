import {TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {Box, Text} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppContext} from './Context/ContextAPI';

const SettingFeed = ({leftIcon, rightIcon, title, func}) => {
  let {darkMode, setDarkMode} = useContext(AppContext);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={func}>
      <Box
        w={'100%'}
        display={'flex'}
        bgColor={darkMode ? '#333' : '#fff'}
        p={5}
        borderWidth={0.3}
        borderColor={darkMode ? '#777' : '#bbb'}
        // shadow={1}
        borderRadius={7}
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Box display={'flex'} flexDir={'row'} alignItems={'center'} gap={4}>
          {leftIcon !== 'logout' && (
            <FontAwesome
              name={leftIcon}
              color={darkMode ? '#f1f1f1' : '#777'}
              size={23}
            />
          )}
          {leftIcon === 'logout' && (
            <MaterialIcons
              name={leftIcon}
              color={darkMode ? '#f1f1f1' : '#777'}
              size={23}
            />
          )}
          <Text fontSize={18} color={darkMode ? '#f1f1f1' : '#222'}>
            {title}
          </Text>
        </Box>
        <Box>
          <Entypo
            name={rightIcon}
            color={darkMode ? '#f1f1f1' : '#777'}
            size={15}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SettingFeed;

import {Box, Image, Text} from 'native-base';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Box
      w={'100%'}
      h={'100%'}
      bgColor={'#f5f5f5'}
      display={'flex'}
      justifyContent={'center'}
      position={'relative'}
      alignItems={'center'}>
      <Box>
        <Image
          source={require('../Context/logo75.png')}
          width={250}
          height={250}
          alt="Loading screen logo"
        />
      </Box>
      <Box position={'absolute'} bottom={7}>
        <Text fontSize={16} color={'#333'} fontWeight={400}>
          Discover tech insights with each swipe.
        </Text>
      </Box>
    </Box>
  );
};

export default LoadingScreen;

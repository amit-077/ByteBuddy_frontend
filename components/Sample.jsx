import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';
import {WebView} from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Sample = ({link}) => {
  const route = useRoute();
  const uriLink = route.params.link;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView>
      <Box w={'100%'} h={'100%'}>
        {loading && (
          <Box
            w={'100%'}
            h={'100%'}
            display={'flex'}
            justifyContent={'center'}
            //   bgColor={darkMode ? '#222' : '#f5f5f5'}
            alignItems={'center'}>
            <ActivityIndicator size={'40'} color={'#007DFE'} />
          </Box>
        )}
        <WebView
          source={{uri: uriLink}}
          renderLoading={<Text>Hello loading</Text>}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Sample;

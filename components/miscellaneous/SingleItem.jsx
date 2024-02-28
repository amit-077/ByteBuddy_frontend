import {
  Dimensions,
  Linking,
  LogBox,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Box,
  Button,
  Image,
  ScrollView,
  Skeleton,
  Text,
  Tooltip,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {AppContext} from '../Context/ContextAPI';
import RBSheet from 'react-native-raw-bottom-sheet';
import {url} from '../utils/constant';

const SingleItem = ({item, index, showSavedItems, isSaved, windowHeight}) => {
  const [savedItem, setSavedItem] = useState(false);

  useEffect(() => {
    (showSavedItems || isSaved) && setSavedItem(true);
  }, [showSavedItems]);

  const rbSheet = useRef('');

  let {user, setUser, darkMode, setDarkMode} = useContext(AppContext);

  const saveItem = async () => {
    try {
      let {data} = await axios.post(`${url}/saveItem?token=${user.token}`, {
        item,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={'100%'}
      h={'100%'}
      bgColor={'#efefef'}
      marginTop={5}
      borderRadius={5}
      overflow={'hidden'}>
      {/* GB SHEET */}
      {item?.by && (
        <RBSheet
          ref={rbSheet}
          height={450}
          duration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: '#eee',
              alignItems: 'center',
              padding: 30,
              paddingTop: 0,
            },
          }}>
          <Box>
            <ScrollView>
              <Box>
                {/* Top dash line */}
                <Box w={'100%'} alignItems={'center'} mt={3}>
                  <Box w={12} h={1} bgColor={'#999'} borderRadius={100}></Box>
                </Box>
                <Text fontSize={16} marginBottom={3} fontWeight={'600'} mt={7}>
                  ANSWER :{' '}
                </Text>
                <Text fontSize={16}>{item?.answer}</Text>
              </Box>
            </ScrollView>
          </Box>
        </RBSheet>
      )}
      {/* Card Image */}
      <Box w={'100%'} position={'relative'}>
        {item.image && (
          <Image
            alt="Technology Image"
            // fallbackElement={<Skeleton width={'100%'} height={'100%'} />}
            source={{
              uri: item?.image,
            }}
            w={'100%'}
            h={200}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity activeOpacity={0.8}>
          <Box
            position={'absolute'}
            bottom={2}
            left={2}
            pl={2.5}
            pr={2.5}
            pt={0.5}
            pb={0.5}
            borderRadius={6}
            bgColor={'rgba(255,255,255,0.4)'}>
            <Text fontSize={windowHeight / 47} color={'#f5f5f5'}>
              {item?.tag || 'Brainstorm'}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
      {/* Card Title */}
      <Box h={'100%'} bgColor={darkMode ? '#222' : '#f5f5f5'} p={3}>
        <Box display={'flex'} flexDir={'row'} gap={0} alignItems={'center'}>
          <Box>
            <Text
              fontSize={windowHeight / 35}
              fontWeight={'600'}
              display={item.by ? 'none' : 'flex'}
              color={darkMode ? '#f1f1f1' : '#222'}>
              {item?.title}
            </Text>
          </Box>
        </Box>
        {/* description box */}
        <Box
          w={'100%'}
          height={
            item?.title?.length > 30
              ? windowHeight / 2.8
              : item.by
              ? windowHeight / 2.8
              : windowHeight / 2.6
          }>
          <Text
            mt={3}
            fontSize={windowHeight / 42}
            textAlign={'left'}
            color={darkMode ? '#f1f1f1' : '#555'}
            lineHeight={item?.question ? 28 : null}
            fontWeight={'300'}>
            {item?.description || item?.question}
          </Text>
        </Box>
        {/* Asked by which company */}
        {item?.by && (
          <Box
            w={'100%'}
            display={'flex'}
            alignItems={'flex-end'}
            mt={3}
            mb={3}>
            <Text fontSize={windowHeight / 44}>- {item?.by}</Text>
          </Box>
        )}
        {/* Horizontal line */}
        <Box w={'100%'} bgColor={darkMode ? '#666' : '#ddd'} h={'0.1%'}></Box>
        {/* Save button and Read more button*/}
        {!item?.by && (
          <Box
            mt={5}
            display={'flex'}
            w={'100%'}
            flexDir={'row'}
            justifyContent={'space-around'}>
            {/* Save Button */}
            <Pressable
              onPress={() => {
                setSavedItem(!savedItem);
                saveItem();
              }}>
              <Box
                borderWidth={1.5}
                borderRadius={10}
                p={2}
                pl={4}
                pr={4}
                borderColor={savedItem ? '#2891fc' : darkMode ? '#666' : '#999'}
                bgColor={savedItem ? '#2891fc' : 'transparent'}>
                <Box
                  display={'flex'}
                  flexDir={'row'}
                  gap={2}
                  alignItems={'center'}>
                  <Text
                    fontSize={windowHeight / 42}
                    color={savedItem ? '#f5f5f5' : darkMode ? '#fff' : '#222'}>
                    {savedItem ? 'Saved' : 'Save'}
                  </Text>
                  <Ionicons
                    name={savedItem ? 'bookmark' : 'bookmark-outline'}
                    size={windowHeight / 37}
                    color={savedItem ? '#f5f5f5' : darkMode ? '#fff' : '#222'}
                  />
                </Box>
              </Box>
            </Pressable>
            {/* Read more */}
            <LinearGradient
              colors={['#007dfe', '#0066cc']}
              style={{borderRadius: 10}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={async () => {
                  try {
                    await Linking.openURL(
                      item?.link || 'https://www.snapchat.com',
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }}>
                <Box
                  // borderWidth={1.5}
                  // borderRadius={10}
                  overflow={'hidden'}
                  p={2}
                  pl={4}
                  pr={4}
                  // borderColor={'#2891fc'}
                  // bgColor={'#2891fc'}
                >
                  <Box
                    display={'flex'}
                    flexDir={'row'}
                    gap={2}
                    alignItems={'center'}>
                    <Text fontSize={windowHeight / 42} color={'#f5f5f5'}>
                      Read more
                    </Text>
                    <Ionicons
                      name={'arrow-redo-outline'}
                      size={windowHeight / 37}
                      color={'#f5f5f5'}
                    />
                  </Box>
                </Box>
              </TouchableOpacity>
            </LinearGradient>
          </Box>
        )}
        {/* <Box w={'100%'} display={'flex'} alignItems={'center'} mt={5}> */}
        {item?.by && (
          <Box w={'100%'} display={'flex'} alignItems={'center'} mt={8}>
            <Button
              width={'70%'}
              bgColor={'#007DFE'}
              borderRadius={15}
              onPress={() => {
                rbSheet.current.open();
              }}>
              <Text fontSize={17} color={'#f5f5f5'}>
                Reveal Answer
              </Text>
            </Button>
          </Box>
        )}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default SingleItem;

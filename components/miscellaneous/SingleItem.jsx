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

const SingleItem = ({
  item,
  index,
  showSavedItems,
  isSaved,
  windowHeight,
  navigation,
}) => {
  const [savedItem, setSavedItem] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [chosenOption, setChosenOption] = useState(0);
  const [endChoose, setEndChoose] = useState(false);

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
      borderWidth={'0.5'}
      borderColor={darkMode ? '#333' : '#ccc'}
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
              backgroundColor: darkMode ? '#222' : '#eee',
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
                  <Box
                    w={12}
                    h={1}
                    bgColor={darkMode ? '#ddd' : '#999'}
                    borderRadius={100}></Box>
                </Box>
                <Text
                  fontSize={16}
                  marginBottom={1}
                  fontWeight={'600'}
                  color={darkMode ? '#eee' : '#111'}
                  mt={7}
                  fontFamily={'Nunito'}>
                  ANSWER :{' '}
                </Text>
                <Text
                  fontSize={17}
                  fontFamily={'Nunito'}
                  color={darkMode ? '#bbb' : '#777'}>
                  {item?.answer}
                </Text>
              </Box>
            </ScrollView>
          </Box>
        </RBSheet>
      )}
      {/* Card Image */}
      <Box w={'100%'} position={'relative'}>
        {(item?.image || item?.quizQuestion) && (
          <Image
            alt="Technology Image"
            // fallbackElement={<Skeleton width={'100%'} height={'100%'} />}
            source={{
              uri:
                item?.image ||
                'https://res.cloudinary.com/dh2wmc2jz/image/upload/v1714756885/quiz-time-concept_vxmmd4.jpg',
            }}
            w={'100%'}
            h={180}
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
            <Text
              fontSize={windowHeight / 47}
              color={'#f5f5f5'}
              fontFamily={'Nunito'}>
              {item?.tag || (item?.quizQuestion ? 'Quiz Time' : 'Brainstorm')}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
      {/* Card Title */}
      <Box h={'100%'} bgColor={darkMode ? '#222' : '#f5f5f5'} p={3}>
        <Box
          display={item?.quizQuestion ? 'none' : 'block'}
          flexDir={'row'}
          gap={0}
          alignItems={'center'}>
          <Box>
            <Text
              fontSize={windowHeight / 37}
              fontFamily={'Nunito'}
              fontWeight={'600'}
              display={item.by ? 'none' : 'flex'}
              color={darkMode ? '#f1f1f1' : '#000'}>
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
              : item?.by
              ? windowHeight / 2.8
              : item?.quizQuestion
              ? 'auto'
              : windowHeight / 2.6
          }>
          <Text
            mt={1}
            fontSize={windowHeight / 42}
            fontFamily={'Nunito'}
            textAlign={'left'}
            color={darkMode ? '#f1f1f1' : item?.quizQuestion ? '#111' : '#888'}
            lineHeight={item?.question ? 28 : null}
            fontWeight={item?.quizQuestion ? '500' : '300'}>
            {item?.description || item?.question || item?.quizQuestion}
          </Text>
        </Box>
        {/* Options */}
        {item?.quizQuestion && (
          <Box pt={7} display={'flex'} flexDir={'column'} gap={5}>
            {/* option 1 */}
            <Box>
              <TouchableOpacity
                activeOpacity={0.7}
                index={1}
                onPress={() => {
                  if (endChoose) {
                    return;
                  }
                  setEndChoose(true);
                  setAnswered(true);
                  setChosenOption(1);
                  if (item?.correctOption === 1) {
                    console.log('Correct');
                  }
                }}>
                <Box
                  bgColor={
                    !answered
                      ? darkMode
                        ? '#333'
                        : '#f3f3f3'
                      : answered && item?.correctOption === 1
                      ? '#65B741'
                      : answered && chosenOption === 1
                      ? '#fa5a5a'
                      : null
                  }
                  paddingLeft={4}
                  paddingRight={4}
                  paddingTop={3}
                  paddingBottom={3}
                  borderWidth={0.8}
                  borderColor={darkMode ? '#666' : '#d1d1d1'}
                  borderRadius={20}>
                  <Text
                    fontSize={16}
                    fontFamily={'Nunito'}
                    fontWeight={'500'}
                    color={
                      answered &&
                      (chosenOption === 1 || item?.correctOption === 1)
                        ? '#f5f5f5'
                        : darkMode
                        ? '#f5f5f5'
                        : '#333'
                    }>
                    <Text fontWeight={'600'}>A.&nbsp;&nbsp;</Text>
                    {item?.option1}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            {/* option 2 */}
            <Box>
              <TouchableOpacity
                activeOpacity={0.7}
                index={2}
                onPress={() => {
                  if (endChoose) {
                    return;
                  }
                  setEndChoose(true);
                  setAnswered(true);
                  setChosenOption(2);
                  if (item?.correctOption === 2) {
                    console.log('Correct');
                  }
                }}>
                <Box
                  bgColor={
                    !answered
                      ? darkMode
                        ? '#333'
                        : '#f3f3f3'
                      : answered && item?.correctOption === 2
                      ? '#65B741'
                      : answered && chosenOption === 2
                      ? '#fa5a5a'
                      : null
                  }
                  paddingLeft={4}
                  paddingRight={4}
                  paddingTop={3}
                  paddingBottom={3}
                  borderWidth={0.8}
                  borderColor={darkMode ? '#666' : '#d1d1d1'}
                  borderRadius={20}>
                  <Text
                    fontSize={16}
                    fontFamily={'Nunito'}
                    fontWeight={'500'}
                    color={
                      answered &&
                      (chosenOption === 2 || item?.correctOption === 2)
                        ? '#f5f5f5'
                        : darkMode
                        ? '#f5f5f5'
                        : '#333'
                    }>
                    <Text fontWeight={'600'}>B.&nbsp;&nbsp;</Text>
                    {item?.option2}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            {/* option 3 */}
            <Box>
              <TouchableOpacity
                activeOpacity={0.7}
                index={3}
                onPress={() => {
                  if (endChoose) {
                    return;
                  }
                  setEndChoose(true);
                  setAnswered(true);
                  setChosenOption(3);
                  if (item?.correctOption === 3) {
                    console.log('Correct');
                  }
                }}>
                <Box
                  bgColor={
                    !answered
                      ? darkMode
                        ? '#333'
                        : '#f3f3f3'
                      : answered && item?.correctOption === 3
                      ? '#65B741'
                      : answered && chosenOption === 3
                      ? '#fa5a5a'
                      : null
                  }
                  paddingLeft={4}
                  paddingRight={4}
                  paddingTop={3}
                  paddingBottom={3}
                  borderWidth={0.8}
                  borderColor={darkMode ? '#666' : '#d1d1d1'}
                  borderRadius={20}>
                  <Text
                    fontSize={16}
                    fontFamily={'Nunito'}
                    fontWeight={'500'}
                    color={
                      answered &&
                      (chosenOption === 3 || item?.correctOption === 3)
                        ? '#f5f5f5'
                        : darkMode
                        ? '#f5f5f5'
                        : '#333'
                    }>
                    <Text fontWeight={'600'}>C.&nbsp;&nbsp;</Text>
                    {item?.option3}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            {/* option 4 */}
            <Box>
              <TouchableOpacity
                activeOpacity={0.7}
                index={4}
                onPress={() => {
                  if (endChoose) {
                    return;
                  }
                  setEndChoose(true);
                  setAnswered(true);
                  setChosenOption(4);
                  if (item?.correctOption === 4) {
                    console.log('Correct');
                  }
                }}>
                <Box
                  bgColor={
                    !answered
                      ? darkMode
                        ? '#333'
                        : '#f3f3f3'
                      : answered && item?.correctOption === 4
                      ? '#65B741'
                      : answered && chosenOption === 4
                      ? '#fa5a5a'
                      : null
                  }
                  paddingLeft={4}
                  paddingRight={4}
                  paddingTop={3}
                  paddingBottom={3}
                  borderWidth={0.8}
                  borderColor={darkMode ? '#666' : '#d1d1d1'}
                  borderRadius={20}>
                  <Text
                    fontSize={16}
                    fontFamily={'Nunito'}
                    fontWeight={'500'}
                    color={
                      answered &&
                      (chosenOption === 4 || item?.correctOption === 4)
                        ? '#f5f5f5'
                        : darkMode
                        ? '#f5f5f5'
                        : '#333'
                    }>
                    <Text fontWeight={'600'}>D.&nbsp;&nbsp;</Text>
                    {item?.option4}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        )}
        {/* Asked by which company */}
        {item?.by && (
          <Box
            w={'100%'}
            display={'flex'}
            alignItems={'flex-end'}
            mt={3}
            mb={3}>
            <Text fontSize={windowHeight / 44} fontFamily={'Nunito'}>
              - {item?.by}
            </Text>
          </Box>
        )}
        {/* Horizontal line */}
        {!item?.quizQuestion && (
          <Box w={'100%'} bgColor={darkMode ? '#666' : '#ddd'} h={'0.1%'}></Box>
        )}
        {/* Save button and Read more button*/}
        {!item?.by && !item?.quizQuestion && (
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
                borderWidth={1}
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
                    fontFamily={'Nunito'}
                    color={savedItem ? '#f5f5f5' : darkMode ? '#fff' : '#555'}>
                    {savedItem ? 'Saved' : 'Save'}
                  </Text>
                  <Ionicons
                    name={savedItem ? 'bookmark' : 'bookmark-outline'}
                    size={windowHeight / 37}
                    color={savedItem ? '#f5f5f5' : darkMode ? '#fff' : '#555'}
                  />
                </Box>
              </Box>
            </Pressable>
            {/* Read more */}
            <LinearGradient
              colors={['#007dfe', '#0066cc']}
              style={{borderRadius: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={async () => {
                  try {
                    navigation.navigate('Sample', {link: item?.link});
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
                    <Text
                      fontSize={windowHeight / 42}
                      color={'#f5f5f5'}
                      fontFamily={'Nunito'}>
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
              <Text fontSize={17} color={'#f5f5f5'} fontFamily={'Nunito'}>
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

import React, {useContext, useState} from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  Modal,
  ScrollView,
  Select,
  Text,
  TextArea,
  useToast,
} from 'native-base';
import {AppContext} from './Context/ContextAPI';
import {Pressable, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {url} from './utils/constant';

const Contribute = ({navigation}) => {
  let {user, setUser, darkMode, setDarkMode} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const topics = [
    'AI',
    'API',
    'Algorithms',
    'Big Data',
    'Blockchain',
    'Cloud Computing',
    'Cyber Security',
    'Dart',
    'Data Science',
    'Databases',
    'Flutter',
    'Git',
    'GitHub',
    'Go',
    'GraphQL',
    'Java',
    'Javascript',
    'Kotlin',
    'Linux',
    'Machine Learning',
    'MongoDB',
    'NextJS',
    'Nodejs',
    'Open Source',
    'Operating Systems',
    'Programming Languages',
    'Python',
    'React-Native',
    'ReactJS',
    'Redis',
    'Ruby',
    'SQL',
    'Security',
    'Swift',
    'Typescript',
    'Web 3',
    'Web Development',
  ];

  const [contributor, setContributor] = useState({
    name: user.name,
    title: '',
    description: '',
    topic: '',
  });

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const showToast = message => {
    toast.show({description: message});
  };

  const addContribution = async () => {
    const {name, title, description, topic} = contributor;
    if (!name || !title || !description || !topic) {
      showToast('Please fill all the fields');
      return;
    }

    setLoading(true);
    try {
      const {data} = await axios.post(`${url}/contribute`, {
        contributor,
      });
      if (data) {
        showToast('Contribution added');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box w={'100%'} h={'100%'} bgColor={darkMode ? '#222' : '#f5f5f5'}>
          <Modal
            isOpen={modalVisible}
            size={'xl'}
            onClose={() => {
              setModalVisible(false);
            }}>
            <Modal.Content bgColor={darkMode ? '#333' : '#f5f5f5'}>
              <Modal.Body>
                <Box>
                  <Box>
                    <Text
                      color={darkMode ? '#f5f5f5' : '#222'}
                      fontSize={16}
                      textAlign={'justify'}
                      fontFamily={'Nunito'}>
                      Your contribution will be reviewed by our team and, upon
                      approval, will be added to the app within 24 hours. You
                      will be notified via email once the process is complete.
                      Thank you for contributing to our app.
                    </Text>
                  </Box>
                  <Box mt={'5'} display={'flex'} alignItems={'flex-end'}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <Box
                        bgColor={'#007DFE'}
                        px={'6'}
                        py={'2'}
                        borderRadius={'4'}>
                        <Text color={darkMode ? '#f5f5f5' : '#222'}>OK</Text>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Modal.Body>
            </Modal.Content>
          </Modal>
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
                navigation.navigate('Settings');
              }}>
              <Box>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Settings');
                  }}>
                  <AntDesign name="arrowleft" size={25} color={'#007DFE'} />
                </TouchableOpacity>
              </Box>
            </Pressable>
            <Box>
              <Text
                fontSize={16}
                fontWeight={600}
                color={darkMode ? '#f1f1f1' : '#333'}
                pl={2}
                pr={2}
                borderBottomWidth={2.5}
                borderColor={'#007DFE'}
                paddingBottom={0.6}
                fontFamily={'Nunito'}
                borderRadius={3}>
                Contribute
              </Text>
            </Box>
            <Box>
              <TouchableOpacity activeOpacity={0.6}>
                <AntDesign
                  name="infocirlceo"
                  size={18}
                  color={'#007dfe'}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              </TouchableOpacity>
            </Box>
          </Box>
          {/* Inputs */}
          <Box
            w={'100%'}
            display={'flex'}
            alignItems={'center'}
            mt={10}
            gap={8}>
            {/* zeroth input */}
            <Box w={'90%'}>
              <Box>
                <Input
                  placeholder="Enter contributor's name"
                  fontFamily={'Nunito'}
                  fontSize={16}
                  color={darkMode ? '#f1f1f1' : '#555'}
                  value={contributor.name}
                  _focus={{bgColor: darkMode ? '#2a2a2a' : '#f0f3f7'}}
                  onChangeText={e => {
                    setContributor(prevVal => {
                      return {...prevVal, name: e};
                    });
                  }}
                />
              </Box>
            </Box>
            {/* First input */}
            <Box w={'90%'}>
              <Box>
                <Input
                  placeholder="Enter title"
                  fontFamily={'Nunito'}
                  color={darkMode ? '#f1f1f1' : '#555'}
                  _focus={{bgColor: darkMode ? '#2a2a2a' : '#f0f3f7'}}
                  fontSize={16}
                  value={contributor.title}
                  onChangeText={e => {
                    setContributor(prevVal => {
                      return {...prevVal, title: e};
                    });
                  }}
                />
              </Box>
            </Box>
            {/* Second input */}
            <Box w={'90%'}>
              <Box>
                <TextArea
                  placeholder="Enter description"
                  fontFamily={'Nunito'}
                  fontSize={16}
                  multiline={true}
                  value={contributor.description}
                  h={350}
                  color={darkMode ? '#f1f1f1' : '#555'}
                  _focus={{bgColor: darkMode ? '#2a2a2a' : '#f0f3f7'}}
                  onChangeText={e => {
                    setContributor(prevVal => {
                      return {...prevVal, description: e};
                    });
                  }}
                />
              </Box>
            </Box>
            {/* Third input */}
            <Box w={'90%'}>
              <Box>
                <Select
                  placeholder="Choose topic tag"
                  fontFamily={'Nunito'}
                  color={darkMode ? '#f1f1f1' : '#555'}
                  fontSize={16}
                  onValueChange={e => {
                    setContributor(prevVal => {
                      return {...prevVal, topic: e};
                    });
                  }}>
                  {topics.map((item, index) => {
                    return (
                      <Select.Item label={item} value={item} key={index} />
                    );
                  })}
                </Select>
              </Box>
            </Box>
            <Box w={'90%'} pb={7}>
              <Button
                bgColor={'#007DFE'}
                isLoading={loading}
                _pressed={{bg: '#268ffc'}}
                mt={3}
                onPress={addContribution}>
                <Text color={'#f5f5f5'} fontSize={18} fontFamily={'Nunito'}>
                  Contribute
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contribute;

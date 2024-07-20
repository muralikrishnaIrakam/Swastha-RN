import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Animated, TextInput } from 'react-native'; // Added TextInput import
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccordionList } from 'accordion-collapse-react-native';
import Styles from '../../styles/css/style';
import { Toaster } from '../../utils/utils';
import ApiNames from '../../securityFile/ApiNames';
import { getData, postData } from '../../securityFile/configFile';

export const Help = () => {
  const navigation = useNavigation();
  const [getFaq, setFaq] = useState([]);

  const renderHeader = (item) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{item.question}</Text>
    </View>
  );

  const renderBody = (item) => (
    <View style={styles.body}>
      <Text style={{ color: '#000' }}>{item.answer}</Text>
    </View>
  );

  useEffect(() => {
    const getFinalInfo = async () => {
      try {
        let api = `${ApiNames.getFaq}`;
        const response = await getData(api);
        // Add a unique key if it doesn't exist
        const dataWithKeys = response.data.map((item, index) => ({
          ...item,
          key: item.key ? item.key.toString() : index.toString()
        }));
        setFaq(dataWithKeys); // Update the state with the fetched data
      } catch (error) {
        Toaster(error.response ? error.response.data.error : error.message);
      }
    };
    getFinalInfo();
  }, []);

  async function handleGoogleLogout() {
    try {
      await GoogleSignin.signOut();
      // Perform additional cleanup and logout operations.
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  }


  const [text, setText] = useState('');

  const handleChangeText = (input) => {
    // Update the state with the current text input
    setText(input);
  };

 async function submitQuery() {
    let api = `${ApiNames.needHelp}`;
   let postDataInfo ={
      request:text
    }
   try{
    const response = await postData(api,postDataInfo);
    setText('')
    setTimeout(()=>{
      navigation.navigate('Parent');
    },1000)
    Toaster(response.data.message)
 
   }catch(err){
    Toaster(err.response.data.error)
   }
  }

  return (
    <View style={Styles.container}>
      {/* Accordion List */}
      <AccordionList
        list={getFaq} // Use the state directly here
        header={renderHeader}
        body={renderBody}
        keyExtractor={(item) => item.key} // Ensure key is a string
      />
      <TextInput placeholder="Enter Query"  onChangeText={handleChangeText}
        value={text} placeholderTextColor="#000" style={styles.input} />
      {/* <Button title="Request for Call" onPress={handleGoogleLogout} /> */}
      <TouchableOpacity onPress={submitQuery}>
      <View  style={styles.SUbmitsb}><Text style={styles.SUbmitsbT}>Submit Request</Text></View>

      </TouchableOpacity>
    </View>
  );
};

const SimpleCollapsible = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    if (collapsed) {
      Animated.timing(animatedHeight, {
        toValue: 100, // Adjust according to the content height
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setCollapsed(!collapsed);
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={styles.collapseHeader}>
          <Text style={{ color: '#000' }}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ overflow: 'hidden', height: animatedHeight }}>
        <View style={styles.collapseBody}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  collapsibleContainer: {
    marginVertical: 10,
  },
  collapseHeader: {
    backgroundColor: '#095981',
    borderRadius: 6,
    padding: 10,
  },
  collapseBody: {
    padding: 10,
    color: '#000',
    backgroundColor: '#095981',
  },
  header: {
    backgroundColor: '#095981',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  body: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#DDEBEB',
  },
  input: {
    height: 40,
    color: '#000',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 30,
    paddingHorizontal: 10,
  },
  SUbmitsb: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
 
  },
  SUbmitsbT:{
    textAlign: 'center',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column'
  }
});

export default Help;

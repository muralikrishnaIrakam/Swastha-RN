import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../styles/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './../../assets/images/logo.jpeg';
import { useNavigation } from '@react-navigation/native';

export const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let token = await AsyncStorage.getItem("token");
        let onBoard = await AsyncStorage.getItem("onBoard");
        setTimeout(() => {
          if (onBoard === 'false' || !onBoard && onBoard == undefined) {
            navigation.navigate('OnBoard');
            return
          } 
          if (token) {
            navigation.navigate('Parent');
          } else {
            navigation.navigate('Login');
          }
        }, 2000);
      } catch (error) {
        // Handle any errors that might occur during AsyncStorage operations
        console.error("Error checking authentication:", error);
        // Navigate to login screen in case of error
        navigation.navigate('Login');
      }
    };

    // Call the async function inside useEffect
    checkAuth();

    // Return a cleanup function to abort any ongoing async operations if the component unmounts
    return () => {
      // Abort ongoing AsyncStorage operations here if necessary
    };
  }, []);



  return (
    <View style={Styles.container}>
      <View style={Styles.middle}>
        <Image style={Styles.logoDesign} source={Logo} />
      </View>

    </View>
  );
};

export default Welcome;

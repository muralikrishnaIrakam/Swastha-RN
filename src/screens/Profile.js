import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { getData } from "../../securityFile/configFile";
import ApiNames from "../../securityFile/ApiNames";

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const profile_picture = require("./../../assets/images/profile.jpg");
const account = require("./../../assets/images/labs/userLog.png");
const help = require("./../../assets/images/labs/help.png");
const logout = require("./../../assets/images/labs/logout.png");
const notification = require("./../../assets/images/labs/notifi.png");
const setting = require("./../../assets/images/labs/settings.png");


export const Profile = () => {
  const [getProfile, setProfile] = useState([])
  let navigation = useNavigation()
  const Logout = async () => {
    AsyncStorage.clear()
    const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getLocations}`);
    await AsyncStorage.setItem("locationData", JSON.stringify(response.data[0]))
    handleGoogleLogout()



    navigation.navigate('Login');

  }

  useEffect(() => {
    const getLocations = async () => {
        try {
          const response = await getData(ApiNames.getProfile);
            // const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.Profile}`);
            setProfile(response.data)
        } catch (error) {
            console.error('Error fetching locations:', error);
            if (error.response && error.response.data && error.response.data.error) {
                console.log('API Error:', error.response.data.error);
                Toaster(error.response.data.error);
            } else {
                console.log('Unknown Error:', error);
                Toaster('Unknown Error occurred');
            }
        } finally {
            // Any cleanup or final actions can be performed here
        }
    };

    getLocations();
}, []);

  async function handleGoogleLogout() {
    try {
      await GoogleSignin.signOut();
      // Perform additional cleanup and logout operations.
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  }

  async function  navigateFUn(data){
    navigation.navigate(data);
  }
  return (
    <View style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.topSection}>
        <View style={styles.propicArea}>
          <Image source={profile_picture} style={styles.propic} />
        </View>
        <Text style={styles.name}>{getProfile?.name}</Text>
        <Text style={styles.membership}>{getProfile?.emailId}</Text>
      </View>


      <View style={styles.buttonList}>
      {/* <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
        <View style={styles.buttonArea}>
        <View style={styles.iconArea}>
        <Image source={account} style={styles.iconStyle} resizeMode="contain" />
        </View>
        <Text style={styles.buttonName}>Account</Text>
        </View>
        <View style={styles.sp}></View>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.buttonSection} onPress={()=>navigateFUn('Notifications')} activeOpacity={0.9}>
        <View style={styles.buttonArea}>
        <View style={styles.iconArea}>
          <Image source={notification} style={styles.iconStyle} resizeMode="contain" />
        </View>
        <Text style={styles.buttonName}>Notifications</Text>
        </View>
        <View style={styles.sp}></View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSection} onPress={()=>navigateFUn('Bookings')} activeOpacity={0.9}>
        <View style={styles.buttonArea}>
        <View style={styles.iconArea}>
          <Image source={setting} style={styles.iconStyle} resizeMode="contain" />
        </View>
        <Text style={styles.buttonName}>Bookings</Text>
        </View>
        <View style={styles.sp}></View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSection} onPress={()=>navigateFUn('Help')}  activeOpacity={0.9}>
        <View style={styles.buttonArea}>
        <View style={styles.iconArea}>
          <Image source={help} style={styles.iconStyle} resizeMode="contain" />
        </View>
        <Text style={styles.buttonName}>Help</Text>
        </View>
        <View style={styles.sp}></View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSection} onPress={Logout} activeOpacity={0.9}>
        <View style={styles.buttonArea}>
        <View style={styles.iconArea}>
          <Image source={logout} style={styles.iconStyle} resizeMode="contain" />
        </View>
        <Text style={styles.buttonName}>Logout</Text>
        </View>
      </TouchableOpacity>
      </View>


    </SafeAreaView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#095981',
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propicArea: {
    width: 170,
    height: 170,
    borderWidth: 4,
    borderColor: '#000'
  },
  propic: {
    width: '100%',
    height: '100%'
  },
  name: {
    marginTop: 20,
    color: 'white',
    fontSize: 32,
  },
  membership: {
    color: '#000',
    fontSize: 18,
  },
  buttonList: {
    marginTop: 20,
  },
  buttonSection: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,

  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArea: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  buttonName: {
    width: 300,
    fontSize: 20,
    color: 'white',
    marginLeft: 20,
  },
  sp: {
    width: 400,
    marginTop: 10,
    height: 1,
    backgroundColor: '#FFFFFF45'
  }
});

export default Profile
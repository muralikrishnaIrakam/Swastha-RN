import React, { useRef, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert, StyleSheet } from 'react-native'
import Styles from '../../styles/css/style'
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from './../../assets/images/logo.jpeg'
import axios from 'axios'
import { Toaster } from '../../utils/utils';
import ApiNames from '../../securityFile/ApiNames';
export const OtpValidation = () => {
  const [email, setEmail] = useState('');
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation()
  const handleChange = (text) => {
    setEmail(text);
  };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleDigitChange = (index, text) => {
    // Allow only one digit
    if (text.length === 1) {
      const newDigits = [...digits];
      newDigits[index] = text;
      setDigits(newDigits);

      // Move to the next input
      if (index < 5 && text.length === 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleBackspace = (index) => {
    const newDigits = [...digits];
    newDigits[index] = '';

    // Move to the previous input
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }

    setDigits(newDigits);
  };
  async function gotoOtp() {
    const otp = digits.join('');
    console.log("otp", otp)
    let _id = await AsyncStorage.getItem('_id');
    if (!otp || otp == '') {
      Toast.show('OTP is required');
      return
    }
    if (otp.length !== 6) {
      Toast.show('OTP length should be 6 digits');
      return
    }
    else {
      axios.post(`${ApiNames.BASE_URL}${ApiNames.validateLoginUser}`, {
        otp: otp,
        _id: _id,
      }).then(async response => {
        console.log('Response: Normal Login', response.data);

        if (response.data.kyc == true) {
          navigation.navigate('Parent')
          await AsyncStorage.setItem('token', response.data.token);
        } else {
          await AsyncStorage.setItem('userId', response.data.userId);
          navigation.navigate('Kyc')
        }
        Toaster(response.data.message)
      })
        .catch(error => {
          console.log('Error:', error.response.data.error);
          Toaster(error.response.data.error)
          return;
        });

    }

  }


  function goBack() {
    navigation.navigate('Login')
  }


  return (
    <View style={Styles.container}>
      <View style={Styles.middle}>
        <Image style={Styles.logoDesign} source={Logo} />
        <Text style={Styles.loginwithMob}>Otp sent to your Mobile Number</Text>
        <View style={styles.container}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              placeholder='*'
              autoCorrect={false} // Disable autocorrect
              autoCapitalize="none" // Disable autocapitalization
              style={styles.input}
              placeholderTextColor="#000"
              value={digit}
              onChangeText={(text) => handleDigitChange(index, text)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
              keyboardType="numeric"
              ref={inputRefs[index]}
            />
          ))}
        </View>
        {/* <TextInput style={Styles.txtInotOTP} keyboardType='numeric' onChangeText={handleChange}  placeholderTextColor="#000" maxLength={6} placeholder='Please enter OTP' /> */}
        <TouchableOpacity onPress={gotoOtp} style={Styles.GetOtpOut}><Text style={Styles.otpTTxt}>Verify OTP</Text></TouchableOpacity>
        <TouchableOpacity onPress={goBack}><Text style={Styles.differentMail}>Use Different Mobile Number</Text></TouchableOpacity>

      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  input: {
    width: 40,
    height: 40,
    display: 'flex',
    marginBottom:40,
    marginTop:10,
    textAlignVertical:'center',
    alignItems:'center',
    marginRight: 10,
    borderWidth: .5,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: "#000",
  },
  mainBody: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#E7F7F8',
  },
  title: {
    fontSize: 30,
    color: '#0078A7',
  },
  textbx: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    padding: 20,
    fontSize: 16,
    backgroundColor: '#F6F6FA',
  },
  getOtp: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#2B3C62',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 20,
  },
});
export default OtpValidation

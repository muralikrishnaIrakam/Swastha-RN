import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LottieView from 'lottie-react-native';
import Styles from '../../styles/css/style';

export const LabBookingSuccess = () => {
  let navigation = useNavigation()
 

  function gotoHomes(){
    navigation.navigate('Parent');
  }

  async function handleGoogleLogout() {
    try {
      await GoogleSignin.signOut();
      // Perform additional cleanup and logout operations.
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  }
  return (
    <View style={Styles.container}>
        <Text style={Styles.paymentDOne}>Labtest Successfully Booked</Text>
<LottieView style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }} source={require('./../../assets/images/payDOn.json')} autoPlay loop>

</LottieView>
<View style={Styles.couBox}>
    <Text style={Styles.couData}>
    Your health matters to us. Our agents will collect your sample at your doorstep, ensuring a hassle-free experience. Expect accurate results delivered to you swiftly within hours. Stay proactive about your health with our lab test booking service.
    </Text>
</View>
    {/* <View style={Styles.alarmData}>
    <View style={Styles.setAlarm}>
        <Text>Set Alarm</Text>
    </View> 

    <View style={Styles.setAlarmGr}>
        <Text style={Styles.getEmail}>Get email</Text>
    </View>
    </View> */}
    <TouchableOpacity onPress={gotoHomes}>
    <View style={Styles.setAlarmq}>
        <Text>Goto Home</Text>
    </View>
    </TouchableOpacity>
    </View>
  )
}


export default LabBookingSuccess
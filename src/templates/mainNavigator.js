import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import OtpValidation from '../screens/OtpValodation';
import Welcome from '../screens/Welcome';
import Kyc from '../screens/Kyc';
import Icon from 'react-native-vector-icons/Ionicons';

import Parent from './Parent';
import Landing from '../screens/Landing';
import { Locations } from '../screens/Locations';
import { Services } from '../screens/Services';
import { DoctorList } from '../screens/DoctorList';
import { Slots } from '../screens/Slots';
import { Checkout } from '../screens/Checkout';
import Bookings from '../screens/Bookings';
import ChatRoom from '../screens/chatRoom';
import VideoCall from '../screens/videoCall';
import OnBoard from '../screens/onBoardScree';
import LapTests from '../screens/LapTests';
import LabTestView from '../screens/LabTestView';
import LabBookingSuccess from '../screens/labTestbokingSuccess';
import Help from '../screens/Help';
import AboutApp from '../screens/aboutApp';
import Notifications from '../screens/Notifications';
import BookingView from '../screens/BookView';
import { BottomNavigator } from '../Bottom/BottomNavigator';
import WishlistDoc from '../screens/WishlistDoc';
import DoctorFullDetails from '../screens/DoctorFulldetails';
import { Text } from 'react-native-paper';
import Styles from '../../styles/css/style';
import MainMenu from '../screens/MainMenu';

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}/>
    <Stack.Screen name='OnBoard' component={OnBoard} options={{ headerShown: false }}/>
    <Stack.Screen name="Parent"  component={BottomNavigator}  options={{headerShown: false}}  />
    <Stack.Screen name="Landing"  component={Landing}  options={{headerShown: false}}  />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='OtpValidation' component={OtpValidation} options={{ headerShown: false }}/>
      <Stack.Screen name='Kyc' component={Kyc} options={{ headerShown: false }}/>
      <Stack.Screen name='Location' component={Locations}  />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{
      
          headerTitle: () => (
            <Text style={{ fontSize: 18 }}>Services</Text>
          ),
          headerRight: () => (
            <Icon
              name="heart-outline"
              size={36}
              onPress={() => {
                // your onPress handler here
              }}
            />
          ),
          headerTitleAlign: 'center', // to align the title in the center
          headerBackTitleVisible: false, // hides the default back button title
        }}
      />
      <Stack.Screen name='DoctorList' component={DoctorList} />
      <Stack.Screen
        name="Slots"
        component={Slots}
        options={{
      
          headerTitle: () => (
            <Text style={{ fontSize: 18 }}>Slot Details</Text>
          ),
          headerRight: () => (
            <Icon
              name="heart-outline"
              size={36}
              onPress={() => {
                // your onPress handler here
              }}
            />
          ),
          headerTitleAlign: 'center', // to align the title in the center
          headerBackTitleVisible: false, // hides the default back button title
        }}
      />
          <Stack.Screen
          style={Styles.statusbys}
        name="DoctorFullDetails"
        component={DoctorFullDetails}
        options={{
      
          headerTitle: () => (
            <Text style={{ fontSize: 18 }}>Doctor Details</Text>
          ),
          headerRight: () => (
           <Text>Help</Text>
          ),
          headerTitleAlign: 'center', // to align the title in the center
          headerBackTitleVisible: false, // hides the default back button title
        }}
      />
      {/* <Stack.Screen name='DoctorFullDetails' component={DoctorFullDetails} /> */}
      <Stack.Screen name='Checkout' component={Checkout} />
      <Stack.Screen name='Bookings' component={Bookings} />
      <Stack.Screen name='Chatroom' component={ChatRoom} />
      <Stack.Screen name='Wishlist' component={WishlistDoc} />
      <Stack.Screen name='VideoCall' component={VideoCall} />
      <Stack.Screen name='LapTests' component={LapTests} />
      <Stack.Screen name='LabTestView' component={LabTestView} />
      <Stack.Screen name='Help' component={Help} />
      <Stack.Screen name='AboutApp' component={AboutApp} />
      <Stack.Screen name='MainMenu' component={MainMenu}  options={{ headerShown: false }} />
      <Stack.Screen name='Notifications' component={Notifications} />
      <Stack.Screen name='BookingView' component={BookingView} />
      <Stack.Screen name='labBookingSuccess' component={LabBookingSuccess}  options={{ headerShown: false }}/>
    </Stack.Navigator>

  </NavigationContainer>
  )
}


export default MainNavigator


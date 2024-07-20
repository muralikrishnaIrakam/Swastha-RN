import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Text, View } from 'react-native';
import Landing from '../screens/Landing';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import Bookings from '../screens/Bookings';
const Bottom = createBottomTabNavigator();
export const BottomNavigator = () => {
  return (
    <Bottom.Navigator>
          <Bottom.Screen
          name="Home"
          component={Landing}
          options={{ 
            headerShown: false ,
            tabBarActiveTintColor:'#095981',
            tabBarIcon:({color,size})=>(
                <Icon name="home" size={size} color={color}></Icon>
            )
        }}
        />
           <Bottom.Screen
          name="Profile"
          component={Profile}
          options={{ 
            headerShown: false ,
            tabBarActiveTintColor:'#095981',
            tabBarIcon:({color,size})=>(
                <Icon name="person" size={size} color={color}></Icon>
            )
        }}
        />
         <Bottom.Screen
          name="Bookings"
          component={Bookings}
          options={{ 
            headerShown: false ,
            tabBarActiveTintColor:'#095981',
            tabBarIcon:({color,size})=>(
                <Icon name="ribbon" size={size} color={color}></Icon>
            )
        }}
        />
    </Bottom.Navigator>
  )
}


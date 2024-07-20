import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View,TouchableWithoutFeedback, Alert } from 'react-native'
import ApiNames from '../../securityFile/ApiNames'
import Styles from '../../styles/css/style'
import { useNavigation, useRoute } from '@react-navigation/native'
import { postData } from '../../securityFile/configFile';

import axios from 'axios'
import LottieView from 'lottie-react-native';
export const Slots = () => {
  let navigation = useNavigation()
  const [getSlots, setSlots] = useState([])
  const [getPage, setPage] = useState(false)
  const route = useRoute();
  const { paramName } = route.params;




  const getDocByID = async (data) => {
    try {
      const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getDetailsByDoctorId}${paramName}`);
      setSlots(response.data);
      setPage(true)
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };


  useEffect(() => {
    getDocByID()
  }, [paramName])

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

 async function continueToBook(data){
    if(!data.status || data.status ==='booked'){
      Alert.alert("Already booked")
    }
    else{
      navigation.navigate('Checkout', { paramName: JSON.stringify(data) });
    }
  }


  return (
    <View style={Styles.container}>

{getPage ? (
    <View style={Styles.slotDate}>
    <ScrollView style={Styles.viewData}>
      {getSlots?.map((slots, index) => {
        const formattedDate = formatDate(slots.date); // Format the date
        return (
          <View style={{marginBottom:40}} key={index}>
            <Text style={Styles.slotDate}>{formattedDate}</Text>
            <Text style={Styles.slotDate}>Available Slots : {slots.slots.length}</Text>
            <View  style={Styles.slotContainer}>
              {slots?.slots?.map((date, indexs) => (
                <TouchableWithoutFeedback key={indexs} onPress={()=>continueToBook(date)}>
                <View  style={[Styles.slotTime, indexs % 3 === 2 && { marginRight: 0 }, { backgroundColor: date.bgColor }]}>
                  <Text style={[Styles.slotTimes, { color:date.color}]}>{date?.time}</Text>
                </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  </View>
      ) : (
        <LottieView style={{height:100, display:'flex',justifyContent:'center',alignItems:'center'}} source={require('./../../assets/images/loader.json')} autoPlay loop />

      )}

    </View>
  )
}

import React, { useEffect, useState } from 'react'
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Styles from '../../styles/css/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiNames from '../../securityFile/ApiNames';
import LottieView from 'lottie-react-native';

import { getData, postData } from '../../securityFile/configFile';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Toaster } from '../../utils/utils';
export const Bookings = () => {
  let navigation = useNavigation()
  const route = useRoute();
  // let { useName } = route.params;
  const [refresh, setRefresh] = useState(false);
    const [getBooking, setBooking] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day < 10 ? '0' : ''}${day} - ${year}`;
  };

 
  const formatDates = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
    const timeString = date.toLocaleTimeString('en-US', { hour12: true });
    return `${formattedDate}`;
  };

  useEffect(() => {
   
 
    getFinalInfo();
  }, []);
  const getFinalInfo = async () => {
    try {
      // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
      let api = `${ApiNames.getBookings}`;
      const response = await getData(api);
      setBooking(response.data)
      setLoaded(true)
    } catch (error) {
      console.log("errorerror", error)
      setLoaded(false)
      Toaster(error.response ? error.response.data.error : error.message);
    }
  };
  const pullMe = async () => {
    try {
      // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
      let api = `${ApiNames.getBookings}`;
      const response = await getData(api);
      console.log(response.data)
      setBooking(response.data)
      setLoaded(true)
    } catch (error) {
      Toaster(error.response ? error.response.data.error : error.message);
    }
  };

  function gotoChat() {
    navigation.navigate('Chatroom');
  }
  function videoCall(id) {
    console.log(id)
    // navigation.navigate('VideoCall');
    navigation.navigate('VideoCall', { paramName: id });

  }
  

  async function cancelBooking(id){
    try {
      // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
   

      Alert.alert(
        'Confirm Cancellation',
        'Are you sure you want to cancel the booking?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancellation aborted'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => handleCancellation(id),
          },
        ],
        { cancelable: false }
      );
   
    } catch (error) {
      console.log(error)
      Toaster(error.response ? error.response.data.error : error.message);
    }
  }
  const handleCancellation = async (id) => {
    try{
      let api = `${ApiNames.cancelBooking}`;
      
      let bookingData ={
        bookingId:id
      }
      const response = await postData(api,bookingData);

      console.log(response.data)
      getFinalInfo();
    }catch(error){
      console.log(error.response.data)
      Toaster(error.response.data.error);
    }
  };

  const sendParams = (id) =>{
    navigation.navigate('BookingView', { paramName: id });
  }

  return (
    <View style={Styles.container}>
      {isLoaded ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => pullMe()}
            />
          }

        >
          {getBooking.length <= 0 ? (
            <Text style={Styles.noBookings} >No Bookings</Text>
          ) :
            (
              <View>
             
                {getBooking.map((value, index) => (
                  <TouchableOpacity onPress={()=>sendParams(value._id)} key={index}>
                    <View style={Styles.myBookings}>
                      <View style={Styles.myBookingsSee}>
                        <View style={Styles.groupList}>
                          <View style={Styles.videoGr}>
                            <View>
                              {value.clinicMode === "0" ? (
                                <Icon style={Styles.iconsise} size={20} color={'#000'} name="videocam" />
                              ) : value.clinicMode === "1" ? (
                                <Icon style={Styles.iconsise} size={20} color={'#000'} name="person" />
                              ) : value.clinicMode === "2" ? (
                                <Icon style={Styles.iconsise} size={20} color={'#000'} name="person" />
                              ) : null}




                            </View>
                            <View>
                              {value.clinicMode === "0" ? (
                                <Text style={Styles.videoTxtss}>Video Call - {value.location}</Text>
                              ) : value.clinicMode === "1" ? (
                                <Text style={Styles.videoTxtss}>In-Person - {value.location}</Text>
                              ) : value.clinicMode === "2" ? (
                                <Text style={Styles.videoTxtss}>Lab Test - {value.location}</Text>
                              ) : null}


                              <Text style={Styles.videoTxtss}>Service: <Text style={Styles.servi}>{value.serviceName}</Text></Text>
                            </View>
                          </View>
                          <View>
                            <View style={Styles.videoGr}>
                              <View>
                                <Icon style={Styles.iconsise} size={20} color={'#000'} name="calendar"></Icon>
                              </View>
                              <View>
                                <Text style={Styles.videoTxtss}>{formatDate(value.slotDate)}</Text>
                                <Text style={Styles.videoTxtss}><Text style={Styles.servi}>{value.slotTime}</Text></Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={Styles.groupData}>
                            <Text style={Styles.videoTxtss}>Name: {value?.name}</Text>
                            <Text style={Styles.videoTxtss}>Mobile: +91 {value?.PhoneNumber}</Text>
                            <Text style={Styles.videoTxtss}>Booking Date: {formatDates(value?.createdDate)}</Text>
                            <Text style={Styles.videoTxtss}>Booking Id: {value?.bookingId}</Text>
                          </View>
                        </View>
                        <View style={Styles.manageBookings}>
                          <View>
                            <Text style={Styles.statuss1}>Bookings Price:
                              {value.clinicMode !== "2" ? (
                                <Text style={Styles.statuss2}>{value?.total} Rs</Text>
                              ) : (
                                <Text style={Styles.statuss2}>{value?.payment} Rs</Text>
                              )}

                            </Text>
                          </View>
                        </View>
                      </View>
                      {value.clinicMode !== "2" ? (
                        <View style={Styles.groupDatas}>
                          <Text style={Styles.videoTxtss2}>Doctor Name: {value.doctorDetails[0]?.name} - {value.doctorDetails[0]?.description}</Text>
                          <Text style={Styles.videoTxtss2}>Clinic Name: {value.doctorDetails[0]?.clinicName} </Text>
                          <Text style={Styles.videoTxtss2}>Clinic Address: {value.doctorDetails[0]?.cliniAddress}</Text>
                        </View>
                      ) : (
                        null

                      )}
                      <View style={Styles.manageBooking}>

                        <View><Text style={Styles.status}>Status: {value?.status}</Text></View>
                        {/* <TouchableOpacity onPress={()=>videoCall(value._id)}>
                          <View><Text style={Styles?.status}>Google Map</Text></View>
                        </TouchableOpacity> */}

                        {value.status === 'Booked' && (
                          <TouchableOpacity onPress={()=>cancelBooking(value._id)}>
                            <View >
                              <Text style={Styles.statuss}>Cancel</Text>
                            </View>
                          </TouchableOpacity>

                        )}

                        {value.status === 'cancelled' && (
                          <View>
                            <Text style={Styles.statuss}> </Text>
                            {/* Render whatever you want for 'cancelled' status */}
                          </View>
                        )}

                        {value.status === 'completed' && (
                          <View>
                            <Text style={Styles.statuss}> </Text>
                            {/* Render whatever you want for 'completed' status */}
                          </View>
                        )}


                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
             
              </View>
            )}



        </ScrollView>
      ) : (
        <LottieView style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }} source={require('./../../assets/images/loader.json')} autoPlay loop />

      )}
    </View>

  )
}

export default Bookings
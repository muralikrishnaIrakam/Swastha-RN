import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View, FlatList, StyleSheet, TouchableOpacity, PermissionsAndroid, Alert, TextInput } from 'react-native'
import Styles from '../../styles/css/style'
import LOGO from './../../assets/images/logo.jpeg'
import RazorpayCheckout from 'react-native-razorpay';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios';
import { apiService, postData, getData } from './../../securityFile/configFile'

import ApiNames from '../../securityFile/ApiNames';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toaster } from '../../utils/utils';

export const LabTestView = () => {
  const route = useRoute();
  let navigation = useNavigation()
  const [labs, setLabs] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationCoat, setSelectedLocationCoat] = useState([]);
  const [getProfile, setProfile] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    mobileNumber: ''
});
  const [getBooking, setBooking] = useState({
    name: '',
    mobile: ''
  });

  const { paramName } = route.params;

  async function getLabTests() {
    const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getLabTestById}${paramName}`);
    setLabs(response.data)
  }
  useEffect(() => {
    getLabTests()
  }, [paramName])

  useEffect(() => {
    const getFinalInfo = async () => {
        try {
            // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
            let api = `${ApiNames.getProfile}`;
            const response = await getData(api);
            setFormData({
              name: response.data.name,
              dateOfBirth: response.data.dateOfBirth,
              mobileNumber: response.data.mobile
          });
            console.log("response", response.data);
        } catch (error) {
            Toaster(error.response ? error.response.data.error : error.message);
        }
    };
    getFinalInfo();
}, []);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toDateString());
  const dates = [];
  const timings = [
    "04:00 AM to 06:00 AM",
    "06:00 AM to 08:00 AM",
    "08:00 AM to 10:00 AM",
    "10:00 AM to 12:00 PM",
    "12:00 PM to 02:00 PM",
    "02:00 PM to 04:00 PM",
    "04:00 PM to 06:00 PM",
    "06:00 PM to 08:00 PM",
    "08:00 PM to 10:00 PM",
    "10:00 PM to 12:00 AM",
    // Add more timings as needed
  ];

  // Generate dates for the next 15 days
  for (let i = 0; i < 15; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate.toDateString());
  }

  const handleDatePress = (date) => {
    setSelectedDate(date);
    setSelectedTiming('');
    console.log(date)
  };
  const handleTimingPress = (timing) => {
    setSelectedTiming(timing);
  };

  useEffect(() => {


    requestLocationPermission();

    return () => {
      // Cleanup function
    };
  }, []);
  const requestLocationPermission = async () => {
    try {
      
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs to access your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log("granted",granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          error =>{ setError(error.message),
          console.log(error)},
          { enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000 }
        );

      } else {
        setError('Location permission denied');
      }
    } catch (err) {
      setError(err);
    }
  };
  const handleMapPress = async event => {
    event.persist(); // Call persist on the event object

    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });

    let location = JSON.parse(await AsyncStorage.getItem('locationData'))
    let locations = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    }
    let sendObj = {
      deliveryLocation: locations,
      date: selectedDate,
      timing: selectedTiming,
      locationId: location._id,
      serviceId: paramName,
      testName: labs.title
    }
    console.log("sendObj", sendObj)
    try {
      const response = await axios.post(`${ApiNames.BASE_URL}${ApiNames.bookLabTest}`, sendObj);
      console.log(response.data)
      setSelectedLocationCoat(response.data)
    } catch (err) {
      console.log(err)
      Toaster(err.response.data.error)
    }
  };


  useEffect(() => {
    const getFinalInfo = async () => {
      try {
        // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
        let api = `${ApiNames.getProfile}`;
        const response = await getData(api);
        setProfile(response.data)

        console.log("response", response.data);
      } catch (error) {
        Toaster(error.response ? error.response.data.error : error.message);
      }
    };
   getFinalInfo();
  }, []);

  async function finalRazorPay() {
    let location = JSON.parse(await AsyncStorage.getItem('locationData'))

    if (!selectedLocation) {
      return Toaster("Choose your location")
    }
    if (!selectedDate) {
      return Toaster("Please select slot date")
    }
    if (!selectedTiming) {
      return Toaster("Please select slot timings")
    }
    if (!paramName) {
      return Toaster("Service not selected")
    }
    var options = {
      description: 'Swasta Labtest booking',
      image: LOGO,
      currency: 'INR',
      key: 'rzp_test_p2Rux4hXlsfpIs',
      amount: selectedLocationCoat.totalPrice * 100,
      name: 'Swastha',
      prefill: {
        email: getProfile.email,
        contact: getProfile.mobile,
        name: getProfile.name
      },
      theme: { color: '#095981' }
    }
    RazorpayCheckout.open(options).then((data) => {

      console.log("Payment done", data)
      getBookings(data)

    }).catch((error) => {
      // handle failure
      console.log("Payment faillure", error)
      // getBookings(error)
    });

  }


  async function getBookings(data) {

    let location = JSON.parse(await AsyncStorage.getItem('locationData'))

    let sendObj = {
      deliveryLocation: selectedLocation,
      date: selectedDate,
      timing: selectedTiming,
      locationId: location._id,
      serviceId: paramName,
      labsId:selectedLocationCoat?.labId,
      testName: labs.title,
      paymentId: data.razorpay_payment_id,
      labReponce: selectedLocationCoat,
      name:formData.name,
      mobile:formData.mobileNumber
    }

    postData(ApiNames.finalLabTestBooking, {
      data: sendObj,
    })  .then(async response => {
      navigation.navigate('labBookingSuccess');
      Toaster(response.data.message)
     
  }).catch(error => {
      console.log("errors", error.response)
      // Toaster(error.response.data.error)
    });

  
}


const handleChange = (key, value) => {
  setFormData({
      ...formData,
      [key]: value
  });
};
return (
  <View style={Styles.container}>
    <ScrollView>
      <View>
        <View>
          <Text style={Styles.discountsss}>{labs.discount}% OFF</Text>
          {labs.image && (
            <Image style={Styles.labImageOpen} source={{ uri: labs?.image }} />
          )}
        </View>

        <View style={Styles.textBoxss}>
          <Text style={Styles.included}>Who need this Test</Text>
          <Text style={Styles.listItemsLab}>{labs.whyThisTest}</Text>

        </View>


      </View>

      <View style={Styles.whyWeLab}>
        <Text style={Styles.includedMifdd}>Swastha Giving Benefits</Text>
        <View style={Styles.labProd}>
          <Image style={Styles.feevrIconss} source={require('./../../assets/images/labs/doccP.png')} />
          <Text>Best Experienced Doctors</Text>
        </View>
        <View style={Styles.labProd}>
          <Image style={Styles.feevrIconss} source={require('./../../assets/images/labs/doccccc.png')} />
          <Text>Online Result and Reports within 6Hrs</Text>
        </View>
        <View style={Styles.labProd}>
          <Image style={Styles.feevrIconss} source={require('./../../assets/images/labs/rapid.png')} />
          <Text>Rapid Fast Sample</Text>
        </View>
        <View style={Styles.labProd}>
          <Image style={Styles.feevrIconss} source={require('./../../assets/images/labs/cusss.png')} />
          <Text>24/7 Customer Service</Text>
        </View>
      </View>
      <View style={Styles.textBoxss}>
        <Text style={Styles.included}>Before Test Precations</Text>
        <Text style={Styles.listItemsLab}>{labs.beforeTest}</Text>

      </View>

      <View style={Styles.textBoxss}>
        <Text style={Styles.included}>Select Slot</Text>

        <Text style={Styles.includedsss}>Select Date</Text>

        <View >
          <FlatList
            data={dates}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <DateButton
                date={item}
                isSelected={item === selectedDate}
                onPress={() => handleDatePress(item)}
              />
            )}
          />


        </View>


        <Text style={Styles.includedsss}>Select Timings</Text>

        <FlatList
          data={timings}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TimingButton
              timing={item}
              isSelected={item === selectedTiming}
              onPress={() => handleTimingPress(item)}
            />
          )}
        />

      </View>
      <View style={Styles.textBoxss}>

        <Text style={Styles.includedsss}>User Details</Text>

        <View >
         
        <TextInput
        onChangeText={(text) => handleChange('name', text)}
        value={formData.name}
        style={Styles.enterNameTest}
        placeholder='Enter Name'
      />
      <TextInput
        onChangeText={(text) => handleChange('mobileNumber', text)}
        value={formData.mobileNumber}
        keyboardType='numeric'
        minLength={10}
        style={Styles.enterNameTest}
        placeholder='Enter Mobile Number'
      />
        </View>



      </View>
      <Text style={Styles.includedssss}>Select Location</Text>

      <View style={styles.mapContainer}>
        {latitude && longitude ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude || 37.78825,
              longitude: longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {/* Current Location Marker */}
            {latitude && longitude && (
              <Marker
                coordinate={{ latitude, longitude }}
                title='Current Location'
                description='You are here'
              />
            )}

            {/* Selected Location Marker */}
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title='Selected Location'
                description='This is your selected location'
              />
            )}
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
        {error && <Text>Error: {error}</Text>}
      </View>
    </ScrollView>



    <TouchableOpacity onPress={finalRazorPay}>
      <View style={Styles.sumitBookBtn}>
        {selectedLocationCoat ? (
          <Text style={Styles.sumitBookBtnTxt}>₹ {selectedLocationCoat.totalPrice}  Book Now</Text>

        ) : (
          <Text style={Styles.sumitBookBtnTxt}>₹ {labs.marketPrice}  Book Now</Text>

        )}
      </View>
    </TouchableOpacity>

  </View>
)
}

const DateButton = ({ date, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.dateButton, isSelected && styles.selectedDateButton]}
      onPress={onPress}
    >
      <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{date}</Text>
    </TouchableOpacity>
  );
};
const TimingButton = ({ timing, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.timingButton, isSelected && styles.selectedTimingButton]}
      onPress={onPress}
    >
      <Text style={[styles.timingText, isSelected && styles.selectedTimingText]}>{timing}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  dateButton: {
    backgroundColor: '#095981',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedDateButton: {
    backgroundColor: 'green',
  },
  dateText: {
    fontSize: 16,
  },
  selectedDateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timingButton: {
    backgroundColor: '#095981',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedTimingButton: {
    backgroundColor: 'green',
  },
  timingText: {
    fontSize: 16,
  },
  selectedTimingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    height: 600, // Set a fixed height or adjust as needed
    marginVertical: 20,
  },
  map: {
    flex: 1,
  },
});

export default LabTestView
import { useNavigation } from '@react-navigation/native'
import Swiper from "react-native-swiper"
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Styles from '../../styles/css/style';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ApiNames from '../../securityFile/ApiNames';
import { LocationInfo, Toaster } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const OnBoard = () => {
    let navigation = useNavigation()
    //   const Logout =() =>{
    //     AsyncStorage.removeItem('token')
    //     navigation.navigate('Login');

    //   }
    return (
        <View style={Styles.container}>
            <Swiper loop={false}>
                <ScreenOne />
                <ScreenTwo />
                <ScreenThree />
                <ScreenFourth />
            </Swiper>
        </View>
    )
}


export const ScreenOne = () => {
    return (
        <View>
            <LottieView style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }} source={require('./../../assets/images/videoCall.json')} autoPlay loop>

            </LottieView>
            <Text style={Styles.onBordText}>Welcome to Swastha!</Text>
            <Text style={Styles.onBordDec}>We're here to make your healthcare journey smooth and comfortable</Text>
            <Text style={Styles.onBordDec}>Great choice! Get ready to experience seamless healthcare with Swastha</Text>
        </View>
    )
}
export const ScreenTwo = () => {
    return (
        <View>
            <LottieView style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }} source={require('./../../assets/images/Labtest.json')} autoPlay loop>

            </LottieView>
            <Text style={Styles.onBordText}>Just a few taps!</Text>
            <Text style={Styles.onBordDec}>You can book doctor appointments, schedule lab tests, and manage your prescriptions. Your health, your convenience.</Text>
            <Text style={Styles.onBordDec}> Let's get started on your journey to wellness!</Text>
        </View>
    )
}
export const ScreenThree = () => {
    return (
        <View>
            <LottieView style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }} source={require('./../../assets/images/Schedule.json')} autoPlay loop>

            </LottieView>
            <Text style={Styles.onBordText}>Customizable dates</Text>
            <Text style={Styles.onBordDec}>Book appointments hassle-free with customizable dates. Tailor your schedule to fit your life. Your health, your time. Let's make booking appointments effortless!</Text>
            <Text style={Styles.onBordDec}> Let's get started on your journey to wellness!</Text>
        </View>
    )
}

export const ScreenFourth = () => {

    const navigation = useNavigation();
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getLocations}`);
                setLocations(response.data)
                await AsyncStorage.setItem("locationData", JSON.stringify(response.data[0]))
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

    async function selectedItems(item) {
        setSelectedItem(item)
        console.log(item)
        let itemI = LocationInfo("12")
        await AsyncStorage.setItem("locationData", JSON.stringify(item))
        await AsyncStorage.setItem("onBoard","true");

        navigation.navigate('Login');
    }


    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query || query.trim() === '') {
            setFilteredLocations([]); // If search query is empty or undefined, show all items
        } else {
            const filtered = locations.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredLocations(filtered);
        }
    };

    return (
        <View style={Styles.container}>
        <View style={Styles.location}>
            <TextInput
                style={Styles.seachTxt}
                onChangeText={handleSearch}
                placeholderTextColor="#000"
                placeholder='Search for City'
            />
        </View>
        <Text style={Styles.selectLoca}>Select Location</Text>

        <ScrollView>
            {/* Render filtered list items */}
            {(searchQuery && filteredLocations.length > 0 ? filteredLocations : locations).map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => selectedItems(item)}
                >
                    <Text style={Styles.realTxt}>
                        <Icon name="location-outline" size={14} color='#000'></Icon>   {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
    )
}

export default OnBoard
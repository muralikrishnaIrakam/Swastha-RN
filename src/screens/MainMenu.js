import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    Alert,
} from 'react-native';
import Styles from '../../styles/css/style'
const profile = require('./../../assets/images/dp.jpg');
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiNames from '../../securityFile/ApiNames';
import { getData } from '../../securityFile/configFile';

const MainMenu = props => {
    const navigation = useNavigation();
    const [getUserDetails, setUserDetails] = useState([])

    useEffect(()=>{
        getFullProfile()
    },[])

    const goToLapb = async () => {  
        navigation.navigate('Parent');
    };

    const navigates = async (route) => {
        navigation.navigate(route);
    };

    const getFullProfile = async () => {
        try {
            let api = `${ApiNames.getFullProfile}`;
            const response = await getData(api, '');
            setUserDetails(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const logout = async () => {

        Alert.alert(
            'Confirm Logout',
            'Are you sure  logout the account?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancellation aborted'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => handleLogout(),
                },
            ],
            { cancelable: false }
        );

    };
    const handleLogout = () => {
        AsyncStorage.clear()
        navigation.navigate('Login');
    }
    return (
        <View style={Styles.container}>
            <View style={Styles.mainWelcome}>
                <TouchableOpacity onPress={goToLapb}>

                    <View style={Styles.mainTxt}>
                        <Icon size={30} color={"#095981"} name="chevron-back-outline"></Icon>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={Styles.profileData}>
                <View style={Styles.profileImg} >
                {/* <Image style={Styles.profileImg} source={profile} /> */}
                <Icon size={90} color={"#000"} name="person-circle-outline"></Icon>
                </View>
                <Text style={Styles.profileNames}>  {getUserDetails?.userDetails?.name}  </Text>
                <Text style={Styles.profileNumber}>  +91 {getUserDetails?.userDetails?.mobile}  </Text>
            </View>
            <View style={Styles.bookingInfossss}>
                <Text style={Styles.booingCount}>Booking {"\n"}<Text style={Styles.bookingRange}>{getUserDetails?.runningBookings}</Text> </Text>
                <Text style={Styles.booingCount}>Completed {"\n"}<Text style={Styles.bookingRange}>{getUserDetails?.completedBookings}</Text> </Text>
                <Text style={Styles.booingCount}>Cancelled {"\n"}<Text style={Styles.bookingRange}>{getUserDetails?.cancelledBookings}</Text> </Text>
            </View>

            <ScrollView>
                <Text style={Styles.textTd}>Menu</Text>

                <View style={Styles.bookingInfos}>
                    <View style={Styles.mainMnys}>
                        <View style={Styles.mainety}>
                            <Icon size={20} color={'#000'} name="ticket-outline"></Icon>
                            <Text style={Styles.textTd}>Coupons</Text>

                        </View>
                        <Icon size={20} color={'#000'} name="chevron-forward-outline"></Icon>
                    </View>
                </View>
                <View style={Styles.bookingInfos}>
                    <TouchableOpacity onPress={() => navigates('Help')}>
                        <View style={Styles.mainMnys}>
                            <View style={Styles.mainety}>
                                <Icon size={20} color={'#000'} name="help-circle-outline"></Icon>
                                <Text style={Styles.textTd}>Help & Support</Text>

                            </View>
                            <Icon size={20} color={'#000'} name="chevron-forward-outline"></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={Styles.bookingInfos}>
                    <View style={Styles.mainMnys}>
                        <View style={Styles.mainety}>
                            <Icon size={20} color={'#000'} name="warning-outline"></Icon>
                            <Text style={Styles.textTd}>Terms & Conditions</Text>

                        </View>
                        <Icon size={20} color={'#000'} name="chevron-forward-outline"></Icon>
                    </View>
                </View>
                <View style={Styles.bookingInfos}>
                    <TouchableOpacity onPress={() => navigates('AboutApp')}>
                        <View style={Styles.mainMnys}>
                            <View style={Styles.mainety}>
                                <Icon size={20} color={'#000'} name="information-circle-outline"></Icon>
                                <Text style={Styles.textTd}>About Us</Text>

                            </View>
                            <Icon size={20} color={'#000'} name="chevron-forward-outline"></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={Styles.bookingInfos}>
                    <View style={Styles.mainMnys}>
                        <View style={Styles.mainety}>
                            <Icon size={20} color={'#000'} name="logo-whatsapp"></Icon>
                            <Text style={Styles.textTd}>Whatsapp support</Text>

                        </View>
                        <Icon size={20} color={'#000'} name="chevron-forward-outline"></Icon>
                    </View>
                </View>
                <View style={Styles.bookingInfosss}>
                    <TouchableOpacity onPress={logout}>
                        <View style={Styles.mainMnys}>
                            <View style={Styles.mainety}>
                                <Icon size={20} color={'red'} name="log-out-outline"></Icon>
                                <Text style={Styles.textTds}>Logout</Text>

                            </View>
                            <Icon size={20} color={'red'} name="chevron-forward-outline"></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={Styles.bookingInfosss}>
                    <View style={Styles.mainMnys}>
                        <View style={Styles.mainety}>
                            <Icon size={20} color={'red'} name="trash-outline"></Icon>
                            <Text style={Styles.textTds}>Delete Account</Text>

                        </View>
                        <Icon size={20} color={'red'} name="chevron-forward-outline"></Icon>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


export default MainMenu
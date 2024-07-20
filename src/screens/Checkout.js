import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, RadioButton, Modal, TouchableWithoutFeedback, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { apiService, postData, getData } from './../../securityFile/configFile'
import ApiNames from '../../securityFile/ApiNames'
import RazorpayCheckout from 'react-native-razorpay';
import { Toaster } from '../../utils/utils'
import CLockImage from './../../assets/images/clock.png'
import moment from 'moment';
import LOGO from './../../assets/images/logo.jpeg'
import Chat from './../../assets/images/chat.png'
import TOP from './../../assets/images/TOP.png'
import Styles from '../../styles/css/style';
export const Checkout = () => {
    let navigation = useNavigation()
    const route = useRoute();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [getDateAndTime, setDateAndTIme] = useState(false);
    const [docData, setDocData] = useState(false);
    const [getCharges, setCharges] = useState([]);
    const [getProfile, setProfile] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        mobileNumber: ''
    });
    const [getBooking, setBooking] = useState({
        name: getProfile.name,
        dateOfBirth: getProfile.dateOfBirth,
        mobile: getProfile.mobile
    });
    const [getChargesMix, setChargesMix] = useState({});
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    const options = [
        { label: 'Wallet', value: 'option1', payment: 506 },
        { label: 'Pay Online', value: 'option2', payment: 486 },
        { label: 'Pay at Clinic', value: 'option3', payment: 567 }
    ];

    const handleSelectOption = (value) => {
        setSelectedOption(value);
    };

    const handleSubmit = () => {
        // Do something with formData
        setBooking({
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            mobile: formData.mobileNumber
        });
        setModalVisible(false)
    };

    useEffect(() => {
        const { paramName } = route.params;
        let datINfo = JSON.parse(paramName)
        const combinedDateTimeString = `${datINfo.date} ${datINfo.time}`;
        const dateTime = moment(combinedDateTimeString, 'YYYY-MM-DD hh:mm A');
        const formattedDateTime = dateTime.format('MMM D ddd  hh:mm A ');
        setDateAndTIme(formattedDateTime)
    }, [])

    useEffect(() => {
        const getInfos = async () => {
            try {
                const { paramName } = route.params;
                let datInfo = JSON.parse(paramName);
                let doctorId = await AsyncStorage.getItem('doctorId');
                const getDocInfo = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getIdByDoc}${doctorId}`);
                setDocData(getDocInfo.data)
            } catch (error) {
                console.error('Error fetching doctor info:', error);
            }
        };
        getInfos();
    }, []);

    useEffect(() => {
        const getPrice = async () => {
            try {

                const { paramName } = route.params;
                let datInfo = JSON.parse(paramName);
                let doctorId = await AsyncStorage.getItem('doctorId');
                const getChargeInfo = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getCharges}${doctorId}`);
                setChargesMix(getChargeInfo.data)
            } catch (error) {
                console.error('Error fetching doctor info:', error);
            }
        };
        getPrice();
    }, []);



   
    useEffect(() => {
        const getFinalInfo = async () => {
            const { paramName } = route.params;
            let name = await AsyncStorage.getItem('serviceName');
            let service = await AsyncStorage.getItem('locationData');
            let doctorId = await AsyncStorage.getItem('doctorId');
            let tabId = await AsyncStorage.getItem('tabId');
            let checkoutInfo = {
                serviceName: name,
                location: service,
                doctorId: doctorId,
                tabId: tabId,
                slotInfo: paramName
            };
            // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
            let api = `${ApiNames.getFinalCheckout}?${new URLSearchParams(checkoutInfo).toString()}`;
            getData(api)
                .then(async response => {
                    Alert.alert("Done");
                    Toaster(response.data.message);
                })
                .catch(error => {
                    Toaster(error.response.data.error);
                });
        };
        getFinalInfo();
    }, []);
    useEffect(() => {
        const getFinalInfo = async () => {
            try {
                // Assuming ApiNames.getFinalCheckout is a string representing the endpoint
                let api = `${ApiNames.getProfile}`;
                const response = await getData(api);
                setProfile(response.data)
                setBooking({
                    name: response.data.name,
                    dateOfBirth: response.data.dateOfBirth,
                    mobile: response.data.mobile
                });
            } catch (error) {
                Toaster(error.response ? error.response.data.error : error.message);
            }
        };
        getFinalInfo();
    }, []);


    async function getBookings(data) {
        const { paramName } = route.params;
        let name = await AsyncStorage.getItem('serviceName');
        let service = await AsyncStorage.getItem('locationData');
        let doctorId = await AsyncStorage.getItem('doctorId');
        let tabId = await AsyncStorage.getItem('tabId');
        let checkoutInfo = {
            serviceName: name,
            location: service,
            doctorId: doctorId,
            tabId: tabId,
            slotInfo: paramName,
            paymentDetails: data,
            userDetails: getBooking
        };
        postData(ApiNames.BookNow, {
            data: checkoutInfo,
        })
            .then(async response => {
                Toaster(response.data.message)
                if (response.data.booking === true) {
                    // navigation.navigate('Bookings');
                    navigation.navigate('Parent', { booking: 'done' });
                }
            })
            .catch(error => {
                Alert.alert("Payment failure")
                Toaster(error.response.data.error)
            });
    }

    function getPayNow() {
        var options = {
            description: 'Swasta Doctor consultation',
            image: LOGO,
            currency: 'INR',
            key: 'rzp_test_p2Rux4hXlsfpIs',
            amount: getChargesMix.totalPrice * 100,
            name: 'Swastha',
            prefill: {
                email: getBooking.email,
                contact: getBooking.mobile,
                name: getBooking.name
            },
            theme: { color: '#095981' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            // alert(`Success: ${data.razorpay_payment_id}`);
            getBookings(data)


        }).catch((error) => {
            // handle failure
            getBookings(error)
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
            <ScrollView style={Styles.scrool} showsVerticalScrollIndicator={false}>
                <View style={Styles.slotInfo}>
                    <View style={Styles.slotCOmnine}>
                        <View style={Styles.timeSlot}>
                            <Image style={Styles.imgSize} source={CLockImage} />
                        </View>
                        <View>
                            <Text style={Styles.extra}>Appointment time</Text>
                            <Text style={Styles.timjings}>{getDateAndTime}</Text>
                        </View>
                    </View>

                    <View style={Styles.slotCOmnine}>
                        <View style={Styles.docSlot}>
                            {docData && docData.doctorImage ? (
                                <Image style={Styles.imgSize} source={{ uri: docData?.doctorImage }} />
                            ) : (
                                <Text>Loading image...</Text>
                            )}
                        </View>
                        <View>
                            <Text style={Styles.timjings}>{docData.name}</Text>
                            <Text style={Styles.extra}>{docData.description}</Text>
                            <Text style={Styles.extra}>Friendly Doctor for your Health</Text>
                            <View style={Styles.decctr}>
                                <View style={Styles.message}><Image style={Styles.chatMsf} source={Chat} /></View>
                                <Text style={Styles.reviewsss}>200 Patients reviewd</Text>
                            </View>

                        </View>

                    </View>
                    <View>
                        <Text style={Styles.extra}>Clinic Address</Text>
                        <Text style={Styles.cliniAddress}>{docData.cliniAddress}</Text>
                    </View>
                </View>
                <View style={Styles.slotInfo}>
                    <View style={Styles.slotCOmnine}>

                        <View>
                            <Text style={Styles.paymentTxt}>Booking for</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={Styles.TextDEc}>Name :{getBooking.name}</Text>
                        {/* <Text style={Styles.TextDEc}>Dob :{getBooking.dateOfBirth}</Text> */}
                        <Text style={Styles.TextDEc}>Mobile number : +91 {getBooking.mobile}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={Styles.changeTxt}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={Styles.slotInfo}>
                    <View style={Styles.slotCOmnine}>

                        <View>
                            <Text style={Styles.paymentTxt}>Coupon code</Text>
                        </View>
                    </View>
                    <View style={Styles.paymentView}>
                        <TextInput maxLength={8} style={Styles.couponCode} placeholderTextColor="#000" placeholder='Enter coupon code' />
                        <Button title="Apply" ></Button>
                    </View>

                </View>
                <View style={Styles.slotInfo}>
                    <View style={Styles.slotCOmnine}>

                        <View>
                            <Text style={Styles.paymentTxt}>Bill Details</Text>
                        </View>
                    </View>
                    <View style={Styles.paymentView}>
                        <Text style={Styles.TextDEc}>Clinic fee</Text>
                        <Text style={Styles.TextDEc}>{getChargesMix.clinicPrice} /-</Text>
                    </View>
                    <View style={Styles.paymentView}>
                        <Text style={Styles.TextDEc}>tax & GST</Text>
                        <Text style={Styles.TextDEc}>{getChargesMix.taxAmount}  /-</Text>
                    </View>
                    <View style={Styles.paymentView}>
                        <Text style={Styles.TextDEc}>Platform charges</Text>
                        <Text style={Styles.TextDEc}>{getChargesMix.platformCharges} /-</Text>
                    </View>

                    <View style={Styles.paymentView}>
                        <Text style={Styles.TextDEc}>Total</Text>
                        <Text style={Styles.TextDEc}>{getChargesMix.totalPrice} /-</Text>
                    </View>
                </View>
                <View style={Styles.slotInfo}>
                    <View style={Styles.slotCOmnine}>

                        <View>
                            <Text style={Styles.paymentTxt}>Terms & Conditions</Text>
                        </View>
                    </View>
                    <View style={Styles.paymentViews}>
                        <Text style={Styles.terms}> * Your appointment booking is subject to confirmation by the healthcare provider's office ,You can modify or cancel your appointment through the online booking system or by contacting the healthcare provider's office directly</Text>
                    </View>

                </View>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={Styles.modalContainer}>
                        <View style={Styles.modalContent}>
                            <TextInput style={Styles.input} value={formData.name} onChangeText={(text) => handleChange('name', text)} placeholderTextColor="#000" placeholder='Enter Name' />
                            {/* <TextInput style={Styles.input} value={formData.dateOfBirth} onChangeText={(text) => handleChange('dateOfBirth', text)}
                                placeholderTextColor="#000" keyboardType='numeric' placeholder='Enter Date of Birth' /> */}
                            <TextInput value={formData.mobileNumber} onChangeText={(text) => handleChange('mobileNumber', text)} style={Styles.input} placeholderTextColor="#000" keyboardType='numeric' maxLength={10} placeholder='Mobile Number' />

                            <View style={Styles.diconsLsi}>

                                <Button title="Submit" onPress={handleSubmit} />
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <View style={Styles.closeButton}>
                                        <Text style={Styles.closeButtonText}>Close</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>


            <View style={Styles.submitBtnss}>
                <TouchableWithoutFeedback onPress={getPayNow}>
                    <View style={Styles.submitGr}>
                        <Text style={Styles.submitBtssn}>Ready to Pay</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View >
    )
}

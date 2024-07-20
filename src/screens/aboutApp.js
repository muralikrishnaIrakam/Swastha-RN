import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Styles from '../../styles/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './../../assets/images/logo.jpeg';
import { useNavigation } from '@react-navigation/native';
import Bookings from './Bookings';

export const AboutApp = () => {
    const navigation = useNavigation();





    return (
        <View style={Styles.container}>
            <ScrollView>
            <View style={Styles.quetionBox}>
                <Text style={Styles.quetion}>About Us</Text>
                <Text style={Styles.answer}>Welcome to Swastha, your one-stop solution for comprehensive healthcare services. Our mission is to make quality healthcare accessible to everyone, anytime, anywhere. We believe that managing your health should be simple, convenient, and hassle-free.</Text>
            </View>

            <View style={Styles.quetionBox}>
                <Text style={Styles.quetion}>Who We Are</Text>
                <Text style={Styles.answer}>At Swastha, we are a dedicated team of healthcare professionals, technologists, and support staff committed to revolutionizing the healthcare experience. Our app brings together the best in medical expertise and cutting-edge technology to offer you seamless online and offline healthcare services.</Text>
            </View>

            <View style={Styles.quetionBox}>
                <Text style={Styles.quetion}>What We Offer</Text>
                <Text style={Styles.quetionss}>1. Online Doctor Consultations</Text>
                <Text style={Styles.answer}>Connect with experienced doctors across various specialties from the comfort of your home</Text>
                <Text style={Styles.answer}>Get instant medical advice, second opinions, and follow-up consultations through secure video calls or chat.</Text>

                <Text style={Styles.quetionss}>2. Offline Doctor Consultations</Text>
                <Text style={Styles.answer}>Easily book appointments with top-rated doctors and specialists at clinics and hospitals near you.</Text>
                <Text style={Styles.answer}>Receive personalized in-person care tailored to your specific health needs.</Text>

                <Text style={Styles.quetionss}>3. Lab Tests</Text>
                <Text style={Styles.answer}>Schedule a wide range of lab tests with trusted diagnostic centers.</Text>
                <Text style={Styles.answer}>Enjoy the convenience of home sample collection or choose to visit the lab at your convenience.</Text>
                <Text style={Styles.answer}>Get accurate and timely test results directly on your app.</Text>
                <Text style={Styles.answer}>Why Choose Swastha?
                    Convenience: Book appointments, consult with doctors, and access lab reports all in one app.
                    Quality: Partnered with certified healthcare professionals and diagnostic centers to ensure top-notch services.
                    Security: Your health information is private and secure with us, safeguarded by advanced encryption technologies.
                    Support: Our customer support team is always here to assist you with any questions or concerns.</Text>


            </View>
            </ScrollView>
        </View>
    );
};

export default AboutApp;

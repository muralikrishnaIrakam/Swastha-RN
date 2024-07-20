import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ToastAndroid, Button } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Styles from '../../styles/css/style'
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from './../../assets/images/logo.jpeg'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons';

import NetInfo from '@react-native-community/netinfo';
import ApiNames from '../../securityFile/ApiNames';
import { Toaster } from '../../utils/utils';


GoogleSignin.configure({
    webClientId: ApiNames.GOOGLE_WEB_CLIENT_ID,
    androidClientId: ApiNames.GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: ApiNames.GOOGLE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
};


export const Login = () => {

    const [email, setEmail] = useState('');
    const [isConnected, setConnected] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const getMobileNumbers =  () => {
    }

    const handleChange = (text) => {
        setEmail(text);
    };
    function gotoOtp() {

        if (!email || email == '') {
            Toaster('Mobile is required')
            // Toast.show('Email is required');
            return
        }
      
        else {
            axios.post(`${ApiNames.BASE_URL}${ApiNames.login}`, {
                mobile: email, loginType: 'mobile'
            }).then(async response => {
                console.log('Response:', response.data);
                await AsyncStorage.setItem('_id', response.data._id)
                setEmail('')
                navigation.navigate('OtpValidation');
            })
                .catch(error => {
                    console.log('Error:', error.response.data.error);
                    Toaster(error.response.data.error)
                    return;
                });
        }
    }




    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const response = await GoogleLogin(); // Assuming this function returns necessary data

            const { idToken, user } = response;

            if (idToken) {

                axios.post(`${ApiNames.BASE_URL}${ApiNames.googleLogin}`, {
                    token: idToken,
                    email: user.email
                }).then(async response => {
                    console.log('Response: Google', response.data);
                    await AsyncStorage.setItem('userId', response.data._id)
                    await AsyncStorage.setItem('_id', response.data._id)
                    if (response.data.userType === 'new') {
                        await AsyncStorage.setItem('userId', response.data._id)
                        Toaster(response.data.message);
                        navigation.navigate('Kyc');
                    }
                    if (response.data.userType === 'old' && response.data.kyc === false) {
                        await AsyncStorage.setItem('userId', response.data._id)
                        Toaster(response.data.message);
                        navigation.navigate('Kyc');
                    }
                    if (response.data.userType === 'old' && response.data.kyc === true) {
                        console.log('allowed', response.data.token)
                        await AsyncStorage.setItem('token', response.data.token);
                        navigation.navigate('Parent');
                        Toaster(response.data.message);
                    }


                    else {
                        console.log('allowed', response.data.token)
                        await AsyncStorage.setItem('token', response.data.token);
                        navigation.navigate('Parent');
                        Toaster(response.data.message);
                    }


                })
                    .catch(error => {
                        console.log('Error:', error);
                        // Toaster(error.response.data.error)
                        return;
                    });


                // // Assuming authAPI.validateToken sends a request to your backend for token validation
                // const resp = await validateToken({
                //     token: idToken,
                //     email: user.email,
                // });

                // await handlePostLoginData(resp.data);
            } else {
                // Handle case where idToken is not received
                throw new Error('idToken not received');
            }
        } catch (error) {
            Toaster('Sign in action cancelled');
            // console.error("Error during Google login:", error);
        } finally {
            setLoading(false);
            // Toaster('Sign in action cancelled');
        }
    };

    async function validateToken(data) {
        try {
            let responce = await axios({
                method: 'get',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${data.token}`,
                withCredentials: true,
            });
            console.log("responcesss", responce.responseUR)
            return responce
        } catch (err) {

        }
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.middle}>
                <Image style={Styles.logoDesign} source={Logo} />
                <Text style={Styles.loginwithMob}>Welcome to Swastha</Text>

                <TextInput style={Styles.txtInot} onFocus={getMobileNumbers}  maxLength={10} keyboardType="numeric" onChangeText={handleChange} placeholderTextColor="#000" placeholder='Enter Mobile Number' />
                <Text style={Styles.teerms}>By proceeding. I agree to the <Text style={Styles.tretmr}>Terms & Privacy Policy</Text></Text>
                <TouchableOpacity onPress={gotoOtp} style={Styles.GetOtpOut}><Text style={Styles.otpTTxt}>Login</Text></TouchableOpacity>
            </View>
            {/* <Button title='Google' onPress={handleGoogleLogin}></Button> */}
            {/* <TouchableOpacity onPress={handleGoogleLogin} style={Styles.GetOtpLogin}><Text style={Styles.otpTTxts}>  Login with Google</Text></TouchableOpacity> */}

        </View>
    )
}

export default Login

import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, Modal, Button, View, DatePickerIOS, DatePickerAndroid, Alert, } from 'react-native'
import Styles from '../../styles/css/style'
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from './../../assets/images/logo.jpeg'
import axios, { Axios } from 'axios'
import ApiNames from '../../securityFile/ApiNames';
import { Toaster } from '../../utils/utils';
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import { apiService, getData, postData } from './../../securityFile/configFile'
export const Kyc = () => {
    
    const today = new Date()
    const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('Data of Birth');

    const navigation = useNavigation()


    const handleChange = (text, inputType) => {
        switch (inputType) {
            case 'name':
                setName(text);
                break;
            case 'mobileNumber':
                setMobileNumber(text);
                break;
            case 'dateOfBirth':
                setDateOfBirth(text);
                break;
            default:
                break;
        }
    };

    const handleCapture = async () => {
        try {

            if (!name) {
                Toaster("Name is required");
                return;
            }
            if (!mobileNumber) {
                Toaster("Mobile number is required");
                return;
            }
            // if (!date) {
            //     Toaster("Date of Birth is required");
            //     return;
            // }
            let userId = await AsyncStorage.getItem('userId');

            const response = await postData(ApiNames.updateKyc, {
                name: name,
                emaiId: mobileNumber,
                dateOfBirth: date,
                userId: userId
            });

            console.log("KYC", response.data.token);
            await AsyncStorage.setItem('token', response.data.token);
            Toaster(response.data.message);
            navigation.navigate('Parent');
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.error) {
                Toaster(error.response.data.error);
            } else {
                Toaster("An error occurred while updating KYC");
            }
        }
    };


    function handleChangeDate(propDate) {
        console.log('date:', propDate)
        
        setDate(propDate)

    }





    return (
        
        <View style={Styles.container}>
            <View style={Styles.middle}>
                <Image style={Styles.logoDesign} source={Logo} />
                <Text style={Styles.loginwithMob}>Onetime Basic Kyc </Text>
                <TextInput
                    style={Styles.txtInot}
                    onChangeText={(text) => handleChange(text, 'name')}
                    placeholderTextColor="#C5C5C5"
                    placeholder="Enter Name"
                />
                <TextInput
                    style={Styles.txtInot}
                    onChangeText={(text) => handleChange(text, 'mobileNumber')}
                    placeholderTextColor="#C5C5C5"
                    placeholder="Enter Email"
                />
                
                {/* <TouchableOpacity  onPress={()=> setModalVisible(true)} style={Styles.txtInot}>     
                    <View style={{display:'flex',justifyContent:'center',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{margin:0,padding:0, color:'#000',fontSize:18}}>{date}</Text>
                </View></TouchableOpacity> */}
                <TouchableOpacity onPress={handleCapture} style={Styles.GetOtpOut}><Text style={Styles.otpTTxt}>Submit</Text></TouchableOpacity>
            </View>
            <Modal

                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: '100%' }}>
                        <DatePicker
                        
                            options={{
                                // backgroundColor: '#095981',
                                // textHeaderColor: '#DDEBEB',
                                // textDefaultColor: '#fff',
                                // selectedTextColor: '#000',
                                // mainColor: '#DDEBEB',
                                // textSecondaryColor: '#000',
                                // borderColor: '#fff',
                            }}
                            mode='calendar'
                            selected={date}
                            maximumDate={startDate}
                            onSelectedChange={date => handleChangeDate(date)}
                        />
                    <Button style={{backgroundColor:'#fff'}}  onPress={() => setModalVisible(false)} title='close'></Button>

                    </View>
                </View>
            </Modal>
            <View style={Styles.Caution}>
                <Text style={Styles.CautionTxt}>
                    * To ensure the security of your account, we require a one-time KYC (Know Your Customer) verification process. Rest assured, your personal information is securely stored and will not be shared.
                    After this initial verification, you won't be asked for this information again during subsequent logins. Your privacy is our priority, and your data remains safe with us.Thank you for your cooperation.
                </Text>
            </View>

        </View>
    )
}

export default Kyc

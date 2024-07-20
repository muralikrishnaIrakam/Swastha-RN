import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Modal, Image, Linking, StatusBar } from 'react-native'
import ApiNames from '../../securityFile/ApiNames'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Styles from '../../styles/css/style'
import Icon from 'react-native-vector-icons/Ionicons';
const arraow = require('./../../assets/images/arrao.png');
import Doctor from './../../assets/images/dp.jpg'
import { Toaster } from '../../utils/utils';
import { Button, Searchbar } from 'react-native-paper';
import {BottomSheetModal,BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export const DoctorList = () => {
    const bottomSheetmodalRef = useRef(null)
    const snapPoints = ['300%']
    const [searchQuery, setSearchQuery] = React.useState('');

    const [modalVisible, setModalVisible] = useState(false);

    let navigation = useNavigation()
    const [getDoctors, setDoctors] = useState([])
    const [getFullDoctors, setFullDoctors] = useState([])

    const handleBottomSheet = () =>{
        bottomSheetmodalRef.current.present()
    }

    useEffect(() => {
        const getDoctors = async () => {
            try {
                let name = await AsyncStorage.getItem('serviceName');
                let service = await AsyncStorage.getItem('locationData');
                if (!name || !service) {
                    // Handle case when required data is not available
                    console.error('serviceName or locationData not found in AsyncStorage');
                    return;
                }
                let locationData = JSON.parse(service);
                let postData = {
                    serviceName: name,
                    locationId: locationData._id
                };

                const response = await axios.post(`${ApiNames.BASE_URL}${ApiNames.getClient}`, postData);

                if (response.data.length > 0) {
                    setDoctors(response.data);
                } else {
                    Toaster(response.data.message)
                    // console.error('DOC Length:',);
                }

            } catch (err) {

                console.error('Error fetching doctors:', err);
            }
        };

        getDoctors();
    }, []);

    const getDocByID = async (data) => {
        try {
            setModalVisible(true);
            const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getDocByID}${data}`);
            setFullDoctors(response.data);
        } catch (error) {
            Toaster("No Doctors")
            console.error('Error fetching doctors:', error);
            if (error.response && error.response.status === 404) {
                // Handle error (e.g., show an error message to the user specific to status code 404)
                console.error('Doctors not found');
                // You can show a specific error message or take appropriate action here
            } else {
                // Handle other types of errors
                console.error('An error occurred:', error.message);
                // You can show a generic error message or take appropriate action here
            }
        }
    };


    const openGoogleMapsApp = (data) => {
        Linking.openURL(data);
    };
    function gotoSlot(id) {
        AsyncStorage.setItem('doctorId', id)
        navigation.navigate('Slots', { paramName: id });
    }
    
    function gotoDoctro(id){
        AsyncStorage.setItem('doctorId', id)
        navigation.navigate('DoctorFullDetails', { paramName: id });    
    }
    return (
        <View style={Styles.container}>
           
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {getDoctors?.map((doctor, index) => (
                        <View style={Styles.doctorTImes3} key={index}>
                            <View style={Styles.doctorTImes}>
                                <View >

                                    <View style={Styles.doctorTIme}>
                                        <View style={Styles.details} >
                                            <TouchableOpacity onPress={()=>gotoDoctro(doctor._id)}>
                                            <Image  style={Styles.docImage} source={{ uri: doctor?.doctorImage }} />

                                            </TouchableOpacity>

                                            <View>
                                                <View style={Styles.doctrPrice}>
                                                    <Text style={Styles.docName}>{doctor.name}</Text>

                                                </View>
                                                <Text style={Styles.descrip} numberOfLines={2} ellipsizeMode="tail">{doctor.description}</Text>
                                                <View style={Styles.startsBox}>
                                                    <Icon style={Styles.startSi} color={"#F7A031"} name="star-outline"></Icon>
                                                    <Icon style={Styles.startSi} color={"#F7A031"} name="star-outline"></Icon>
                                                    <Icon style={Styles.startSi} color={"#F7A031"} name="star-outline"></Icon>
                                                    <Icon style={Styles.startSi} color={"#F7A031"} name="star-outline"></Icon>
                                                    <Icon style={Styles.startSi} color={"#F7A031"} name="star-outline"></Icon>
                                                    <Text style={Styles.textTra}>4.6</Text>

                                                </View>
                                            </View>

                                        </View>
                                        <TouchableOpacity onPress={() => gotoSlot(doctor._id)}>
                                        <View style={Styles.priceSaa}>
                                            <Text style={Styles.docName}>{doctor.clinicPrice} /-</Text>
                                            <Image style={Styles.imgArraow} source={arraow} />
                                        </View>
                                        </TouchableOpacity>
                                   
                                    </View>

                                </View>
                            </View>

                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

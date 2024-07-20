import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { apiService, postData, getData } from './../../securityFile/configFile'

import React, { useEffect, useState } from "react";
import { Appbar, Button } from 'react-native-paper';
import Styles from "../../styles/css/style";
import ApiNames from "../../securityFile/ApiNames";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toaster } from "../../utils/utils";
const dp = require('./../../assets/images/dp.jpg');
const DoctorFullDetails = () => {
    const route = useRoute();
    let navigation = useNavigation()
    const { paramName } = route.params;
    const [getFullDoctors, setFullDoctors] = useState([])
    const [getWishList, setWishList] = useState(null)
    const [getServices, setServices] = useState([])

    const getFUllDetails = async () => {

        const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getDocByID}${paramName}`);
        setFullDoctors(response.data);

    }

    const getWsihlistDoct = async () => {
        try {
            const response = await getData(`${ApiNames.getWsihlistDoct}${paramName}`);
            setWishList(response.data?.isWishlist)
        } catch (err) {
            console.log(err)
        }

    }

    const getFUllServices = async () => {

        const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getServicesByDoc}${paramName}`);
        setServices(response.data)
    }
    const AdwishList = async () => {
        try {
            const response = await postData(ApiNames.wishList, { doctorId: paramName });
            setWishList(response.data?.isWishlist)
            Toaster(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFUllDetails()
        getFUllServices()
        getWsihlistDoct()
    }, [paramName])

    const openGoogleMapsApp = (data) => {
        Linking.openURL(data);
    };
    const onPress = async (selectedName) => {
        AsyncStorage.setItem('doctorId', paramName)
        await AsyncStorage.setItem('serviceName', selectedName)
        navigation.navigate('Slots', { paramName: paramName });
    };
    return (
        <View style={Styles.container}>
            <View style={Styles.doctorPro}>
                <View >
                    <Image style={Styles.pfImg} source={{ uri: getFullDoctors?.doctorImage }} />
                </View>
                <View >
                    <Text style={Styles.doctNa}>{getFullDoctors?.name}</Text>
                    <Text style={Styles.dent}>{getFullDoctors?.description}</Text>
                    <Text style={Styles.dent}><Text style={Styles.dent}>{getFullDoctors?.locationName}, India</Text><Icon name="location"></Icon> </Text>

                </View>
                <View style={Styles.doctorProOne}>
                    {getWishList ? (

                        <TouchableOpacity onPress={AdwishList}>
                            <Icon size={30} color={'red'} name="heart"></Icon>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={AdwishList}>
                            <Icon size={30} color={'red'} name="heart-outline"></Icon>
                        </TouchableOpacity>


                    )}
                </View>
            </View >
            <ScrollView>
                <View style={Styles.expSection}>
                    <View>
                        <View style={Styles.expSectionNew}>
                            <Icon color={'#095981'} size={30} name="people"></Icon>
                        </View>
                        <Text style={Styles.cicons}>7,455+</Text>
                        <Text style={Styles.patinetT}>Patients</Text>
                    </View>
                    <View>
                        <View style={Styles.expSectionNew}>
                            <Icon color={'#095981'} size={30} name="briefcase"></Icon>
                        </View>
                        <Text style={Styles.cicons}>{getFullDoctors?.experiance}+</Text>
                        <Text style={Styles.patinetT}>Years Exp</Text>
                    </View>
                    <View>
                        <View style={Styles.expSectionNew}>
                            <Icon color={'#095981'} size={30} name="star"></Icon>
                        </View>
                        <Text style={Styles.cicons}>4.9</Text>
                        <Text style={Styles.patinetT}>Rating</Text>
                    </View>
                    <View>
                        <View style={Styles.expSectionNew}>
                            <Icon color={'#095981'} size={30} name="chatbox-ellipses"></Icon>
                        </View>
                        <Text style={Styles.cicons}>455+</Text>
                        <Text style={Styles.patinetT}>Reviews</Text>
                    </View>
                </View>
                <Text style={Styles.abtTxt}>Services</Text>
                <View style={Styles.categoryTxt3eee}>

                    {getServices.map((item, index) => (



                        <View key={index} style={Styles.AllCategosq}>
                            <View >
                                <TouchableOpacity onPress={() => onPress(item.name)}>
                                    <View style={Styles.AllCateItems}>
                                        <Image style={Styles.feevrIcons} source={{ uri: item.image }} />
                                    </View>
                                    <View >
                                        <Text style={Styles.AllCateItemsTxt}>{item?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>





                        </View>
                    ))}
                </View>
                <View style={Styles.textDoct}>
                    <Text style={Styles.abtTxt}>About</Text>
                    {getFullDoctors?.points?.map((specialization, index) => (
                        <Text key={index} style={Styles.descripsss}>
                            <Text style={Styles.abtTxte} >
                                <Icon name="arrow-forward-circle-outline" /> {specialization?.point}
                            </Text>


                        </Text>
                    ))}
                </View>
                <View style={Styles.textDoct}>
                    <Text style={Styles.abtTxt}>Address</Text>
                    <Text style={Styles.descripsss}><Icon name="arrow-forward-circle-outline"></Icon>{getFullDoctors?.cliniAddress}</Text>
                    <TouchableOpacity>
                        <Text onPress={() => openGoogleMapsApp(getFullDoctors?.googleLocation)} style={Styles.descripssss}><Icon name="location-outline"></Icon>  Goto google map</Text>

                    </TouchableOpacity>
                </View>
                <View style={Styles.textDoct}>
                    <Text style={Styles.abtTxt}>Timings</Text>
                    <View style={Styles.modelAdd}>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Mon  {getFullDoctors?.monday}</Text>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Tus  {getFullDoctors?.tuesday}</Text>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Wed  {getFullDoctors?.wednesday}</Text>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Thus {getFullDoctors?.thursday}</Text>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Fri  {getFullDoctors?.friday}</Text>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Sat  {getFullDoctors?.saturday}</Text>
                        <Text style={Styles.timingss}><Icon name="alarm-outline"></Icon>  Sun  {getFullDoctors?.sunday}</Text>

                    </View>
                </View>

            </ScrollView>
        </View >
    );
};

export default DoctorFullDetails;



import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Styles from '../../styles/css/style'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiNames from '../../securityFile/ApiNames'
import axios from 'axios'

export const Services = () => {
    let navigation = useNavigation()
    const [service, setServices] = useState([]);
    const [refresh, setRefresh] = useState(false);


    const onPress = async (selectedName) => {
        await AsyncStorage.setItem('serviceName', selectedName)
        navigation.navigate('DoctorList');
    };
    const services = async () => {
        try {
            const locationInfo = await AsyncStorage.getItem("locationData");
            const tabId = await AsyncStorage.getItem("tabId");
            let locationData = JSON.parse(locationInfo);
            const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getServices}${locationData._id}/${tabId}`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        services()
    }, [])
    return (
        <View style={Styles.container}>

            <ScrollView >
                {service.map((items,indexs) => (
                    <View key={indexs} >
                        <View style={Styles.category}>
                            <Text style={Styles.categoryTxts}>{items.groupname}</Text>
                        </View>
                        <View style={Styles.categoryTxt3eee}>
                            {items.services.map((item, index) => (



                                <View key={item._id} style={Styles.AllCategosq}>
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
                    </View>
                ))}
            </ScrollView>



        </View>
    )
}

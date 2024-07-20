import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Styles from '../../styles/css/style'
import { useNavigation } from '@react-navigation/native'
import ApiNames from '../../securityFile/ApiNames'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const LapTests = () => {
    let navigation = useNavigation()
    const [labs, setLabs] = useState([]);


    function gotoSlot(id) {
        navigation.navigate('LabTestView', { paramName: id });
    }

    async function getLabTests() {
        let locations = JSON.parse(await AsyncStorage.getItem('locationData'))
        const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getLabTests}${locations._id}`);
        setLabs(response.data)
    }


    useEffect(() => {
        getLabTests()
    }, [])

    return (
        <View style={Styles.container}>
            <ScrollView>
                <Text style={Styles.regularTest}>Regular Tests</Text>
                <View  style={Styles.totalards}>
                {labs.map((value, index) => (


                    

                        <TouchableWithoutFeedback key={index} onPress={() => gotoSlot(value._id)}>
                            <View style={Styles.labCard}>
                                <Image style={Styles.labImage} source={{ uri: value?.image }} />
                                <View style={Styles.labContent}>
                                    <Text style={Styles.labTitle}>{value.title}</Text>
                                    {/* <Text style={Styles.labTitles}>50 Test Includeds</Text> */}
                                    <Text style={Styles.labTContenr}>{value.description.slice(0, 56)}...</Text>
                                    <View style={Styles.priceCal}>
                                        <Text style={Styles.labPricesss}>{value.discount}% OFF </Text>
                                        <Text style={Styles.labPrice}>₹ {value.marketPrice} </Text>
                                    </View>
                                </View>
                            </View>

                        </TouchableWithoutFeedback>
                   
                ))}
                 </View>
            </ScrollView>
        </View>
    )
}

export default LapTests
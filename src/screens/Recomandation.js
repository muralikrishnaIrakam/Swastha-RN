import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Styles from '../../styles/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './../../assets/images/logo.jpeg';
import { useNavigation } from '@react-navigation/native';
import Bookings from './Bookings';
import { getData } from '../../securityFile/configFile';
import ApiNames from '../../securityFile/ApiNames';

export const Recomandation = (dataObj) => {
    const [getDoctLis, setDoctLis] = useState([]);

    const getAllDoc = async () => {
        const response = await getData(ApiNames.getAllDoc);
        setDoctLis(response.data)
    }

    useEffect(() => {
        getAllDoc()
    }, [dataObj])


    async function gotoDoctro(id){
        await AsyncStorage.setItem("tabId",'0');
        AsyncStorage.setItem('doctorId', id)
        navigation.navigate('DoctorFullDetails', { paramName: id });    
    }
    // Function to render an individual recommendation card
    const renderRecommendationCard = ({ item, index }) => (
        <View key={index} style={styles.recommendationCard}>
            <Image source={{ uri: item.doctorImage }} style={styles.recommendationImage} />
            <Text style={styles.recommendationName}>{item.name}</Text>
            <Text style={styles.recommendationSpecialty}>{item.description}</Text>
            <TouchableOpacity onPress={()=>gotoDoctro(item._id)} style={styles.learnMoreButton}>
                <Text style={styles.learnMoreButtonText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
    const navigation = useNavigation();





    return (
        <View style={Styles.container}>
            <View style={styles.recommendationsContainer}>
                {/* <Text style={styles.recommendationsTitle}>
              Personalized Recommendations
            </Text> */}
                {/* Personalized Recommendations Section */}
                <View style={styles.recommendationsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {getDoctLis.map((item, index) =>
                            renderRecommendationCard({ item, index })
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Recomandation;


const styles = StyleSheet.create({

    recommendationsTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    recommendationCard: {
        width: 200,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginLeft: 0,
        marginRight: 10,
        marginLeft: 0
    },
    recommendationImage: {
        width: "100%",
        height: 120,
        borderRadius: 10,
    },
    recommendationName: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#095981',
        marginTop: 10,
    },
    recommendationSpecialty: {
        fontSize: 14,
        color: "#666",
    },
    learnMoreButton: {
        backgroundColor: "#095981",
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        alignItems: "center",
    },
    learnMoreButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
})

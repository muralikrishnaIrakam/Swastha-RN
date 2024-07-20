import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import React, { useEffect, useState } from "react";
import Styles from "../../styles/css/style";
import ApiNames from "../../securityFile/ApiNames";
import { getData, postData } from "../../securityFile/configFile";
import { Toaster } from "../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const WishlistDoc = () => {
    const [getWishlist, setWishlist] = useState([])
    let navigation = useNavigation()

    const getFinalInfo = async () => {
        try {
            let api = `${ApiNames.getWishlist}`;
            const response = await getData(api);
            setWishlist(response.data)
        } catch (error) {
            console.log("errorerror", error)
        }
    };

    const RemoveWishList = async (id) => {
        console.log(id)
        try {
            const response = await postData(ApiNames.wishList, { doctorId: id });
            getFinalInfo()
            Toaster(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFinalInfo()
    }, [])

    function gotoDoctro(id) {
        AsyncStorage.setItem('doctorId', id)
        navigation.navigate('DoctorFullDetails', { paramName: id });
    }
    return (
        <View style={Styles.container}>
            <ScrollView>
                {getWishlist.length > 0 ? (
                    null
                ) : (
                    <View style={Styles.quetionBox}>
                        <Text style={Styles.quetion}>No Wishlist</Text>
                    </View>
                )}

                <View>
                    {getWishlist?.map((doctor, index) => (
                        <View style={Styles.doctorTImes3} key={index}>
                            <View style={Styles.doctorTImes}>
                                <View >

                                    <View style={Styles.doctorTIme}>
                                        <View style={Styles.details} >
                                            <TouchableOpacity onPress={() => gotoDoctro(doctor?.doctorDetails[0]._id)}>
                                                <Image style={Styles.docImage} source={{ uri: doctor?.doctorDetails[0].doctorImage }} />

                                            </TouchableOpacity>

                                            <View>
                                                <View style={Styles.doctrPrice}>
                                                    <Text style={Styles.docName}>{doctor?.doctorDetails[0].name}</Text>

                                                </View>
                                                <Text style={Styles.descrip} numberOfLines={2} ellipsizeMode="tail">{doctor?.doctorDetails[0].description}</Text>
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
                                        <TouchableOpacity onPress={() => RemoveWishList(doctor?.doctorDetails[0]._id)}>
                                            <View style={Styles.priceSaa}>
                                                <Text style={Styles.docName}>{doctor?.doctorDetails[0].clinicPrice} /-</Text>
                                                <Icon size={20} color={'#000'} name="close-circle"></Icon>
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
    );
};

export default WishlistDoc;



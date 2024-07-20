import React, { useEffect, useState } from 'react';
import { ScrollView, Text, RefreshControl, View, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from '../../styles/css/style';
import { useNavigation } from '@react-navigation/native';
import ApiNames from '../../securityFile/ApiNames';
import { getData } from '../../securityFile/configFile';
import moment from 'moment';
import { Button } from 'react-native-paper';
import { Toaster } from '../../utils/utils';
import { getNotificationsCount } from '../../utils/utils';

export const Notifications = () => {
    const navigation = useNavigation();
    const [getUserNotifications, setUserNotifications] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getFullProfile();
    }, []);

    const getFullProfile = async () => {
        try {
            const api = ApiNames.getNotifications;
            const response = await getData(api, '');
            setUserNotifications(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    const deleteAllNotifications = async () => {
        try {
            const api = ApiNames.deleteAllNotifications;
            const response = await getData(api, '');
            getFullProfile()
            Toaster(response.data.message)
        } catch (err) {
            console.error(err);
        }
    };
    const selectedNotification = async (id) => {
        try {
            const api = `${ApiNames.selectedNotification}${id}`;
            const response = await getData(api, '');
            getFullProfile()
            let value = await getNotificationsCount()
            Toaster(response.data.message)
        } catch (err) {
            console.error(err);
        }
    };
  

    const pullMe = () => {
        setRefresh(true);
        getFullProfile().then(() => {
            setRefresh(false);
        });
    };

    const formatDate = (date) => {
        return moment(date).format('Do MMMM YYYY, h:mm A');
    };

    return (
        <View style={Styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={pullMe}
                    />
                }
            >
                {getUserNotifications.length === 0 ? (
                    <View style={Styles.quetionBox}>
                        <Text style={Styles.quetion}>No Notifications</Text>
                    </View>
                ) : (
                    <View >
                        <Button onPress={deleteAllNotifications} style={Styles.deleteAll}>Delete All</Button>

                        <View style={Styles.quetionBoxs}>

                            {getUserNotifications.map((value, index) => (
                                <View key={index} style={Styles.quetionBoxs} >
                                    <TouchableOpacity onPress={()=>selectedNotification(value._id)}>
                                        <Text style={value.readStatus ? styles.normalTexts : styles.boldTexts}>{value.title}</Text>
                                        <Text style={value.readStatus ? styles.normalText : styles.boldText}>{value.description}</Text>
                                        <Text style={Styles.quetionTinme}>{formatDate(value.createdDate)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}


                        </View>
                    </View>
                )
                }

            </ScrollView >
        </View >
    );
};

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 14
    },
    boldTexts: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16
    },
    normalText: {
        fontWeight: 'normal',
        color: '#000',
        fontSize: 14
    },
    normalTexts: {
        fontWeight: 'normal',
        color: '#000',
        fontSize: 16
    },
});

export default Notifications;

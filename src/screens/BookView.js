import React, { useEffect, useState } from 'react';
import { Button, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Styles from '../../styles/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './../../assets/images/logo.jpeg';
import { useNavigation, useRoute } from '@react-navigation/native';
import Bookings from './Bookings';
import ApiNames from '../../securityFile/ApiNames';
import { getData } from '../../securityFile/configFile';
import SocketService from './../../securityFile/socketService';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
export const BookingView = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [getSenderName, setSenderName] = useState('');

    const [messagesNew, setMessageNew] = useState([]);
    const navigation = useNavigation();
    const [getDocuments, setDocuments] = useState([]);
    const [getAllMessages, setAllMessages] = useState([]);
    const route = useRoute();
    const { paramName } = route.params;
    let room = paramName
    let username = {
        name: "Mobile"
    }

    useEffect(() => {
        getBookings()
        getProfile()
    }, [])

    const getProfile = async () => {
        let api = `${ApiNames.getProfile}`;
        const response = await getData(api);
        console.log("profileData", response.data)
        setSenderName(response.data._id)
    }

    // useEffect(() => {
    //     SocketService.connect();
    //     SocketService.joinRoom({ room, username });

    //     SocketService.onMessage((data) => {
    //         console.log(data)
    //         // setAllMessages((prevMessages) => [...prevMessages, data]);
    //     });

    //     return () => {
    //         SocketService.disconnect();
    //     };
    // }, [room, username]);

    const sendMessage = async () => {
        let userId = await AsyncStorage.getItem('_id')
        let myMessage = {
            senderId: userId,
            sender: 'user',
            room: this.orderId,
            message:messagesNew,
            type: "text"
        }
        const messageData = {
            message: myMessage,
            room,
            sender: 'user',
            senderId: getSenderName,
            type: 'text',
        };

        SocketService.sendMessage(messageData);
        setMessage('');
    };


    const getBookings = async () => {
        let api = `${ApiNames.getDocuemtns}${paramName}`;
        try {
            const response = await getData(api);
            setDocuments(response.data)
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    }
    const getMessages = async () => {
        let api = `${ApiNames.getMessages}${paramName}`;
        try {
            const response = await getData(api);
            setAllMessages(response.data)
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    }

    useEffect(() => {
        getMessages()
    }, [])

    const downloadFile = async (fileUrl) => {
        console.log(fileUrl)
        await Linking.openURL(fileUrl);
    }



    const gotoRoute = () => {
        navigation.navigate('socketVideo');
    }












    return (
        <View style={Styles.container}>
            <View style={Styles.chatIntition}>
                <Text>Book again</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View>
                    {getDocuments.map((value, index) => (
                        <View key={index}>
                            <Text style={Styles.BookViewdtitlesDate}>{value?.date}</Text>
                            {value?.records?.map((inp, i) => (
                                <View key={i} style={Styles.BookViewd} howsHorizontalScrollIndicator={false}>
                                    <Text style={Styles.BookViewdtitles}>{inp?.title}</Text>
                                    <Text style={Styles.BookViewdDesc}>{inp?.description}</Text>
                                    <Text style={Styles.BookViewdDates}>{inp?.createdDate}</Text>
                                    <View >
                                        {inp?.documents.map((values, index) => (
                                            <TouchableOpacity key={index} onPress={() => downloadFile(values.document)}>
                                                <Text style={Styles.documentss}> Document</Text>
                                            </TouchableOpacity>

                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>


            </ScrollView>
            <ScrollView>
                <View>
                    {getAllMessages.map((values, index) => (
                        <Text>{values.message}</Text>
                    ))}

                </View>
            </ScrollView>

        </View>
    );
};

export default BookingView;

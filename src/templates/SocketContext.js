import React, { useEffect, useRef, useState, createContext } from 'react';
import { Text, View, FlatList, TextInput, Button, Alert, Vibration } from 'react-native';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging'
import BackgroundService from 'react-native-background-actions';
import { v4 as uuidv4 } from 'uuid';
import ApiNames from '../../securityFile/ApiNames';
// import BackgroundTask from 'react-native-background-task';
import { Linking } from 'react-native';
import { getData } from '../../securityFile/configFile';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocketService from './../../securityFile/socketService';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    let roomId = '4346347454535453';
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('Murali');
    const [clientId, setClientId] = useState(uuidv4());
    const socket = useRef(null);
    const socketUserId = useRef(null)
    useEffect(()=>{
        let usie = getUserId()
        console.log("usie",usie)
    })

    
    useEffect(() => {
        // Listen for incoming notifications
        Linking.addEventListener('url', handleNotification);

        // Clean up listener on unmount
        return () => {
            Linking.removeEventListener('url', handleNotification);
        };
    }, []);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConnected(state.isConnected);
            console.log("Net COnnection", state.isConnected)
            if (!state.isConnected) {
                showAlert();
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleNotification = (event) => {
        console.log("event trigger")
    };

    const showAlert = () => {
        Alert.alert(
            'Internet Connection',
            'You are offline. Some features may not be available.'
        );
    };




    const connectToChat = () => {
        if (username) {
            console.log(roomId)
            socket.current.emit('set username', clientId, username, roomId);
            socket.current.on('incoming call', ({ callerId }) => {
                Alert.alert(
                    'Incoming Call',
                    'You have an incoming call. Do you want to accept?',
                    [
                        {
                            text: 'Reject',
                            onPress: () => console.log('Call rejected'),
                            style: 'cancel'
                        },
                        { text: 'Accept', onPress: () => console.log('Call accepted') }
                    ],
                    { cancelable: false }
                );
            });
        }
    };
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        requestUserPermission()
        getToken()
    }, [])
    useEffect(() => {
        // Initialize Firebase messaging
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            // Handle notification opening when the app is in the foreground or background
            console.log('Notification opened:', remoteMessage);
            // Navigate to a specific screen or perform any action based on the notification
        });

        // Check if the app was opened from a terminated state due to a notification tap
        messaging().getInitialNotification().then((remoteMessage) => {
            if (remoteMessage) {
                // Handle notification opening when the app is killed and opened by tapping the notification
                console.log('Initial notification opened:', remoteMessage);
                Alert.alert("tRIGGERED")
                // Navigate to a specific screen or perform any action based on the notification
            }
        });

        // Other socket.io initialization and event listeners...
    }, []);
    const getToken = async () => {
        try {
            const token = await messaging().getToken()
            console.log("Firebase TOken", token)
            let userId = await AsyncStorage.getItem('_id')
            console.log("userIduserId",userId)
            socketUserId.current = userId
            let api = `${ApiNames.updateFMTKeyFirebase}${token}/${userId}`;
            const response = await getData(api);
        } catch (err) {
            console.log(err)
        }
    }





    // BackgroundTask.define(async () => {
    //     // Connect to the Socket.IO server
    //     socket.current = io('http://192.168.29.47:4000/');
    //     console.log("You are connected")

    //     // Handle socket events or any background tasks

    //     // When the background task is finished, call finish()
    //     BackgroundTask.finish();
    //   });

    //   // Register the background task
    //   BackgroundTask.schedule({
    //     period: 60, // in seconds (e.g., 15 minutes)
    //   });



    useEffect(() => {
        SocketService.connect();
      
      
        let room = null
        let username={
            name:"Muralikrishna APP"
        }
        SocketService.joinRoom({ room, username });

        SocketService.onMessage((data) => {
            console.log(data.message.message?.message)
            if(data.message.message?.message ==="call"){
                console.log("Start a Call")
                Alert.alert("Call rining")

            }
            // setAllMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            SocketService.disconnect();
        };
    }, [roomId, username]);

    async function getUserId(){
        let id = await AsyncStorage.getItem('_id')
        return id
    }
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );


};


































export default SocketContext;

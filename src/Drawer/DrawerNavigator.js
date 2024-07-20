
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Main from './../Drawer/Main';
import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../styles/css/style';
import Help from '../screens/Help';
import AboutApp from '../screens/aboutApp';
import Bookings from '../screens/Bookings';
import { Toaster } from '../../utils/utils';
import Notifications from '../screens/Notifications';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {

    const navigation = useNavigation()

    const [location, setLocation] = useState();
    function sendLoca() {
        navigation.navigate('Location')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let item = await AsyncStorage.getItem('location');
                setLocation(item)
            } catch (error) {
                console.error('Error fetching dataee:', error);
            }
        };

    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                let item = await AsyncStorage.getItem('locationData');
                let locationInfo = JSON.parse(item)
                setLocation(locationInfo?.name)
            } catch (error) {
                console.log('Error fetching datassd:', error);
                Toaster("Logout successfully")
            }
        };

        fetchData();
        setInterval(() => {
            fetchData();
        }, 1000)
    },[]);

    async function componentDidMount() {
        let item = await AsyncStorage.getItem('locationData');
        let locationInfo = JSON.parse(item)
        setLocation(locationInfo?.name)
    }


    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Swastha" component={Main}

                options={{
                    headerShown: true,
                    headerRight: () => (
                        <Pressable onPress={sendLoca}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: "Poppins-Regular", color: '#095981', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>{location}</Text>
                                <Icon name="location-outline" size={16} color='#095981' ></Icon>
                            </View>
                        </Pressable>
                    ),

                    headerTitle: () => null, // Hide the default title,
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home-outline" size={size} color={color} />
                    ),
                }}


            />
            <Drawer.Screen name="Profile" component={Profile}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />
                    ),
                }} />
            <Drawer.Screen
                name="Help & Support"
                component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="headset-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen name="Bookings" component={Bookings}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="layers-outline" size={size} color={color} />
                    ),
                }} />

<Drawer.Screen name="Notifications" component={Notifications}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="notifications-outline" size={size} color={color} />
                    ),
                }} />
            {/* <Drawer.Screen name="Settings" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="settings" size={size} color={color} />
                    ),
                }} />


            <Drawer.Screen name="Ratings" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="star-half-outline" size={size} color={color} />
                    ),
                }} />
            <Drawer.Screen name="Medical History" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="medkit-outline" size={size} color={color} />
                    ),
                }} />
            <Drawer.Screen name="Daily Analysis" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="clipboard-outline" size={size} color={color} />
                    ),
                }} />
            <Drawer.Screen name="My Insurance" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="shield-half-outline" size={size} color={color} />
                    ),
                }} />
            <Drawer.Screen name="My Coupons" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="ticket-outline" size={size} color={color} />
                    ),
                }} />
            <Drawer.Screen name="Swasta Coins" component={Help}

                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="cash-outline" size={size} color={color} />
                    ),
                }} /> */}
       
            <Drawer.Screen name="About Swasta" component={AboutApp}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="information-circle-outline" size={size} color={color} />
                    ),
                }} />
                     {/* <Drawer.Screen name="Logout" component={Help}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="log-out-outline" size={size} color={color} />
                    ),
                }} /> */}
            {/* <Drawer.Screen name="Home" component={Home} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
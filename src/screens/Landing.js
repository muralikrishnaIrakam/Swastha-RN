import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, RefreshControl, FlatList, Image, TouchableOpacity, Alert, Button } from 'react-native';
import Styles from '../../styles/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Badge, Modal, PaperProvider, Portal } from 'react-native-paper';
import ApiNames from '../../securityFile/ApiNames';
import MyContext from '../../securityFile/MyContext';
import { LocationInfo,getNotificationsCount } from '../../utils/utils';
import { Searchbar } from 'react-native-paper';
import { Drawer } from 'react-native-paper';
const Consultation = require('./../../assets/images/video-consulting.jpg');
const labs = require('./../../assets/images/labTest.jpg');
const profile = require('./../../assets/images/logo.jpeg');
const tablets = require('./../../assets/images/Medicine.jpg');
const allImg = require('./../../assets/images/all.png');
const doctor = require('./../../assets/images/doct.png');
import CallKeep from 'react-native-callkeep';
import Icon from 'react-native-vector-icons/Ionicons';
import Recomandation from './Recomandation';
import TestimonialList from './Testmonials';
import { getData } from '../../securityFile/configFile';

const Landing = (data) => {
    const [visible, setVisible] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [getNotificationCount, setNotificationCount] = React.useState(null);
    const [refresh, setRefresh] = useState(false);
    const [slider, setSlider] = useState([]);
    const [getProfile, setProfile] = useState([]);
    const [service, setServices] = useState([]);
    const [getLocation, setLocation] = useState([]);
    const [getGeneral, setGeneral] = useState([]);
    const [getDoctLis, setDoctLis] = useState([]);
    const navigation = useNavigation();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const pullMe = () => {
        setRefresh(true);

        setTimeout(() => {
            setRefresh(false);
        }, 1000);
    };
    const simulateIncomingCall = () => {
        const message = {
            callId: '86876876',
            callerName: 'Murli',
            number: '9079878687'
        };
        CallKeep.displayIncomingCall(message.callId, message.callerName, message.number);
    };
    const selectDoctor = async (data) => {
        await AsyncStorage.setItem("tabId", data);
        navigation.navigate('Services');
    };
    useEffect(() => {
        getProfiles()
        getAllDoc()
        getNotificationsct()
    }, [refresh])
    useEffect(() => {
        getProfiles()
        getAllDoc()
        getNotificationsct()
    }, [])
    const getNotificationsct = async (id) => {
        try {
            let value = await getNotificationsCount()
            console.log(value)
            setNotificationCount(value)
        } catch (err) {
            console.error(err);
        }
    };

    const getProfiles = async () => {
        try {

            const response = await getData(ApiNames.getProfile);
            let getLocation = await AsyncStorage.getItem('locationData')
            // const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.Profile}`);
            let pasrseData = JSON.parse(getLocation)
            setLocation(pasrseData)
            setProfile(response.data)
        } catch (error) {
            console.error('Error fetching locations:', error);
            if (error.response && error.response.data && error.response.data.error) {
                Toaster(error.response.data.error);
            } else {
                Toaster('Unknown Error occurred');
            }
        } finally {
            // Any cleanup or final actions can be performed here
        }
    };

    const getAllDoc = async () => {
        // const response = await getData(ApiNames.getAllDoc);
        // setDoctLissetDoctLis(response.data)
    }

    const goToLapb = async () => {
        navigation.navigate('LapTests');
    };
    const goToLocations = async () => {
        navigation.navigate('Location');
    };
    const gotoAlerts = async () => {
        navigation.navigate('Notifications');
    };
    const WishlistDoc = async () => {
        navigation.navigate('Wishlist');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getAllSlides}`);


                setSlider(response.data);
            } catch (error) {
                console.error('Error fetching datass:', error.response);
            }
        };

        fetchData();
        regularInssues()
    }, [refresh]);

    const regularInssues = async () => {
        try {
            const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getAllServices}`);
            let generalData = []
            response.data.forEach((values, index) => {
                if (values.sectionName === 'Genaral') {
                    generalData.push(values)
                }
            })
            setGeneral(generalData)
        } catch (error) {
            console.error('Error fetching datass:', error.response);
        }
    };


    // const services = async () => {
    //     try {
    //         const locationInfo = await AsyncStorage.getItem("locationData");
    //         let locationData = JSON.parse(locationInfo);
    //         const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getServices}${locationData._id}/0`);
    //         setServices(response.data);
    //     } catch (error) {
    //         console.error('Error fetching datas:', error);
    //     }
    // };


    const onPress = async (selectedName) => {
        await AsyncStorage.setItem("tabId", '0');
        await AsyncStorage.setItem('serviceName', selectedName)
        navigation.navigate('DoctorList');
    };



    const onPressAll = async () => {
        await AsyncStorage.setItem("tabId", '0');
        navigation.navigate('Services');
    };
    const clickforMenu = async () => {
        navigation.navigate('MainMenu');
    };

    return (
        <View style={Styles.container}>
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text>Example Modal.  Click outside this area to dismiss.</Text>
                    </Modal>
                </Portal>
                <Button title='Show' style={{ marginTop: 30 }} onPress={showModal}>

                </Button>
            </PaperProvider>
            <View style={Styles.mainWelcome}>

                <View style={Styles.mainTxt}>
                    <TouchableOpacity onPress={clickforMenu}>
                        <Image style={Styles.mainImg} source={profile} />

                    </TouchableOpacity>
                    <View>



                        <Text style={Styles.goodMorningName}>{getProfile?.name}</Text>

                        <TouchableOpacity onPress={goToLocations}>
                            <Text style={Styles.goodMorning}>{getLocation?.name}</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.mainTxsst}>
                    <TouchableOpacity onPress={gotoAlerts}>
                        <View style={Styles.badgeView}>
                            {getNotificationCount > 0 ? (
                                <Badge style={Styles.badGe}>{getNotificationCount}</Badge>

                            ) : (
                                null
                            )}
                            <Icon size={24} color={'#095981'} name="notifications-outline"></Icon>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={WishlistDoc}>
                        <Icon size={24} color={'#095981'} name="heart-outline"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => pullMe()}
                    />
                }
            >

                {/* Your UI components here */}
                <View style={Styles.topSection}>

                    {/* Assuming these are your InnerSections */}
                    <View style={Styles.InnnerSection}>
                        <View>
                            <TouchableOpacity onPress={() => selectDoctor("0")}>
                                <View>
                                    <Image style={Styles.imageSettings} source={Consultation} />
                                    <View style={Styles.videoTxt}>
                                        <Text style={Styles.MainvideoTxt}>Video Consultation</Text>
                                        <Text style={Styles.videoTxtDesc}>Online Doctor appointment</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.InnnerSection}>
                        <View>
                            <TouchableOpacity onPress={() => goToLapb()}>
                                <View>
                                    <Image style={Styles.imageSettings} source={labs} />
                                    <View style={Styles.videoTxt}>
                                        <Text style={Styles.MainvideoTxt}>Home lab tests</Text>
                                        <Text style={Styles.videoTxtDesc}>Get Genuine Reports</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.InnnerSection}>
                        <View>
                            <TouchableOpacity>
                                <View>
                                    <Image style={Styles.imageSettings} source={tablets} />
                                    <View style={Styles.videoTxt}>
                                        <Text style={Styles.MainvideoTxt}>Tablet Delivery</Text>
                                        <Text style={Styles.videoTxtDesc}>Delivery within few Hours</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.InnnerSection}>
                        <View>
                            <TouchableOpacity onPress={() => selectDoctor("1")}>
                                <View>
                                    <Image style={Styles.imageSettings} source={doctor} />
                                    <View style={Styles.videoTxt}>
                                        <Text style={Styles.MainvideoTxt}>In-Person</Text>
                                        <Text style={Styles.videoTxtDesc}>Direct Consultation</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={Styles.careos}>
                    <FlatList
                        data={slider}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{ marginRight: 20, elevation: 2 }}>
                                <Image style={Styles.sldierImages} source={{ uri: item?.image }} />
                            </View>
                        )}
                    />
                </View>
                <View >
                    <View style={Styles.category}>
                        <Text style={Styles.categoryTxt}>Regular Health Issues</Text>
                    </View>
                    <View style={Styles.categoryTxt3eee}>
                        {getGeneral.map((item, index) => (
                            <View key={index} style={Styles.AllCategosq}>
                                <View>
                                    <TouchableOpacity onPress={() => onPress(item.name)}>
                                        <View style={Styles.AllCateItems}>
                                            <Image style={Styles.feevrIcons} source={{ uri: item.image }} />
                                        </View>
                                        <View>
                                            <Text style={Styles.AllCateItemsTxt}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        <View style={Styles.AllCategosq}>
                            <View>
                                <TouchableOpacity onPress={() => onPressAll()}>
                                    <View style={Styles.AllCateItems}>
                                        <Image style={Styles.feevrIcons} source={allImg} />
                                    </View>
                                    <View>
                                        <Text style={Styles.AllCateItemsTxt}>All</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={Styles.category}>
                    <Text style={Styles.categoryTxt}>Top Doctors</Text>
                </View>

                <Recomandation dataObj={getDoctLis} />
                <View style={Styles.category}>
                    <Text style={Styles.categoryTxt}>Testimonials</Text>
                </View>
                <TestimonialList />
            </ScrollView>

        </View>
    );
};

export default Landing;

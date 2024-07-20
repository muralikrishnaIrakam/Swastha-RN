import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Styles from '../../styles/css/style';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ApiNames from '../../securityFile/ApiNames';
import { LocationInfo, Toaster } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../securityFile/MyContext';
import { Searchbar } from 'react-native-paper';

export const Locations = () => {

    const navigation = useNavigation();
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await axios.get(`${ApiNames.BASE_URL}${ApiNames.getLocations}`);
                setLocations(response.data)
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

        getLocations();
    }, []);

    async function selectedItems(item) {
        setSelectedItem(item)
        let itemI = LocationInfo("12")
        await AsyncStorage.setItem("locationData", JSON.stringify(item))
        navigation.navigate('Parent');
    }


    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query || query.trim() === '') {
            setFilteredLocations([]); // If search query is empty or undefined, show all items
        } else {
            const filtered = locations.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredLocations(filtered);
        }
    };

    return (
        <View style={Styles.container}>
           
           <Searchbar
                    onChangeText={handleSearch}
                    placeholderTextColor="#000"
                    placeholder='Search for City'
                    value={searchQuery}
                />
            <Text style={Styles.selectLoca}>Select Location</Text>

            <ScrollView>
                {/* Render filtered list items */}
                {(searchQuery && filteredLocations.length > 0 ? filteredLocations : locations).map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => selectedItems(item)}
                    >
                        <Text style={Styles.realTxt}>
                            <Icon name="location-outline" size={14} color='#000'></Icon>   {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Locations;

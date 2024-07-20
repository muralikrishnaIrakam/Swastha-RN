import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = (props) => {
    const handleLogout = async () => {
        // Implement your logout functionality here
        await AsyncStorage.removeItem('userToken'); // Example: removing user token
        props.navigation.replace('Login'); // Navigate to login screen after logout
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={styles.logoutSection}>
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <Icon name="log-out-outline" size={20} color="#000" />
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    logoutSection: {
        marginTop: 'auto',
        marginBottom: 20,
        display:'flex',
        justifyContent:'flex-start',
        paddingHorizontal: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    versionText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        color: '#888',
        fontFamily: 'Poppins-Regular',
    },
});

export default CustomDrawerContent;

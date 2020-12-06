import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import Constants from "expo-constants";
import axios from 'axios';
import { domain } from '../config';

export const Profile = ({ navigation }) => {
    const [isExecuted, setExecute] = React.useState(false);
    const [user, setUser] = React.useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        country: '',
        company: ''
    });
    let userInfo = () => {
        setExecute(true);
        axios.get(`https://${domain}.ngrok.io/getMe`)
        .then(async (res) => {
            console.log(res.data)
            if (res.data !== 'User not found!') {
                setUser({
                    fname: res.data.fname,
                    lname: res.data.lname,
                    email: res.data.email,
                    phone: res.data.phone,
                    country: res.data.country,
                    company: res.data.company
                });
            }
            else {
                navigation.navigate('Login')
            }
        })
        .catch(async (err) => {
            console.log(err)
        });
    };
    if (!isExecuted) {
        userInfo();
    }
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logOut}>
                    <Image source={require('../assets/icons/logOut.png')} />
                </TouchableOpacity>
                <Image style={styles.avatar} source={require('../assets/icons/avatarDragon.png')}></Image>
                <Text style={styles.name}>{user.fname} {user.lname}</Text>
                <Text style={styles.contactLabel}>Contact</Text>
                <View style={styles.contactBlock}>
                    <Text style={styles.emailText}>E-mail:      {user.email}</Text>
                    <Text style={styles.phoneText}>Phone:      {user.phone}</Text>
                </View>
                <Text style={styles.informationLabel}>Information</Text>
                <View style={styles.informationBlock}>
                    <Text style={styles.professionText}>Profession:      -</Text>
                    <Text style={styles.countryText}>Country:            {user.country}</Text>
                    <Text style={styles.cityText}>City:                   -</Text>
                    <Text style={styles.ageText}>Age:                   -</Text>
                    <Text style={styles.genderText}>Gender:             -</Text>
                </View>
            </ScrollView>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#191919" translucent = {true}/>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.editProfile}>
                    <Image source={require('../assets/icons/editProfile.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.dashboard}>
                    <Image source={require('../assets/icons/dashboardInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Statistics')} style={styles.statistics}>
                    <Image source={require('../assets/icons/statisticsInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={styles.messages}>
                    <Image source={require('../assets/icons/messagesInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Results')} style={styles.results}>
                    <Image source={require('../assets/icons/resultsInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profile}>
                    <Image source={require('../assets/icons/profileActive.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    scrollViewContainer: {
        height: '100%',
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        position: 'absolute',
        backgroundColor: '#191919',
        width: '100%',
        height: 85,
        top: 0
    },
    title: {
        position: 'absolute',
        left: 175,
        top: 53,
        width: 85,
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    editProfile: {
        position: 'absolute',
        right: 18,
        top: 39
    },
    logOut: {
        position: 'absolute',
        right: 30,
        top: 114
    },
    menuContainer: {
        position: 'absolute',
        backgroundColor: '#191919',
        top: '92%',
        height: 80,
        width: '100%'
    },
    dashboard: {
        position: 'absolute',
        left: '7%',
        top: 20
    },
    statistics: {
        position: 'absolute',
        left: '27%',
        top: 20
    },
    messages: {
        position: 'absolute',
        left: '47%',
        top: 20
    },
    results: {
        position: 'absolute',
        left: '67%',
        top: 20
    },
    profile: {
        position: 'absolute',
        left: '87%',
        top: 20
    },
    name: {
        position: "absolute",
        top: 105,
        left: '30%',
        width: '70%',
        height: 33,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 33,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    avatar: {
        position: 'absolute',
        left: '5%',
        top: 114,
        width: 70,
        height: 70
    },
    contactLabel: {
        position: "absolute",
        top: 208,
        left: '10%',
        height: 25,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    contactBlock: {
        position: 'absolute',
        width: '95%',
        height: 104,
        top: 253,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20
    },
    emailText: {
        position: "absolute",
        top: 20,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    phoneText: {
        position: "absolute",
        top: 62,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    informationLabel: {
        position: "absolute",
        top: 387,
        left: '10%',
        height: 25,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    informationBlock: {
        position: 'absolute',
        width: '95%',
        height: 230,
        top: 432,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20
    },
    professionText: {
        position: "absolute",
        top: 20,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    countryText: {
        position: "absolute",
        top: 62,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    cityText: {
        position: "absolute",
        top: 104,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    ageText: {
        position: "absolute",
        top: 146,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    genderText: {
        position: "absolute",
        top: 188,
        left: '10%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.7)'
    }
});
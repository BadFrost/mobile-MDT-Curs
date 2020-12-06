import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export function Messages({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#000000" translucent = {true}/>
            <Text style={styles.sorryText}>We are very sorry, but this is not available yet</Text>
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.dashboard}>
                    <Image source={require('../assets/icons/dashboardInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Statistics')} style={styles.statistics}>
                    <Image source={require('../assets/icons/statisticsInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.messages}>
                    <Image source={require('../assets/icons/messagesActive.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Results')} style={styles.results}>
                    <Image source={require('../assets/icons/resultsInactive.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profile}>
                    <Image source={require('../assets/icons/profileInactive.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sorryText: {
        position: 'absolute',
        color: '#A17CAC',
        textAlign: 'center',
        top: 155,
        height: 66,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 33
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
    }
});
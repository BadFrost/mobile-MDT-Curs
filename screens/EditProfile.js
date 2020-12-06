import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export function EditProfile({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#000000" translucent = {true}/>
            <Text style={styles.sorryText}>We are very sorry, but this is not available yet</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.back}>
                <Image source={require('../assets/icons/Vector.png')} />
                <Text style={styles.backText}>Back to profile</Text>
            </TouchableOpacity>
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
    back: {
        position: 'absolute',
        left: '5%',
        top: '8%'
    },
    backText: {
        color: '#9B51E0',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        fontStyle: 'normal',
        height: 22,
        left: '20%',
        top: '-52%'
    }
});
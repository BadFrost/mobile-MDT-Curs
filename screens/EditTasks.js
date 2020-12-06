import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export function EditTasks({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#000000" translucent = {true}/>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.back}>
                <Image source={require('../assets/icons/Vector.png')} />
                <Text style={styles.backText}>Back to dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NewTask')} style={styles.addNewTaskContainer}>
                <Text style={styles.addNewTaskText}>Add new task</Text>
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
    },
    addNewTaskContainer: {
        position: 'absolute',
        width: '95%',
        height: '7%',
        top: '15%',
        backgroundColor: 'rgba(204, 0, 255, 0.5)',
        borderRadius: 10
    },
    addNewTaskText: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: '33%',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 21
    }
});
import * as React from 'react';
import { Platform, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { domain } from '../config';

export function NewTask({ navigation }) {
    const fromDate = new Date();
    const toDate = new Date();
    const [from, setFrom] = React.useState('From');
    const [to, setTo] = React.useState('To');
    const [showFrom, setShowFrom] = React.useState(false);
    const [showTo, setShowTo] = React.useState(false);
    const [name, setName] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [date, setDate] = React.useState('');
    const [selectedDay, setSelected] = React.useState(undefined);

    const daySelection = (day) => {
        setSelected(day.dateString);
        setDate(`${day.day}.${day.month}.${day.year}`);
    };

    const showTimepickerFrom = () => {
        setShowFrom(true);
    };

    const onChangeFrom = (event, selectedDate) => {
        const currentDateFrom = selectedDate || fromDate;
        setShowFrom(Platform.OS === 'ios');
        let hours = currentDateFrom.getHours();
        let minutes = currentDateFrom.getMinutes();
        setFrom(`${hours}:${minutes}`);
    };

    const showTimepickerTo = () => {
        setShowTo(true);
    };

    const onChangeTo = (event, selectedDate) => {
        const currentDateTo = selectedDate || toDate;
        setShowTo(Platform.OS === 'ios');
        let hours = currentDateTo.getHours();
        let minutes = currentDateTo.getMinutes();
        setTo(`${hours}:${minutes}`);
    };

    let saveHandler = async () => {
        axios.post(`https://${domain}.ngrok.io/setDates`, {
            name: name,
            details: details,
            date: date,
            timeFrom: from,
            timeTo: to
        })
        .catch((err) => {
            console.log(err)
        });
        navigation.navigate('Dashboard')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.back}>
                <Image source={require('../assets/icons/Vector.png')} />
                <Text style={styles.backText}>Back to dashboard</Text>
            </TouchableOpacity>
            <Text style={styles.inputNameLabel}>Name of deal</Text>
            <View style={styles.inputName}>
                <TextInput
                style={styles.inputTextName}
                placeholder="Enter the name" 
                placeholderTextColor='rgba(255, 255, 255, 0.4)'
                onChangeText={name => setName(name)}/>
            </View>
            <Text style={styles.inputDescriptionLabel}>Description</Text>
            <View style={styles.inputDescription}>
                <TextInput
                style={styles.inputTextDescription}
                placeholder="Enter the details" 
                placeholderTextColor='rgba(255, 255, 255, 0.4)'
                multiline={true}
                onChangeText={details => setDetails(details)}/>
            </View>
            <Text style={styles.calendarLabel}>Date</Text>
            <Calendar
                firstDay={1}
                monthFormat={'MMMM'}
                style={{left: 10}}
                onDayPress={(day) => daySelection(day)}
                markedDates={{
                    [selectedDay]: {
                        selected: true
                    }
                }}
                theme={{
                    arrowColor: '#FFFFFF',
                    monthTextColor: '#FFFFFF',
                    dayTextColor: '#FFFFFF',
                    textDisabledColor: 'rgba(255, 255, 255, 0.1)',
                    todayTextColor: '#CC00FF',
                    selectedDayBackgroundColor: '#CC00FF',
                    selectedDayTextColor: '#ffffff',
                    'stylesheet.calendar.main': {
                        container: {
                            position: 'absolute',
                            width: '95%',
                            top: 408,
                            height: 305,
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            borderRadius: 20
                        },
                        monthView: {}
                    },
                    'stylesheet.calendar.header': {
                        header: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                            paddingRight: 10,
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            height: 39.6,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }
                    }
                }}
            />
            <Text style={styles.timeLabel}>Time</Text>
            <TouchableOpacity onPress={() => showTimepickerFrom()} style={styles.fromTimeField}>
                {showFrom && (
                    <DateTimePicker
                        testID="from"
                        timeZoneOffsetInMinutes={0}
                        value={fromDate}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeFrom}
                    />
                )}
                <Text style={styles.fromText}>{from}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showTimepickerTo()} style={styles.toTimeField}>
                {showTo && (
                    <DateTimePicker
                        testID="to"
                        timeZoneOffsetInMinutes={0}
                        value={toDate}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTo}
                    />
                )}
                <Text style={styles.toText}>{to}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => saveHandler()} style={styles.saveContainer}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        height: '120%'
    },
    back: {
        position: 'absolute',
        left: '5%',
        top: 53
    },
    backText: {
        color: '#9B51E0',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        fontStyle: 'normal',
        height: 22,
        left: '20%',
        top: -22
    },
    inputNameLabel: {
        position: "absolute",
        top: 105,
        left: '10%',
        height: 25,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: '#FFFFFF'
    },
    inputName: {
        position: "absolute",
        width: '95%',
        height: 50,
        top: 146,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20
    },
    inputTextName: {
        position: "absolute",
        top: 14,
        left: 32,
        width: '83%',
        height: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.4)'
    },
    inputDescriptionLabel: {
        position: "absolute",
        top: 226,
        left: '10%',
        height: 25,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: '#FFFFFF'
    },
    inputDescription: {
        position: "absolute",
        width: '95%',
        height: 70,
        top: 267,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20
    },
    inputTextDescription: {
        position: "absolute",
        top: 14,
        left: 32,
        width: '83%',
        height: 40,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.4)'
    },
    calendarLabel: {
        position: "absolute",
        top: 367,
        left: '10%',
        height: 25,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: '#FFFFFF'
    },
    timeLabel: {
        position: "absolute",
        top: 750,
        left: '10%',
        height: 25,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: '#FFFFFF'
    },
    fromTimeField: {
        position: "absolute",
        width: '22%',
        height: 50,
        top: 791,
        left: '5%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20
    },
    fromText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 22,
        fontStyle: 'normal',
        height: 22,
        textAlign: 'center',
        top: 15
    },
    toTimeField: {
        position: "absolute",
        width: '22%',
        height: 50,
        top: 791,
        left: '32%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20
    },
    toText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 22,
        fontStyle: 'normal',
        height: 22,
        textAlign: 'center',
        top: 15
    },
    saveContainer: {
        position: 'absolute',
        width: '95%',
        height: 50,
        top: 885,
        left: 10,
        backgroundColor: 'rgba(204, 0, 255, 0.5)',
        borderRadius: 10
    },
    saveText: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 15,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 21
    }
});
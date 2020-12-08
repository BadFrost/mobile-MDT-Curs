import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { domain } from '../config';

const Item = ({ name, details, timeFrom, timeTo }) => (
    <View style={{
        width: '95%',
        height: 172,
        left: 10,
        marginBottom: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10}}>
        <Text style={styles.taskName}>{name}</Text>
        <Text style={styles.taskDetails}>{details}</Text>
        <View style={styles.taskHeader}>
            <Text style={styles.taskHeaderText}>{timeFrom} - {timeTo}</Text>
        </View>
        <View style={styles.taskLeft}>
            <TouchableOpacity style={styles.messagesIcon}>
                <Image source={require('../assets/icons/messagesActive_min.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callIcon}>
                <Image source={require('../assets/icons/call.png')} />
            </TouchableOpacity>
        </View>
    </View>
);

export const Dashboard = ({ navigation }) => {
    const [visibility, setVisibility] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [selectedDay, setSelected] = React.useState(undefined);

    const renderItem = ({ item }) => (
        <Item name={item.name} details={item.details} timeFrom={item.timeFrom} timeTo={item.timeTo} />
    );

    let daySelection = (day) => {
        setSelected(day.dateString);
        axios.post(`https://${domain}.ngrok.io/getDates`, {
            date: `${day.day}.${day.month}.${day.year}`
        })
        .then(res => {
            console.log(res.data)
            if (res.data !== 'Dates not found!') {
                setData(res.data);
                setVisibility(true);
            }
            else {
                setData([]);
                setVisibility(false);
            };
        })
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#000000" translucent = {true}/>
            <View style={styles.header}>
                <TouchableOpacity style={styles.notes}>
                    <Image source={require('../assets/icons/notes.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Dashboard</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditTasks')} style={styles.editTasks}>
                    <Image source={require('../assets/icons/editTasks.png')} />
                </TouchableOpacity>
            </View>
            <Calendar
                firstDay={1}
                monthFormat={'MMMM'}
                onDayPress={(day) => daySelection(day)}
                style={{left: 10, zIndex: 10}}
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
                            top: 115,
                            height: 305,
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            borderRadius: 20
                        },
                        monthView: {
                            
                        }
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
            {visibility ? 
                <View style={{flexGrow: 1, marginBottom: 520, top: 460}}>
                    <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    /> 
                </View> : null
            }
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.dashboard}>
                    <Image source={require('../assets/icons/dashboardActive.png')} />
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
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profile}>
                    <Image source={require('../assets/icons/profileInactive.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        position: 'absolute',
        backgroundColor: '#191919',
        width: '100%',
        height: 85,
        top: 0,
        zIndex: 10
    },
    title: {
        position: 'absolute',
        top: 53,
        width: 85,
        height: 22,
        left: 158,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    notes: {
        position: 'absolute',
        left: 18,
        top: 39
    },
    editTasks: {
        position: 'absolute',
        right: 18,
        top: 39
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
    listContainer: {
        position: 'absolute',
        top: 200,
        width: '100%'
    },
    taskHeaderText: {
        position: 'absolute',
        top: 4,
        width: '100%',
        height: 22,
        left: '5%',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    taskName: {
        position: 'absolute',
        top: 46,
        width: '100%',
        height: 22,
        left: '25%',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    taskDetails: {
        position: 'absolute',
        top: 85,
        width: '70%',
        height: 75,
        left: '25%',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    taskHeader: {
        position: 'absolute',
        width: '100%',
        height: 32,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    taskLeft: {
        position: 'absolute',
        width: '20%',
        height: 140,
        left: 0,
        top: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottomLeftRadius: 10
    },
    messagesIcon: {
        position: 'absolute',
        top: 30,
        left: '35%'
    },
    callIcon: {
        position: 'absolute',
        top: 82,
        left: '35%'
    },
    btn:{
        position: "absolute",
        width:100,
        height:50,
        top: 120,
        backgroundColor:"rgba(204, 0, 255, 0.5)",
        borderRadius:10,
        alignSelf: 'center',
        zIndex: 10
    },
    text:{
        position: "absolute",
        top: 8,
        left: 19,
        width: 63,
        color:"white",
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 33
    },
})
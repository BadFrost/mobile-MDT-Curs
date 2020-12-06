import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { domain } from '../config';

export function Dashboard({ navigation }) {
    const [states, setTaskState] = React.useState({
        state_1: false,
        state_2: false,
        state_3: false,
        state_4: false,
        state_5: false
    });
    const [tasksData, setTasksData] = React.useState({
        state_1Data: '',
        state_2Data: '',
        state_3Data: '',
        state_4Data: '',
        state_5Data: ''
    });
    const [selectedDay, setSelected] = React.useState(undefined);
    const [viewHeight, setViewHeight] = React.useState('100%');

    let GenerateTask1 = () => {
        return (
            <View style={styles.state_1Container}>
                <Text style={styles.taskName}>{tasksData.state_1Data.name}</Text>
                <Text style={styles.taskDetails}>{tasksData.state_1Data.details}</Text>
                <View style={styles.state_1Header}>
                    <Text style={styles.taskHeader}>{tasksData.state_1Data.timeFrom} - {tasksData.state_1Data.timeTo}</Text>
                </View>
                <View style={styles.state_1Left}>
                    <TouchableOpacity style={styles.messagesIcon}>
                        <Image source={require('../assets/icons/messagesActive_min.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callIcon}>
                        <Image source={require('../assets/icons/call.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    let GenerateTask2 = () => {
        return (
            <View style={styles.state_2Container}>
                <Text style={styles.taskName}>{tasksData.state_2Data.name}</Text>
                <Text style={styles.taskDetails}>{tasksData.state_2Data.details}</Text>
                <View style={styles.state_2Header}>
                    <Text style={styles.taskHeader}>{tasksData.state_2Data.timeFrom} - {tasksData.state_2Data.timeTo}</Text>
                </View>
                <View style={styles.state_2Left}>
                    <Text></Text>
                    <TouchableOpacity style={styles.messagesIcon}>
                        <Image source={require('../assets/icons/messagesActive_min.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callIcon}>
                        <Image source={require('../assets/icons/call.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    let GenerateTask3 = () => {
        return (
            <View style={styles.state_3Container}>
                <Text style={styles.taskName}>{tasksData.state_3Data.name}</Text>
                <Text style={styles.taskDetails}>{tasksData.state_3Data.details}</Text>
                <View style={styles.state_3Header}>
                    <Text style={styles.taskHeader}>{tasksData.state_3Data.timeFrom} - {tasksData.state_3Data.timeTo}</Text>
                </View>
                <View style={styles.state_3Left}>
                    <Text></Text>
                    <TouchableOpacity style={styles.messagesIcon}>
                        <Image source={require('../assets/icons/messagesActive_min.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callIcon}>
                        <Image source={require('../assets/icons/call.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    let GenerateTask4 = () => {
        return (
            <View style={styles.state_4Container}>
                <Text style={styles.taskName}>{tasksData.state_4Data.name}</Text>
                <Text style={styles.taskDetails}>{tasksData.state_4Data.details}</Text>
                <View style={styles.state_4Header}>
                    <Text style={styles.taskHeader}>{tasksData.state_4Data.timeFrom} - {tasksData.state_4Data.timeTo}</Text>
                </View>
                <View style={styles.state_4Left}>
                    <Text></Text>
                    <TouchableOpacity style={styles.messagesIcon}>
                        <Image source={require('../assets/icons/messagesActive_min.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callIcon}>
                        <Image source={require('../assets/icons/call.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    let GenerateTask5 = () => {
        return (
            <View style={styles.state_5Container}>
                <Text style={styles.taskName}>{tasksData.state_5Data.name}</Text>
                <Text style={styles.taskDetails}>{tasksData.state_5Data.details}</Text>
                <View style={styles.state_5Header}>
                    <Text style={styles.taskHeader}>{tasksData.state_5Data.timeFrom} - {tasksData.state_5Data.timeTo}</Text>
                </View>
                <View style={styles.state_5Left}>
                    <Text></Text>
                    <TouchableOpacity style={styles.messagesIcon}>
                        <Image source={require('../assets/icons/messagesActive_min.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callIcon}>
                        <Image source={require('../assets/icons/call.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    let daySelection = async (day) => {
        try {
            setSelected(day.dateString);
            axios.post(`https://${domain}.ngrok.io/getDates`, {
                date: `${day.day}.${day.month}.${day.year}`
            })
            .then(async (res) => {
                console.log(res.data)
                if (res.data !== 'Dates not found!') {
                    if (res.data.length === 1) {
                        setTaskState({state_1: true, state_2: false, state_3: false, state_4: false, state_5: false});
                        setTasksData({state_1Data: res.data[0], state_2Data: '', state_3Data: '', state_4Data: '', state_5Data: ''});
                        setViewHeight('100%')
                    }
                    else if (res.data.length === 2) {
                        setTaskState({state_1: true, state_2: true, state_3: false, state_4: false, state_5: false});
                        setTasksData({state_1Data: res.data[0], state_2Data: res.data[1], state_3Data: '', state_4Data: '', state_5Data: ''});
                        setViewHeight('115%')
                    }
                    else if (res.data.length === 3) {
                        setTaskState({state_1: true, state_2: true, state_3: true, state_4: false, state_5: false});
                        setTasksData({state_1Data: res.data[0], state_2Data: res.data[1], state_3Data: res.data[2], state_4Data: '', state_5Data: ''});
                        setViewHeight('140%')
                    }
                    else if (res.data.length === 4) {
                        setTaskState({state_1: true, state_2: true, state_3: true, state_4: true, state_5: false});
                        setTasksData({state_1Data: res.data[0], state_2Data: res.data[1], state_3Data: res.data[2], state_4Data: res.data[3], state_5Data: ''});
                        setViewHeight('165%')
                    }
                    else if (res.data.length === 5) {
                        setTaskState({state_1: true, state_2: true, state_3: true, state_4: true, state_5: true});
                        setTasksData({state_1Data: res.data[0], state_2Data: res.data[1], state_3Data: res.data[2], state_4Data: res.data[3], state_5Data: res.data[4]});
                        setViewHeight('195%')
                    };
                }
                else {
                    setTaskState({state_1: false, state_2: false, state_3: false, state_4: false, state_5: false});
                    setTasksData({state_1Data: '', state_2Data: '', state_3Data: '', state_4Data: '', state_5Data: ''});
                    setViewHeight('100%')
                };
            })
            .catch(async (err) => {
                console.log(err)
            });
        } 
        catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{
                height: `${viewHeight}`,
                backgroundColor: '#000000'}}
                >
                <Calendar
                    firstDay={1}
                    monthFormat={'MMMM'}
                    onDayPress={(day) => daySelection(day)}
                    style={{left: 10}}
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
                {states.state_1?<GenerateTask1 />:null}
                {states.state_2?<GenerateTask2 />:null}
                {states.state_3?<GenerateTask3 />:null}
                {states.state_4?<GenerateTask4 />:null}
                {states.state_5?<GenerateTask5 />:null}
            </ScrollView>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#191919" translucent = {true}/>
            <View style={styles.header}>
                <TouchableOpacity style={styles.notes}>
                    <Image source={require('../assets/icons/notes.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Dashboard</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditTasks')} style={styles.editTasks}>
                    <Image source={require('../assets/icons/editTasks.png')} />
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#000000'
    },
    scrollViewContainer: {
        height: '205%',
        backgroundColor: '#000000'
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
    state_1Container: {
        position: 'absolute',
        width: '95%',
        height: 172,
        top: 470,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10
    },
    state_1Header: {
        position: 'absolute',
        width: '100%',
        height: 32,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    state_1Left: {
        position: 'absolute',
        width: '20%',
        height: 140,
        left: 0,
        top: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottomLeftRadius: 10
    },
    state_2Container: {
        position: 'absolute',
        width: '95%',
        height: 172,
        top: 695,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10
    },
    state_2Header: {
        position: 'absolute',
        width: '100%',
        height: 32,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    state_2Left: {
        position: 'absolute',
        width: '20%',
        height: 140,
        left: 0,
        top: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottomLeftRadius: 10
    },
    state_3Container: {
        position: 'absolute',
        width: '95%',
        height: 172,
        top: 920,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10
    },
    state_3Header: {
        position: 'absolute',
        width: '100%',
        height: 32,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    state_3Left: {
        position: 'absolute',
        width: '20%',
        height: 140,
        left: 0,
        top: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottomLeftRadius: 10
    },
    state_4Container: {
        position: 'absolute',
        width: '95%',
        height: 172,
        top: 1150,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10
    },
    state_4Header: {
        position: 'absolute',
        width: '100%',
        height: 32,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    state_4Left: {
        position: 'absolute',
        width: '20%',
        height: 140,
        left: 0,
        top: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottomLeftRadius: 10
    },
    state_5Container: {
        position: 'absolute',
        width: '95%',
        height: 172,
        top: 1380,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10
    },
    state_5Header: {
        position: 'absolute',
        width: '100%',
        height: 32,
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    state_5Left: {
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
    taskHeader: {
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
    }
});
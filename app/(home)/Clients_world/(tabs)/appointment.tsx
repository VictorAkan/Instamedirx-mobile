import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function Appointment() {
    const [search, setSearch] = useState('');
    const [appointments, setAppointments] = useState([
        { id: 1, name: 'Tricia Whyte', condition: 'Diabetes', type: 'Video consultation', date: 'Wed, Sep 28', time: '11:45 am' },
        { id: 2, name: 'Tricia Whyte', condition: 'Diabetes', type: 'Video consultation', date: 'Wed, Sep 28', time: '11:45 am' }
    ]);

    const handleDelete = (id: any) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ThemedView style={styles.searchBar}>
                <TouchableOpacity activeOpacity={0.9}>
                    <Ionicons name="filter" size={20} color="#0544AA" style={styles.searchIcon} />
                </TouchableOpacity>
                <ThemedView style={styles.sideLine}>
                    <ThemedText></ThemedText>
                </ThemedView>
                <TextInput
                    placeholder="Browse doctors and medications"
                    placeholderTextColor="#8F8F8F"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
                <TouchableOpacity activeOpacity={0.9}>
                    <MaterialIcons name="search" size={24} color="#D6D6D6" />
                </TouchableOpacity>
            </ThemedView>
            <ThemedText style={styles.title}>Appointment list</ThemedText>
            <ThemedText style={styles.subtitle}>View appointments for the day</ThemedText>
            <ScrollView showsVerticalScrollIndicator={false}>
                {appointments.map((appointment) => (
                    <ThemedView key={appointment.id} style={styles.card}>
                        <ThemedView style={styles.header}>
                            <Image
                                source={require("../../../../assets/images/tricia.png")}
                                style={styles.avatar}
                            />
                            <ThemedView style={styles.info}>
                                <ThemedText style={styles.name}>{appointment.name}</ThemedText>
                                <ThemedText style={styles.details}>{appointment.condition}</ThemedText>
                                <ThemedText style={styles.details}>{appointment.type}</ThemedText>
                            </ThemedView>
                            <TouchableOpacity onPress={() => handleDelete(appointment.id)}>
                                <AntDesign name="close" size={24} color="#0866FF" />
                            </TouchableOpacity>
                        </ThemedView>
                        <ThemedView style={styles.dateContainer}>
                            <ThemedText style={styles.date}>{appointment.date}</ThemedText>
                            <ThemedText style={styles.time}>{appointment.time}</ThemedText>
                        </ThemedView>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button}>
                            <ThemedText style={styles.buttonText}>Reschedule</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                ))}
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 10,
        // paddingBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#ADCCFF',
        borderWidth: 1,
        padding: 8,
        marginTop: 10,
        marginHorizontal: 20,
    },
    sideLine: {
        borderLeftWidth: 2,
        borderLeftColor: '#ADCCFF',
        backgroundColor: 'white',
        paddingLeft: 5,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'OpenSans_400Regular',
    },
    title: {
        fontSize: 16,
        color: '#0866FF',
        fontFamily: 'OpenSans_600SemiBold',
        marginTop: 10,
        marginHorizontal: 20,
    },
    subtitle: {
        color: '#043380',
        marginBottom: 10,
        // marginTop: 9,
        fontFamily: 'OpenSans_400Regular',
        marginHorizontal: 20,
        fontSize: 14,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 10,
        marginTop: 30,
        marginHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#0866FF',
        marginRight: 10,
        borderWidth: 2,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
    },
    details: {
        fontSize: 14,
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    dateContainer: {
        backgroundColor: '#CEE0FF66',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 23,
        marginVertical: 10,
        paddingHorizontal: 45,
    },
    date: {
        fontSize: 14,
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    time: {
        fontSize: 14,
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    button: {
        backgroundColor: '#0866FF',
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginHorizontal: 90,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
});

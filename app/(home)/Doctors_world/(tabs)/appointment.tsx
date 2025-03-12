import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

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
        <View style={styles.container}>
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
            <Text style={styles.title}>Appointment list</Text>
            <Text style={styles.subtitle}>View appointments for the day</Text>

            {appointments.map((appointment) => (
                <View key={appointment.id} style={styles.card}>
                    <View style={styles.header}>
                        <Image
                            source={require("../../../../assets/images/tricia.png")}
                            style={styles.avatar}
                        />
                        <View style={styles.info}>
                            <Text style={styles.name}>{appointment.name}</Text>
                            <Text style={styles.details}>{appointment.condition}</Text>
                            <Text style={styles.details}>{appointment.type}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(appointment.id)}>
                        <AntDesign name="close" size={24} color="#0866FF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{appointment.date}</Text>
                        <Text style={styles.time}>{appointment.time}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Reschedule</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#ADCCFF',
        borderWidth: 1,
        padding: 10,
        marginTop: 80,
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
        fontSize: 17,
        color: '#0866FF',
        fontFamily: 'OpenSans_700Bold',
        marginTop: 40,
    },
    subtitle: {
        color: '#043380',
        marginBottom: 10,
        marginTop: 9,
        fontFamily: 'OpenSans_400Regular',
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
        marginHorizontal: 110,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
});

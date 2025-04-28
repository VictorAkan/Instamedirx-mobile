import React, { useState } from "react";
import {
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Calendar } from "@/components/Calendar";

import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [appointmentInterval, setAppointmentInterval] = useState(0);
    const [timezone, setTimezone] = useState("Africa, Nigeria");
    const [duration, setDuration] = useState(30);
    const [availability, setAvailability] = useState<{
        [key: string]: {
            StartTime: string;
            closingTime: string;
            unavailable: boolean;
        }[]
    }>({
        Monday: [
            {
                StartTime: "From 9:00am",
                closingTime: "To 6:00pm",
                unavailable: false,
            },
        ],
        Tuesday: [
            {
                StartTime: "From 9:00am",
                closingTime: "To 6:00pm",
                unavailable: false,
            },
        ],
        Wednesday: [
            {
                StartTime: "From 9:00am",
                closingTime: "To 6:00pm",
                unavailable: false,
            },
        ],
        Thursday: [
            {
                StartTime: "From 9:00am",
                closingTime: "To 6:00pm",
                unavailable: false,
            },
        ],
        Friday: [
            {
                StartTime: "From 9:00am",
                closingTime: "To 6:00pm",
                unavailable: false,
            },
        ],
        Saturday: [
            {
                StartTime: "Unavailable",
                closingTime: "",
                unavailable: true,
            },
        ],
        Sunday: [
            {
                StartTime: "Unavailable",
                closingTime: "",
                unavailable: true,
            },
        ],
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity onPress={() => setStep(1)}>
                <Text style={styles.backButton}>{"< Back"}</Text>
            </TouchableOpacity> */}
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Calendar</ThemedText>
            </ThemedView>

            <ThemedView style={styles.navBar}>
                <TouchableOpacity onPress={() => setStep(1)} activeOpacity={0.9}>
                    <ThemedText style={step === 1 ? styles.navItemActive : styles.navItem}>Available hours</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStep(2)} activeOpacity={0.9}>
                    <ThemedText style={step === 2 ? styles.navItemActive : styles.navItem}>Specific dates</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStep(3)} activeOpacity={0.9}>
                    <ThemedText style={step === 3 ? styles.navItemActive : styles.navItem}>Advanced setup</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                {step === 2 && (
                    <ThemedView style={styles.emptySection}>
                        <ThemedView style={{ justifyContent:'center', alignItems: 'center' }}>
                            <FontAwesome name="calendar" size={40} color="#0866FF" />
                        </ThemedView>
                        <ThemedText style={styles.message}>No specific dates found, add specific availability date.</ThemedText>
                    </ThemedView>
                )}

                {step === 3 && (
                    <ThemedView style={styles.section}>
                        <ThemedText style={styles.label}>Interval between appointments</ThemedText>
                        <TextInput
                            value={String(appointmentInterval)}
                            onChangeText={(text) => setAppointmentInterval(Number(text || 0))}
                            style={styles.input}
                            placeholderTextColor="#898686"
                        />
                        <ThemedText style={styles.label}>Time zone</ThemedText>
                        <TextInput value={timezone} placeholderTextColor="#898686" onChangeText={setTimezone} style={styles.input} />
                        <ThemedText style={styles.label}>Appointment duration</ThemedText>
                        <TextInput
                            value={String(duration)}
                            onChangeText={(text) => setDuration(Number(text || 0))}
                            style={styles.input}
                            placeholderTextColor="#898686"
                        />
                    </ThemedView>
                )}

                {step === 1 && (
                    <ThemedView style={styles.section}>
                        {Object.keys(availability).map((day) => (
                            <ThemedView key={day} style={styles.availabilityRow}>
                                <ThemedText style={styles.dayText}>{day}</ThemedText>
                                {availability[day].map((dayInterval, i) => (
                                    <ThemedView key={i} style={[styles.timeView, {
                                        gap: dayInterval.unavailable === true ? 0 : 30,
                                        flexDirection: dayInterval.unavailable === true ? 'column' : 'row',
                                        width: dayInterval.unavailable === true ? '68%' : 'auto',
                                    }]}>
                                        <ThemedText style={styles.timeText}>{dayInterval.StartTime}</ThemedText>
                                        {dayInterval.unavailable === false ? <ThemedText style={[styles.timeText, {
                                            paddingHorizontal: dayInterval.unavailable === false ? 10 : 50
                                        }]}>{dayInterval.closingTime}</ThemedText> : ""}
                                    </ThemedView>
                                ))}
                            </ThemedView>
                        ))}
                    </ThemedView>
                )}

                <ThemedView style={styles.calendarSection}>
                    <ThemedText style={styles.calendarHeader}>Calendar</ThemedText>

                    {/* Calendar UI */}
                    <Calendar />

                    <ThemedText style={styles.subText}>Available hours, Mon to Friday</ThemedText>
                    <ThemedText style={styles.subText}>Unavailable days, set specific dates</ThemedText>

                    <ThemedView style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={() => setStep(step === 1 ? 2 : 3)}
                        style={styles.addButtonContainer}
                        activeOpacity={0.9}
                    >
                        <ThemedText style={styles.addButton}>+ Add</ThemedText>
                    </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    backButton: {
        color: "#002D75",
        fontSize: 16,
        marginBottom: 10,
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 20,
        // marginTop: 10,
    },
    header: {
        fontSize: 20,
        textAlign: "center",
        color: '#043380',
        fontFamily: 'OpenSans_700Bold',
    },
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    navItem: {
        fontSize: 14,
        color: "gray",
    },
    navItemActive: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#043380",
    },
    section: {
        padding: 15,
        // backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
    emptySection: {
        padding: 35,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 22,
    },
    message: {
        fontSize: 16,
        color: "#043380",
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Inter_500Medium',
    },
    label: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        marginTop: 20,
        color: '#043380',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#0866FF",
        padding: 10,
        borderRadius: 20,
        marginTop: 5,
        backgroundColor: "#fff",
        fontFamily: 'Inter_500Medium',
        color: '#898686',
    },
    availabilityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    dayText: {
        fontSize: 15,
        padding: 5,
        textAlign: "center",
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
        // marginLeft: 2,
        // width: 30,
    },
    timeView: {
        flexDirection: 'row',
        // alignItems: 'center',
        gap: 30,
    },
    timeText: {
        fontSize: 15,
        color: "#043380",
        fontFamily: 'Inter_400Regular',
        borderColor: '#0866FF',
        borderWidth: 1,
        padding: 3,
        borderRadius: 20,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    calendarSection: {
        marginTop: 70,
        // alignItems: "center",
    },
    calendarContainer: {
        width: "100%",
        padding: 10,
        backgroundColor: "#CEE0FF66",
        borderRadius: 10,
        alignItems: "center",
    },
    calendarHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        paddingVertical: 10,
        backgroundColor: '#CEE0FF66',
    },
    calendarHeader: {
        fontSize: 16,
        color: "#043380",
        textAlign: 'left',
        fontFamily: 'Inter_700Bold',
        marginBottom: 15,
    },
    navArrow: {
        fontSize: 18,
        color: "#002D75",
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginVertical: 2,
    },
    subText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
        color: "#043380",
        textAlign: 'center',
        marginTop: 15,
    },
    inactiveDay: {
        color: "gray",
    },
    addButtonContainer: {
        marginTop: 25,
        backgroundColor: "#0866FF",
        padding: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonView: {
        paddingHorizontal: 120,
    },
    addButton: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Inter_700Bold',
    },
});

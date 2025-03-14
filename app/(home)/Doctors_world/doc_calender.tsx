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

export default function CalendarScreen() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [appointmentInterval, setAppointmentInterval] = useState(0);
    const [timezone, setTimezone] = useState("Africa, Nigeria");
    const [duration, setDuration] = useState(30);
    const [availability, setAvailability] = useState<{
        [key: string]: string;
    }>({
        Monday: "9:00am - 6:00pm",
        Tuesday: "9:00am - 6:00pm",
        Wednesday: "9:00am - 6:00pm",
        Thursday: "9:00am - 6:00pm",
        Friday: "9:00am - 6:00pm",
        Saturday: "Unavailable",
        Sunday: "Unavailable",
    });

    const renderCalendar = () => {
        const daysInMonth = [
            [28, 29, 30, 31, 1, 2, 3],
            [4, 5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30, 31],
        ];

        return (
            <ThemedView style={styles.calendarContainer}>
                <ThemedView style={styles.calendarHeaderContainer}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <ThemedText style={styles.navArrow}>{"<"}</ThemedText>
                    </TouchableOpacity>
                    <ThemedText style={styles.calendarHeader}>Nov 2024</ThemedText>
                    <TouchableOpacity activeOpacity={0.9}>
                        <ThemedText style={styles.navArrow}>{">"}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                {daysInMonth.map((week, index) => (
                    <ThemedView key={index} style={styles.weekRow}>
                        {week.map((day, idx) => (
                            <ThemedText
                                key={idx}
                                style={[
                                    styles.dayText,
                                    day <= 31 && day >= 28 ? styles.inactiveDay : null,
                                ]}
                            >
                                {day}
                            </ThemedText>
                        ))}
                    </ThemedView>
                ))}
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
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
                {step === 1 && (
                    <ThemedView style={styles.emptySection}>
                        <ThemedView style={{ justifyContent:'center', alignItems: 'center' }}>
                            <FontAwesome name="calendar" size={40} color="#0866FF" />
                        </ThemedView>
                        <ThemedText style={styles.message}>No specific dates found, add specific availability date.</ThemedText>
                    </ThemedView>
                )}

                {step === 2 && (
                    <ThemedView style={styles.section}>
                        <ThemedText style={styles.label}>Interval between appointments</ThemedText>
                        <TextInput
                            value={String(appointmentInterval)}
                            onChangeText={(text) => setAppointmentInterval(Number(text || 0))}
                            style={styles.input}
                        />
                        <ThemedText style={styles.label}>Time zone</ThemedText>
                        <TextInput value={timezone} onChangeText={setTimezone} style={styles.input} />
                        <ThemedText style={styles.label}>Appointment duration</ThemedText>
                        <TextInput
                            value={String(duration)}
                            onChangeText={(text) => setDuration(Number(text || 0))}
                            style={styles.input}
                        />
                    </ThemedView>
                )}

                {step === 3 && (
                    <ThemedView style={styles.section}>
                        {Object.keys(availability).map((day) => (
                            <ThemedView key={day} style={styles.availabilityRow}>
                                <ThemedText style={styles.dayText}>{day}</ThemedText>
                                <ThemedText style={styles.timeText}>{availability[day]}</ThemedText>
                            </ThemedView>
                        ))}
                    </ThemedView>
                )}

                <ThemedView style={styles.calendarSection}>
                    <ThemedText style={styles.calendarHeader}>Calendar</ThemedText>

                    {/* Calendar UI */}
                    {renderCalendar()}

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
        </ThemedView>
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
        marginTop: 40,
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
        backgroundColor: "#f5f5f5",
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
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: "#fff",
    },
    availabilityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    dayText: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,
        textAlign: "center",
        // width: 30,
    },
    timeText: {
        fontSize: 16,
        color: "#666",
    },
    calendarSection: {
        marginTop: 70,
        // alignItems: "center",
    },
    calendarContainer: {
        width: "100%",
        padding: 10,
        backgroundColor: "#ECF2FF",
        borderRadius: 10,
        alignItems: "center",
    },
    calendarHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        paddingVertical: 10,
    },
    calendarHeader: {
        fontSize: 16,
        color: "#043380",
        textAlign: 'left',
        fontFamily: 'Inter_700Bold',
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

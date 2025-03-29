import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const Qualifications = () => {
    return (
        <ThemedView style={styles.container}>
            {/* Experience Section */}
            <ThemedView style={{ backgroundColor: '#F1FAFF', padding: 16, marginTop: 25 }}>
                <ThemedText style={styles.sectionTitle}>Experience</ThemedText>
                <ThemedView style={styles.itemContainer}>
                    <Image source={require("../assets/images/hospital1.png")} style={styles.icon} />
                    <ThemedView style={{ backgroundColor: '#F1FAFF', }}>
                        <ThemedText style={styles.title}>St. Louis hospital</ThemedText>
                        <ThemedText style={styles.subtitle}>Gynecologist</ThemedText>
                        <ThemedText style={styles.date}>2015-Present</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <Image source={require("../assets/images/hospital2.png")} style={styles.icon} />
                    <ThemedView style={{ backgroundColor: '#F1FAFF', }}>
                        <ThemedText style={styles.title}>Peterson hospital</ThemedText>
                        <ThemedText style={styles.subtitle}>Gynecologist</ThemedText>
                        <ThemedText style={styles.date}>2011-2014</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            {/* Licenses/Certification Section */}
            <ThemedView style={{ backgroundColor: '#F1FAFF', padding: 16, marginTop: 25, }}>
                <ThemedText style={styles.sectionTitle}>Licenses/Certification</ThemedText>
                <ThemedView style={styles.itemContainer}>
                    <Image source={require("../assets/images/medicalcert.png")} style={styles.icon} />
                    <ThemedView style={{ backgroundColor: '#F1FAFF', }}>
                        <ThemedText style={styles.title}>Medical certificate</ThemedText>
                        <ThemedText style={styles.subtitle}>Medicine & Surgery</ThemedText>
                        <ThemedText style={styles.date}>September 2020</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <Image source={require("../assets/images/medicalcert.png")} style={styles.icon} />
                    <ThemedView style={{ backgroundColor: '#F1FAFF', }}>
                        <ThemedText style={styles.title}>Medical license</ThemedText>
                        <ThemedText style={styles.subtitle}>License no: <ThemedText style={styles.licenseNumber}>B12w2350</ThemedText></ThemedText>
                        <ThemedText style={styles.date}>September 2020</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            {/* Degrees/Diplomas Section */}
            <ThemedView style={{ backgroundColor: '#F1FAFF', padding: 16, marginTop: 25 }}>
                <ThemedText style={styles.sectionTitle}>Degrees/Diplomas</ThemedText>
                <ThemedView style={styles.itemContainer}>
                    <Image source={require("../assets/images/diploma.png")} style={styles.icon} />
                    <ThemedView style={{ backgroundColor: '#F1FAFF', }}>
                        <ThemedText style={styles.title}>Lagos State University</ThemedText>
                        <ThemedText style={styles.subtitle}>Medicine & Surgery</ThemedText>
                        <ThemedText style={styles.date}>September 2020</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.itemContainer}>
                    <Image source={require("../assets/images/diploma.png")} style={styles.icon} />
                    <ThemedView style={{ backgroundColor: '#F1FAFF', }}>
                        <ThemedText style={styles.title}>Lagos State University</ThemedText>
                        <ThemedText style={styles.subtitle}>Medicine & Surgery</ThemedText>
                        <ThemedText style={styles.date}>September 2020</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        // padding: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: "#043380",
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#F1FAFF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
        color: "#043380",
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
        color: "#043380",
    },
    licenseNumber: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: "#043380",
    },
    date: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: "#043380",
    },
});

export default Qualifications;

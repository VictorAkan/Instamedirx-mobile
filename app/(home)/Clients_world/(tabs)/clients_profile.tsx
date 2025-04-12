import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons'; // For back arrow icon
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link, useRouter } from 'expo-router';

interface SettingItem {
    title: string;
    subtitle: string;
    route: any;
}

export default function ClientsProfileSettings() {
    const router = useRouter();
    const truncateText = (text: string, maxLength: number) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.headerText}>Settings</ThemedText>
            </ThemedView>

            {/* Options */}
            <ScrollView contentContainerStyle={styles.optionsContainer}>
                {settings.map((item: SettingItem, index: number) => (
                    <Link href={item.route} key={index} asChild>
                        <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                            <ThemedText style={styles.title}>{item.title}</ThemedText>
                            <ThemedText style={styles.subtitle}>{truncateText(item.subtitle, 40)}</ThemedText>
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const settings: SettingItem[] = [
    {
        title: 'My Profile',
        subtitle: 'Change display name, contact, address, picture, and other personal information',
        route: "/Clients_world/my_profile",
    },
    {
        title: 'Privacy & Security',
        subtitle: 'Set who sees your information and how we use your data.',
        route: "",
    },
    {
        title: 'Preference',
        subtitle: 'Customize app preference like password, display, or account',
        route: "",
    },
    {
        title: 'Payment',
        subtitle: 'Save your frequent cards and payment preference ',
        route: "",
    },
    {
        title: 'Notification',
        subtitle: 'Configure how you receive notifications on the app',
        route: "",
    },
    {
        title: 'Medical Preference',
        subtitle: 'Set medical preferences like doctors, hospitals and ',
        route: "",
    },
    {
        title: 'Pharmacy Preference',
        subtitle: 'Set pharmacy preferences about medications and pharmacies',
        route: "",
    },
    {
        title: 'Support',
        subtitle: 'You can contact us for support.',
        route: "",
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 40,
        gap: 10,
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'OpenSans_600SemiBold',
        color: '#0755D4',
        marginLeft: 10,
    },
    optionsContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#F1FAFF',
        borderRadius: 4,
        paddingVertical: 14,
        paddingHorizontal: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontFamily: 'OpenSans_600SemiBold',
        color: '#0544AA',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#04338099',
        fontFamily: 'OpenSans_400Regular',
    },
});

// PharmCMedicalStore.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { MaterialIcons, Ionicons, AntDesign, Feather, SimpleLineIcons, Octicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const PharmCMedicalStore = () => {
    const [selectedHMO, setSelectedHMO] = useState('');
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.leftSide}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>PharmC Medical Store</ThemedText>
            </ThemedView>
            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* Logo */}
                <ThemedView style={styles.logoContainer}>
                    <Image
                        source={require('../../../../assets/images/pharmc.png')} // Place the logo image in assets folder
                        style={styles.logo}
                    // resizeMode="contain"
                    />
                </ThemedView>

                {/* Store Status */}
                <ThemedText style={styles.statusText}>Open | Mon 9am -10pm</ThemedText>

                {/* Rating */}
                <ThemedView style={styles.review}>
                    <ThemedText style={styles.rating}>4.5</ThemedText>
                    <MaterialIcons name="star-border-purple500" size={24} color="#EEE600" />
                    <ThemedText style={styles.rating}>(120 reviews)</ThemedText>
                </ThemedView>

                {/* Contact Details */}
                <ThemedView style={styles.contactSection}>
                    <ThemedView style={styles.contactRow}>
                        <Ionicons name="call-outline" size={20} color="#8190aa" />
                        <ThemedText style={styles.contactText}>+234 906 4692 341</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.contactRow}>
                        <Feather name="mail" size={19} color="#8190aa" />
                        <ThemedText style={styles.contactText}>chisomokoli@gmail.com</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.contactRow}>
                        <SimpleLineIcons name="location-pin" size={22} color="#8190aa" />
                        <ThemedText style={styles.contactText}>
                            4, Victoria street, off Queens avenue, Ikeja, Lagos State
                        </ThemedText>
                    </ThemedView>

                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL(
                                'https://www.google.com/maps/search/?api=1&query=4+Victoria+street,+Ikeja'
                            )
                        }
                    >
                        <ThemedText style={styles.getDirection}>Get Direction</ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                {/* Qualifications & Licenses */}
                <ThemedText style={styles.sectionTitle}>Qualifications and Licenses</ThemedText>

                <ThemedText style={styles.subHeader}>Degrees</ThemedText>
                <ThemedText style={styles.bodyFirstText}>* store owner’s degrees</ThemedText>
                <ThemedText style={styles.bodyText}>B. Pharm (Bachelor of Pharmacy)</ThemedText>

                <ThemedText style={styles.subHeader}>Licenses</ThemedText>
                <ThemedText style={styles.bodyText}>
                    Pharmacy Council of Nigeria (PCN) Operational License
                </ThemedText>
                <ThemedText style={styles.bodyText}>
                    National Agency for Food and Drug Administration and Control (NAFDAC)
                    Certification
                </ThemedText>
                <ThemedText style={styles.bodyText}>CAC Registration</ThemedText>

                <ThemedText style={styles.sectionTitle}>Services Offered</ThemedText>
                {[
                    'Prescription Refills',
                    'Vaccinations',
                    'Medication Counselling',
                    'Health Screenings',
                    'Compounding Services',
                ].map((item, index) => (
                    <ThemedView key={index} style={styles.listItem}>
                        <ThemedView style={styles.checkView}>
                            <Ionicons name="checkmark-sharp" size={24} color="#043380" />
                        </ThemedView>
                        <ThemedText style={styles.listText}>{item}</ThemedText>
                    </ThemedView>
                ))}

                {/* Delivery Options */}
                <ThemedText style={styles.sectionTitle}>Delivery Options</ThemedText>
                {[
                    'Home delivery',
                    'Click & collect',
                    'Delivery partner services',
                ].map((item, index) => (
                    <ThemedView key={index} style={styles.listItem}>
                        <ThemedView style={styles.checkView}>
                            <Ionicons name="checkmark-sharp" size={24} color="#043380" />
                        </ThemedView>
                        <ThemedText style={styles.listText}>{item}</ThemedText>
                    </ThemedView>
                ))}

                {/* Accepted HMOs */}
                <ThemedText style={styles.sectionTitle}>Accepted HMOs</ThemedText>
                <ThemedView style={styles.dropdownWrapper}>
                    <Picker
                        selectedValue={selectedHMO}
                        onValueChange={(itemValue) => setSelectedHMO(itemValue)}
                        style={styles.dropdown}
                        dropdownIconColor="#043380"
                    >
                        <Picker.Item label="Leadway Health Insurance" value="leadway" />
                        <Picker.Item label="AXA Mansard" value="axa" />
                        <Picker.Item label="Hygeia HMO" value="hygeia" />
                    </Picker>
                </ThemedView>

                {/* Operating Hours */}
                <ThemedText style={styles.sectionTitle}>Operating Hours</ThemedText>
                {[
                    ['Mon', '9am -10pm'],
                    ['Tue', '9am -10pm'],
                    ['Wed', '9am -10pm'],
                    ['Thur', '9am -10pm'],
                    ['Fri', '9am -10pm'],
                    ['Sat', '8am -10pm'],
                    ['Sun', '5pm -10pm'],
                ].map(([day, time], index) => (
                    <ThemedView key={index} style={styles.dateRow}>
                        <ThemedText style={styles.hoursText}>{`${day}`}</ThemedText>
                        <ThemedText style={styles.hoursText}>{`${time}`}</ThemedText>
                    </ThemedView>
                ))}

                {/* Socials */}
                <ThemedText style={styles.followUs}>Follow Us</ThemedText>
                <ThemedView style={styles.socials}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')} activeOpacity={0.8}>
                        <Image source={require("../../../../assets/images/pharm_fb.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')} activeOpacity={0.8}>
                        <Image source={require("../../../../assets/images/pharm_x.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/234')} activeOpacity={0.8}>
                        <Image source={require("../../../../assets/images/pharm_whatsapp.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')} activeOpacity={0.8}>
                        <Image source={require("../../../../assets/images/pharm_ig.png")} />
                    </TouchableOpacity>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
};

export default PharmCMedicalStore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginTop: 30,
    },
    header: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0755D4',
    },
    title: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,

    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#0866FF',
    },
    logo: {
        width: '98%',
        height: 250,
        backgroundColor: '#F1FAFF',
        borderRadius: 10,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
        padding: 10,
    },
    statusText: {
        color: '#0866FF',
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
    },
    review: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    rating: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
    },
    star: {
        color: '#fbc02d',
        fontWeight: 'bold',
    },
    contactSection: {
        marginTop: 30,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    contactText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        flex: 1,
        flexWrap: 'wrap',
    },
    getDirection: {
        marginTop: 10,
        color: '#8055AA',
        fontSize: 14,
        fontFamily: 'OpenSans_600SemiBold',
        marginLeft: 30,
    },
    sectionTitle: {
        marginTop: 30,
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0866FF',
        marginBottom: 10,
    },
    subHeader: {
        marginTop: 12,
        fontFamily: 'OpenSans_700Bold',
        fontSize: 16,
        color: '#043380',
    },
    bodyFirstText: {
        color: '#6B6B6B',
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
    },
    bodyText: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        marginVertical: 2,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    listText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
    },
    checkView: {
        backgroundColor: '#CEE0FF',
        padding: 5,
        borderRadius: 20,
    },
    dropdownWrapper: {
        borderWidth: 1,
        borderColor: '#0544AA',
        borderRadius: 8,
        // overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#F1FAFF',
    },
    dropdown: {
        // height: 50,
        color: '#043380CC',
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
    },
    dateRow: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '40%',
    },
    hoursText: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
    },
    followUs: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 16,
        color: '#043380',
        marginTop: 20,
        marginBottom: 10,
    },
    socials: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        marginBottom: 20,
    },
});

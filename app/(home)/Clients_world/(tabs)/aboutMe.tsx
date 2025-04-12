import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';


const AboutMe = () => {
    const [gender, setGender] = useState("Male");
    const [language, setLanguage] = useState("English");

    

    const userData = {
        name: "Fred Nkwanu",
        contact: "08124398210",
        address: "No 2 Victoria street, Ibeju-lekki, off Epe Expresswaay Lagos State",
        dob: "24/02/1990",
        image: require('../../../../assets/images/patientwithfixedappointment1.png'),

    };

    const handleEdit = (field: string) => {
        console.log(`Editing ${field}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="#0544AA"  />
                <Text style={styles.title}>My Profile</Text>
            </View>

            {/* Profile Box */}
            <View style={styles.profileBox}>
                {/* Profile Image */}
                <View style={styles.imageWrapper}>
                    <Image source={userData.image} style={styles.profileImage} />
                </View>

                {/* Info Items */}
                <InfoItem label="Name" value={userData.name} onEdit={() => handleEdit('name')} />
                <InfoItem label="Contact" value={userData.contact} onEdit={() => handleEdit('contact')} />
                <InfoItem label="Address" value={userData.address} onEdit={() => handleEdit('address')} />
                <InfoItem label="Date of Birth" value={userData.dob} onEdit={() => handleEdit('dob')} />

                {/* Gender Dropdown */}
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                </View>

                {/* Language Dropdown */}
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Language</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={language}
                            onValueChange={(itemValue) => setLanguage(itemValue)}
                            mode="dropdown"
                        >
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="Yoruba" value="Yoruba" />
                            <Picker.Item label="Igbo" value="Igbo" />
                            <Picker.Item label="Hausa" value="Hausa" />
                            <Picker.Item label="French" value="French" />
                        </Picker>
                    </View>
                </View>
            </View>

            {/* Sign Out */}
            <TouchableOpacity style={styles.signOutBtn}>
                <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const InfoItem = ({
    label,
    value,
    onEdit
}: {
    label: string;
    value: string;
    onEdit: () => void;
}) => (
    <View style={styles.infoItem}>
        <View style={styles.infoText}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
        <TouchableOpacity onPress={onEdit}>
            <MaterialIcons name="edit" size={20} color="#888" />
        </TouchableOpacity>
    </View>
);

export default AboutMe;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        paddingVertical: 60, 
        paddingHorizontal: 20,
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0544AA',
    },
    profileBox: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
    },
    imageWrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoText: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#888',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    pickerWrapper: {
        overflow: 'hidden',
        marginTop: 5,
    },
    signOutBtn: {
        marginTop: 30,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#043380',
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#F1FAFF',
        width: "30%",
        alignSelf: 'center',
    },
    signOutText: {
        color: 'red',
        fontWeight: '600',
    },
});

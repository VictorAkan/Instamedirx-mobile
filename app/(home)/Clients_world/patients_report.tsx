import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Platform
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AppBtn } from '@/components/AppButton';

const HowYouFeelScreen = () => {
    const [gender, setGender] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Back Arrow */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>

                {/* Title */}
                <ThemedText style={styles.header}>
                    Tell us how you feel, Alfred
                </ThemedText>
                <ThemedText style={styles.subText}>
                    This will help us to select the right doctors for you
                </ThemedText>

                {/* Gender Picker */}
                <ThemedView style={styles.inputWrapper}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={Platform.OS === 'android' ? styles.picker : undefined}
                        dropdownIconColor="#043380"
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </ThemedView>

                {/* Symptoms Input */}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe your symptoms"
                    placeholderTextColor="#8F8F8F"
                    multiline
                    numberOfLines={4}
                    value={symptoms}
                    onChangeText={setSymptoms}
                />

                {/* Diagnosis Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Mention any previous diagnosis (if any)"
                    placeholderTextColor="#8F8F8F"
                    value={diagnosis}
                    onChangeText={setDiagnosis}
                />

                {/* Button */}
                {/* <TouchableOpacity style={styles.button}>
                    <ThemedText style={styles.buttonText}>Find Doctors</ThemedText>
                    <Ionicons name="arrow-forward" size={18} color="white" style={{ marginLeft: 5 }} />
                </TouchableOpacity> */}
                <ThemedView style={{
                    alignContent: 'flex-start',
                    alignSelf: 'flex-start',
                    marginTop: 20,
                }}>
                <AppBtn route="/Clients_world/docs_list_filter" value="Find Doctors" />
                </ThemedView>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HowYouFeelScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    backButton: {
        marginBottom: 20,
        marginTop: 50,
    },
    header: {
        fontSize: 16,
        fontFamily: 'OpenSans_600SemiBold',
        color: '#0755D4',
        // marginBottom: 6,
    },
    subText: {
        fontSize: 14,
        color: '#8F8F8F',
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 30,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#ADCCFF',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    picker: {
        // height: 50,
        paddingLeft: 10,
        fontSize: 14,
        color: '#8F8F8F',
        fontFamily: 'OpenSans_400Regular',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ADCCFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        color: '#000',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#0057FF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
});

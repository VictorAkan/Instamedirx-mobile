import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DocsMainProfile() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    return (
        <ThemedView style={styles.container}>
            {/* <ThemedView style={styles.searchBar}>
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
            </ThemedView> */}

            <ScrollView style={{ flexGrow: 1, marginTop: 10, }} showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.titleView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <ThemedText style={styles.title}>My profile</ThemedText>
                </ThemedView>
                {/* Profile Section */}
                <ThemedView style={styles.profileContainer}>
                    <Image source={require("../../../assets/images/docprofile.png")} style={styles.profileImage} />
                    <ThemedView style={styles.profileInfo}>
                        <Text style={styles.profileName}>Dr. Sandra Davis</Text>
                        <Text style={styles.profileTitle}>Gynecologist</Text>
                    </ThemedView>
                    <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </ThemedView>

                {/* Personal Information Section */}
                <Text style={styles.sectionTitle}>Personal information</Text>
                <ThemedView style={styles.infoContainer}>
                    <ThemedView style={[styles.deepBg, {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }]}>
                        <Text style={styles.infoTitle}>Hospital name</Text>
                        <Text style={styles.infoText}>• ST Lious Hospital</Text>
                    </ThemedView>

                    <ThemedView style={styles.lightBg}>
                        <Text style={styles.infoTitle}>Hospital address</Text>
                        <Text style={styles.infoText}>• 23, Emmanuel Street, Off Awolowo Road, Ikoya, Lagos State, Nigeria</Text>
                    </ThemedView>

                    <ThemedView style={styles.deepBg}>
                        <Text style={styles.infoTitle}>Zip code</Text>
                        <Text style={styles.infoText}>• 101233</Text>
                    </ThemedView>

                    <ThemedView style={styles.lightBg}>
                        <Text style={styles.infoTitle}>City</Text>
                        <Text style={styles.infoText}>• Lagos</Text>
                    </ThemedView>

                    <ThemedView style={[styles.deepBg, {
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                    }]}>
                        <Text style={styles.infoTitle}>Country</Text>
                        <Text style={styles.infoText}>• Nigeria</Text>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    deepBg: {
        backgroundColor: '#CEE0FF66',
        padding: 15,
        gap: 6,
    },
    lightBg: {
        padding: 15,
        gap: 6,
    },
    titleView: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        color: '#043380',
        fontFamily: 'Inter_700Bold',
        fontSize: 21,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        borderColor: '#0866FF80',
        backgroundColor: '#CEE0FF33',
        borderWidth: 2,
        borderRadius: 30,
        // height: 70,
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 3,
        marginTop: 15,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#CEE0FF3',
    },
    profileName: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: '#043380',
    },
    profileTitle: {
        fontSize: 15,
        color: '#043380',
        fontFamily: 'Inter_400Regular',
    },
    editButton: {
        backgroundColor: '#BA7FD6',
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 20,
    },
    editText: {
        color: 'white',
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: '#043380',
        fontFamily: 'Inter_700Bold',
        fontSize: 21,
        marginTop: 25,
    },
    infoContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#0866FF80',
        borderRadius: 30,
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 3,
    },
    infoTitle: {
        fontSize: 17,
        fontFamily: 'Inter_700Bold',
        color: '#043380',
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#043380',
        fontFamily: 'Inter_400Regular',
    },
});


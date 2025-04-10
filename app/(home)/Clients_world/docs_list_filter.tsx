import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

const DoctorCard = () => {
    const truncateText = (text: any, maxLength: any) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    return (
        <ThemedView style={styles.card}>
            {/* <ThemedView style={styles.imageContainer}> */}
                <Image source={require('../../../assets/images/docbg.jpeg')} style={styles.avatar} />
            {/* </ThemedView> */}
            <ThemedView style={styles.info}>
                <ThemedView style={styles.header}>
                    <ThemedText style={styles.name}>Dr. Chisom Okoli</ThemedText>
                    <ThemedText style={styles.role}>Psychiatrist</ThemedText>
                </ThemedView>
                <ThemedText style={styles.description}>
                    {truncateText("I am a Psychiatrist with 3 years experience working in both male and female sports with medical license as a chiropractor and intense workout", 60)}
                </ThemedText>
                <ThemedView style={styles.bottomRow}>
                    <ThemedView style={styles.rating}>
                        <ThemedText style={styles.ratingText}>4.5</ThemedText>
                        <MaterialIcons name="star-border-purple500" size={18} color="#EEE600" />
                    </ThemedView>
                    <ThemedView style={styles.icons}>
                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.8}>
                            <Image source={require("../../../assets/images/chaticon.png")} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.8}>
                            <Ionicons name="videocam-outline" size={15} color="#0544AA" />
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

export default function DoctorsScreen() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.searchContainer}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedView style={styles.searchBar}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Ionicons name="filter" size={20} color="#0544AA" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <ThemedView style={styles.sideLine}>
                        <ThemedText></ThemedText>
                    </ThemedView>
                    <TextInput
                        placeholder=""
                        placeholderTextColor="#8F8F8F"
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity activeOpacity={0.9}>
                        <MaterialIcons name="search" size={24} color="#8F8F8F" />
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {[...Array(15)].map((_, i) => (
                    <DoctorCard key={i} />
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        // gap: 8,
        marginTop: 20,
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'OpenSans_400Regular',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#0755D4',
        borderWidth: 1,
        padding: 8,
        // marginTop: 15,
        marginHorizontal: 20,
    },
    sideLine: {
        borderLeftWidth: 2,
        borderLeftColor: '#0755D4',
        backgroundColor: 'white',
        paddingLeft: 5,
    },
    scrollContainer: {
        paddingBottom: 20,
        flexGrow: 1,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F1FAFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
        paddingVertical: 15,
    },
    imageContainer: {
        backgroundColor: '#F1FAFF',
        // // alignItems: 'center',
        // justifyContent: 'center',
        // borderColor: '#0866FF',
        // borderWidth: 1,
        // padding: 2,
        // width: 90,
        // height: 90,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 12,
        borderColor: '#0866FF',
        borderWidth: 1,
        padding: 2,
        alignSelf: 'center',
        marginRight: 10,
    },
    info: {
        flex: 1,
        backgroundColor: '#F1FAFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 8,
        backgroundColor: '#F1FAFF',
    },
    name: {
        fontFamily: 'OpenSans_600SemiBold',
        color: '#0544AA',
        fontSize: 14,
    },
    role: {
        color: '#0544AA',
        fontSize: 12,
        fontFamily: 'OpenSans_400Regular',
    },
    description: {
        fontSize: 12,
        color: '#6B6B6B',
        fontFamily: 'OpenSans_400Regular',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 8,
        backgroundColor: '#F1FAFF',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F1FAFF',
    },
    ratingText: {
        color: '#043380',
        fontFamily: 'OpenSans_700Bold',
        fontSize: 12,
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    icons: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#F1FAFF',
    },
    bottomBtn: {
        borderColor: '#CEE0FF',
        padding: 4,
        borderWidth: 1,
        borderRadius: 20,
    }
});

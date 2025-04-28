import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import DrawerMenu from '@/components/DrawerMenu';
import DocsHome from '@/components/DocsHome';
import FilterPage from '@/components/FilterComponent';

import { SafeAreaView } from 'react-native-safe-area-context';
// import StoryCircle from '@/components/SegmentedStoryCircle';

 export default function HomeScreen() {
    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const revealFilter = () => {
        setShowFilter(!showFilter);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                { showFilter === true ? "" : <ThemedView style={styles.header}>
                    <ThemedText style={styles.welcomeText}>Welcome, Dr. Sandra</ThemedText>
                    <ThemedView style={styles.sideView}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setDrawerVisible(true)}>
                            <Ionicons name="ellipsis-vertical" size={22} color="#0544AA" />
                        </TouchableOpacity>
                        <Link href="/Doctors_world/doc_messages_screen" asChild>
                            <TouchableOpacity activeOpacity={0.9}>
                                <Image source={require("../../../../assets/images/chaticon.png")} />
                            </TouchableOpacity>
                        </Link>
                    </ThemedView>
                </ThemedView> }

                <ThemedView style={styles.searchBar}>
                    <TouchableOpacity onPress={revealFilter} activeOpacity={0.9}>
                        { showFilter === true ? <Ionicons name="close" size={24} color="#0544AA" /> : <Ionicons name="filter" size={20} color="#0544AA" style={styles.searchIcon} /> }
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
                        onFocus={() => setShowFilter(true)}
                    />
                    <TouchableOpacity activeOpacity={0.9}>
                        <MaterialIcons name="search" size={24} color={showFilter === true ? '#8F8F8F' : '#D6D6D6'} />
                    </TouchableOpacity>
                </ThemedView>
                { showFilter === true ? <FilterPage /> : <DocsHome /> }
            </ThemedView>
            {isDrawerVisible && <DrawerMenu isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        paddingVertical: 10,
        marginTop: 10,
        flex: 1,
        // paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0755D4',
        fontFamily: 'OpenSans_700Bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#ADCCFF',
        borderWidth: 1,
        padding: 8,
        marginTop: 15,
        marginHorizontal: 20,
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
    sectionTitle: {
        fontSize: 17,
        color: '#0866FF',
        marginTop: 35,
        fontFamily: 'OpenSans_700Bold',
        marginHorizontal: 20,
    },
    sideView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }
});

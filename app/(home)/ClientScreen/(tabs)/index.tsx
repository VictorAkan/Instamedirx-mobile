import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import DrawerMenu from '@/components/DrawerMenu';
import ClientHome from '@/components/ClientHome';
import FilterPage from '@/components/FilterComponent';
// import StoryCircle from '@/components/SegmentedStoryCircle';

export default function ClientScreen() {
    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [clientUser, setClientUser] = useState("Alfred");

    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (increment) => {
        setCartCount(prevCount => prevCount + increment);
    };


    const revealFilter = () => {
        setShowFilter(!showFilter);
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                {showFilter === true ? "" : <ThemedView style={styles.header}>
                    <ThemedText style={styles.welcomeText}> Welcome, {clientUser}</ThemedText>
                    <ThemedView style={styles.sideView}>
                        <Link href="/Doctors_world/doc_cart_screen" asChild>
                            <TouchableOpacity activeOpacity={0.9}>
                                <View style={styles.cartIconContainer}>
                                    <MaterialCommunityIcons name="cart-outline" size={24} color="#0544AA" />
                                    {cartCount >= 0 && (
                                        <View style={styles.cartBadge}>
                                            <Text style={styles.cartBadgeText}>{cartCount}</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </Link>
                        <Link href="/Doctors_world/doc_messages_screen" asChild>
                            <TouchableOpacity activeOpacity={0.9}>
                                <Image source={require("../../../../assets/images/chaticon.png")} />
                            </TouchableOpacity>
                        </Link>
                    </ThemedView>
                </ThemedView>}

                <ThemedView style={styles.searchBar}>
                    <TouchableOpacity onPress={revealFilter} activeOpacity={0.9}>
                        {showFilter === true ? <Ionicons name="close" size={24} color="#0544AA" /> : <Ionicons name="filter" size={20} color="#0544AA" style={styles.searchIcon} />}
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

                {showFilter === true ? <FilterPage /> : <ClientHome addToCart={addToCart} />}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginTop: 60,
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
        padding: 10,
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
    },
    cartIconContainer: {
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        right: -8,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    categoryContainer: {
        marginBottom: 20,
        paddingTop: 30,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    categoryText: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
        backgroundColor: '#F9F8C5',
        padding: 5,
        paddingHorizontal: 10,
    },
    
   

});

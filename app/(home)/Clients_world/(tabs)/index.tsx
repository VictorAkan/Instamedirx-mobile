import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useCart } from '@/utils/context/cart_context';
import { Link } from 'expo-router';
import DrawerMenu from '@/components/DrawerMenu';
import FilterPage from '@/components/FilterComponent';
import ClientsHome from '@/components/ClientsHome';
// import StoryCircle from '@/components/SegmentedStoryCircle';

export default function ClientScreen() {
    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const { cartCount, setCartCount, cartItems, setCartItems, disabledButtons, setDisabledButtons } = useCart();

    const revealFilter = () => {
        setShowFilter(!showFilter);
    }

    const toggleCartItem = (id: any) => {
        if (disabledButtons[id]) {
            // Remove item from cart
            setCartCount(cartCount - 1);
            setCartItems(prev => ({ ...prev, [id]: false }));
            setDisabledButtons(prev => ({ ...prev, [id]: false }));
        } else {
            // Add item to cart
            setCartCount(cartCount + 1);
            setCartItems(prev => ({ ...prev, [id]: true }));
            setDisabledButtons(prev => ({ ...prev, [id]: true }));
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                {showFilter === true ? "" : <ThemedView style={styles.header}>
                    <ThemedText style={styles.welcomeText}>Welcome, Alfred</ThemedText>
                    <ThemedView style={styles.sideView}>
                        <Link href="/Clients_world/client_cart_screen" asChild>
                            <TouchableOpacity activeOpacity={0.9}>
                                <MaterialCommunityIcons name="cart-outline" size={20} color="#698fcc" />
                                {cartCount > 0 && (
                                    <View style={styles.cartBadge}>
                                        <Text style={styles.cartBadgeText}>{cartCount}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </Link>
                        <Link href="/Clients_world/client_messages_screen" asChild>
                            <TouchableOpacity activeOpacity={0.9}>
                                <Image source={require("../../../../assets/images/chaticon.png")} style={{ width: 18, height: 18 }} />
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
                {showFilter === true ? <FilterPage /> : <ClientsHome toggleCartItem={toggleCartItem} disabledButtons={disabledButtons} />}
            </ThemedView>
            {isDrawerVisible && <DrawerMenu isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />}
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0755D4',
        fontFamily: 'OpenSans_600SemiBold',
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
        gap: 25,
    }
});
import { Image, TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const products = {
    Malaria: [
        { id: 1, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 2, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png') },
        { id: 3, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria3.png') },
    ],
    'Pain Relief': [
        { id: 4, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 5, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain2.png') },
        { id: 6, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain3.png') },
    ],
};

// Create a mapping of categories to IDs
const categoriesWithIds = Object.keys(products).map((category, index) => ({
    id: index + 1, // Simple incrementing ID
    category,
}));

export default function DocsPharmShop() {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [disabledButtons, setDisabledButtons] = useState<{[key: string]: boolean}>({});

    const addToCart = (id:any) => {
        setCartCount(cartCount + 1);
        setDisabledButtons(prev => ({ ...prev, [id]: true }));
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <ThemedView style={styles.leftSide}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                    <ThemedText style={styles.header}>Pharmacy shop</ThemedText>
                </ThemedView>
                <ThemedView style={styles.edgeIcons}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <MaterialIcons name="search" size={24} color="#0544AA" />
                    </TouchableOpacity>
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
                </ThemedView>
            </ThemedView>
            <ScrollView style={styles.scrollcontainer} showsVerticalScrollIndicator={false}>
                {Object.entries(products).map(([category, items]) => {
                    const categoryId = categoriesWithIds.find(c => c.category === category)!.id;
                    return (
                        <ThemedView key={category} style={styles.categoryContainer}>
                            <ThemedView style={styles.categoryHeader}>
                                <ThemedText style={styles.categoryText}>{category}</ThemedText>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({
                                        pathname: "/Doctors_world/pharm_drugs_categories/[id]",
                                        params: { id: categoryId },
                                    })}>
                                        <ThemedText style={styles.viewAll}>View all</ThemedText>
                                    </TouchableOpacity>
                            </ThemedView>
                            <ScrollView style={{ marginTop: 15, flexGrow: 1 }} horizontal showsHorizontalScrollIndicator={false}>
                                {items.map((product) => (
                                    <ThemedView key={product.id} style={styles.productCard}>
                                        <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8} onPress={() => {
                                            router.push({
                                                pathname: "/Doctors_world/product_details/[id]",
                                                params: {
                                                    id: product.id,
                                                    image: product.image,
                                                }
                                            })
                                        }}>
                                            <Image source={product.image} style={styles.productImage} />
                                        </TouchableOpacity>
                                        <ThemedText style={styles.productTxt}>{product.name}</ThemedText>
                                        <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                                        <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartButton, {
                                            backgroundColor: disabledButtons[product.id] ? "#CEE0FF" : "#0866FF"
                                        }]} onPress={() => addToCart(product.id)} disabled={disabledButtons[product.id]}>
                                            <ThemedText style={[styles.addToCartText, {
                                                color: disabledButtons[product.id] ? '#8F8F8F' : '#fff'
                                            }]}>Add to Cart</ThemedText>
                                            <ThemedView style={styles.sideView}>
                                                <AntDesign name="arrowright" size={20} color={disabledButtons[product.id] ? '#D6D6D6': '#0866FF'} />
                                            </ThemedView>
                                        </TouchableOpacity>
                                    </ThemedView>
                                ))}
                            </ScrollView>
                        </ThemedView>
                    )
                })}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingVertical: 10,
    },
    scrollcontainer: {
        // flex: 1,
        backgroundColor: 'white',
        // paddingVertical: 50,
        // paddingTop: 40,
        marginTop: 20,
        paddingLeft: 25,
        flexGrow: 1,
        // marginBottom: 60,
        // // marginTop: 10,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 70,
        // marginBottom: 10,
        paddingHorizontal: 15,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
    },
    edgeIcons: {
        gap: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0755D4',
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
    viewAll: {
        color: '#0866FF',
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
    },
    productCard: {
        // width: 150,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 10,
        // borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    productListCard: {
        width: '48%',
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 10,
        // borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productTxt: {
        marginTop: 10,
        width: '100%',
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0544AA',
    },
    imageContainer: {
        borderWidth: 1,
        padding: 20,
        borderColor: '#CEE0FF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    productPrice: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        width: '100%',
        color: '#0544AA',
    },
    addToCartButton: {
        backgroundColor: "#0866FF",
        padding: 10,
        alignItems: 'center',
        borderRadius: 12,
        height: 47,
        paddingHorizontal: 15,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        marginTop: 20,
    },
    sideView: {
        borderRadius: 29,
        padding: 4,
    },
    addToCartText: {
        color: "#FFFFFF",
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
})

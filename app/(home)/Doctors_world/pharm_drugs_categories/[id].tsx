import { Image, TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const categoriesWithIds = [
    { id: 1, category: 'Malaria' },
    { id: 2, category: 'Pain Relief' }
];

const products = {
    Malaria: [
        { id: 1, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 2, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png') },
        { id: 3, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria3.png') },
        { id: 4, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 5, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 6, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 7, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 8, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 9, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 10, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 11, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 12, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 13, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 14, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
        { id: 15, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
    ],
    'Pain Relief': [
        { id: 4, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 5, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain2.png') },
        { id: 6, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain3.png') },
        { id: 7, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 8, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 9, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 10, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 11, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 12, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 13, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 14, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 15, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
        { id: 16, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
    ],
};

export default function ProductList() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [disabledButtons, setDisabledButtons] = useState<{ [key: string]: boolean }>({});

    const addToCart = (id: any) => {
        setCartCount(cartCount + 1);
        setDisabledButtons(prev => ({ ...prev, [id]: true }));
    };

    // Find the corresponding category using the ID
    const categoryData = categoriesWithIds.find(c => c.id === Number(id));
    const categoryName = categoryData?.category || '';

    // Get products for the found category
    const validCategory = categoryName in products
        ? categoryName as keyof typeof products
        : null;
    const items = validCategory ? products[validCategory] : [];

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <ThemedView style={styles.leftSide}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                    <ThemedText style={styles.header}>{categoryName}</ThemedText>
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
                <ThemedView style={styles.productGrid}>
                    {items.map((product) => (
                        <ThemedView key={product.id} style={styles.productListCard}>
                            <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8} onPress={() => {
                                router.push({
                                    pathname: "/Doctors_world/product_details/[id]",
                                    params: {
                                        id: product.id,
                                        image: product.image,
                                        disableButton: String(disabledButtons[product.id] || false)
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
                                    <AntDesign name="arrowright" size={20} color={disabledButtons[product.id] ? '#D6D6D6' : '#0866FF'} />
                                </ThemedView>
                            </TouchableOpacity>
                        </ThemedView>
                    ))}
                </ThemedView>
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
        paddingHorizontal: 25,
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
    categoryContainer: {
        marginBottom: 20,
        paddingTop: 30,
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
    // categoryHeader: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingRight: 20,
    // },
    // categoryText: {
    //     fontFamily: 'OpenSans_700Bold',
    //     fontSize: 14,
    //     backgroundColor: '#F9F8C5',
    //     padding: 5,
    //     paddingHorizontal: 10,
    // },
    // viewAll: {
    //     color: '#0866FF',
    //     fontSize: 16,
    //     fontFamily: 'OpenSans_400Regular',
    // },
    productCard: {
        // width: 150,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        // borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    productListCard: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        // marginHorizontal: 10,
        width: '48%',
        // borderRadius: 10,
        // borderWidth: 1,
        marginBottom: 10,
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
import { Image, TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const products = {
    Antibiotics: [
        { id: 1, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/amoxil.png'), store: "PharmC Store", },
        { id: 2, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/biot2.png'), store: "Iseoluwa Pharmacy", },
        { id: 3, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria1.png'), store: "GoodWill Pharmacy", },
        { id: 4, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/pain1.png'), store: "NaijaMeds Hub", },
        { id: 5, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/biot2.png'), store: "WellCare Pharmacy", },
        { id: 6, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/amoxil.png'), store: "CuraMed Pharmacy", },
        { id: 7, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/biot2.png'), store: "GreenLeaf Pharmacy", },
    ],
    Malaria: [
        { id: 1, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria1.png'), store: "RxHaven Nigeria", },
        { id: 2, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria2.png'), store: "GreenLeaf Pharmacy", },
        { id: 3, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria3.png'), store: "WellSpring Pharmacy", },
        { id: 4, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria2.png'), store: "GreenLeaf Pharmacy", },
        { id: 5, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria2.png'), store: "WellSpring Pharmacy", },
        { id: 6, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria2.png'), store: "RxHaven Nigeria", },
        { id: 7, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/malaria1.png'), store: "GreenLeaf Pharmacy", },
    ],
    'Pain Relief': [
        { id: 4, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain1.png'), store: "CityMeds Hub", },
        { id: 5, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain2.png'), store: "InfinityMeds", },
        { id: 6, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain3.png'), store: "MyMediMart NG", },
        { id: 7, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain2.png'), store: "InfinityMeds",  },
        { id: 8, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain2.png'), store: "MyMediMart NG", },
        { id: 9, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain2.png'), store: "CityMeds Hub", },
        { id: 10, name: 'Vitacillin Met 500mg/1000mg', price: '₦2,500', image: require('../../../assets/images/pain1.png'), store: "MyMediMart NG", },
    ],
    'Protein Supplement': [
        { id: 1, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/ps1.png'), store: "OptiMed Pharmacy", },
        { id: 2, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/ps2.png'), store: "GreenLeaf Pharmacy", },
        { id: 3, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/ps3.jpeg'), store: "WellSpring Pharmacy", },
        { id: 4, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/ps2.png'), store: "GreenLeaf Pharmacy", },
        { id: 5, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/ps2.png'), store: "GreenLeaf Pharmacy", },
        { id: 6, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/ps1.png'), store: "OptiMed Pharmacy", },
    ],
    'Medical Equipment': [
        { id: 1, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/me1.png'), store: "OptiMed Pharmacy", },
        { id: 2, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/me2.png'), store: "Reliance", },
        { id: 3, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/me3.jpeg'), store: "WellSpring Pharmacy", },
        { id: 4, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/me2.png'), store: "Reliance", },
        { id: 5, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/me2.png'), store: "GreenLeaf Pharmacy", },
        { id: 6, name: 'Vitacillin Met 500mg/1000mg', price: '₦3,500', image: require('../../../assets/images/me1.png'), store: "OptiMed Pharmacy", },
    ],
};

const topDeals = [
    { id: 1, name: 'Vitacillin Met 5...', price: '₦11,900', image: require('../../../assets/images/prod1.png'), discount: 20  },
    { id: 2, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../assets/images/prod2.png'), discount: 50 },
    { id: 3, name: 'Vitacillin Met 5...', price: '₦23,500', image: require('../../../assets/images/prod3.png'), discount: 20 },
    { id: 4, name: 'Vitacillin Met 5...', price: '₦19,500', image: require('../../../assets/images/prod4.png'), discount: 20  },
]

// Create a mapping of categories to IDs
const categoriesWithIds = Object.keys(products).map((category, index) => ({
    id: index + 1, // Simple incrementing ID
    category,
}));

export default function ClientsPharmShop() {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [disabledButtons, setDisabledButtons] = useState<{[key: string]: boolean}>({});

    const truncateText = (text: string, maxLength: number) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

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
                    <ThemedText style={styles.header}>Shop Now</ThemedText>
                </ThemedView>
                <ThemedView style={styles.edgeIcons}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <MaterialIcons name="search" size={24} color="#0544AA" />
                    </TouchableOpacity>
                    <Link href="/Clients_world/client_cart_screen" asChild>
                        <TouchableOpacity activeOpacity={0.9}>
                            <View style={styles.cartIconContainer}>
                                <MaterialCommunityIcons name="cart-outline" size={24} color="#0544AA" />
                                {cartCount > 0 && (
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
                                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({
                                        pathname: "/Doctors_world/pharm_drugs_categories/[id]",
                                        params: { id: categoryId },
                                    })}>
                                        <ThemedText style={styles.viewAll}>View all</ThemedText>
                                    </TouchableOpacity> */}
                            </ThemedView>
                            <ScrollView style={{ marginTop: 15, flexGrow: 1 }} horizontal showsHorizontalScrollIndicator={false}>
                                {items.map((product) => (
                                    <ThemedView key={product.id} style={styles.productCard}>
                                        <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8} onPress={() => {
                                            router.push({
                                                pathname: "/Clients_world/product_details/[id]",
                                                params: {
                                                    id: product.id,
                                                    image: product.image,
                                                    store: product.store,
                                                }
                                            })
                                        }}>
                                            <Image source={product.image} style={styles.productImage} />
                                        </TouchableOpacity>
                                        <ThemedText style={styles.productTxt}>{truncateText(product.name, 16)}</ThemedText>
                                        <ThemedText style={styles.productStore}>{truncateText(product.store, 16)}</ThemedText>
                                        <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                                        <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartButton, {
                                            backgroundColor: disabledButtons[product.id] ? "#CEE0FF" : "#0866FF"
                                        }]} onPress={() => addToCart(product.id)} disabled={disabledButtons[product.id]}>
                                            <ThemedText style={[styles.addToCartText, {
                                                color: disabledButtons[product.id] ? '#8F8F8F' : '#fff'
                                            }]}>Add to Cart</ThemedText>
                                            <ThemedView style={styles.sideView}>
                                                <AntDesign name="arrowright" size={18} color={disabledButtons[product.id] ? '#D6D6D6': '#0866FF'} />
                                            </ThemedView>
                                        </TouchableOpacity>
                                    </ThemedView>
                                ))}
                            </ScrollView>
                        </ThemedView>
                    )
                })}

                <ThemedView style={styles.categoryHeader}>
                                <ThemedText style={styles.categoryText}>Top Deals</ThemedText>
                                {/* <TouchableOpacity activeOpacity={0.8}>
                                    <ThemedText style={styles.viewAll}>View All</ThemedText>
                                </TouchableOpacity> */}
                            </ThemedView>
                            <ThemedView style={styles.productGrid}>
                                {topDeals.map((product) => (
                                    <ThemedView key={product.id} style={styles.productListCard}>
                                        <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8} onPress={() => {
                                            router.push({
                                                pathname: "/Clients_world/product_details/[id]",
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
                                        {product.discount && <ThemedView style={styles.discountRow}>
                                            <Feather name="tag" size={16} color="#FF5E5E" />
                                            <ThemedText style={styles.discountTxt}>{product.discount}% discount</ThemedText>
                                        </ThemedView>}
                                        <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                                        <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartButton, {
                                            backgroundColor: disabledButtons[product.id] ? "#CEE0FF" : "#0866FF",
                                            marginTop: product.discount ? 0 : 25
                                        }]} onPress={() => addToCart(product.id)} disabled={disabledButtons[product.id]}>
                                            <ThemedText style={[styles.addToCartText, {
                                                color: disabledButtons[product.id] ? '#8F8F8F' : '#fff'
                                            }]}>Add to Cart</ThemedText>
                                            <ThemedView style={styles.sideView}>
                                                <AntDesign name="arrowright" size={18} color={disabledButtons[product.id] ? '#D6D6D6' : '#0866FF'} />
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
        paddingLeft: 20,
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
        paddingTop: 15,
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
        color: '#4F4D00',
        padding: 2,
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
        // marginRight: 10,
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
        // width: '100%',
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0544AA',
        alignSelf: 'flex-start',
    },
    discountRow: {
        flexDirection: 'row',
        gap: 4,
        alignSelf: 'flex-start',
        marginLeft: 12,
    },
    discountTxt: {
        color: '#FF5E5E',
        fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
    },
    productStore: {
        color: "#FF5E5E",
        fontSize: 14,
        fontFamily: 'OpenSans_600SemiBold',
        alignSelf: 'flex-start',
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
        // width: '100%',
        color: '#0544AA',
        alignSelf: 'flex-start',
    },
    addToCartButton: {
        backgroundColor: "#0866FF",
        padding: 7,
        alignItems: 'center',
        borderRadius: 12,
        // height: 47,
        paddingHorizontal: 15,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        marginTop: 5,
    },
    sideView: {
        borderRadius: 29,
        padding: 2,
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

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

type CustomRoute = "/Doctors_world/Delivery_screens/home_delivery" | "/Doctors_world/Delivery_screens/click_and_collect" | "";

interface DeliveryOption {
    id: string;
    label: string;
    description: string;
    route: CustomRoute;
}

interface Product {
    id: string;
    name: string;
    image: any;
}

interface Quantities {
    amertem: number;
    coartem: number;
    [key: string]: number;
}

export default function DeliveryOptions() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Quantities>({ amertem: 1, coartem: 1 });
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleQuantityChange = (product: string, change: number) => {
        setQuantities((prev) => ({
            ...prev,
            [product]: Math.max(1, prev[product] + change),
        }));
    };

    const deliveryOptions: DeliveryOption[] = [
        { id: 'home', label: 'Home delivery', description: 'Get your order delivered at your doorstep', route: '/Doctors_world/Delivery_screens/home_delivery' },
        { id: 'click_collect', label: 'Click and collect', description: 'Pick up order from a pharmacy near your location', route: '/Doctors_world/Delivery_screens/click_and_collect' },
        { id: 'partner_service', label: 'Delivery partner service', description: 'Integrate with third-party services to receive order', route: '' },
    ];

    const products: Product[] = [
        {
            id: 'amertem',
            name: 'Amertem softgel',
            image: require('../../../../assets/images/malaria1.png'),
        },
        {
            id: 'coartem',
            name: 'Coartem tablet',
            image: require('../../../../assets/images/malaria3.png'),
        },
    ];

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Delivery options</ThemedText>
            </ThemedView>
            <ThemedView style={styles.searchBar}>
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
            </ThemedView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <ThemedText style={styles.subHeader}>Choose a delivery option</ThemedText>
                {deliveryOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => {
                                setSelectedOption(option.id);
                                router.push(option.route as any)
                            }}
                            style={[styles.optionContainer, selectedOption === option.id && styles.selectedOption]}
                            activeOpacity={0.9}
                        >
                            <ThemedView style={{ gap: 10 }}>
                                <ThemedView style={styles.opLabelView}>
                                    <ThemedView style={styles.radioOuter}>
                                        {selectedOption === option.id && <ThemedView style={styles.radioInner} />}
                                    </ThemedView>
                                    <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
                                </ThemedView>
                                <ThemedText style={styles.optionDescription}>{option.description}</ThemedText>
                            </ThemedView>
                        </TouchableOpacity>
                ))}

                <ThemedView style={styles.orderSummary}>
                    <ThemedText style={styles.subHeader}>Order summary</ThemedText>
                    {products.map((product) => (
                        <ThemedView key={product.id} style={styles.productContainer}>
                            <Image source={product.image} style={styles.productImage} />
                            <ThemedView style={{ gap: 20 }}>
                                <ThemedView style={styles.productInfo}>
                                    <ThemedText style={styles.productName}>{product.name}</ThemedText>
                                    <ThemedText style={styles.sold}>Sold by Pharmacist John</ThemedText>
                                    <ThemedText style={styles.productPrice}>₦3,500</ThemedText>
                                </ThemedView>
                                <ThemedView style={styles.quantityContainer}>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => handleQuantityChange(product.id, -1)}>
                                        <Feather name="minus" size={24} color="#043380" />
                                    </TouchableOpacity>
                                    <ThemedText style={styles.quantity}>Quantity {quantities[product.id]}</ThemedText>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => handleQuantityChange(product.id, 1)}>
                                        <AntDesign name="plus" size={24} color="#043380" />
                                    </TouchableOpacity>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    ))}
                </ThemedView>

                <ThemedView style={styles.pricing}>
                    <ThemedView style={styles.priceFlex}>
                        <ThemedText style={styles.priceTitle}>Sub total</ThemedText>
                        <ThemedText style={styles.mainPriceA}>₦7,000</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.priceFlex}>
                        <ThemedText style={styles.priceTitle}>Delivery fee</ThemedText>
                        <ThemedText style={styles.mainPriceB}>₦2,000</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.priceFlex}>
                        <ThemedText style={styles.priceTitle}>Total</ThemedText>
                        <ThemedText style={styles.mainPriceC}>₦9,000</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: 30,
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 20,
        marginTop: 40,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 20,
        textAlign: "center",
        color: '#043380',
        fontFamily: 'OpenSans_700Bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#ADCCFF',
        borderWidth: 1,
        padding: 10,
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
    scrollView: {
        flexGrow: 1,
        // backgroundColor: '#fff',
        // marginTop: 10,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 10,
        color: '#043380',
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 20,
        marginTop: 30,
    },
    optionContainer: {
        flexDirection: 'row',
        padding: 15,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 20,
        paddingLeft: 30,
        marginHorizontal: 20,
    },
    opLabelView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedOption: {
        borderColor: '#0055FF',
    },
    radioOuter: {
        width: 15,
        height: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#043380',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#043380',
    },
    optionLabel: {
        color: '#043380',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
    },
    optionDescription: {
        color: '#043380',
        fontSize: 13,
        fontFamily: 'Inter_500Medium',
        width: 253,
        lineHeight: 20,
    },
    orderSummary: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30,
        elevation: 2,
        marginTop: 20,
        marginHorizontal: 20,
    },
    productContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        marginBottom: 10,
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    sold: {
        marginBottom: 10,
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    productPrice: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
        color: '#043380',
    },
    quantity: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        marginHorizontal: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    pricing: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30,
        elevation: 2,
        marginTop: 20,
        marginHorizontal: 20,
    },
    priceFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
        marginBottom: 30,
    },
    priceTitle: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    mainPriceA: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
    },
    mainPriceB: {
        color: '#128227',
        fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
    },
    mainPriceC: {
        color: '#021433',
        fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
    },
});

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppBtn } from "@/components/AppButton";
import { RegTextInput } from "@/components/RegTextInput";
import { useState } from "react";

interface DeliveryEstimationOption {
    id: string;
    label: string;
    description: string;
}

export default function Payment() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [email, onChangeEmail] = useState("");
    const [search, setSearch] = useState("");
    const router = useRouter();

    const delEstimationOptions: DeliveryEstimationOption[] = [
        {
            id: 'first',
            label: 'Same day delivery',
            description: `
( 1-6 hours estimated delivery time )
This depends on customer location and time of order
            `,
        },
        {
            id: 'second',
            label: 'Standard delivery',
            description: '3-5 business days estimated',
        },
    ];

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Payment</ThemedText>
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
            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <ThemedText style={styles.subHeader}>1. Choose delivery option</ThemedText>
                <ThemedView style={styles.optionContainer}>
                    <ThemedView style={{ gap: 15 }}>
                        <ThemedText style={styles.delName}>John Mercy</ThemedText>
                        <ThemedText style={styles.delAddress}>
                            16 kayode, Olive Park Estate, Victoria Island,Eti-osa, Lagos Nigeria. 07012705592
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedText style={styles.subHeader}>2. Delivery estimation options</ThemedText>
                {delEstimationOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        onPress={() => {
                            setSelectedOption(option.id);
                        }}
                        style={[styles.optionContainer, selectedOption === option.id && styles.selectedOption]}
                        activeOpacity={0.9}
                    >
                        <ThemedView style={{ gap: 5 }}>
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
                <ThemedText style={styles.subHeader}>3. Payment method</ThemedText>
                <ThemedView style={styles.payment}>
                    <ThemedView style={styles.paymentFlex}>
                        <ThemedText style={styles.paymentTitle}>Pay with bank card</ThemedText>
                        <Image source={require("../../../../assets/images/cardImage.png")} />
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.inputContainer}>
                    <ThemedView style={styles.buttonView}>
                        <AppBtn
                            route="/Doctors_world/Delivery_screens/order_tracking"
                            value="Order"
                        />
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginHorizontal: 50,
        marginTop: 30,
        color: '#043380',
        fontFamily: 'Inter_600SemiBold',
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        gap: 27,
    },
    optionContainer: {
        flexDirection: 'row',
        padding: 15,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 20,
        paddingLeft: 20,
        marginHorizontal: 40,
        paddingVertical: 20,
    },
    delName: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    delAddress: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        width: 253,
    },
    opLabelView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedOption: {
        borderColor: '#0055FF',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#043380',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 10,
        height: 10,
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
        lineHeight: 23,
    },
    payment: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30,
        elevation: 2,
        marginTop: 20,
        marginHorizontal: 40,
    },
    paymentFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
        // marginBottom: 30,
    },
    paymentTitle: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
})
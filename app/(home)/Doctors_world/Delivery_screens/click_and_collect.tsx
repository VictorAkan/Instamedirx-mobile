import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppBtn } from "@/components/AppButton";
import { RegTextInput } from "@/components/RegTextInput";
import { useState } from "react";

interface Location {
    id: string;
    label: string;
    description: string;
}

export default function ClickAndCollect() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [email, onChangeEmail] = useState("");
    const [search, setSearch] = useState("");
    const router = useRouter();

    const locations: Location[] = [
        {
            id: 'first',
            label: 'Ikoyi store',
            description: '7 Norman Willliams by Keffi off Awolowo road, beside Totalfuel station, Eti-osa 08095470751',
        },
        {
            id: 'second',
            label: 'Ikoyi store',
            description: '7 Norman Willliams by Keffi off Awolowo road, beside Totalfuel station, Eti-osa 08095470751',
        },
        {
            id: 'third',
            label: 'Ikoyi store',
            description: '7 Norman Willliams by Keffi off Awolowo road, beside Totalfuel station, Eti-osa 08095470751',
        },
        {
            id: 'fourth',
            label: 'Ikoyi store',
            description: '7 Norman Willliams by Keffi off Awolowo road, beside Totalfuel station, Eti-osa 08095470751',
        },
    ];

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Click and Collect</ThemedText>
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
                <ThemedText style={styles.subHeader}>Pickup location</ThemedText>
                <ThemedView style={styles.inputContainer}>
                    <ThemedView style={styles.minContainer}>
                        <ThemedText style={styles.label}>State</ThemedText>
                        <TextInput
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            value={email}
                            onChangeText={onChangeEmail}
                        />
                    </ThemedView>
                    <ThemedView style={styles.minContainer}>
                        <ThemedText style={styles.label}>L.G.A</ThemedText>
                        <TextInput
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            value={email}
                            onChangeText={onChangeEmail}
                        />
                    </ThemedView>
                    {locations.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => {
                                setSelectedOption(option.id);
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
                    <ThemedView style={styles.buttonView}>
                        <AppBtn
                            route="/Doctors_world/Delivery_screens/payment"
                            value="Continue checkout"
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
        marginHorizontal: 55,
        marginTop: 20,
        color: '#043380',
        fontFamily: 'Inter_600SemiBold',
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        gap: 10,
        marginHorizontal: 30,
    },
    minContainer: {
        // flex: 1,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        marginHorizontal: 27,
        height: 47,
    },
    inputStyle: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 5,
        color: 'black',
    },
    label: {
        position: 'absolute',
        top: -12,
        left: 15,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        color: '#043380',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    requiredText: {
        color: '#E90E0E',
    },
    optionContainer: {
        flexDirection: 'row',
        padding: 15,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 20,
        paddingLeft: 20,
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
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
})
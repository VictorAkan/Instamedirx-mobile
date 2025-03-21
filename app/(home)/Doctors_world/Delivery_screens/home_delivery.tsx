import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppBtn } from "@/components/AppButton";
import { RegTextInput } from "@/components/RegTextInput";
import { useState } from "react";

export default function HomeDelivery() {
    const [email, onChangeEmail] = useState("");
    const [search, setSearch] = useState("");
    const router = useRouter();
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Home Delivery</ThemedText>
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
                <ThemedText style={styles.subHeader}>Billing Information</ThemedText>
                <ThemedView style={styles.inputContainer}>
                    <RegTextInput label="Full name" onChangeText={onChangeEmail} />
                    <RegTextInput label="Email" onChangeText={onChangeEmail} />
                    <RegTextInput label="Phone number" onChangeText={onChangeEmail} />
                    <RegTextInput label="Address" onChangeText={onChangeEmail} />
                    <RegTextInput label="Country" onChangeText={onChangeEmail} />
                    <RegTextInput label="State" onChangeText={onChangeEmail} />
                    <RegTextInput label="City" onChangeText={onChangeEmail} />
                    <RegTextInput label="Zip code" onChangeText={onChangeEmail} keyboardType="numberpad" />
                    <RegTextInput label="L.G.A" onChangeText={onChangeEmail} />
                    <ThemedView style={styles.buttonView}>
                    <AppBtn
                        route="/Doctors_world/Delivery_screens/payment"
                        value="Next"
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
        marginHorizontal: 20,
        marginTop: 30,
        color: '#043380',
        fontFamily: 'Inter_600SemiBold',
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        gap: 27,
    },
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
})
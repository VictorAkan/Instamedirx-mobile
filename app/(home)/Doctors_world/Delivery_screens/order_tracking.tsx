import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Linking,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppBtn } from "@/components/AppButton";
import { RegTextInput } from "@/components/RegTextInput";
import { useState } from "react";
import { ProgressBar } from "react-native-paper";

export default function OrderTracking() {
    const [email, onChangeEmail] = useState("");
    const [search, setSearch] = useState("");
    const [progress, setProgress] = useState(0.5); // Adjust based on order stage
    const router = useRouter();
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Order tracking</ThemedText>
            </ThemedView>
            <ThemedView style={styles.searchBar}>
                <TouchableOpacity activeOpacity={0.9}>
                    <Ionicons
                        name="filter"
                        size={20}
                        color="#0544AA"
                        style={styles.searchIcon}
                    />
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
                <ThemedView style={styles.mainView}>
                    <ThemedView style={styles.progressContainer}>
                        <ThemedView>
                            <ThemedText style={[styles.orderNumber, progress >= 0.25 && styles.activeOrderNumber]}>1</ThemedText>
                            <ThemedText style={[styles.step, progress >= 0.25 && styles.activeStep, {
                                width: 62.91,
                                textAlign: 'center',
                                lineHeight: 15,
                                marginTop: 5,
                            }]}>Order Processed</ThemedText>
                        </ThemedView>
                        <ThemedView>
                            <ThemedText style={[styles.orderNumber, progress >= 0.5 && styles.activeOrderNumber]}>2</ThemedText>
                            <ThemedText style={[styles.step, progress >= 0.5 && styles.activeStep]}>Order Fulfilled</ThemedText>
                        </ThemedView>
                        <ThemedView>
                            <ThemedText style={[styles.orderNumber, progress >= 0.75 && styles.activeOrderNumber]}>3</ThemedText>
                            <ThemedText style={[styles.step, progress >= 0.75 && styles.activeStep]}>Shipped</ThemedText>
                        </ThemedView>
                        <ThemedView>
                            <ThemedText style={[styles.orderNumber, progress === 1 && styles.activeOrderNumber]}>4</ThemedText>
                            <ThemedText style={[styles.step, progress === 1 && styles.activeStep]}>Delivered</ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <ProgressBar progress={progress} color="#0866FF" style={styles.progressBar} />

                    <ThemedText style={styles.orderId}>Order ID: TNXID893451</ThemedText>
                    <ThemedText style={styles.paymentStatus}>Payment status: <ThemedText style={{ color: 'black', fontSize: 14, }}>PAID</ThemedText></ThemedText>

                    <ThemedView style={styles.line} />

                    <ThemedView style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Delivery/Shipping address</ThemedText>
                        <ThemedText style={styles.address}>7 Norman Williams by Keffi off Awolowo road, beside Total fuel station, Eti-osa L.G.A, Lagos, Nigeria.</ThemedText>
                        <ThemedText style={styles.address}>08095470751</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Courier information</ThemedText>
                        <ThemedText style={styles.crTxt}>Name: FedEX courier company</ThemedText>
                        <ThemedText style={styles.crTxt}>Tracking ID: TNXID893451</ThemedText>
                        <ThemedText style={styles.crTxt}>Contact info: 0802353671</ThemedText>
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => Linking.openURL('http://FedEXco.com')} activeOpacity={0.9}>
                            <ThemedText style={styles.link}>Visit: <ThemedText style={styles.mainLink}>http//:FedEXco.com</ThemedText></ThemedText>
                        </TouchableOpacity>
                    </ThemedView>

                    <ThemedView style={styles.line} />

                    <ThemedView style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Order items</ThemedText>
                        <ThemedView style={styles.item}>
                            <Image source={require("../../../../assets/images/malaria1.png")} style={styles.itemImage} />
                            <ThemedView>
                                <ThemedText style={styles.itemTitle}>Malaria</ThemedText>
                                <ThemedText style={styles.drugsName}>Amaterm softgel</ThemedText>
                                <ThemedText style={styles.drugsQuantity}>Quantity: 2</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedText style={styles.price}>1x 7000</ThemedText>
                        <ThemedView style={styles.item}>
                            <Image source={require("../../../../assets/images/malaria3.png")} style={styles.itemImage} />
                            <ThemedView>
                                <ThemedText style={styles.itemTitle}>Pain killer</ThemedText>
                                <ThemedText style={styles.drugsName}>Panadol extra</ThemedText>
                                <ThemedText style={styles.drugsQuantity}>Quantity: 2</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedText style={styles.price}>1x 7000</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.line} />

                    <ThemedView style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Order summary</ThemedText>
                        <ThemedView style={{ marginTop: 20 }}>
                            <ThemedView style={styles.totalView}>
                                <ThemedText style={styles.desc}>Product price</ThemedText>
                                <ThemedText style={styles.desc}>2 items</ThemedText>
                                <ThemedText style={styles.figure}>14,000</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.totalView}>
                                <ThemedText style={styles.desc}>Shipping fee</ThemedText>
                                <ThemedText style={styles.desc}>Discount</ThemedText>
                                <ThemedText style={styles.figure}>5,000</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.totalView}>
                                <ThemedText style={styles.desc}>Total amount</ThemedText>
                                <ThemedText style={styles.figure}>19,000</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.inputContainer}>
                    {/* <ThemedView style={styles.buttonView}>
                        <AppBtn
                            route="/Doctors_world/Delivery_screens/payment"
                            value="Next"
                        />
                    </ThemedView> */}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
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
        color: "#043380",
        fontFamily: "OpenSans_700Bold",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 27,
        borderColor: "#ADCCFF",
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
    },
    sideLine: {
        borderLeftWidth: 2,
        borderLeftColor: "#ADCCFF",
        backgroundColor: "white",
        paddingLeft: 5,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: "OpenSans_400Regular",
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
        color: "#043380",
        fontFamily: "Inter_600SemiBold",
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        gap: 27,
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 30,
    },
    mainView: {
        margin: 30,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 30,
        elevation: 2,
        marginHorizontal: 20,
    },
    line: {
        marginTop: 10,
        flex: 1,
        height: 2,
        backgroundColor: '#D9D9D9',
    },
    orderNumber: {
        textAlign: 'center',
        backgroundColor: "#CEE0FF",
        borderWidth: 2,
        borderColor: '#0866FF',
        borderRadius: 25,
        alignSelf: 'center',
        // padding: 1,
        paddingHorizontal: 8,
        fontSize: 12,
        fontFamily: 'Inter_700Bold',
    },
    activeOrderNumber: {
        textAlign: 'center',
        backgroundColor: "#0866FF",
        borderRadius: 25,
        alignSelf: 'center',
        paddingHorizontal: 8,
        fontSize: 12,
        fontFamily: 'Inter_700Bold',
        color: 'white',
    },
    step: { fontSize: 12, color: "#043380", fontFamily: 'Inter_700Bold', },
    activeStep: { color: "#043380", fontSize: 12, fontFamily: 'Inter_700Bold', },
    progressBar: { height: 5, borderWidth: 1, borderRadius: 5, marginBottom: 20, color: '#CEE0FF66', borderColor: '#0866FF', },
    orderId: { fontSize: 16, color: '#043380', fontFamily: 'Inter_700Bold', marginTop: 10, },
    paymentStatus: { fontSize: 14, color: "#043380", fontFamily: 'Inter_500Medium', marginBottom: 15, marginTop: 10, },
    section: { marginBottom: 15, marginTop: 30, },
    sectionTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold", marginBottom: 5, color: '#043380', },
    address: { fontSize: 14, color: "#043380", fontFamily: 'Inter_500Medium', marginTop: 15, },
    crTxt: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        marginTop: 10,
    },
    link: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    mainLink: {
        color: '#0866FF',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingHorizontal: 30,
        marginTop: 20,
    },
    itemImage: { width: 50, height: 50, marginRight: 10 },
    itemTitle: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    price: { fontFamily: "OpenSans_700Bold", color: "#0544AA", marginHorizontal: 20, fontSize: 15 },
    drugsName: {
        marginTop: 10,
        color: '#043380',
        fontSize: 15,
        fontFamily: "Inter_600SemiBold",
    },
    drugsQuantity: {
        marginTop: 10,
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    totalView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    desc: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    figure: {
        color: '#0544AA',
        fontSize: 14,
        fontFamily: "OpenSans_700Bold",
    },
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 10,
        alignItems: "center",
        marginBottom: 30,
    },
});

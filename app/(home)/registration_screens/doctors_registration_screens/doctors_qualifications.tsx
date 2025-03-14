import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { RegTextInput } from "@/components/RegTextInput";
import { AppBtn } from "@/components/AppButton";
import { CustomDropdown } from "@/components/CustomDropDown";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { View, Text, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.02;

type DocumentResult = DocumentPicker.DocumentPickerResult & { name?: string };

export default function DoctorsQualifications() {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const router = useRouter();
    const translateY = useSharedValue(WHITE_HEIGHT);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const [certifications, setCertifications] = useState<
        {
            id: number;
            title: string;
            licenseNumber: string;
            issueDate: string;
            expirationDate: string;
            file: DocumentResult | null; // file can be DocumentPickerResult or null
        }[]
    >([
        {
            id: 1,
            title: '',
            licenseNumber: '',
            issueDate: '',
            expirationDate: '',
            file: null,
        },
    ]);
    const [degrees, setDegrees] = useState([{ id: 1, title: "", institution: "", year: "" }]);

    const addCertification = () => {
        setCertifications([...certifications, { id: certifications.length + 1, title: "", licenseNumber: "", issueDate: "", expirationDate: "", file: null }]);
    };

    const removeCertification = (id: any) => {
        setCertifications(certifications.filter(cert => cert.id !== id));
    };

    const addDegree = () => {
        setDegrees([...degrees, { id: degrees.length + 1, title: "", institution: "", year: "" }]);
    };

    const removeDegree = (id: any) => {
        setDegrees(degrees.filter(deg => deg.id !== id));
    };

    const pickDocument = async (index: any) => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "image/jpeg", "image/jpg", "application/msword"],
        });
        if (result.canceled) return;
        const newCerts = [...certifications];
        newCerts[index].file = result;
        setCertifications(newCerts);
    };


    return (
        // <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemedView style={{ flex: 1, backgroundColor: "#0866FF" }}>
                <ThemedView style={styles.arrowView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </ThemedView>
                {/* <GestureDetector gesture={panGesture}> */}
                <ThemedView style={styles.whiteContainer}>
                    <ThemedView style={styles.regTxtView}>
                        <ThemedText style={styles.regTitle}>Submit your qualifications</ThemedText>
                        <ThemedText style={styles.procTxt}>Certifications/Licenses</ThemedText>
                    </ThemedView>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
                    >
                        <ThemedView style={styles.inputContainer}>
                            {certifications.map((cert, index) => (
                                <ThemedView key={cert.id} style={{ marginBottom: 10, paddingBottom: 5, gap: 25 }}>
                                    {/* <Text>Title</Text> */}
                                    <RegTextInput value={cert.title} label="Title" onChangeText={(text: any) => {
                                        const newCerts = [...certifications];
                                        newCerts[index].title = text;
                                        setCertifications(newCerts);
                                    }} />
                                    {/* <Text>License number</Text> */}
                                    <RegTextInput value={cert.licenseNumber} label="License number" onChangeText={(text: any) => {
                                        const newCerts = [...certifications];
                                        newCerts[index].licenseNumber = text;
                                        setCertifications(newCerts);
                                    }} />
                                    {/* <Text>Issue date</Text> */}
                                    <RegTextInput value={cert.issueDate} label="Issue date" onChangeText={(text: any) => {
                                        const newCerts = [...certifications];
                                        newCerts[index].issueDate = text;
                                        setCertifications(newCerts);
                                    }} />
                                    {/* <Text>Expiration date</Text> */}
                                    <RegTextInput value={cert.expirationDate} label="Expiration date" onChangeText={(text: any) => {
                                        const newCerts = [...certifications];
                                        newCerts[index].expirationDate = text;
                                        setCertifications(newCerts);
                                    }} />
                                    <ThemedView style={styles.uploadView}>
                                        <ThemedText style={styles.uploadTxt}>Upload certificate/license</ThemedText>
                                        <ThemedText style={styles.secondTxt}>( doc,pdf,jpg,jpeg )</ThemedText>
                                        <TouchableOpacity activeOpacity={0.9} style={styles.uploadBtn} onPress={() => pickDocument(index)}>
                                            <Ionicons name="cloud-upload" size={24} color="#0866FF" />
                                            <ThemedText style={styles.upbtntxt}>Upload file</ThemedText>
                                        </TouchableOpacity>
                                    </ThemedView>
                                    {cert.file && <Text>Uploaded: {cert.file.name}</Text>}
                                    {certifications.length > 1 && (
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => removeCertification(cert.id)}>
                                            <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>Remove</Text>
                                        </TouchableOpacity>
                                    )}
                                </ThemedView>
                            ))}
                            <TouchableOpacity activeOpacity={0.9} onPress={addCertification}>
                                <ThemedText style={styles.addCertTxt}>+ Add more certifications</ThemedText>
                            </TouchableOpacity>

                            <ThemedView style={styles.regTxtView}>
                                <ThemedText style={styles.procTxt}>Diploma/Degree</ThemedText>
                            </ThemedView>
                            {degrees.map((deg, index) => (
                                <ThemedView key={deg.id} style={{ marginBottom: 10, paddingBottom: 5, gap: 25 }}>
                                    {/* <Text>Title</Text> */}
                                    <RegTextInput label="Title" value={deg.title} onChangeText={(text: any) => {
                                        const newDegrees = [...degrees];
                                        newDegrees[index].title = text;
                                        setDegrees(newDegrees);
                                    }} />
                                    <RegTextInput label="Institution" value={deg.institution} onChangeText={(text: any) => {
                                        const newDegrees = [...degrees];
                                        newDegrees[index].institution = text;
                                        setDegrees(newDegrees);
                                    }} />
                                    <RegTextInput label="Year" value={deg.year} onChangeText={(text: any) => {
                                        const newDegrees = [...degrees];
                                        newDegrees[index].year = text;
                                        setDegrees(newDegrees);
                                    }} />
                                    <ThemedView style={styles.uploadView}>
                                        <ThemedText style={styles.uploadTxt}>Upload certificate</ThemedText>
                                        <ThemedText style={styles.secondTxt}>( doc,pdf,jpg,jpeg )</ThemedText>
                                        <TouchableOpacity activeOpacity={0.9} style={styles.uploadBtn} onPress={() => pickDocument(index)}>
                                            <Ionicons name="cloud-upload" size={24} color="#0866FF" />
                                            <ThemedText style={styles.upbtntxt}>Upload file</ThemedText>
                                        </TouchableOpacity>
                                    </ThemedView>
                                    {degrees.length > 1 && (
                                        <TouchableOpacity onPress={() => removeDegree(deg.id)}>
                                            <Text style={{ color: "red", textAlign: "center", marginTop: 5 }}>Remove</Text>
                                        </TouchableOpacity>
                                    )}
                                </ThemedView>
                            ))}
                            <TouchableOpacity onPress={addDegree}>
                                <ThemedText style={styles.addCertTxt}>+ Add more diplomas/degrees</ThemedText>
                            </TouchableOpacity>
                            <ThemedView style={styles.buttonView}>
                                <Link href="/" asChild>
                                    <TouchableOpacity activeOpacity={0.9} style={styles.lgOutBtn}>
                                        <ThemedText style={styles.lgOutTxt}>Log out</ThemedText>
                                    </TouchableOpacity>
                                </Link>
                                <AppBtn route="/registration_screens/email_verificaion" value="Continue" />
                            </ThemedView>
                        </ThemedView>
                    </ScrollView>
                </ThemedView>
                {/* </GestureDetector> */}
            </ThemedView>
        // </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    arrowView: {
        backgroundColor: "#0866FF",
        alignItems: "flex-start",
        marginTop: 50,
        paddingHorizontal: 27,
    },
    scrollContent: {
        paddingBottom: 20, // Add padding at the bottom for extra space
    },
    button: {
        backgroundColor: "#0066FF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    whiteContainer: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
        paddingHorizontal: 4,
        flex: 1,
        height: height * 9.85,
    },
    regTxtView: {
        alignItems: "flex-start",
        paddingHorizontal: 27,
        paddingBottom: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    regTitle: {
        fontSize: 22,
        marginTop: 24,
        color: '#043380',
        fontFamily: 'Inter_700Bold',
    },
    procTxt: {
        color: '#043380',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        marginTop: 2,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
    },
    topContainer: {
        // flex: 1,
        marginTop: 110,
        alignItems: 'center',
    },
    mainContainer: {
        // flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        padding: 25,
        // fontWeight: 700,
        fontFamily: 'InriaSerif_700Bold',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uploadView: {
        gap: 10,
        paddingHorizontal: 27,
    },
    uploadTxt: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
    },
    uploadBtn: {
        borderColor: '#0866FF',
        backgroundColor: '#ADCCFF',
        borderWidth: 2,
        borderRadius: 15,
        padding: 13,
        // height: 50,
        width: 170,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    upbtntxt: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
    },
    secondTxt: {
        color: '#043380',
        fontFamily: 'OpenSans_300Light',
        fontSize: 16,
    },
    addCertTxt: {
        paddingHorizontal: 27,
        color: '#0866FF',
        fontSize: 16,
        fontFamily: 'OpenSans_600SemiBold',
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        height: 37,
        borderRadius: 20,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    loginTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 65,
        marginTop: 20,
    },
    lgOutBtn: {
        padding: 10,
        backgroundColor: '#CEE0FF',
        borderRadius: 20,
        height: 47,
        paddingHorizontal: 15,
    },
    lgOutTxt: {
        fontFamily: 'OpenSans_700Bold',
        color: '#043380',
    },
    // privView: {
    //     paddingHorizontal: 40,
    //     marginTop: 20,
    // },
    // privText: {
    //     color: '#767272',
    //     fontSize: 15,
    //     textAlign: 'center',
    //     fontFamily: 'Inter_400Regular',
    // },

});


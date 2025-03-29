import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router"; // Import useRouter
import { StyleSheet, TouchableOpacity, ScrollView, View, Dimensions } from "react-native";
import { RegTextInput } from "@/components/RegTextInput";
import { CustomDropdown } from "@/components/CustomDropDown";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { AppBtn } from "@/components/AppButton";

const { height } = Dimensions.get("window");

export default function EditDocPassword() {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const router = useRouter(); // Initialize useRouter

    return (
        <ThemedView style={{ flex: 1, backgroundColor: "#0866FF" }}>
            <ThemedView style={styles.arrowView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.whiteContainer}>
                <ThemedView style={styles.regTxtView}>
                    <ThemedText style={styles.regTitle}>Change password</ThemedText>
                    <ThemedText style={styles.procTxt}>Input current password then new password</ThemedText>
                </ThemedView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <ThemedView style={styles.inputContainer}>
                        <RegTextInput label="Current password" onChangeText={onChangePassword} />
                        <RegTextInput label="New password" onChangeText={onChangePassword} />
                        <RegTextInput label="Confirm password" onChangeText={onChangePassword} />
                        <ThemedView style={styles.buttonView}>
                            {/* <TouchableOpacity style={styles.contBtn} onPress={handleContinue}>
                                <ThemedText style={styles.contTxt}>Continue</ThemedText>
                            </TouchableOpacity> */}
                            <AppBtn 
                                route="/Doctors_world/edit_doc_profile"
                                value="Save changes"
                            />
                        </ThemedView>
                    </ThemedView>
                </ScrollView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    arrowView: {
        backgroundColor: "#0866FF",
        alignItems: "flex-start",
        marginTop: 50,
        paddingHorizontal: 27,
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
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 60,
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
        // flexDirection: 'row',
        justifyContent: 'space-between',
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
    contBtn: {
        backgroundColor: "#0866FF",
        padding: 10,
        alignItems: 'center',
        borderRadius: 12,
        height: 47,
        paddingHorizontal: 15,
    },
    contTxt: {
        color: "#FFFFFF",
        fontFamily: 'OpenSans_700Bold',
        fontSize: 17,
    }
});
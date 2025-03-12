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
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.02;

export default function DoctorsDetails() {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const router = useRouter();
    const translateY = useSharedValue(WHITE_HEIGHT);

    const ethOptions = [
        { label: "Yoruba", value: "1" },
        { label: "Igbo", value: "2" },
        { label: "Hausa", value: "3" },
        { label: "Ibibio", value: "4" },
    ];
    const langOptions = [
        { label: "English", value: "1" },
        { label: "French", value: "2" },
    ];
    const specialties = [
        { label: "Gynaecologist", value: "1" },
        { label: "Optician", value: "2" },
        { label: "Paediatrics", value: "3" },
        { label: "Dentist", value: "4" },
    ];

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#0866FF" }}>
                <ThemedView style={styles.arrowView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </ThemedView>
                {/* <GestureDetector gesture={panGesture}> */}
                    <Animated.View
                        style={[
                            {
                                // position: "absolute",
                                width: "100%",
                                backgroundColor: "white",
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40,
                                padding: 10,
                                paddingHorizontal: 4,
                                flex: 1,
                                height: height * 9.85,
                                // height: '100%',
                            },
                            animatedStyle,
                        ]}
                    >
                        <View style={styles.regTxtView}>
                            <ThemedText style={styles.regTitle}>Registration details</ThemedText>
                            <ThemedText style={styles.procTxt}>Fill in the details as requested</ThemedText>
                        </View>
                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
                        >
                            <View style={styles.inputContainer}>
                                <RegTextInput label="Clinic/hospital name (optional)" onChangeText={onChangeEmail} />
                                <RegTextInput label="Clinic/hospital address (optional)" onChangeText={onChangeEmail} />
                                <RegTextInput label="Zip code" onChangeText={onChangeEmail} />
                                <RegTextInput label="City" onChangeText={onChangeEmail} keyboardType="numberpad" />
                                <RegTextInput label="Country" onChangeText={onChangePassword} />
                                <RegTextInput label="Province/State" onChangeText={onChangePassword} />
                                <CustomDropdown scope="Ethnicity" data={ethOptions} />
                                <CustomDropdown scope="Language" data={langOptions} />
                                <RegTextInput label="Years of experience" onChangeText={onChangeEmail} />
                                <RegTextInput label="Medical license number" onChangeText={onChangeEmail} />
                                <CustomDropdown scope="Specialization" data={specialties} />
                                <ThemedView style={styles.buttonView}>
                                    <Link href="/" asChild>
                                    <TouchableOpacity activeOpacity={0.9} style={styles.lgOutBtn}>
                                        <ThemedText style={styles.lgOutTxt}>Log out</ThemedText>
                                    </TouchableOpacity>
                                    </Link>
                                    <AppBtn route="/registration_screens/doctors_registration_screens/doctors_qualifications" value="Continue" />
                                </ThemedView>
                            </View>
                        </ScrollView>
                    </Animated.View>
                {/* </GestureDetector> */}
            </View>
        </GestureHandlerRootView>
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
    regTxtView: {
        alignItems: "flex-start",
        paddingHorizontal: 27,
        paddingBottom: 20,
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


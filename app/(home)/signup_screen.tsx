import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { RegTextInput } from "@/components/RegTextInput";
import { CustomBtn } from "@/components/CustomButton";
import { useState } from "react";
import { useFonts } from "expo-font";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.4;

export default function SignupScreen() {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const router = useRouter();
    const translateY = useSharedValue(WHITE_HEIGHT);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateY.value = Math.max(WHITE_HEIGHT - 120, event.translationY + WHITE_HEIGHT);
        })
        .onEnd(() => {
            if (translateY.value < height * 0.6) {
                translateY.value = withSpring(WHITE_HEIGHT - 50);
            } else {
                translateY.value = withSpring(WHITE_HEIGHT);
            }
        });

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
                <Image
                    source={require("../../assets/images/mainscreen.png")}
                    style={{ width: "100%", height: height * 0.3, resizeMode: "contain", marginTop: 2, }}
                />
                {/* <Image
                    source={require("../../assets/images/doctor.png")}
                    style={styles.doctorImage}
                /> */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                width: "100%",
                                height: height * 0.9,
                                backgroundColor: "white",
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40,
                                padding: 10,
                                paddingHorizontal: 4,
                            },
                            animatedStyle,
                        ]}
                    >
                        <View style={styles.acctTxtView}>
                            <ThemedText style={styles.acctTitle}>Account type</ThemedText>
                            <ThemedText style={styles.procTxt}>Select preferred account type</ThemedText>
                        </View>
                        <ThemedView style={styles.selectView}>
                            <Link href="/registration_screens/client_registration" asChild>
                                <TouchableOpacity style={styles.chooseBtn} activeOpacity={0.9}>
                                    <Image source={require("../../assets/images/client.png")} />
                                    <ThemedText style={styles.chooseText}>
                                        Client
                                    </ThemedText>
                                </TouchableOpacity>
                            </Link>
                            <Link href="/registration_screens/doctors_registration_screens/doctors_registration" asChild>
                                <TouchableOpacity style={styles.chooseBtn} activeOpacity={0.9}>
                                    <Image source={require("../../assets/images/doctorside.png")} />
                                    <ThemedText style={styles.chooseText}>
                                        Doctor
                                    </ThemedText>
                                </TouchableOpacity>
                            </Link>
                            <Link href="/registration_screens/pharmacists_registration_screens/pharmacists_registration" asChild>
                                <TouchableOpacity style={styles.chooseBtn} activeOpacity={0.9}>
                                    <Image source={require("../../assets/images/pharmacistsd.png")} />
                                    <ThemedText style={styles.chooseText}>
                                        Pharmacist
                                    </ThemedText>
                                </TouchableOpacity>
                            </Link>
                        </ThemedView>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#0066FF",
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
    },
    arrowView: {
        backgroundColor: "#0866FF",
        alignItems: "flex-start",
        marginTop: 60,
        paddingHorizontal: 27,
    },
    selectView: {
        paddingHorizontal: 27,
        marginTop: 40,
        gap: 30,
    },
    chooseText: {
        // textAlign: 'center',
        color: '#043380',
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
    },
    chooseBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2DDFD',
        borderColor: '#9747FF',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderWidth: 3,
        borderRadius: 24,
        gap: 50,
    },
    doctorImage: {
        position: "absolute",
        top: -65, // Adjust this value to fine-tune placement
        alignSelf: "flex-end",
        // width: 180, // Adjust as needed
        // height: 220, // Adjust as needed
        resizeMode: "contain",
        zIndex: 10,
    },
    button: {
        backgroundColor: "#0066FF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    acctTxtView: {
        alignItems: "flex-start",
        paddingHorizontal: 27,
    },
    acctTitle: {
        fontSize: 22,
        marginTop: 28,
        color: '#043380',
        fontFamily: 'Inter_700Bold',
    },
    procTxt: {
        color: '#043380',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        marginTop: 5,
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
        marginTop: 40,
    },

});


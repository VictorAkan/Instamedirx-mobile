import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { RegTextInput } from "@/components/RegTextInput";
import { AppBtn } from "@/components/AppButton";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { View, Text, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.15;

export default function ClientRegistration() {
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
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                width: "100%",
                                height: height * 2.0,
                                backgroundColor: "white",
                                borderTopLeftRadius: 40,
                                borderTopRightRadius: 40,
                                padding: 10,
                                paddingHorizontal: 4,
                            },
                            animatedStyle,
                        ]}
                    >
                        <View style={styles.regTxtView}>
                            <ThemedText style={styles.regTitle}>Register as a client</ThemedText>
                            <ThemedText style={styles.procTxt}>Fill in the following information</ThemedText>
                        </View>
                        <ThemedView style={styles.inputContainer}>
                            <RegTextInput
                                label="First name"
                                onChangeText={onChangeEmail}
                            // required={true}
                            />
                            <RegTextInput
                                label="Last name"
                                onChangeText={onChangeEmail}
                            // required={true}
                            />
                            <RegTextInput
                                label="Email address"
                                onChangeText={onChangeEmail}
                            // required={true}
                            />
                            <RegTextInput
                                label="Phone number"
                                onChangeText={onChangeEmail}
                            // required={true}
                            />
                            <RegTextInput
                                label="Password"
                                onChangeText={onChangePassword}
                                secureTextEntry={true}
                            // required={true}
                            />
                            <RegTextInput
                                label="Confirm Password"
                                onChangeText={onChangePassword}
                                secureTextEntry={true}
                            // required={true}
                            />
                            <ThemedView style={styles.buttonView}>
                                {/* <TouchableOpacity activeOpacity={0.9} style={styles.loginButton}>
                            <ThemedText style={styles.loginTxt}>Login</ThemedText>
                        </TouchableOpacity> */}
                                <AppBtn
                                    route="/registration_screens/email_verificaion"
                                    value="Sign up"
                                />
                            </ThemedView>
                            <ThemedView style={styles.separatorContainer}>
                                <ThemedView style={styles.line} />
                                <ThemedText style={styles.orText}>Or login with</ThemedText>
                                <ThemedView style={styles.line} />
                            </ThemedView>
                            <ThemedView style={styles.socialsView}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.image} source={require("../../../assets/images/googlelogo.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.facebookImage} source={require("../../../assets/images/facebooklogo.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.appleImage} source={require("../../../assets/images/applelogo.png")} />
                                </TouchableOpacity>
                            </ThemedView>
                            {/* <ThemedView style={styles.privView}>
                        <ThemedText style={styles.privText}>
                            By continuing, you agree to InstamediRX <ThemedText style={{ fontSize: 15 }}> Privacy policy and Terms of service</ThemedText>
                        </ThemedText>
                    </ThemedView> */}
                            <ThemedView style={styles.redirectionView}>
                                <Link href="/" asChild>
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <ThemedText style={styles.sureText}>Have an account? <ThemedText style={styles.signupText}>Login</ThemedText></ThemedText>
                                    </TouchableOpacity>
                                </Link>
                            </ThemedView>
                        </ThemedView>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    arrowView: {
        backgroundColor: "#0866FF",
        alignItems: "flex-start",
        marginTop: 50,
        paddingHorizontal: 27,
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
        marginTop: 40,
        gap: 10,
    },
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 10,
        alignItems: 'center',
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
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#898686',
    },
    orText: {
        marginHorizontal: 10,
        color: '#898686',
        fontFamily: 'Inter_500Medium',
    },
    socialsView: {
        flexDirection: 'row',
        paddingHorizontal: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -20
    },
    image: {
        height: 50,
        width: 50,
    },
    facebookImage: {
        height: 30,
        width: 30,
    },
    appleImage: {
        height: 40,
        width: 40,
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
    redirectionView: {
        marginTop: 1,
    },
    sureText: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        color: '#898686',
    },
    signupText: {
        color: '#007AFF',
        fontFamily: 'Inter_700Bold',
    }

});


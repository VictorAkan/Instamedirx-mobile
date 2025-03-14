import { useRef, useState } from "react";
import { TextInput, View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CustomBtn } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.5;

export default function EmailVerfication() {
    const [code, setCode] = useState(["", "", "", ""]);
    const inputsRef = useRef<Array<TextInput | null>>([]);
    const router = useRouter();
    const translateY = useSharedValue(WHITE_HEIGHT);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateY.value = Math.max(WHITE_HEIGHT - 120, event.translationY + WHITE_HEIGHT);
        })
        .onEnd(() => {
            if (translateY.value < height * 0.6) {
                translateY.value = withSpring(WHITE_HEIGHT - 90);
            } else {
                translateY.value = withSpring(WHITE_HEIGHT);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text) || text === "") {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);

            if (text !== "" && index < 3) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#0866FF" }}>
                <ThemedView style={styles.arrowView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </ThemedView>
                <Image
                    source={require("../../../assets/images/savedpassword.png")}
                    style={{ width: "100%", height: height * 0.3, resizeMode: "contain", marginTop: 10 }}
                />
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
                        <View style={styles.verifyTxtView}>
                            <ThemedText style={styles.verifyTitle}>Get verification code</ThemedText>
                            <ThemedText style={styles.procTxt}>Verification code has been sent to</ThemedText>
                            <ThemedText style={styles.emailTxt}>sandra234@gmail.com</ThemedText>
                        </View>
                        <ThemedView style={styles.inputContainer}>
                            <ThemedView style={styles.inputView}>
                                {code.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        value={digit}
                                        style={styles.input}
                                        onChangeText={(text) => handleChange(text, index)}
                                        maxLength={1}
                                        keyboardType="number-pad"
                                        textAlign="center"
                                    />
                                ))}
                            </ThemedView>
                            <ThemedView style={styles.buttonView}>
                                <CustomBtn route="/" value="Verify and continue" />
                            </ThemedView>
                        </ThemedView>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 55,
        width: 60,
        borderRadius: 10,
        backgroundColor: '#A1BAE266',
        fontSize: 24,
        textAlign: "center",
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 60,
    },
    arrowView: {
        backgroundColor: "#0866FF",
        alignItems: "flex-start",
        marginTop: 60,
        paddingHorizontal: 27,
    },
    verifyTxtView: {
        alignItems: "center",
        paddingHorizontal: 27,
    },
    verifyTitle: {
        fontSize: 22,
        marginTop: 68,
        color: '#043380',
        fontFamily: 'Inter_700Bold',
    },
    procTxt: {
        color: '#043380',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    emailTxt: {
        color: '#9747FF',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        textAlign: 'center',
    },
    inputContainer: {
        flex: 1,
        marginTop: 40,
    },
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 50,
    },
});


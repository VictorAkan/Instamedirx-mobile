import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import RegTextInput from "@/components/RegTextInput";
import { CustomBtn } from "@/components/CustomButton";
import { useState } from "react";
import { useFonts } from "expo-font";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// form validation
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address, please try again.',
  }),
})


const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.5;

export default function ForgotPassword() {
    const [email, onChangeEmail] = useState("");
    const router = useRouter();
    const translateY = useSharedValue(WHITE_HEIGHT);

    const form = useForm<z.infer<typeof FormSchema>>({
              resolver: zodResolver(FormSchema),
              mode: "onChange",
              defaultValues: {
                    email: '',
              }
            })

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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#0866FF" }}>
                <ThemedView style={styles.arrowView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </ThemedView>
                <Image
                    source={require("../../assets/images/passwordpic.png")}
                    style={{ width: "100%", height: height * 0.3, resizeMode: "contain", marginTop: 10, }}
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
                        <View style={styles.forgotTxtView}>
                            <ThemedText style={styles.forgotTitle}>Forgot password</ThemedText>
                            <ThemedText style={styles.procTxt}>Enter the email address associated with your account</ThemedText>
                        </View>
                        <FormProvider {...form}>
                          <ThemedView style={styles.inputContainer}>
                            <RegTextInput
                                name="email"
                                label="Email address"
                            // required={true}
                            />
                            <ThemedView style={styles.buttonView}>
                                {/* <TouchableOpacity activeOpacity={0.9} style={styles.loginButton}>
                            <ThemedText style={styles.loginTxt}>Login</ThemedText>
                        </TouchableOpacity> */}
                                <CustomBtn
                                    route="/verify_code"
                                    value="Recover password"
                                />
                            </ThemedView>
                            {/* <ThemedView style={styles.privView}>
                        <ThemedText style={styles.privText}>
                            By continuing, you agree to InstamediRX <ThemedText style={{ fontSize: 15 }}> Privacy policy and Terms of service</ThemedText>
                        </ThemedText>
                    </ThemedView> */}
                        </ThemedView>
                        </FormProvider>
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
    button: {
        backgroundColor: "#0066FF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    forgotTxtView: {
        alignItems: "center",
        paddingHorizontal: 27,
    },
    forgotTitle: {
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
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 30,
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

});


import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useRouter } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import RegTextInput from "@/components/RegTextInput";
import { CustomBtn } from "@/components/CustomButton";
import { useState } from "react";
import { useFonts } from "expo-font";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";

// form validation
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address, please try again.',
  }),
  password: z
      .string()
      .min(
        8,
        'at least 8 characters minimum, an uppercase and a lowercase, a number and a symbol.'
      )
      .regex(/[A-Z]/, 'at least one uppercase letter')
      .regex(/[a-z]/, 'at least one lowercase letter')
      .regex(/\d/, 'at least one number')
      .regex(/[!@#$%^&*]/, 'at least one special character'),
})

const { height } = Dimensions.get("window");
const WHITE_HEIGHT = height * 0.33;

export default function LoginScreen() {
    const [email, onChangeEmail] = useState("");
    const [password, setPassword] = useState("");
    const translateY = useSharedValue(WHITE_HEIGHT);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: "onChange",
      defaultValues: {
        email: '',
        password: '',
      }
    })

    const { isValid, isDirty } = form.formState;


    function onSubmit(data: z.infer<typeof FormSchema>) {
// 
    }

    // const onChangePassword = (text:any) => {
    //     console.log("Password changed to:", text);
    //     setPassword(text);
    // };

    const router = useRouter();

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

    const handleLogin = (data:any) => {
        console.log("Password entered:", password);
        if (data.password === "Client@2025") {
            router.push("/(home)/Clients_world/(tabs)");
        } else if (data.password === "Doctor@2025") {
            router.push("/(home)/Doctors_world/(tabs)");
        } else {
            router.push("/");
        }

    };

    return (
        <FormProvider {...form}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemedView style={{ flex: 1, backgroundColor: "#0866FF" }}>
                <Image
                    source={require("../../assets/images/logtopimg.png")}
                    style={{ width: "100%", height: height * 0.3, resizeMode: "contain", marginTop: 20, }}
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
                        <Image
                            source={require("../../assets/images/doctor.png")}
                            style={styles.doctorImage}
                        />
                        <ThemedView style={styles.loginTxtView}>
                            <ThemedText style={styles.loginTitle}>Login</ThemedText>
                            <ThemedText style={styles.procTxt}>Please login to continue.</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.inputContainer}>
                            <RegTextInput
                                label="Email address"
                                name="email"
                            // required={true}
                            />
                            <RegTextInput
                                label="Password"
                                secureTextEntry={true}
                                name="password"
                                password
                            // required={true}
                            />
                            <ThemedView style={styles.changePwdView}>
                                <Link href="/forgot_password" asChild>
                                    <TouchableOpacity activeOpacity={0.7}>
                                        <ThemedText style={styles.forgottenText}>Forgotten password</ThemedText>
                                    </TouchableOpacity>
                                </Link>
                            </ThemedView>
                            <ThemedView style={styles.buttonView}>
                                {/* <TouchableOpacity activeOpacity={0.9} style={styles.loginButton}>
                            <ThemedText style={styles.loginTxt}>Login</ThemedText>
                        </TouchableOpacity> */}
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={styles.btn}
                                    onPress={form.handleSubmit(handleLogin)}
                                    disabled={!isDirty || !isValid} 
                                >
                                    <ThemedText style={styles.buttonTxt}>Login</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                            <ThemedView style={styles.separatorContainer}>
                                <ThemedView style={styles.line} />
                                <ThemedText style={styles.orText}>Or login with</ThemedText>
                                <ThemedView style={styles.line} />
                            </ThemedView>
                            <ThemedView style={styles.socialsView}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.image} source={require("../../assets/images/googlelogo.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.facebookImage} source={require("../../assets/images/facebooklogo.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} >
                                    <Image style={styles.appleImage} source={require("../../assets/images/applelogo.png")} />
                                </TouchableOpacity>
                            </ThemedView>
                            {/* <ThemedView style={styles.privView}>
                        <ThemedText style={styles.privText}>
                            By continuing, you agree to InstamediRX <ThemedText style={{ fontSize: 15 }}> Privacy policy and Terms of service</ThemedText>
                        </ThemedText>
                    </ThemedView> */}
                            <ThemedView style={styles.redirectionView}>
                                <Link href="/signup_screen" asChild>
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <ThemedText style={styles.sureText}>Don't have an account? <ThemedText style={styles.signupText}>Sign up</ThemedText></ThemedText>
                                    </TouchableOpacity>
                                </Link>
                            </ThemedView>
                        </ThemedView>
                    </Animated.View>
                </GestureDetector>
            </ThemedView>
        </GestureHandlerRootView>
        </FormProvider>
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
    loginTxtView: {
        alignItems: "flex-start",
        paddingHorizontal: 27,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    loginTitle: {
        fontSize: 22,
        marginTop: 18,
        color: '#043380',
        fontFamily: 'Inter_700Bold',
    },
    procTxt: {
        color: '#043380',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
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
    changePwdView: {
        alignItems: 'flex-end',
        paddingHorizontal: 27,
        marginTop: 10,
    },
    forgottenText: {
        color: '#007AFF',
        fontFamily: 'Inter_500Medium',
    },
    buttonView: {
        paddingHorizontal: 27,
        marginTop: 30,
    },
    btn: {
        backgroundColor: "#0866FF",
        padding: 10,
        alignItems: 'center',
        borderRadius: 21,
        height: 45,
    },
    buttonTxt: {
        color: "#FFFFFF",
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 65,
        marginTop: 40,
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
        marginTop: 20,
    },
    sureText: {
        textShadowColor: '#9c9c9c', // Shadow color  
        textShadowOffset: { width: 0, height: 2 }, // Shadow offset  
        textShadowRadius: 10,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        color: '#898686',
    },
    signupText: {
        color: '#007AFF',
        fontFamily: 'Inter_700Bold',
    }

});


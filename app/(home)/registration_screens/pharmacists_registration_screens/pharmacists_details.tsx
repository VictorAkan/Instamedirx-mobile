import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useRouter } from "expo-router"; // Import useRouter
import { StyleSheet, TouchableOpacity, ScrollView, View, Dimensions } from "react-native";
import RegTextInput from "@/components/RegTextInput";
import { AppBtn } from "@/components/AppButton";
import { CustomDropdown } from "@/components/CustomDropDown";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

// form validation
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  pharmacyName: z.string({
    required_error: 'Pharmacy name is required',
    invalid_type_error: 'Pharmacy name must be a string',
  }),
  pharmacyAddress: z.string({
    required_error: 'Pharmacy name is required',
    invalid_type_error: 'Pharmacy name must be a string',
  }),
  zipcode: z.string({
    required_error: 'Zip code is required',
    invalid_type_error: 'Zip code must be a string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  }),
  state: z.string({
    required_error: 'Province/State is required',
    invalid_type_error: 'State must be a string',
  }),
  experience: z.string({
    required_error: 'Years of experience is required',
    invalid_type_error: 'Years of experience must be a string',
  }),
  pharmacyLicense: z.string({
    required_error: 'licenseis required',
    invalid_type_error: 'Pharmacy license must be a string',
  }),
});

const { height } = Dimensions.get("window");

export default function PharmacistsDetails() {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const router = useRouter(); // Initialize useRouter

    const form = useForm<z.infer<typeof FormSchema>>({
                  resolver: zodResolver(FormSchema),
                  mode: "onChange",
                  defaultValues: {
                    zipcode: '',
                    city: '',
                    country: '',
                    state: '',
                    experience: '',
                    // medicalLicense: '',
                  }
                })
            
                const { isValid, isDirty } = form.formState;
            
            
                function onSubmit(data: z.infer<typeof FormSchema>) {
            // 
                }

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

    const handleContinue = () => {
        console.log("Continue pressed");
        try {
            router.push("/registration_screens/pharmacists_registration_screens/pharmacists_qualifications")
        } catch (error) {
            console.error("Navigation error: ", error);
        }
    }

    const handleLogout = () => {
        console.log("Logout pressed");
        try {
            router.push("/");
        } catch (error) {
            console.error("Navigation error: ", error);
        }
    }

    return (
        <FormProvider {...form}>
          <ThemedView style={{ flex: 1, backgroundColor: "#0866FF" }}>
            <ThemedView style={styles.arrowView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.whiteContainer}>
                <ThemedView style={styles.regTxtView}>
                    <ThemedText style={styles.regTitle}>Registration details</ThemedText>
                    <ThemedText style={styles.procTxt}>Fill in the details as requested</ThemedText>
                </ThemedView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent} // Use separate style for scroll content
                >
                    <ThemedView style={styles.inputContainer}>
                        <RegTextInput label="Pharmacy name" name="pharmacyName" />
                        <RegTextInput label="Pharmacy address" name="pharmacyAddress" />
                        <RegTextInput label="Zip code" name="zipcode" />
                        <RegTextInput label="City" name="" keyboardType="numberpad" />
                        <RegTextInput label="Country" name="country" />
                        <RegTextInput label="Province/State" name="state" />
                        <CustomDropdown scope="Ethnicity" data={ethOptions} />
                        <CustomDropdown scope="Language" data={langOptions} />
                        <RegTextInput label="Years of experience" name="experience"  />
                        <RegTextInput label="Pharmacy license number" onChangeText={onChangeEmail} name="/../../" />
                        <ThemedView style={styles.buttonView}>
                            <TouchableOpacity activeOpacity={0.9} style={styles.lgOutBtn} onPress={handleLogout}>
                                <ThemedText style={styles.lgOutTxt}>Log out</ThemedText>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.contBtn} onPress={handleContinue}>
                                <ThemedText style={styles.contTxt}>Continue</ThemedText>
                            </TouchableOpacity> */}
                            <AppBtn 
                                route="/registration_screens/pharmacists_registration_screens/pharmacists_qualifications"
                                value="Continue"
                                disabled={!isDirty || !isValid}
                            />
                        </ThemedView>
                    </ThemedView>
                </ScrollView>
            </ThemedView>
        </ThemedView>
        </FormProvider>
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
        flexDirection: 'row',
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
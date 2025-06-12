import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { router, Link } from "expo-router";
import { AntDesign, Feather, Entypo, Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AppBtn } from "@/components/AppButton";
import CheckoutTextInput from "@/components/CheckoutTextInput";
import * as Clipboard from 'expo-clipboard';
import ToastManager, { Toast } from 'toastify-react-native';

import { SafeAreaView } from "react-native-safe-area-context";

// form validation
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  fullname: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  cardnumber: z
    .string({
      required_error: "Card Number is required",
      invalid_type_error: "Card Number must be a number",
    })
    .min(16, "your card number must be 16 digits"),
  expiration: z.string({
    required_error: "Expiration date is required",
  }),
  cvv: z
    .string({
      invalid_type_error: "CVV must be a number",
    })
    .min(3, "your cvv must be 3 digits"),
});

const paymentMethods = [
  { key: "card", label: "Debit/Credit Card", onlineCard: true },
  { key: "bank", label: "Bank Transfer" },
  { key: "ussd", label: "USSD" },
  { key: "cod", label: "Cash on Delivery" },
];

export default function PaymentScreen() {
  const [selected, setSelected] = useState<string>("card");
  const truncateText = (text: any, maxLength: any) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      cardnumber: "",
      expiration: "",
      cvv: "",
    },
  });

  const { isValid, isDirty } = form.formState;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //
  }

  const copyToClipboard = async () => {
      try {
        await Clipboard.setStringAsync('2298172345');
        Toast.show({
          type: 'success',
          text1: 'Copied!',
          text2: 'Account number copied to clipboard',
          position: 'bottom',
          bottomOffset: 80,
          visibilityTime: 2000,
          onPress: () => {
          Toast.hide(); // Hide toast when pressed
        },
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to copy account number',
          position: 'bottom',
          bottomOffset: 80,
          visibilityTime: 2000,
        });
      }
    };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ToastManager />
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        {/* <ThemedText style={styles.headerText}>Checkout</ThemedText> */}
      </ThemedView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <StepIndicator step={3} /> */}
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={styles.topText}>Payment Method</Text>
          <Text style={styles.topSubText}>
            Select your preferred payment option
          </Text>
        </View>
        <View style={styles.card}>
          {/* <View
            style={[
              styles.topRow,
              {
                marginBottom: 10,
              },
            ]}
          >
            <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
            <Entypo name="chevron-down" size={18} color="#b5c1d7" />
          </View> */}
          <View style={styles.topView}>
            <View style={styles.topRow}>
              <Text style={styles.summaryText}>Sub total</Text>
              <Text style={styles.summaryNumber}>₦14,000</Text>
            </View>
            <View style={styles.topRow}>
              <Text style={styles.summaryText}>Delivery Fee</Text>
              <Text style={styles.summaryNumber}>#2,000</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>₦16,000</Text>
          </View>
        </View>

        <FormProvider {...form}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
            <Image
              style={{
                width: 179,
                height: 38,
                marginBottom: 10,
              }}
              resizeMode="contain"
              source={require("../../../../assets/images/sbp.png")}
            />
            {paymentMethods.map((method) => (
              <>
                <TouchableOpacity
                  key={method.key}
                  style={[
                    styles.radioRow,
                    selected === method.key && styles.radioRowSelected,
                  ]}
                  onPress={() => setSelected(method.key)}
                  activeOpacity={0.8}
                >
                  {/* <View
                style={[
                  styles.radioCircle,
                  selected === method.key && styles.radioCircleSelected,
                ]}
              /> */}
                  <View style={styles.radioCircle}>
                    {selected === method.key && (
                      <View style={styles.radioCircleSelected} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.radioLabel}>{method.label}</Text>
                    {method.onlineCard && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          marginTop: 10,
                        }}
                      >
                        <Image
                          style={{
                            width: 40,
                            height: 22.88,
                          }}
                          resizeMode="contain"
                          source={require("../../../../assets/images/mastercard.png")}
                        />
                        <Image
                          style={
                            {
                              // width: 40,
                              // height: 15.79
                            }
                          }
                          resizeMode="contain"
                          source={require("../../../../assets/images/visa.png")}
                        />
                      </View>
                    )}
                  </View>
                  {selected === method.key ? (
                    <Entypo name="chevron-up" size={18} color="#0755D4" />
                  ) : (
                    <Entypo name="chevron-down" size={18} color="#0755D4" />
                  )}
                </TouchableOpacity>
                <View>
                  {selected === method.key && (
                    <>
                      {method.key === "card" ? (
                        <>
                          <View style={{ marginTop: 20 }} />
                          <CheckoutTextInput
                            label="Full Name"
                            name="fullname"
                          />
                          <CheckoutTextInput
                            label="Card Number"
                            name="cardnumber"
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              flex: 1,
                              gap: 10,
                            }}
                          >
                            <CheckoutTextInput
                              label="Expiration MM/YY"
                              name="expiration"
                              style={{ width: 235 }}
                            />
                            <CheckoutTextInput
                              label="CVV"
                              name="cvv"
                              style={{ width: 104 }}
                            />
                          </View>
                        </>
                      ) : method.key === "bank" ? (
                        <View style={styles.bankView}>
                          <Text style={styles.bankTopText}>
                            Pay into the account below. Click sent when you’re done.
                          </Text>
                          <View style={styles.secView}>
                            <Text style={styles.bankTxt}>Zenith Bank</Text>
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                              <Text style={styles.bankTxt}>2298172345</Text>
                              <FontAwesome5 name="copy" size={18} color="#043380CC" />
                            </View>
                            <Text style={styles.bankTxt}>Instamedirx Holding</Text>
                          </View>
                          <View style={styles.pressContainer}>
                            <Pressable onPress={() => router.push("/Doctors_world/checkout_screens/bank_transfer")} style={styles.pressView}>
                              <Text style={styles.bankButtonText}>Sent</Text>
                              <View style={styles.arrowView}>
                                <AntDesign name="arrowright" size={15} color="white" />
                              </View>
                            </Pressable>
                          </View>
                        </View>
                      ) 
                      // : method.key === "ussd" ? (
                      //   <Text style={styles.radioDesc}>
                      //     USSD payment instructions go here.
                      //   </Text>
                      // ) : method.key === "cod" ? (
                      //   <Text style={styles.radioDesc}>
                      //     Please pay the delivery agent in cash.
                      //   </Text>
                      // ) 
                      : null}
                    </>
                  )}
                </View>
              </>
            ))}

            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <AppBtn
                route="/Doctors_world/order_successful"
                value="Pay #16,000"
                // disabled={!isDirty || !isValid}
              />
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    // marginTop: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0755D4",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    shadowColor: "#0866FF",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  topView: {
    // borderWidth: 1,
    // borderColor: "#CEE0FF",
    // paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    // gap: 5,
    // marginBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  topText: {
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    fontSize: 20,
  },
  topSubText: {
    color: "#04338099",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  sectionTitle: {
    fontFamily: "OpenSans_400Regular",
    color: "#0544AA",
    marginBottom: 8,
    fontSize: 14,
  },
  summaryText: {
    color: "#043380CC",
    // marginBottom: 10,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  summaryNumber: {
    color: "#04338099",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    // borderColor: "#CEE0FF",
    // borderWidth: 1,
    backgroundColor: "#f1faff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    // borderRadius: 8,
  },
  summaryLabel: {
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    fontSize: 16,
  },
  summaryValue: {
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    fontSize: 16,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CEE0FF",
    paddingHorizontal: 12,
  },
  radioRowSelected: { borderColor: "#043380" },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3a5ba0",
    marginRight: 12,
    marginTop: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#043380",
  },
  radioLabel: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: "#0755D4",
  },
  radioDesc: {
    fontSize: 16,
    color: "#043380",
    marginTop: 10,
    fontFamily: "OpenSans_400Regular",
  },
  bankView: {
    backgroundColor: '#F1FAFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 32,
    marginBottom: 20,
  },
  bankTopText: {
    color: '#04338099',
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  secView: {
    gap: 8,
  },
  bankTxt: {
    color: '#043380CC',
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  bankButtonText: {
    color: '#043380',
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
    paddingVertical: 6,
  },
  arrowView: {
    borderRadius: 24,
    backgroundColor: '#043380',
    width: 24,
    height: 24,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressView: {
    borderWidth: 1,
    borderColor: '#043380',
    borderRadius: 12,
    // paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pressContainer: {
    alignItems: 'flex-start',
  },
  recommendedTag: {
    backgroundColor: "#D3FFE3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  recommendedText: {
    color: "#048031",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

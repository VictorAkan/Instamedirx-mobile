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
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AppBtn } from "@/components/AppButton";
import CheckoutTextInput from "@/components/CheckoutTextInput";

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

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
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
                  <Entypo name="chevron-down" size={18} color="#0755D4" />
                </TouchableOpacity>
                <View>
                  {method.key === "card" && (
                    <>
                      <View style={{ marginTop: 20 }} />
                      <CheckoutTextInput label="Full Name" name="fullname" />
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
                          // justifyContent: 'space-between'
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
                route="/Doctors_world/order-tracking"
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

function StepIndicator({ step }: any) {
  return (
    <View style={styles.stepIndicator}>
      <StepCircle
        active={step === 1 || step === 2 || step === 3}
        label="1"
        text="Delivery"
      />
      <StepLine active={step === 2 || step === 3} />
      <StepCircle active={step === 2 || step === 3} label="2" text="Shipping" />
      <StepLine active={step === 3} />
      <StepCircle active={step === 3} label="3" text="Payment" />
    </View>
  );
}

function StepCircle({ active, label, text }: any) {
  return (
    <View style={styles.stepCircleContainer}>
      <View style={[styles.stepCircle, active && styles.stepCircleActive]}>
        <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.stepText, active && styles.stepActiveText]}>
        {text}
      </Text>
    </View>
  );
}

function StepLine({ active }: any) {
  return (
    <View
      style={[
        styles.stepLine,
        {
          backgroundColor: active ? "#0866FF" : "#CEE0FF",
        },
      ]}
    />
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
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  stepCircleContainer: { alignItems: "center", width: 60 },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CEE0FF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  stepCircleActive: { borderColor: "#0866FF", backgroundColor: "white" },
  stepLabel: {
    color: "#CEE0FF",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
  },
  stepLabelActive: { color: "#0544AA" },
  stepText: {
    fontSize: 12,
    color: "#04338099",
    marginTop: 4,
    fontFamily: "OpenSans_600SemiBold",
  },
  stepActiveText: { color: "#0544AA" },
  stepLine: {
    height: 2,
    width: 30,
    backgroundColor: "#CEE0FF",
    marginBottom: 15,
  },
});

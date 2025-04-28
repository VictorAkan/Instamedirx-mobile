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
import RegTextInput from "@/components/RegTextInput";
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
  address: z.string(),
  phoneno: z.string(),
  email: z.string().email({
    message: "Invalid email address, please try again.",
  }),
});

export default function ShippingScreen() {
  const [selected, setSelected] = useState<string>("home");
  const truncateText = (text: any, maxLength: any) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      address: "",
      phoneno: "",
      email: "",
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
        <ThemedText style={styles.headerText}>Checkout</ThemedText>
      </ThemedView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StepIndicator step={2} />
        <View style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
            <Feather name="edit-2" size={16} color="#b5c1d7" />
          </View>
          <View style={styles.topRow}>
            <Text style={styles.summaryText}>
              Amoxil (amoxicillin) 250mg/1000mg Tablets
            </Text>
            <Entypo name="chevron-down" size={18} color="#b5c1d7" />
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>₦14,000</Text>
          </View>
        </View>

        <FormProvider {...form}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>SHIPPING ADDRESS</Text>
          <View style={{ marginTop: 20 }} />
           <CheckoutTextInput
              label="Full Name"
              name="fullname"
           />
           <CheckoutTextInput 
              label="Address"
              name="address"
           />
           <CheckoutTextInput 
              label="Phone no"
              name="phoneno"
           />
           <CheckoutTextInput 
              label="Email"
              name="email"
           />
           <View style={{ marginTop: 20 }} />
           <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
            }}>
           <Text style={styles.sectionTitle}>BILLING ADDRESS</Text>
           <Entypo name="chevron-down" size={18} color="#0755D4" />
           </View>

           <View style={styles.addressRow}>
            <Image style={{ 
              width: 16,
              height: 16
             }} resizeMode='contain' source={require("../../../../assets/images/checkbox.png")} />
            <Text style={styles.shippingTxt}>Same as shipping address</Text>
           </View>
          <View
            style={{
              alignItems: "flex-start",
            }}
          >
            <AppBtn
              route="/Doctors_world/checkout_screens/payment_screen"
              value="Proceed to payment"
              disabled={!isDirty || !isValid}
            />
          </View>
        </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

function StepIndicator({ step }:any) {
  return (
    <View style={styles.stepIndicator}>
      <StepCircle active={step === 1 || step === 2} label="1" text="Delivery" />
      <StepLine active={step === 2} />
      <StepCircle active={step === 2} label="2" text="Shipping" />
      <StepLine active={step === 3} />
      <StepCircle active={step === 3} label="3" text="Payment" />
    </View>
  );
}

function StepCircle({ active, label, text }:any) {
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

function StepLine({ active }:any) {
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
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "OpenSans_400Regular",
    color: "#0544AA",
    marginBottom: 8,
    fontSize: 14,
  },
  summaryText: {
    color: "#043380CC",
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "OpenSans_300Light",
    maxWidth: 310,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    borderColor: "#CEE0FF",
    borderWidth: 1,
    backgroundColor: "#f1faff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  summaryLabel: { fontWeight: "bold", color: "#3a5ba0", fontSize: 15 },
  summaryValue: { fontWeight: "bold", color: "#3a5ba0", fontSize: 15 },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  shippingTxt: {
    color: '#043380CC',
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  addressRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 30,
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

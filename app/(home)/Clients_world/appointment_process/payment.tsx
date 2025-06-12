import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppBtn } from "@/components/AppButton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import RegTextInput from "@/components/RegTextInput";
import CheckoutTextInput from "@/components/CheckoutTextInput";

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

export default function App() {
  const [selectedMethod, setSelectedMethod] = useState("card");

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>
      <Text style={styles.title}>Select a payment method</Text>

      {/* Credit/Debit Card Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedMethod === "card" && styles.selected,
        ]}
        onPress={() => setSelectedMethod("card")}
      >
        <View style={styles.optionContent}>
          <View style={styles.radioButton}>
            {selectedMethod === "card" && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <Text style={styles.optionText}>Credit/ Debit card</Text>
        </View>
        <View style={styles.cardLogos}>
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
      </TouchableOpacity>

      {/* Card Input Fields */}
      <FormProvider {...form}>
        {selectedMethod === "card" && (
          <View style={styles.cardInputs}>
            <CheckoutTextInput label="Full Name" name="fullname" />
            <CheckoutTextInput label="Card Number" name="cardnumber" />
            <View style={styles.row}>
              <CheckoutTextInput
                label=" MM/YY"
                name="expiration"
                style={{ width: 150 }}
              />
              <CheckoutTextInput
                label="CVV"
                name="cvv"
                style={{ width: 150 }}
              />
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/Clients_world/appointment_process/payment_successful")} style={styles.payButton}>
              <Text style={styles.payButtonText}>Pay $75</Text>
            </TouchableOpacity>
          </View>
        )}
      </FormProvider>

      {/* Bank Transfer Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedMethod === "bank" && styles.selected,
        ]}
        onPress={() => setSelectedMethod("bank")}
      >
        <View style={styles.optionContent}>
          <View style={styles.radioButton}>
            {selectedMethod === "bank" && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <Text style={styles.optionText}>Bank transfer</Text>
        </View>
      </TouchableOpacity>

      {/* Digital Wallet Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedMethod === "wallet" && styles.selected,
        ]}
        onPress={() => setSelectedMethod("wallet")}
      >
        <View style={styles.optionContent}>
          <View style={styles.radioButton}>
            {selectedMethod === "wallet" && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <Text style={styles.optionText}>Digital wallet</Text>
        </View>
      </TouchableOpacity>

      {/* Insurance Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedMethod === "insurance" && styles.selected,
        ]}
        onPress={() => setSelectedMethod("insurance")}
      >
        <View style={styles.optionContent}>
          <View style={styles.radioButton}>
            {selectedMethod === "insurance" && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <Text style={styles.optionText}>Insurance</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    // marginTop: 10,
    gap: 10,
  },
  headerTitle: {
    color: "#043380",
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: "#043380",
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  selected: {
    borderColor: "#0866FF",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0866FF",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0866FF",
  },
  optionText: {
    fontSize: 20,
    color: "#043380",
    fontFamily: "Inter_500Medium",
  },
  cardLogos: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  cardLogo: {
    width: 40,
    height: 25,
    marginRight: 8,
    resizeMode: "contain",
  },
  cardInputs: {
    // marginTop: 16,
    marginBottom: 20,
    padding: 24,
    borderColor: "#0866FF",
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  payButton: {
    backgroundColor: "#007AFF",
    borderRadius: 15,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 8,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

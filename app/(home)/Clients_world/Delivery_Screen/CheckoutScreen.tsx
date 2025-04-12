// CheckoutScreen

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';


export default function CheckoutScreen() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const router = useRouter();
  const handleProceed = () => {
    if (isFormValid) {
      router.push("/ClientScreen/Delivery_Screen/deliveryOptionsScreen");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const isFormValid = Object.values(form).every((field) => field.trim() !== "");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, marginBottom: 20 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.pageTitle}>Checkout</Text>
          </View>
        </TouchableOpacity>

        {/* Stepper */}
        <View style={styles.stepper}>
          <View style={styles.stepItem}>
            <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
            <Text style={styles.stepTextActive}>Shipping</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}>
            <Ionicons name="ellipse-outline" size={16} color="#0066FF" />
            <Text style={styles.stepText}>Delivery</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}>
            <Ionicons name="ellipse-outline" size={16} color="#0066FF" />
            <Text style={styles.stepText}>Payment</Text>
          </View>
        </View>

        {/* Edit Cart */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>EDIT CART</Text>
            <Ionicons name="pencil-outline" size={18} color="#0066FF" />
          </View>
          <Text style={styles.cardText}>4 items in Cart</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₦14,000</Text>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>SHIPPING ADDRESS</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              style={styles.input}
              value={form.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              style={styles.input}
              value={form.address}
              onChangeText={(text) => handleChange("address", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              style={styles.input}
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              style={styles.input}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>

          <View style={styles.BILLING}>
            <Text style={styles.BILLINGText}>BILLING ADDRESS</Text>
            <AntDesign name="down" size={24} color="#0066FF" />
          </View>

          {/* Billing Address */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={sameAsShipping}
              onValueChange={setSameAsShipping}
              color={sameAsShipping ? "#0066FF" : undefined}
            />
            <Text style={styles.checkboxLabel}>Same as shipping address</Text>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled={!isFormValid}
            onPress={handleProceed}
          >
            <Text style={styles.buttonText}>Proceed to Payment</Text>
            <Ionicons
              name="arrow-forward-circle"
              size={20}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>

          <Text style={styles.note}>
            *View delivery mode and shipping cost in checkout
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    color: "#0066FF",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  stepItem: {
    alignItems: "center",
    flexDirection: "column",
  },
  stepText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#0066FF",
  },
  stepTextActive: {
    marginLeft: 4,
    fontSize: 12,
    color: "#0066FF",
  },
  stepLine: {
    width: 20,
    height: 1,
    backgroundColor: "#0066FF",
    marginHorizontal: 6,
  },

  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
    shadowColor: "#0066FF",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 4,
    marginTop: 30,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#0066FF",
  },
  cardText: {
    marginBottom: 12,
    color: "#0066FF",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eaf3ff",
    padding: 10,
    borderRadius: 8,
  },
  totalLabel: {
    fontWeight: "bold",
    color: "#0066FF",
  },
  totalPrice: {
    fontWeight: "bold",
    color: "#0066FF",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 45,
    color: "#0066FF",
  },
  inputGroup: {
    marginBottom: 24,
    position: "relative",
  },
  inputLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#0066FF",
    zIndex: 1,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#0066FF",
    borderRadius: 6,
    padding: 13,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 60,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#0066FF",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    paddingVertical: 14,
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 20,
    width: "60%",
  },
  buttonDisabled: {
    backgroundColor: "#a0c4ff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  note: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  BILLING: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingRight: 20,
  },
  BILLINGText: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 14,
    padding: 5,
    paddingHorizontal: 10,
    color: '#0066FF',
  },

});

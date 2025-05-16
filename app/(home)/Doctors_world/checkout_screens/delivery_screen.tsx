import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { router, Link } from "expo-router";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AppBtn } from "@/components/AppButton";

import { SafeAreaView } from "react-native-safe-area-context";

const deliveryMethods = [
  {
    key: "click",
    label: "Click and collect",
    desc: "Order online and pick up your medications at our various store locations.",
  },
  {
    key: "home",
    label: "Home Delivery",
    desc: "Order online and get your meds delivered to your address.",
    recommended: true,
  },
  {
    key: "partner",
    label: "Delivery Partner Services",
    desc: "Order online and pick up your medications at our various store locations.",
  },
];

export default function DeliveryScreen() {
  const [selected, setSelected] = useState<string>("home");
  const truncateText = (text: any, maxLength: any) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

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
        {/* <StepIndicator step={1} /> */}
        <View style={{
          marginBottom: 20
        }}>
          <Text style={styles.topText}>How do you want it delivered?</Text>
          <Text style={styles.topSubText}>Select how you'd like your order delivered.</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.topRow}>
            {/* <Text style={styles.sectionTitle}>ORDER SUMMARY</Text> */}
            {/* <Feather name="edit-2" size={16} color="#b5c1d7" /> */}
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

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>DELIVERY METHOD</Text>
          {deliveryMethods.map((method) => (
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
                { selected === method.key && <View style={styles.radioCircleSelected} /> }
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.radioLabel}>{method.label}</Text>
                <Text style={styles.radioDesc}>{truncateText(method.desc, 65)}</Text>
                {method.recommended && (
                  <View style={styles.recommendedTag}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                )}
              </View>
              <Entypo name="chevron-down" size={18} color="#0755D4" />
            </TouchableOpacity>
          ))}

        <View style={{ 
           alignItems: 'flex-start'
        }}>
        <AppBtn route="/Doctors_world/checkout_screens/shipping_screen" value="Proceed to payment" />
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StepIndicator({ step }:any) {
  return (
    <View style={styles.stepIndicator}>
      <StepCircle active={step === 1} label="1" text="Delivery" />
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
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 16, paddingHorizontal: 16 },
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
  topText: {
    fontFamily: "OpenSans_600SemiBold",
    color: '#0544AA',
    fontSize: 20,
  },
  topSubText: {
    color: '#04338099',
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
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
    // marginBottom: 10,
    fontSize: 16,
    fontFamily: "OpenSans_300Light",
    // maxWidth: 310,
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
  summaryLabel: { fontFamily: "OpenSans_400Regular", color: "#0544AA", fontSize: 16 },
  summaryValue: { fontFamily: "OpenSans_400Regular", color: "#0544AA", fontSize: 16 },
  radioRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingVertical: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CEE0FF',
    paddingHorizontal: 12,
  },
  radioRowSelected: { borderColor: "#34C759" },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3a5ba0",
    marginRight: 12,
    marginTop: 5,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
radioCircleSelected: { width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#043380', },
  radioLabel: { fontFamily: "OpenSans_600SemiBold", fontSize: 16, color: "#0755D4" },
  radioDesc: { fontSize: 16, color: "#043380", marginTop: 10, fontFamily: "OpenSans_400Regular",},
  recommendedTag: {
    backgroundColor: "#D3FFE3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  recommendedText: { color: "#048031", fontFamily: "OpenSans_600SemiBold", fontSize: 16 },
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

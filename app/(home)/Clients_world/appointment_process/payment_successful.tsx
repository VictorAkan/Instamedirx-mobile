import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppBtn } from "@/components/AppButton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Success Icon */}
          {/* <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View> */}

          <Image source={require("../../../../assets/images/approval.png")} />

          {/* Success Message */}
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.dateText}>Made on: 12/04/2025</Text>

          <View
            style={{
              marginBottom: 30,
            }}
          >
            <AppBtn route="/Clients_world/appointment_process/book_appointment" value="Book another appointment" />
          </View>

          {/* Client Information Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>CLIENT INFORMATION</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>NAME</Text>
              <Text style={styles.value}>STEPHANY LAWSON</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>EMAIL</Text>
              <Text style={styles.value}>LAWSON28@GMAIL.COM</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <Text style={styles.value}>234 920 206 4707</Text>
            </View>
          </View>

          {/* Payment Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PAYMENT DATE</Text>
              <Text style={styles.value}>12/04/2025</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PAYMENT TIME</Text>
              <Text style={styles.value}>11:06 AM</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PAYMENT REF</Text>
              <Text style={styles.value}>191202064707</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>AMOUNT (NGN)</Text>
              <Text style={styles.value}>50,000</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PAYMENT METHOD</Text>
              <Text style={styles.value}>CREDIT/DEBIT CARD</Text>
            </View>
          </View>

          {/* Booking Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>BOOKING DETAILS</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>APPOINTMENT TYPE</Text>
              <Text style={styles.value}>INDIVIDUAL</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>MODALITY</Text>
              <Text style={styles.value}>IN-PERSON</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>REASON</Text>
              <Text style={styles.value}>DERMATOLOGY</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>TIME</Text>
              <Text style={styles.value}>10:00 AM</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>DOCTOR'S NAME</Text>
              <Text style={styles.value}>DR. SANDRA DAVIS</Text>
            </View>
          </View>

          {/* Back to Home Button */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/Clients_world/(tabs)")} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 16,
    // marginTop: 10,
    gap: 10,
    marginLeft: 16,
    paddingTop: 10,
  },
  headerTitle: {
    color: "#043380",
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  checkmark: {
    color: "#fff",
    fontSize: 32,
  },
  successTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: "#128227",
    marginTop: 16,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: "#043380",
    fontFamily: "OpenSans_600SemiBold",
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  sectionHeader: {
    backgroundColor: "#BDF5C7",
    padding: 12,
  },
  sectionTitle: {
    color: "#043380",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    gap: 4
    // backgroundColor: "#EFF6FF",
    // padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E5E7EB",
  },
  label: {
    flex: 1,
    color: "#1E40AF",
    fontWeight: "500",
    backgroundColor: '#CEE0FF',
    padding: 8,
    marginVertical: 2,
  },
  value: {
    flex: 1,
    color: "#1E40AF",
    fontWeight: "400",
    backgroundColor: '#ECF1F7',
    padding: 8,
    marginVertical: 2,
  },
  homeButton: {
    backgroundColor: "#0866FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    // width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
  },
});

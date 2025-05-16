import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons"; // For back arrow icon
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItem {
  title: string;
  subtitle: string;
  route: any;
  image: any;
}

export default function ClientsProfileSettings() {
  const router = useRouter();
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <ThemedText style={styles.headerText}>Settings</ThemedText>
      </ThemedView>

      {/* Options */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.optionsContainer}>
        {settings.map((item: SettingItem, index: number) => (
          <Link href={item.route} key={index} asChild>
            <TouchableOpacity activeOpacity={0.7} style={styles.button}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <ThemedView
                style={{
                  backgroundColor: "#F1FAFF",
                }}
              >
                <ThemedText style={styles.title}>{item.title}</ThemedText>
                <ThemedText style={styles.subtitle}>
                  {truncateText(item.subtitle, 40)}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const settings: SettingItem[] = [
  {
    title: "My Profile",
    subtitle:
      "Change display name, contact, address, picture, and other personal information",
    route: "/Clients_world/my_profile",
    image: require("../../../../assets/images/client_profile.png"),
  },
  {
    title: "Privacy & Security",
    subtitle: "Set who sees your information and how we use your data.",
    route: "",
    image: require("../../../../assets/images/privacy.png"),
  },
  {
    title: "Preference",
    subtitle: "Customize app preference like password, display, or account",
    route: "",
    image: require("../../../../assets/images/preferences.png"),
  },
  {
    title: "Order",
    subtitle: "Track all orders and purchased products",
    route: "/Clients_world/order-tracking",
    image: require("../../../../assets/images/order.png"),
  },
  {
    title: "Payment",
    subtitle: "Save your frequent cards and payment preference ",
    route: "",
    image: require("../../../../assets/images/payment.png"),
  },
  {
    title: "Notification",
    subtitle: "Configure how you receive notifications on the app",
    route: "",
    image: require("../../../../assets/images/notificat.png"),
  },
  {
    title: "Medical Preference",
    subtitle: "Set medical preferences like doctors, hospitals and ",
    route: "",
    image: require("../../../../assets/images/medics.png"),
  },
  {
    title: "Pharmacy Preference",
    subtitle: "Set pharmacy preferences about medications and pharmacies",
    route: "",
    image: require("../../../../assets/images/pharmpre.png"),
  },
  {
    title: "Support",
    subtitle: "You can contact us for support.",
    route: "",
    image: require("../../../../assets/images/support.png"),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  optionsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#F1FAFF",
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: "row",
    gap: 15,
    // alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#0544AA",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#04338099",
    fontFamily: "OpenSans_400Regular",
  },
});

// PharmCMedicalStore.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Feather,
  SimpleLineIcons,
  Octicons,
} from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter, Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import PharmStoreOverview from "@/components/PharmStoreOverview";
import PharmStoreReviews from "@/components/PharmStoreReviews";

import { SafeAreaView } from "react-native-safe-area-context";

const PharmCMedicalStore = () => {
  const [selectedHMO, setSelectedHMO] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.leftSide}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <ThemedText style={styles.header}>PharmC Medical Store</ThemedText>
      </ThemedView>
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <ThemedView style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/images/pharmc.png")} // Place the logo image in assets folder
            style={styles.logo}
            // resizeMode="contain"
          />
        </ThemedView>

        <View style={styles.tabContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.tab,
                        activeTab === "Overview" && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab("Overview")}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === "Overview" && styles.activeTabText,
                        ]}
                      >
                        Overview
                      </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[styles.tab, activeTab === "Reviews" && styles.activeTab]}
                      onPress={() => setActiveTab("Reviews")}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === "Reviews" && styles.activeTabText,
                        ]}
                      >
                        Reviews
                      </Text>
                    </TouchableOpacity>
                  </View>

        {/* Content based on selected tab */}
                <ThemedView style={styles.tabContent}>
                  {activeTab === "Overview" ? (
                    <PharmStoreOverview />
                  ) : (
                    <PharmStoreReviews />
                  )}
                </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PharmCMedicalStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    // marginTop: 10,
  },
  header: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#0755D4",
  },
  title: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 12,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#0866FF",
  },
  logo: {
    width: "98%",
    height: 250,
    backgroundColor: "#F1FAFF",
    borderRadius: 10,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    padding: 10,
  },
  statusText: {
    color: "#0866FF",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rating: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
  },
  star: {
    color: "#fbc02d",
    fontWeight: "bold",
  },
  contactSection: {
    marginTop: 30,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    flex: 1,
    flexWrap: "wrap",
  },
  getDirection: {
    marginTop: 10,
    color: "#8055AA",
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    marginLeft: 30,
  },
  sectionTitle: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#0866FF",
    marginBottom: 10,
  },
  subHeader: {
    marginTop: 12,
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    color: "#043380",
  },
  bodyFirstText: {
    color: "#B2B2B2",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    marginTop: 12,
  },
  bodyText: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    marginVertical: 2,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
  },
  checkView: {
    backgroundColor: "#CEE0FF",
    padding: 5,
    borderRadius: 20,
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: "#0544AA",
    borderRadius: 8,
    // overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: "#F1FAFF",
  },
  dropdown: {
    // height: 50,
    color: "#043380CC",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  dateRow: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
  },
  hoursText: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
  },
  followUs: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    color: "#043380",
    marginTop: 20,
    marginBottom: 10,
  },
  socials: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    // backgroundColor: "#f1faff",
    // borderRadius: 15,
    marginTop: 10,
    width: "80%",
    // padding: 1,
    marginBottom: 20,
    gap: 150
  },
  tab: {
    // flex: 1,
    // paddingVertical: 8,
    alignItems: "center",
    // borderRadius: 15,
  },
  activeTab: {
    // backgroundColor: "#fff",
    // borderRadius: 15,
  },
  tabText: {
    fontSize: 16,
    color: "#04338099",
    fontFamily: "OpenSans_400Regular",
  },
  activeTabText: {
    color: "#0544AA",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  tabContent: {
    marginTop: 20,
    width: "100%",
  },
});

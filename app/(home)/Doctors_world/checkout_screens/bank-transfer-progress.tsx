import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import { Image } from "expo-image";

const BankTransferProgress = () => {
  const [countdown, setCountdown] = useState(5); // Start from 5 seconds

  useEffect(() => {
    // Create the countdown interval
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace("/Doctors_world/checkout_screens/success_payment");
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    // Clean up the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format the time to always show two digits (e.g., "05" instead of "5")
  const formattedTime = countdown.toString().padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Bank Transfer</Text>

        {/* details view */}
        <View style={styles.detailsView}>
          <Text style={styles.title}>
            We're confirming your transfer. This will only take a few minutes...
          </Text>

          <View style={{
            alignItems: 'center'
          }}>
            <Image style={{
              width: 140,
              height: 140,
            }} source={require("../../../../assets/gifs/loadingtransaction.gif")} />
          </View>

          <Text style={styles.timeText}>00:{formattedTime}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankTransferProgress;

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
    paddingVertical: 16,
    gap: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#04338099",
  },
  detailsView: {
    backgroundColor: "#F1FAFF",
    borderRadius: 12,
    paddingTop: 24,
    paddingBottom: 64,
    paddingHorizontal: 12,
    gap: 32,
    marginTop: 10,
  },
  title: {
    color: "#043380",
    fontSize: 20,
    fontFamily: "OpenSans_400Regular",
  },
  timeText: {
    color: '#0544AA',
    fontSize: 24,
    fontFamily: "OpenSans_400Regular",
    textAlign: 'center',
  }
});
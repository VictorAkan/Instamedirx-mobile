import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppBtn } from "@/components/AppButton";

import { Image } from "expo-image";

const SuccessPayment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        {/* <Text>This is the success payment</Text> */}
      </View>

      <View style={styles.topView}>
        <Text style={styles.topText}>Congratulations, Fred</Text>
        <Text style={styles.subText}>Your Payment is Successful</Text>
      </View>

      <View style={{
        alignItems: 'center'
      }}>
        <Image style={{
          width: 200,
          height: 200,
          marginVertical: 40
        }} source={require("../../../../assets/gifs/confettii.gif")} contentFit="contain"  // Add this
  priority="high"  />
      </View>

      <View style={styles.buttonView}>
        <AppBtn route="/Doctors_world/order-tracking" value="Track Your Order" />
      </View>
    </SafeAreaView>
  );
};

export default SuccessPayment;

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
    // marginTop: 10,
    gap: 10,
  },
  topView: {
    alignItems: 'center'
  },
  topText: {
    color: '#043380',
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
  },
  subText: {
    color: '#043380',
    fontSize: 20,
    fontFamily: "OpenSans_400Regular",
  },
  buttonView: {
    alignItems: 'center',
    marginTop: 20
  },
});

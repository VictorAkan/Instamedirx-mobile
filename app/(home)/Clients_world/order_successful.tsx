import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const OrderSuccessful = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require("../../../assets/images/successorder.png")} />
      </View>
      <View
        style={{
          gap: 20,
        }}
      >
        <Text style={styles.orderTxt}>Order Placed Successfully!</Text>
        <Text style={styles.orderSubTxt}>
          You have successfully re-ordered some medications. Thank you for
          placing your order.
        </Text>
      </View>

      <Pressable
        onPress={() => router.push("/Clients_world/(tabs)")}
        style={styles.returnBtn}
      >
        <AntDesign name="arrowleft" size={24} color="#0866FF" />
        <Text style={styles.returnTxt}>Return to homepage</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default OrderSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  orderTxt: {
    fontSize: 24,
    color: "#043380",
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
  orderSubTxt: {
    fontSize: 16,
    color: "#04338099",
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  returnBtn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  returnTxt: {
    color: "#0866FF",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
});

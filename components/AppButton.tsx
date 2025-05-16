import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export function AppBtn({ value, route, width, disabled }: any) {
  return (
    <Link href={route} asChild>
      <TouchableOpacity
        style={{
          backgroundColor: "#0866FF",
          padding: 10,
          alignItems: "center",
          borderRadius: 14,
          // height: 47,
          width: width,
          paddingHorizontal: 15,
          flexDirection: "row",
          // justifyContent: 'space-between',
          gap: 10,
        }}
        activeOpacity={0.9}
        disabled={disabled}
      >
        <ThemedText style={styles.buttonTxt}>{value}</ThemedText>
        <ThemedView style={styles.sideView}>
          <AntDesign name="arrowright" size={17} color="#0866FF" />
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  // btn: {
  //     backgroundColor: "#0866FF",
  //     padding: 10,
  //     alignItems: 'center',
  //     borderRadius: 21,
  //     height: 45,
  // },
  buttonTxt: {
    color: "#FFFFFF",
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
  },
  sideView: {
    borderRadius: 35,
    padding: 3,
  },
});

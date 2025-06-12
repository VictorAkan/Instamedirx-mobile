import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

type NullableString = string | null;

const BankTransfer = () => {
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [proof, setProof] = useState<NullableString>(null);

  const pickImage = async (setter: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

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
            Enter sender details (as it appears on the transfer)
          </Text>

          <View style={styles.inputCollectionView}>
            <View>
              <Text style={styles.labelText}>Sender's Account Name</Text>
              <TextInput
                value={accountName}
                onChangeText={setAccountName}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.labelText}>Account Number</Text>
              <TextInput
                value={accountNumber}
                onChangeText={setAccountNumber}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.labelText}>Bank Number</Text>
              <TextInput
                value={bankName}
                onChangeText={setBankName}
                style={styles.input}
              />
            </View>

            <Pressable onPress={() => pickImage(setProof)} style={styles.uploadView}>
              {proof ? (
                <ImageBackground
                  source={{ uri: proof }}
                  style={{
                  alignItems: "center",
                }}
                >
                  <Image
                  source={require("../../../../assets/images/cameraplus.png")}
                  style={{
                    width: 32,
                    height: 32,
                  }}
                />
                <Text style={styles.uploadText}>
                  Upload proof of payment while we confirm your transaction
                </Text>
                </ImageBackground>
              ) : (
                <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/images/cameraplus.png")}
                  style={{
                    width: 32,
                    height: 32,
                  }}
                />
                <Text style={styles.uploadText}>
                  Upload proof of payment while we confirm your transaction
                </Text>
              </View>
              )}
            </Pressable>
          </View>

          <View style={styles.pressContainer}>
            <Pressable
              onPress={() =>
                router.push("/Clients_world/checkout_screens/bank-transfer-progress")
              }
              style={styles.pressView}
            >
              <Text style={styles.bankButtonText}>Done</Text>
              <View style={styles.arrowView}>
                <AntDesign name="arrowright" size={15} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankTransfer;

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
  headerText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#04338099",
    // marginLeft: 10,
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
  inputCollectionView: {
    gap: 12,
  },
  labelText: {
    color: "#04338099",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  input: {
    borderColor: "#04338099",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  uploadView: {
    borderStyle: "dashed",
    borderColor: "#04338099",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 24,
    marginTop: 20,
  },
  uploadText: {
    color: "#04338099",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    textAlign: "center",
  },

  bankButtonText: {
    color: "#043380",
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
    paddingVertical: 6,
  },
  arrowView: {
    borderRadius: 24,
    backgroundColor: "#043380",
    width: 24,
    height: 24,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pressView: {
    borderWidth: 1,
    borderColor: "#043380",
    borderRadius: 12,
    // paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pressContainer: {
    alignItems: "flex-start",
  },
});

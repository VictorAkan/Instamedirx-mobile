import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";


export default function personalization() {
    const [gender, setGender] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>Tell us how you feel, Alfred</Text>
        <Text style={styles.subHeader}>
          This will help us to select the right doctors for you
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <TextInput
          placeholder="Describe your symptoms"
          multiline
          style={[styles.input, { height: 100 }]}
        />
        <TextInput
          placeholder="Mention any previous diagnosis (if any)"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Find Doctors</Text>
          <Ionicons name="arrow-forward-circle" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",

  },
  header: {
    marginBottom: 10,
    marginTop: 90,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  subHeader: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  form: {
    flex: 1,
    marginTop: 60,
    
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066FF",
    paddingVertical: 14,
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 10,
    width: "70%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
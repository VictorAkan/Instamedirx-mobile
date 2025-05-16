import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons, Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter, Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

const MyProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("Fred Nkwanu");
  const [editingName, setEditingName] = useState(false);

  const [contact, setContact] = useState("08124398210");
  const [editingContact, setEditingContact] = useState(false);

  const [address, setAddress] = useState(
    "no 2 Victoria street, Ibeju-lekki, off Epe Expresswuay Lagos State"
  );
  const [editingAddress, setEditingAddress] = useState(false);

  const [dob, setDob] = useState("24/02/1990");
  const [editingDob, setEditingDob] = useState(false);
  const [gender, setGender] = useState("Male");
  const [language, setLanguage] = useState("English");
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [imageUri, setImageUri] = useState(
    "https://randomuser.me/api/portraits/men/75.jpg"
  );

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <AntDesign name="arrowleft" size={24} color="#032255" />
          </TouchableOpacity>
          <ThemedText style={styles.headerText}>My Profile</ThemedText>
        </ThemedView>

        {/* Profile Picture */}
        <ThemedView style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  imageUri ?? "https://randomuser.me/api/portraits/men/75.jpg",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </ThemedView>

        {/* Name */}
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Name</ThemedText>
          <ThemedView style={styles.valueRow}>
            {editingName ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                onBlur={() => setEditingName(false)}
                autoFocus
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setEditingName(true)}
              >
                <ThemedText style={styles.value}>{name}</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setEditingName(true)}
            >
              <Feather name="edit-2" size={16} color="#b5c1d7" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Contact */}
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Contact</ThemedText>
          <ThemedView style={styles.valueRow}>
            {editingContact ? (
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                onBlur={() => setEditingContact(false)}
                autoFocus
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setEditingContact(true)}
              >
                <ThemedText style={styles.value}>{contact}</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setEditingContact(true)}
            >
              <Feather name="edit-2" size={16} color="#b5c1d7" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Address */}
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Address</ThemedText>
          <ThemedView style={styles.valueRow}>
            {editingAddress ? (
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                onBlur={() => setEditingAddress(false)}
                autoFocus
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setEditingAddress(true)}
              >
                <ThemedText style={styles.value}>{address}</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setEditingAddress(true)}
            >
              <Feather name="edit-2" size={16} color="#b5c1d7" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Date of Birth */}
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Date of Birth</ThemedText>
          <ThemedView style={styles.valueRow}>
            {editingDob ? (
              <TextInput
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                onBlur={() => setEditingDob(false)}
                autoFocus
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setEditingDob(true)}
              >
                <ThemedText style={styles.value}>{dob}</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setEditingDob(true)}
            >
              <Feather name="edit-2" size={16} color="#b5c1d7" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Gender */}
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Gender</ThemedText>
          <TouchableOpacity
            onPress={() => setShowGenderPicker(!showGenderPicker)}
            activeOpacity={0.8}
          >
            <ThemedView style={styles.valueRow}>
              <ThemedText style={styles.value}>{gender}</ThemedText>
              <Entypo name="chevron-down" size={18} color="#b5c1d7" />
            </ThemedView>
          </TouchableOpacity>
          {showGenderPicker && (
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => {
                setGender(itemValue);
                setShowGenderPicker(false);
              }}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          )}
        </ThemedView>

        {/* Language */}
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Language</ThemedText>
          <TouchableOpacity
            onPress={() => setShowLanguagePicker(!showLanguagePicker)}
            activeOpacity={0.8}
          >
            <ThemedView style={styles.valueRow}>
              <ThemedText style={styles.value}>{language}</ThemedText>
              <Entypo name="chevron-down" size={18} color="#b5c1d7" />
            </ThemedView>
          </TouchableOpacity>
          {showLanguagePicker && (
            <Picker
              selectedValue={language}
              onValueChange={(itemValue) => {
                setGender(itemValue);
                setShowGenderPicker(false);
              }}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="French" value="French" />
            </Picker>
          )}
        </ThemedView>

        {/* Sign Out */}
        <Link href="/" asChild>
          <TouchableOpacity activeOpacity={0.7} style={styles.signOutBtn}>
            <ThemedText style={styles.signOutText}>Sign out</ThemedText>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
    // marginTop: 10,
  },
  headerText: {
    fontSize: 16,
    color: "#0755D4",
    fontFamily: "OpenSans_600SemiBold",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#0866FF",
  },
  infoRow: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: "#0544AA",
    marginBottom: 4,
    fontFamily: "OpenSans_400Regular",
  },
  input: {
    fontSize: 15,
    color: "#0047ab",
    fontWeight: "600",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 4,
    minWidth: 200,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 16,
    color: "#0544AA",
    fontFamily: "OpenSans_600SemiBold",
    flexShrink: 1,
  },
  signOutBtn: {
    marginTop: 30,
    alignSelf: "center",
    borderColor: "#043380",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F1FAFF",
  },
  signOutText: {
    color: "#FF0000",
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
  },
});

export default MyProfile;

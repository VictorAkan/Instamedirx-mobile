import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

interface OptionDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSelectCaption: () => void;
  onSelectQuality: () => void;
  onReport: () => void;
}

export default function OptionDrawer({
  visible,
  onClose,
  onSelectCaption,
  onSelectQuality,
  onReport,
}: OptionDrawerProps) {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.3}
    >
      <View style={styles.drawer}>
        <TouchableOpacity style={styles.row} onPress={onSelectCaption}>
          <Text style={styles.label}>Caption</Text>
          <View style={styles.right}>
            <Text style={styles.value}>EN</Text>
            <Ionicons name="chevron-down" size={20} color="#0544AA" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={onSelectQuality}>
          <Text style={styles.label}>Quality</Text>
          <View style={styles.right}>
            <Text style={styles.value}>720p</Text>
            <Ionicons name="chevron-down" size={20} color="#0544AA" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={onReport}>
          <Text style={styles.label}>Report</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    alignItems: "flex-end",
  },
  drawer: {
    width: 260,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 80,
    marginBottom: 80,
    marginRight: 10,
    justifyContent: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f4fa",
  },
  label: {
    fontSize: 16,
    color: "#0544AA",
    fontFamily: 'OpenSans_600SemiBold',
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  value: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: 'OpenSans_400Regular',
  },
});

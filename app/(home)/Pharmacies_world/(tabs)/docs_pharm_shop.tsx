import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useIsFocused } from '@react-navigation/native';
import { Stack,useRouter } from 'expo-router';

const AddProductsModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.back();
  };
const handleAddManually = () => {
    onClose();
    router.push('/Pharmacies_world/add_product/manual');
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.headerText}>Add Products</ThemedText>
          </View>
          <View style={styles.options}>
            
            <Option label="Select From Catalogue" onPress={handleClose} />
            <Option label="Bulk Upload" onPress={handleClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Option = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <ThemedText style={styles.optionText}>{label}</ThemedText>
    <AntDesign name="right" size={24} color="#0544AA" />
  </TouchableOpacity>
);

export default function AddProductsTab() {
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [isFocused]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AddProductsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 32,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: "#CEE0FF",
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 16,
    color: "#0755D4",
    letterSpacing: 0.64,
    lineHeight: 24,
    fontWeight: '600',
  },
  options: {
    flexDirection: 'column',
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#0544AA",
    letterSpacing: 0.64,
    lineHeight: 24,
    fontWeight: '400',
  },
});
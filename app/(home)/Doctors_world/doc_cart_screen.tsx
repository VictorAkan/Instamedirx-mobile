import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AppBtn } from "@/components/AppButton";
import { useDocCart } from "@/utils/context/cart_context";

import { SafeAreaView } from "react-native-safe-area-context";

// Define types for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  category: string;
  store: string;
}
[];

const ClientCartScreen = () => {
  const { docCartItems, removeFromCart, setDocCartItems } = useDocCart();
  const cartArray = Object.values(docCartItems);

  // Update quantity function with typed parameters
  const updateQuantity = (id: string, type: "increase" | "decrease") => {
    setDocCartItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity:
          type === "increase"
            ? prev[id].quantity + 1
            : Math.max(1, prev[id].quantity - 1),
      },
    }));
  };

  // Remove item function with typed parameter
  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  // Calculate total function
  const calculateTotal = () => {
    return cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Render item function with typed parameters
  const renderItem = ({ item }: any) => (
    <ThemedView style={styles.itemContainer}>
      <ThemedView style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </ThemedView>
      <ThemedView style={{ marginLeft: 10 }}>
        <ThemedView style={styles.details}>
          <ThemedText style={styles.category}>{item.category}</ThemedText>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.storeTxt}>{item.store}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.itemBottom}>
          <ThemedText style={styles.price}>
            ₦{item.price.toLocaleString()}
          </ThemedText>
          <ThemedView style={styles.controls}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, "decrease")}
              disabled={item.quantity === 1}
              activeOpacity={0.8}
              style={[
                styles.button,
                item.quantity === 1 && styles.disabledButton,
              ]}
            >
              <AntDesign
                name="minus"
                size={24}
                color={item.quantity === 1 ? "#9bb4dd" : "#0544AA"}
              />
            </TouchableOpacity>
            <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, "increase")}
              style={styles.button}
              activeOpacity={0.8}
            >
              <AntDesign name="plus" size={24} color="#0544AA" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="close" size={24} color="#D6D6D6" />
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartArray.length === 0 ? <ThemedView style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ThemedText>Your cart is empty</ThemedText>
      </ThemedView> : <FlatList
        data={cartArray}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item}`}
        renderItem={renderItem}
      />}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.totalText}>Total</ThemedText>
        <ThemedText style={styles.totalAmount}>
          ₦{calculateTotal().toLocaleString()}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          alignItems: "flex-end",
        }}
      >
        <AppBtn
          value="Proceed to Checkout"
          route="/Doctors_world/checkout_screens/delivery_screen"
        />
      </ThemedView>
      <ThemedText style={styles.note}>
        *View delivery mode and shipping cost in checkout
      </ThemedText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10, paddingTop: 50 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 25,
    padding: 10,
    borderRadius: 10,
    position: "relative",
    borderBottomWidth: 1,
    borderColor: "#ADCCFF",
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: { width: 80, height: 80, resizeMode: "contain" },
  imageContainer: {
    // padding: 10,
    borderWidth: 1,
    borderColor: "#CEE0FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  storeTxt: {
    color: '#04338099',
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  details: { flex: 1 },
  category: {
    color: "#9F9900",
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
  },
  name: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    width: 260,
  },
  price: { fontSize: 14, fontFamily: "OpenSans_600SemiBold", color: "#0544AA" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CEE0FF",
    borderRadius: 5,
  },
  button: { backgroundColor: "#F1FAFF", padding: 5, borderRadius: 5 },
  disabledButton: { backgroundColor: "#f9fdff" },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
  quantity: {
    fontSize: 14,
    color: "#0544AA",
    fontFamily: "OpenSans_400Regular",
    paddingHorizontal: 10,
  },
  removeButton: { position: "absolute", top: 5, right: 5, padding: 5 },
  removeButtonText: { fontSize: 20, fontWeight: "bold", color: "#888" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  totalText: { fontSize: 16, fontFamily: "OpenSans_700Bold", color: "#0544AA" },
  totalAmount: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#0544AA",
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  note: {
    textAlign: "right",
    fontSize: 14,
    color: "#043380CC",
    marginBottom: 50,
    fontFamily: "OpenSans_400Regular",
    marginTop: 10,
  },
});

export default ClientCartScreen;

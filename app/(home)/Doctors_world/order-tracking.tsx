import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
  EvilIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import { router } from "expo-router";

const options = ["GreenLeaf", "PharmC"];
// Dummy Data (replace with your API data)
const inProgressOrders = [
  {
    id: "31245",
    date: "April 22, 2025",
    subOrders: [
      {
        id: "31245-A",
        pharmacy: "Greenleaf Pharmacy",
        items: [
          { name: "Amoxil (amoxicillin) 250mg Tablets x 2" },
          { name: "Emzor Paracetamol 500mg Tablets" },
          { name: "Funbact-A Antifungal Cream" },
        ],
        status: "Out for Delivery", // 'Confirmed', 'Out for Delivery', 'Delivered'
        image: require("../../../assets/images/gleaf.png"),
      },
      {
        id: "31245-B",
        pharmacy: "PharmC Stores",
        items: [
          { name: "Bond Panadol Syrup 20mL x 5" },
          { name: "Emzor Paracetamol 500mg Tablets" },
        ],
        status: "Confirmed",
        image: require("../../../assets/images/pstore.png"),
      },
    ],
    eta: 20,
  },
];

const completedOrders = [
  {
    id: "31245",
    title: "Emzor Paracetamol Packet + 4 items",
    date: "April 20, 2025",
    bgColor: "#F1FAFF",
  },
  {
    id: "12894-C",
    title: "Amoxicillion 250mg Tablets + 1 item",
    date: "April 20, 2025",
    bgColor: "#FFFFFF",
  },
  {
    id: "30100",
    title: "Funbact-A Tropical Antifungal Cream",
    date: "April 20, 2025",
    bgColor: "#F1FAFF",
  },
  {
    id: "12000-A",
    title: "Bond Multivitamin Syrup 150mL + 3 items",
    date: "April 20, 2025",
    bgColor: "#FFFFFF",
  },
  {
    id: "31246",
    title: "Emzor Paracetamol Packet + 4 items",
    date: "April 20, 2025",
    bgColor: "#F1FAFF",
  },
];

const cancelledOrders = [
  {
    id: "31245-C",
    title: "Emzor Paracetamol Packet + 4 items",
    date: "April 20, 2025",
    bgColor: "#FFF5F4",
  },
  {
    id: "31245-C",
    title: "Amoxicillion 250mg Tablets + 1 item",
    date: "April 20, 2025",
    bgColor: "#FFFFFF",
  },
  {
    id: "31245-C",
    title: "Funbact-A Tropical Antifungal Cream",
    date: "April 20, 2025",
    bgColor: "#FFF5F4",
  },
];

// Order details data
const orderDetails = {
  id: "31245-C",
  date: "April 20, 2025",
  address: "no 2 Adeyemi Allen Avenue, off Johnsons Ikeja, Lagos State.",
  paid: true,
  items: [
    {
      name: "Emzor Paracetamol Packet",
      qty: 2,
      price: 16000,
      pharmacy: "Greenleaf Pharmacy",
    },
    {
      name: "Flagyl 500mg Tablets",
      qty: 1,
      price: 1000,
      pharmacy: "Greenleaf Pharmacy",
    },
    {
      name: "Amoxicillion 250mg Tablets",
      qty: 1,
      price: 4000,
      pharmacy: "PharmC stores",
    },
  ],
  total: 37000,
};

// Tab names
const TABS = ["In Progress", "Completed", "Cancelled"];

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState("");

  // Tab header
  function renderTabs() {
    return (
      <View style={styles.tabsContainer}>
        {TABS.map((tab, idx) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === idx && styles.activeTab]}
            onPress={() => setActiveTab(idx)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === idx && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // Stepper for order status
  function Stepper({ status }: any) {
    const steps = [
      {
        name: "Confirmed",
        icon: <EvilIcons name="location" size={18} color="black" />,
      },
      {
        name: "Out for Delivery",
        icon: (
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            size={15}
            color="black"
          />
        ),
      },
      {
        name: "Delivered",
        icon: <MaterialIcons name="check" size={15} color="black" />,
      },
    ];
    const activeIdx = steps.findIndex((step) => step.name === status);

    return (
      <View style={styles.stepperContainer}>
        {steps.map((step, idx) => (
          <React.Fragment key={step.name}>
            <View
              style={[
                styles.stepCircle,
                idx <= activeIdx
                  ? styles.stepCircleActive
                  : styles.stepCircleInactive,
              ]}
            >
              {step.icon}
            </View>
            {idx < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  idx < activeIdx
                    ? styles.stepLineActive
                    : styles.stepLineInactive,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  }

  // In Progress Tab
  function renderInProgress() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.tabContent}
      >
        {inProgressOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            {order.subOrders.map((sub) => (
              <View key={sub.id} style={styles.subOrderCard}>
                <View style={styles.cardTopView}>
                  <View style={styles.subOrderHeader}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        source={sub.image}
                        style={{
                          height: 24,
                          width: 24,
                        }}
                      />
                      <View>
                        <Text style={styles.pharmacyName}>{sub.pharmacy}</Text>
                        <Text style={styles.subOrderId}>
                          Sub-order #{sub.id}
                        </Text>
                      </View>
                    </View>
                    <FontAwesome6 name="angle-up" size={18} color="#043380" />
                  </View>
                  <View style={styles.itemsList}>
                    {sub.items.map((item) => (
                      <View
                        key={item.name}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                          paddingVertical: 5,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="cancel"
                          size={18}
                          color="#04338099"
                        />
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Stepper status={sub.status} />
              </View>
            ))}
            <Text style={styles.etaText}>
              Your order arrives in {order.eta} min...
            </Text>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="call-outline" size={20} color="#043380" />
                <Text style={styles.actionBtnText}>Call Rider</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MaterialIcons name="support-agent" size={20} color="#043380" />
                <Text style={styles.actionBtnText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{
                uri: "https://pplx-res.cloudinary.com/image/private/user_uploads/39480943/de589947-6fac-4f5c-8f10-0b1d08cc46c2/Screenshot-from-2025-05-12-17-14-16.jpg",
              }}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.segmentedContainer}>
              {options.map((option, idx) => {
                const isSelected = idx === selected;
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.segment,
                      isSelected && styles.selectedSegment,
                      idx === 0 && styles.leftSegment,
                      idx === options.length - 1 && styles.rightSegment,
                    ]}
                    onPress={() => setSelected(idx)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.text, isSelected && styles.selectedText]}
                    >
                      {option}
                    </Text>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  // Completed Tab
  function renderCompleted() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.tabContent}
      >
        <View style={styles.searchBar}>
          <TouchableOpacity activeOpacity={0.9}>
            <Ionicons
              name="filter"
              size={20}
              color="#0544AA"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <View style={styles.sideLine}>
            <Text></Text>
          </View>
          <TextInput
            placeholder=""
            placeholderTextColor="#8F8F8F"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity activeOpacity={0.9}>
            <MaterialIcons name="search" size={24} color="#04338099" />
          </TouchableOpacity>
        </View>
        {completedOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={[
              styles.completedCard,
              {
                backgroundColor: order.bgColor,
              },
            ]}
            onPress={() => {
              router.push({
                pathname: "Doctors_world/order/[order-details]",
                params: {
                  id: order.id,
                },
              });
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.completedTitle}>{order.title}</Text>
            <Text style={styles.completedDate}>Delivered on {order.date}</Text>
            <Text style={styles.completedOrderId}>Order #{order.id}</Text>
            <View style={styles.completedRow}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
                activeOpacity={0.7}
              >
                <Feather name="repeat" size={18} color="#0544AA" />
                <Text style={styles.reorderText}>Re-order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.viewDetailsText}>View details</Text>
                <Fontisto name="angle-right" size={15} color="#0544AA" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // Cancelled Tab
  function renderCancelled() {
    return (
      <ScrollView style={styles.tabContent}>
        {cancelledOrders.map((order) => (
          <View
            key={order.id + order.title}
            style={[
              styles.cancelledCard,
              {
                backgroundColor: order.bgColor,
              },
            ]}
          >
            <Text style={styles.cancelledTitle}>{order.title}</Text>
            <Text style={styles.cancelledDate}>Initiated on {order.date}</Text>
            <Text style={styles.cancelledOrderId}>Order #{order.id}</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.reactivateBtn}>
              <MaterialIcons name="replay" size={20} color="#128227" />
              <Text style={styles.reactivateText}>Re-activate</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  }

  // Order Details Modal/Page
  function renderOrderDetails() {
    return (
      <View style={styles.detailsOverlay}>
        <View style={styles.detailsCard}>
          <TouchableOpacity onPress={() => setShowOrderDetails(false)}>
            <Text style={styles.backBtn}>{"<"} Order details</Text>
          </TouchableOpacity>
          <Text style={styles.detailsOrderId}>Order #{orderDetails.id}</Text>
          <Text style={styles.detailsDate}>{orderDetails.date}</Text>
          <Text style={styles.detailsAddress}>{orderDetails.address}</Text>
          <Text style={styles.detailsPaid}>Paid via card</Text>
          <View style={styles.detailsItems}>
            {orderDetails.items.map((item, idx) => (
              <View key={item.name + idx} style={styles.detailsItemRow}>
                <Text style={styles.detailsItemName}>{item.name}</Text>
                <Text style={styles.detailsItemQty}>
                  {" "}
                  {item.qty} x ₦{item.price.toLocaleString()}
                </Text>
                <Text style={styles.detailsItemPharmacy}>{item.pharmacy}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.detailsTotal}>
            Total ₦{orderDetails.total.toLocaleString()}
          </Text>
          <View style={styles.detailsActions}>
            <TouchableOpacity>
              <Text style={styles.reorderText}>Re-order</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order</Text>
      </View>
      {renderTabs()}
      {activeTab === 0 && renderInProgress()}
      {activeTab === 1 && renderCompleted()}
      {activeTab === 2 && renderCancelled()}
      {showOrderDetails && renderOrderDetails()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderColor: '#E6EAF0',
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 27,
    borderColor: "#ADCCFF",
    borderWidth: 1,
    padding: 8,
    marginVertical: 15,
    // marginHorizontal: 20,
  },
  sideLine: {
    borderLeftWidth: 2,
    borderLeftColor: "#ADCCFF",
    backgroundColor: "white",
    paddingLeft: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "OpenSans_400Regular",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    // marginTop: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0755D4",
    marginLeft: 10,
  },
  tab: {
    // flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
  activeTab: {
    borderColor: "#C6C000",
  },
  tabText: {
    color: "#B4C2D9",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  activeTabText: {
    color: "#0544AA",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  tabContent: { flex: 1, padding: 12 },
  orderCard: {
    backgroundColor: "#fff",
    // borderRadius: 12,
    marginBottom: 24,
    padding: 16,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    fontSize: 16,
  },
  orderDate: {
    color: "#04338099",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  subOrderCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginBottom: 30,
    shadowColor: "#0866FF",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  subOrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F1FAFF",
  },
  pharmacyName: {
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    fontSize: 16,
  },
  subOrderId: {
    color: "#043380CC",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  itemsList: { marginLeft: 4, marginBottom: 6 },
  itemText: {
    color: "#0544AA",
    fontSize: 14,
    marginVertical: 1,
    fontFamily: "OpenSans_400Regular",
  },
  etaText: {
    textAlign: "center",
    color: "#043380",
    fontFamily: "OpenSans_600SemiBold_Italic",
    marginVertical: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  actionBtn: {
    backgroundColor: "#F1FAFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#043380",
  },
  cardTopView: {
    borderColor: "#CEE0FF",
    borderWidth: 1,
    borderRadius: 8,
  },
  actionBtnText: { color: "#043380", fontWeight: "bold" },
  mapImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: "#DDE7F5",
  },
  // Stepper
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginLeft: 2,
    flex: 1,
    marginTop: 12,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E6EAF0",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    borderColor: "#777300",
    backgroundColor: "#FFFFE5",
  },
  stepCircleInactive: {
    borderColor: "#D6D6D6",
    backgroundColor: "#fff",
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E6EAF0",
    marginHorizontal: 2,
  },
  stepLineActive: {
    backgroundColor: "#777300",
  },
  stepLineInactive: {
    backgroundColor: "#D6D6D6",
  },
  // Completed
  completedCard: {
    backgroundColor: "#F7FAFF",
    borderRadius: 10,
    padding: 14,
    // marginBottom: 16,
    gap: 10,
  },
  completedTitle: {
    color: "#0544AA",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  completedDate: {
    color: "#04338099",
    fontSize: 16,
    marginVertical: 2,
    fontFamily: "OpenSans_400Regular",
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    justifyContent: "space-between",
  },
  completedOrderId: {
    color: "#04338099",
    fontSize: 16,
    marginRight: 10,
    fontFamily: "OpenSans_400Regular",
  },
  reorderText: {
    color: "#0544AA",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    marginRight: 12,
  },
  viewDetailsText: {
    color: "#0544AA",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  // Cancelled
  cancelledCard: {
    backgroundColor: "#FFF4F4",
    borderRadius: 10,
    padding: 14,
    // marginBottom: 16,
    gap: 10,
  },
  cancelledTitle: {
    color: "#852221",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  cancelledDate: {
    color: "#852221B2",
    fontSize: 16,
    marginVertical: 2,
    fontFamily: "OpenSans_400Regular",
  },
  cancelledOrderId: {
    color: "#852221B2",
    fontSize: 16,
    marginBottom: 6,
    fontFamily: "OpenSans_400Regular",
  },
  reactivateBtn: {
    // backgroundColor: '#E6FFE6',
    // borderRadius: 8,
    // paddingVertical: 6,
    // paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  reactivateText: {
    color: "#128227",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  // Details Modal
  detailsOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 22,
    width: "92%",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
  backBtn: {
    color: "#2956A8",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  detailsOrderId: {
    color: "#2956A8",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
  },
  detailsDate: { color: "#A7A7A7", fontSize: 13, marginBottom: 2 },
  detailsAddress: { color: "#2956A8", fontSize: 13, marginBottom: 2 },
  detailsPaid: { color: "#1E8E3E", fontSize: 13, marginBottom: 8 },
  detailsItems: { marginBottom: 8 },
  detailsItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  detailsItemName: {
    color: "#2956A8",
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
  },
  detailsItemQty: { color: "#2956A8", fontSize: 13 },
  detailsItemPharmacy: { color: "#A7A7A7", fontSize: 12, marginLeft: 4 },
  detailsTotal: {
    color: "#2956A8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  detailsActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  downloadText: { color: "#2956A8", fontWeight: "bold" },
  segmentedContainer: {
    flexDirection: "row",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1a397b",
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 30,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  selectedSegment: {
    backgroundColor: "#043380",
  },
  leftSegment: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  rightSegment: {
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  text: {
    color: "#043380",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
  checkmark: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

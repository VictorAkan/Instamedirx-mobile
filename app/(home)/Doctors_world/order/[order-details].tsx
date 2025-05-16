import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";

const OrderDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order details</Text>
      </View>

      <View style={styles.orderDetsView}>
        <Text style={styles.orderTitle}>
          Order #{id}
        </Text>

        <View style={styles.subView}>
          <Text style={styles.subText}>April 20, 2025</Text>
          <Text style={styles.subText}>
            no 2 Adeyemi Allen Avenue, off Johnsons Ikeja, Lagos State.
          </Text>
          <Text style={styles.subText}>
            Paid via card
          </Text>
        </View>
      </View>

      <View style={styles.productDetsView}>
        <View style={{
          marginBottom: 24
        }}>
          <View style={styles.productRow}>
            <Text style={styles.productTitle}>
              Emzor Paracetamol Packet
            </Text>
            <Text style={styles.productTitle}>
              2 x ₦16,000
            </Text>
          </View>
          <Text style={styles.subText}>
            Greenleaf Pharmacy
          </Text>
        </View>

        <View style={{
          marginBottom: 24
        }}>
          <View style={styles.productRow}>
            <Text style={styles.productTitle}>
              Flagyl 500mg Tablets
            </Text>
            <Text style={styles.productTitle}>
              1 x ₦1,000
            </Text>
          </View>
          <Text style={styles.subText}>
            Greenleaf Pharmacy
          </Text>
        </View>

        <View style={{
          marginBottom: 24
        }}>
          <View style={styles.productRow}>
            <Text style={styles.productTitle}>
              Amoxicillion 250mg Tablets
            </Text>
            <Text style={styles.productTitle}>
              1 x ₦4,000
            </Text>
          </View>
          <Text style={styles.subText}>
            PharmC stores
          </Text>
        </View>

        <View style={styles.crossLine} />

        <View style={styles.productRow}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>₦37,000</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
          <Feather name="repeat" size={18} color="#0544AA" />
          <Text style={styles.total}>Re-order</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
          <Feather name="download" size={18} color="#0544AA" />
          <Text style={styles.total}>Download</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  orderDetsView: {
    paddingHorizontal: 26,
    marginTop: 25,
  },
  orderTitle: {
    color: '#0544AA',
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 20,
  },
  subText: {
    color: '#04338099',
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  subView: {
    gap: 5,
    marginTop: 15,
  },
  productTitle: {
    color: '#0544AA',
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  productDetsView: {
    backgroundColor: '#FFF4FF',
    marginHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 8,
    marginTop: 40,
    paddingHorizontal: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossLine: {
    width: '100%',
    backgroundColor: '#EBE0F5',
    height: 1,
    marginBottom: 20,
  },
  bottomRow: {
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    color: '#0544AA',
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
});

export default OrderDetails;

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerMenu from "@/components/DrawerMenu";
import { CurrentDate } from "@/scripts/pharmacy/Date";
import PharmacyFilterScreen from "@/components/pharmacy/filter";

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  image: number | string; // Image can be a local asset or a URL
}

interface Category {
  title: string;
  products: Product[];
}

const PharmacyHomePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [isFilterVisible, setFilterVisible] = useState<boolean>(false);
  const categories = [
    {
      title: "Antibiotics",
      products: [
        {
          id: 1,
          name: "Amoxicillin Antibiotics 500mg Capsules",
          stock: 15,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
        {
          id: 2,
          name: "Amoxicillin Antibiotics 500mg Capsules",
          stock: 8,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
      ],
    },
    {
      title: "Pain Relief",
      products: [
        {
          id: 3,
          name: "Diclofenac Sodium 50mg Tablets",
          stock: 16,
          price: 500,
          image:
            "https://deshabpharmacy.com/shop/wp-content/uploads/2022/09/cataflam-tablet-50mg-x10.jpg",
        },
        {
          id: 4,
          name: "Ibuprofen Pain Relief 200mg Tablets",
          stock: 8,
          price: 500,
          image: require("../../../../assets/images/pain3.png"),
        },
      ],
    },
    {
      title: "Anti-Diabetes",
      products: [
        {
          id: 5,
          name: "metformin 500mg Tablets",
          stock: 24,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
        {
          id: 6,
          name: "Insulin Glargine 100 IU/ml",
          stock: 8,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
      ],
    },
    {
      title: "Anti-Fungal",
      products: [
        {
          id: 7,
          name: "ketoconazole 200mg Tablets",
          stock: 15,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
        {
          id: 8,
          name: "Clotrimazole 100mg Cream",
          stock: 8,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
      ],
    },
    {
      title: "Allergies",
      products: [
        {
          id: 9,
          name: "Cetirizine 10mg Tablets",
          stock: 24,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
        {
          id: 10,
          name: "Loratadine 10mg Tablets",
          stock: 8,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
      ],
    },
    {
      title: "Creams & Ointments",
      products: [
        {
          id: 11,
          name: "Hydrocortisone 1% Cream",
          stock: 24,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
        {
          id: 12,
          name: "Neomycin and Polymyxin B Sulfate Ointment",
          stock: 8,
          price: 500,
          image: require("../../../../assets/images/amoxil.png"),
        },
      ],
    },
  ];

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <ThemedView style={styles.productCard}>
      {/* Image Container */}
      <ThemedView style={styles.imageContainer}>
        <Image
          source={
            typeof product.image === "number"
              ? product.image
              : { uri: product.image }
          }
          style={styles.productImage}
          resizeMode="cover"
        />
      </ThemedView>

      {/* Content Container */}
      <ThemedView style={styles.contentContainer}>
        {/* Product Info */}
        <ThemedView style={styles.productInfo}>
          <ThemedText style={styles.productName} numberOfLines={2}>
            {product.name}
          </ThemedText>
          <ThemedView style={styles.stockAndPrice}>
            <ThemedText style={styles.stockText}>
              {product.stock} units in stock
            </ThemedText>
            <ThemedText style={styles.priceText}>₦{product.price}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} activeOpacity={0.9}>
          <ThemedText style={styles.editButtonText}>Edit</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* More Options Button */}
      <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
        <Ionicons name="ellipsis-vertical" size={20} color="#043380" />
      </TouchableOpacity>
    </ThemedView>
  );

  const CategorySection: React.FC<{ category: Category }> = ({ category }) => (
    <ThemedView style={styles.categorySection}>
      <ThemedView style={styles.categoryHeader}>
        <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
        <TouchableOpacity activeOpacity={0.7}>
          <ThemedText style={styles.viewAllText}>View All</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.productsRow}>
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ThemedView>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <CurrentDate />
        <ThemedView style={styles.header}>
          <ThemedView style={styles.welcomeLeft}>
            <Image
              source={require("../../../../assets/images/pstore.png")}
              style={styles.avatar}
              resizeMode="cover"
            />
            <ThemedText style={styles.welcomeText}>Welcome, PharmC</ThemedText>
          </ThemedView>
          <ThemedView style={styles.sideView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setDrawerVisible(true)}
            >
              <MaterialIcons
                name="stacked-line-chart"
                size={24}
                color="#0544AA"
              />
            </TouchableOpacity>
            <Link href="/Pharmacies_world/pharm_messages_screen" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  size={24}
                  color="#0544AA"
                />
              </TouchableOpacity>
            </Link>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.searchContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons
              name="filter"
              size={20}
              color="#0544AA"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <ThemedView style={styles.searchBar}>
            <ThemedView style={styles.sideLine} />
            <TouchableOpacity activeOpacity={0.7}>
              <MaterialIcons name="search" size={24} color="#D6D6D6" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Browse products in store"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#8F8F8F"
            />
          </ThemedView>
        </ThemedView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {categories.map((category, index) => (
            <CategorySection key={index} category={category} />
          ))}
        </ScrollView>
      </ThemedView>

      {isDrawerVisible && (
        <DrawerMenu
          isVisible={isDrawerVisible}
          onClose={() => setDrawerVisible(false)}
        />
      )}

      <PharmacyFilterScreen
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        onApplyFilter={(filterData) => {
          console.log("Filter data:", filterData);
          setFilterVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingVertical: 10,
    marginTop: 10,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  welcomeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0755D4",
    fontFamily: "OpenSans_700Bold",
  },
  sideView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 27,
    borderColor: "#808080",
    borderWidth: 1,
    padding: 8,
  },
  sideLine: {
    borderLeftWidth: 2,
    borderLeftColor: "#808080",
    backgroundColor: "white",
    paddingLeft: 5,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    gap: 10,
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    color: "#C6C000",
    fontWeight: "500",
  },
  productsRow: {
    flexDirection: "row",
    gap: 12,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CEE0FF",
    padding: 16,
    flex: 1,
    position: "relative",
  },
  imageContainer: {
    height: 124,
    borderBottomWidth: 1,
    borderBottomColor: "#CEE0FF",
    marginBottom: 12,
  },
  productImage: {
    width: "100%",
    height: "90%",
    borderRadius: 16,
  },
  contentContainer: {
    gap: 24,
  },
  productInfo: {
    gap: 8,
  },
  productName: {
    color: "#0544AA",
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  stockAndPrice: {
    gap: 0,
  },
  stockText: {
    color: "#34C759",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  priceText: {
    color: "#0544AA",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  editButton: {
    backgroundColor: "#0866FF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
    lineHeight: 28,
    letterSpacing: 0.56,
  },
  moreButton: {
    position: "absolute",
    right: 4,
    top: 16,
    padding: 12,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
});

export default PharmacyHomePage;

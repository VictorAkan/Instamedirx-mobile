import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { useCart } from "@/utils/context/cart_context";

import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const products = {
  Antibiotics: [
    {
      id: 1,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/amoxil.png"),
      store: "PharmC Store",
    },
    {
      id: 2,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/biot2.png"),
      store: "Iseoluwa Pharmacy",
    },
    {
      id: 3,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria1.png"),
      store: "GoodWill Pharmacy",
    },
    {
      id: 4,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/pain1.png"),
      store: "NaijaMeds Hub",
    },
    {
      id: 5,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/biot2.png"),
      store: "WellCare Pharmacy",
    },
    {
      id: 6,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/amoxil.png"),
      store: "CuraMed Pharmacy",
    },
    {
      id: 7,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/biot2.png"),
      store: "GreenLeaf Pharmacy",
    },
  ],
  Malaria: [
    {
      id: 8,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria1.png"),
      store: "RxHaven Nigeria",
    },
    {
      id: 9,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria2.png"),
      store: "GreenLeaf Pharmacy",
    },
    {
      id: 10,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria3.png"),
      store: "WellSpring Pharmacy",
    },
    {
      id: 11,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria2.png"),
      store: "GreenLeaf Pharmacy",
    },
    {
      id: 12,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria2.png"),
      store: "WellSpring Pharmacy",
    },
    {
      id: 13,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria2.png"),
      store: "RxHaven Nigeria",
    },
    {
      id: 14,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/malaria1.png"),
      store: "GreenLeaf Pharmacy",
    },
  ],
  "Pain Relief": [
    {
      id: 15,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain1.png"),
      store: "CityMeds Hub",
    },
    {
      id: 16,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain2.png"),
      store: "InfinityMeds",
    },
    {
      id: 17,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain3.png"),
      store: "MyMediMart NG",
    },
    {
      id: 18,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain2.png"),
      store: "InfinityMeds",
    },
    {
      id: 19,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain2.png"),
      store: "MyMediMart NG",
    },
    {
      id: 20,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain2.png"),
      store: "CityMeds Hub",
    },
    {
      id: 21,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦2,500",
      image: require("../../../assets/images/pain1.png"),
      store: "MyMediMart NG",
    },
  ],
};

const moreProducts = {
  "Protein Supplement": [
    {
      id: 22,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/ps1.png"),
      store: "OptiMed Pharmacy",
    },
    {
      id: 23,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/ps2.png"),
      store: "GreenLeaf Pharmacy",
    },
    {
      id: 24,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/ps3.jpeg"),
      store: "WellSpring Pharmacy",
    },
    {
      id: 25,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/ps2.png"),
      store: "GreenLeaf Pharmacy",
    },
    {
      id: 26,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/ps2.png"),
      store: "GreenLeaf Pharmacy",
    },
    {
      id: 27,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/ps1.png"),
      store: "OptiMed Pharmacy",
    },
  ],
  "Medical Equipment": [
    {
      id: 28,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/me1.png"),
      store: "OptiMed Pharmacy",
    },
    {
      id: 29,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/me2.png"),
      store: "Reliance",
    },
    {
      id: 30,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/me3.jpeg"),
      store: "WellSpring Pharmacy",
    },
    {
      id: 31,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/me2.png"),
      store: "Reliance",
    },
    {
      id: 32,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/me2.png"),
      store: "GreenLeaf Pharmacy",
    },
    {
      id: 33,
      name: "Vitacillin Met 500mg/1000mg",
      price: "₦3,500",
      image: require("../../../assets/images/me1.png"),
      store: "OptiMed Pharmacy",
    },
  ],
};

const topDeals = [
  {
    id: 34,
    name: "Vitacillin Met 5...",
    price: "₦11,900",
    store: 'GreenLeaf Pharmacy',
    image: require("../../../assets/images/prod1.png"),
    discount: 20,
  },
  {
    id: 35,
    name: "Vitacillin Met 5...",
    price: "₦3,500",
    store: 'PharmC Stores',
    image: require("../../../assets/images/prod2.png"),
    discount: 50,
  },
  {
    id: 36,
    name: "Vitacillin Met 5...",
    price: "₦23,500",
    store: 'Amazing Pharmacy',
    image: require("../../../assets/images/prod3.png"),
    discount: 20,
  },
  {
    id: 37,
    name: "Vitacillin Met 5...",
    price: "₦19,500",
    store: 'GreenLeaf Pharmacy',
    image: require("../../../assets/images/prod4.png"),
    discount: 20,
  },
];

// Create a mapping of categories to IDs
const categoriesWithIds = Object.keys(products).map((category, index) => ({
  id: index + 1, // Simple incrementing ID
  category,
}));

const moreCategoriesWithIds = Object.keys(moreProducts).map((category, index) => ({
  id: index + 1, // Simple incrementing ID
  category,
}));

export default function ClientsPharmShop() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const {
    cartCount,
    setCartCount,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    disabledButtons,
    setDisabledButtons,
  } = useCart();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const openSearch = () => {
    setIsSearchVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSearch = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsSearchVisible(false));
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const toggleCartItem = (product: any) => {
    if (disabledButtons[product.id]) {
      // Remove item from cart
      removeFromCart(product.id.toString());
    } else {
      // Add item to cart
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: Number(product.price.replace(/[^0-9]/g, "")),
        store: product.store,
        category:
          Object.keys(products).find((cat) =>
            products[cat as keyof typeof products].some(
              (p) => p.id === product.id
            )
          ) || "",
        image: product.image,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.headerView}>
        {!isSearchVisible && (
          <>
            <ThemedView style={styles.leftSide}>
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.9}
              >
                <AntDesign name="arrowleft" size={24} color="#032255" />
              </TouchableOpacity>
              <ThemedText style={styles.header}>Shop Now</ThemedText>
            </ThemedView>
            <ThemedView style={styles.edgeIcons}>
              <TouchableOpacity onPress={openSearch} activeOpacity={0.9}>
                <MaterialIcons name="search" size={24} color="#0544AA" />
              </TouchableOpacity>
              <Link href="/Clients_world/client_cart_screen" asChild>
                <TouchableOpacity activeOpacity={0.9}>
                  <View style={styles.cartIconContainer}>
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={24}
                      color="#0544AA"
                    />
                    {cartCount > 0 && (
                      <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartCount}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Link>
            </ThemedView>
          </>
        )}

        {isSearchVisible && (
          <Animated.View
            style={[
              styles.searchContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <ThemedView style={styles.searchBar}>
              <ThemedView style={styles.sideLine}>
                <ThemedText></ThemedText>
              </ThemedView>
              <TextInput
                placeholder="Search products..."
                placeholderTextColor="#8F8F8F"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                autoFocus
              />
              <TouchableOpacity activeOpacity={0.9}>
                <MaterialIcons name="search" size={24} color="#8F8F8F" />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeSearch} activeOpacity={0.8}>
                <AntDesign name="close" size={20} color="#032255" />
              </TouchableOpacity>
            </ThemedView>
            <Link href="/Clients_world/client_cart_screen" asChild>
              <TouchableOpacity activeOpacity={0.9}>
                <View style={styles.cartIconContainer}>
                  <MaterialCommunityIcons
                    name="cart-outline"
                    size={24}
                    color="#0544AA"
                  />
                  {cartCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{cartCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        )}
      </ThemedView>
      <ScrollView
        style={styles.scrollcontainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(products).map(([category, items]) => {
          const categoryId = categoriesWithIds.find(
            (c) => c.category === category
          )!.id;
          return (
            <ThemedView key={category} style={styles.categoryContainer}>
              <ThemedView style={styles.categoryHeader}>
                <ThemedText style={styles.categoryText}>{category}</ThemedText>
                <TouchableOpacity activeOpacity={0.7}
                  onPress={() => router.push({
                    pathname: "/Clients_world/product_categories/[id]",
                    params: {
                      id: categoryId,
                      products: JSON.stringify(products),
                      category: category,
                      // category: category
                    }
                  })}
                > 
                  <ThemedText style={styles.viewAll}>View all</ThemedText>
                </TouchableOpacity>
              </ThemedView>
              <ScrollView
                style={{ marginTop: 15, flexGrow: 1 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {items.map((product) => (
                  <ThemedView key={product.id} style={styles.productCard}>
                    <TouchableOpacity
                      style={styles.imageContainer}
                      activeOpacity={0.8}
                      onPress={() => {
                        router.push({
                          pathname: "/Clients_world/product_details/[id]",
                          params: {
                            id: product.id,
                            image: product.image,
                            store: product.store,
                            // disableButton: String(disabledButtons[product.id]),
                            // setCartItems: setCartItems,
                            // setDisabledButtons: setDisabledButtons,
                          },
                        });
                      }}
                    >
                      <Image
                        source={product.image}
                        style={styles.productImage}
                      />
                    </TouchableOpacity>
                    <ThemedText style={styles.productTxt}>
                      {truncateText(product.name, 16)}
                    </ThemedText>
                    <ThemedText style={styles.productStore}>
                      {truncateText(product.store, 16)}
                    </ThemedText>
                    <ThemedText style={styles.productPrice}>
                      {product.price}
                    </ThemedText>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.addToCartButton,
                        {
                          backgroundColor: disabledButtons[product.id]
                            ? "#CEE0FF"
                            : "#0866FF",
                        },
                      ]}
                      onPress={() => toggleCartItem(product)}
                    >
                      <ThemedText
                        style={[
                          styles.addToCartText,
                          {
                            color: disabledButtons[product.id]
                              ? "#8F8F8F"
                              : "#fff",
                          },
                        ]}
                      >
                        Add to Cart
                      </ThemedText>
                      <ThemedView style={styles.sideView}>
                        <AntDesign
                          name="arrowright"
                          size={18}
                          color={
                            disabledButtons[product.id] ? "#D6D6D6" : "#0866FF"
                          }
                        />
                      </ThemedView>
                    </TouchableOpacity>
                  </ThemedView>
                ))}
              </ScrollView>
            </ThemedView>
          );
        })}

        {Object.entries(moreProducts).map(([category, items]) => {
          const categoryId = moreCategoriesWithIds.find(c => c.category === category)!.id;
          return (
            <ThemedView key={category} style={styles.categoryContainer}>
              <ThemedView style={styles.categoryHeader}>
                <ThemedText style={styles.categoryText}>{category}</ThemedText>
                <TouchableOpacity activeOpacity={0.7}
                  onPress={() => router.push({
                    pathname: "/Clients_world/product_categories/[id]",
                    params: {
                      id: categoryId,
                      products: JSON.stringify(products),
                      category: category,
                      // category: category
                    }
                  })}
                > 
                  <ThemedText style={styles.viewAll}>View all</ThemedText>
                </TouchableOpacity>
              </ThemedView>
              <ScrollView
                style={{ marginTop: 15, flexGrow: 1 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {items.map((product) => (
                  <ThemedView key={product.id} style={styles.moreProductCard}>
                    <TouchableOpacity
                      style={styles.moreImageContainer}
                      activeOpacity={0.8}
                      onPress={() => {
                        router.push({
                          pathname: "/Clients_world/product_details/[id]",
                          params: {
                            id: product.id,
                            image: product.image,
                            store: product.store,
                          },
                        });
                      }}
                    >
                      <Image
                        source={product.image}
                        style={styles.moreProductImage}
                      />
                    </TouchableOpacity>
                    <ThemedText style={styles.productTxt}>
                      {truncateText(product.name, 16)}
                    </ThemedText>
                    <ThemedText style={styles.productStore}>
                      {truncateText(product.store, 16)}
                    </ThemedText>
                    <ThemedText style={styles.productPrice}>
                      {product.price}
                    </ThemedText>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.addToCartButton,
                        {
                          backgroundColor: disabledButtons[product.id]
                            ? "#CEE0FF"
                            : "#0866FF",
                        },
                      ]}
                      onPress={() => toggleCartItem(product)}
                    >
                      <ThemedText
                        style={[
                          styles.addToCartText,
                          {
                            color: disabledButtons[product.id]
                              ? "#8F8F8F"
                              : "#fff",
                          },
                        ]}
                      >
                        Add to Cart
                      </ThemedText>
                      <ThemedView style={styles.sideView}>
                        <AntDesign
                          name="arrowright"
                          size={18}
                          color={
                            disabledButtons[product.id] ? "#D6D6D6" : "#0866FF"
                          }
                        />
                      </ThemedView>
                    </TouchableOpacity>
                  </ThemedView>
                ))}
              </ScrollView>
            </ThemedView>
          );
        })}

        <ThemedView
          style={[
            styles.categoryHeader,
            { paddingLeft: 30, marginBottom: 20, marginTop: 30 },
          ]}
        >
          <ThemedText style={styles.categoryText}>Top Deals</ThemedText>
          {/* <TouchableOpacity activeOpacity={0.8}>
                                    <ThemedText style={styles.viewAll}>View All</ThemedText>
                                </TouchableOpacity> */}
        </ThemedView>
        <ThemedView style={styles.productGrid}>
          <FlatList 
            data={topDeals}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ThemedView key={item.id} style={styles.productListCard}>
              <TouchableOpacity
                style={styles.tImageContainer}
                activeOpacity={0.8}
                onPress={() => {
                  router.push({
                    pathname: "/Clients_world/product_details/[id]",
                    params: {
                      id: item.id,
                      image: item.image,
                      store: "PharmC Store",
                    },
                  });
                }}
              >
                <Image source={item.image} style={styles.tImage} />
              </TouchableOpacity>
              <ThemedText style={styles.productTxt}>{item.name}</ThemedText>
              {/* {item.discount && (
                <ThemedView style={styles.discountRow}>
                  <Feather name="tag" size={16} color="#FF5E5E" />
                  <ThemedText style={styles.discountTxt}>
                    {item.discount}% discount
                  </ThemedText>
                </ThemedView>
              )} */}
              <ThemedText style={styles.storeTxt}>{item.store}</ThemedText>
              <ThemedText style={styles.productPrice}>
                {item.price}
              </ThemedText>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.addToCartButton,
                  {
                    backgroundColor: disabledButtons[item.id]
                      ? "#CEE0FF"
                      : "#0866FF",
                    marginTop: item.discount ? 0 : 25,
                  },
                ]}
                onPress={() => toggleCartItem(item)}
              >
                <ThemedText
                  style={[
                    styles.addToCartText,
                    {
                      color: disabledButtons[item.id] ? "#8F8F8F" : "#fff",
                    },
                  ]}
                >
                  Add to Cart
                </ThemedText>
                <ThemedView style={styles.sideView}>
                  <AntDesign
                    name="arrowright"
                    size={18}
                    color={disabledButtons[item.id] ? "#D6D6D6" : "#0866FF"}
                  />
                </ThemedView>
              </TouchableOpacity>
            </ThemedView>
            )}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingVertical: 10,
  },
  scrollcontainer: {
    // flex: 1,
    backgroundColor: "white",
    // paddingVertical: 50,
    // paddingTop: 40,
    marginTop: 10,
    // paddingLeft: 20,
    flexGrow: 1,
    // marginBottom: 60,
    // // marginTop: 10,
  },
  searchContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    paddingRight: 5,
    // backgroundColor: '#fff',
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 2,
    width: "90%",
  },
  searchInput: {
    flex: 1,
    fontFamily: "OpenSans_400Regular",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    // marginBottom: 10,
    paddingHorizontal: 15,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 27,
    borderColor: "#ADCCFF",
    borderWidth: 1,
    padding: 8,
    // marginTop: 5,
    // marginRight: 1,
  },
  sideLine: {
    borderLeftWidth: 2,
    borderLeftColor: "#ADCCFF",
    backgroundColor: "white",
    paddingLeft: 5,
  },
  storeTxt: {
    textAlign: 'left',
    fontSize: 14,
    color: '#FF5E5E',
    fontFamily: "OpenSans_400Regular",
    alignSelf: 'flex-start',
  },
  edgeIcons: {
    gap: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#0755D4",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -8,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginBottom: 20,
    paddingTop: 15,
    paddingLeft: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  categoryText: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
    backgroundColor: "#F9F8C5",
    color: "#4F4D00",
    padding: 2,
    paddingHorizontal: 10,
  },
  viewAll: {
    color: "#0866FF",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  productCard: {
    // width: 150,
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
    // marginRight: 10,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  moreProductCard: {
    // width: 150,
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
    // marginRight: 10,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  moreProductImage: {
    width: 130,
    height: 130,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  moreImageContainer: {
    borderWidth: 1,
    padding: 5,
    borderColor: "#CEE0FF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  productListCard: {
    // width: '48%',
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 30,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productTxt: {
    marginTop: 10,
    // width: '100%',
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#0544AA",
    alignSelf: "flex-start",
  },
  discountRow: {
    flexDirection: "row",
    gap: 4,
    alignSelf: "flex-start",
    // marginLeft: 12,
  },
  discountTxt: {
    color: "#FF5E5E",
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
  },
  productStore: {
    color: "#FF5E5E",
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    alignSelf: "flex-start",
  },
  imageContainer: {
    borderWidth: 1,
    padding: 20,
    borderColor: "#CEE0FF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    // width: '100%',
    color: "#0544AA",
    alignSelf: "flex-start",
  },
  addToCartButton: {
    backgroundColor: "#0866FF",
    padding: 7,
    alignItems: "center",
    borderRadius: 12,
    // height: 47,
    paddingHorizontal: 15,
    flexDirection: "row",
    // justifyContent: 'space-between',
    gap: 10,
    width: "100%",
    marginTop: 5,
  },
  sideView: {
    borderRadius: 29,
    padding: 2,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  tImageContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#CEE0FF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  tImage: {
    // width: 48,
    // height: 48,
  },
});

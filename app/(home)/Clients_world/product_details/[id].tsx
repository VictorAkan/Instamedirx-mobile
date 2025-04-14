// import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated, TextInput } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useCart } from '@/utils/context/cart_context';
import { useState, useRef } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

const moreProducts = {
  'More from the store': [
    { id: 1, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png'), discount: 20 },
    { id: 2, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png') },
    { id: 3, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria3.png') },
    { id: 4, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png'), discount: 50 },
    { id: 5, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png') },
    { id: 6, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png') },
    { id: 7, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png'), discount: 20 },
  ],
};

const ProductDetailScreen = () => {
  const { image, id, store } = useLocalSearchParams() as {
    image: string;
    id: string;
    store: string
  };
  const [search, setSearch] = useState('');
  const { cartCount, setCartCount, cartItems, setCartItems, disabledButtons, setDisabledButtons } = useCart();
  const router = useRouter();
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

  // const addToCart = () => {
  //     setCartCount(cartCount + 1);
  // };

  const isDisabled = disabledButtons[id];

  const toggleCartItem = (id: any) => {
    if (isDisabled) {
      // Remove item from cart
      setCartCount(cartCount - 1);
      setCartItems(prev => ({ ...prev, [id]: false }));
      setDisabledButtons(prev => ({ ...prev, [id]: false }));
    } else {
      // Add item to cart
      setCartCount(cartCount + 1);
      setCartItems(prev => ({ ...prev, [id]: true }));
      setDisabledButtons(prev => ({ ...prev, [id]: true }));
    }
  };

  return (
    <ThemedView style={{
      flex: 1
    }}>
      <ThemedView style={styles.headerView}>
        {!isSearchVisible && (
          <>
            <ThemedView style={styles.leftSide}>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                <AntDesign name="arrowleft" size={24} color="#032255" />
              </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.edgeIcons}>
              <TouchableOpacity onPress={openSearch} activeOpacity={0.9}>
                <MaterialIcons name="search" size={24} color="#698fcc" />
              </TouchableOpacity>
              <Link href="/Clients_world/client_cart_screen" asChild>
                <TouchableOpacity activeOpacity={0.9}>
                  <View style={styles.cartIconContainer}>
                    <MaterialCommunityIcons name="cart-outline" size={24} color="#698fcc" />
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
                  <MaterialCommunityIcons name="cart-outline" size={24} color="#0544AA" />
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}

        {/* Product Image */}
        <ThemedView style={styles.imageContainer}>
          <Image
            source={image as any}
            style={styles.productImage}
          />
        </ThemedView>

        {/* Product Details */}
        <ThemedText style={styles.category}>Antibiotics</ThemedText>
        <ThemedText style={styles.title}>Amoxil (amoxicillin) 250mg - 1000mg</ThemedText>
        <ThemedText style={styles.price}>₦12,000</ThemedText>

        <ThemedText style={styles.description}>
          Amoxicillin is an antibiotic effective against a broad range of bacterial infections. It works by inhibiting the formation of bacterial cell walls, making it useful in treating respiratory, urinary, and skin infections, among others.
        </ThemedText>

        {/* Store Link */}
        <Link href="/Clients_world/product_details/store_details" asChild>
          <TouchableOpacity style={styles.storeButton} activeOpacity={0.8}>
            <ThemedText style={styles.storeText}>Visit {store}</ThemedText>
            <ThemedView style={styles.arrowContainer}>
              <Feather name="arrow-right" size={15} color="white" />
            </ThemedView>
          </TouchableOpacity>
        </Link>

        {/* Add to Cart Button */}
        <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartButton, {
          backgroundColor: isDisabled ? "#CEE0FF" : "#0866FF"
        }]} onPress={() => toggleCartItem(id)}>
          <ThemedText style={[styles.addToCartText, {
            color: isDisabled ? '#8F8F8F' : '#fff'
          }]}>Add to Cart</ThemedText>
          <ThemedView style={styles.sideView}>
            <AntDesign name="arrowright" size={18} color={isDisabled ? '#D6D6D6' : '#0866FF'} />
          </ThemedView>
        </TouchableOpacity>

        <ScrollView style={styles.scrollcontainer} showsVerticalScrollIndicator={false}>
          {Object.entries(moreProducts).map(([category, items]) => (
            <ThemedView key={category} style={styles.categoryContainer}>
              <ThemedView style={styles.categoryHeader}>
                <ThemedText style={styles.categoryText}>{category}</ThemedText>
              </ThemedView>
              <ScrollView style={{ marginTop: 15, flexGrow: 1, gap: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                {items.map((product) => (
                  <ThemedView key={product.id} style={styles.productCard}>
                    <TouchableOpacity style={styles.bottomImageContainer} activeOpacity={0.8}>
                      <Image source={product.image} style={styles.productImageB} />
                    </TouchableOpacity>
                    <ThemedText style={styles.productTxt}>{truncateText(product.name, 16)}</ThemedText>
                    {product.discount && <ThemedView style={styles.discountRow}>
                      <Feather name="tag" size={16} color="#FF5E5E" />
                      <ThemedText style={styles.discountTxt}>{product.discount}% discount</ThemedText>
                    </ThemedView>}
                    <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                    <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartButton, {
                      backgroundColor: isDisabled ? "#CEE0FF" : "#0866FF",
                      marginTop: product.discount ? 0 : 22
                    }]} onPress={() => toggleCartItem(product.id)}>
                      <ThemedText style={[styles.addToCartText, {
                        color: isDisabled ? '#8F8F8F' : '#fff'
                      }]}>Add to Cart</ThemedText>
                      <ThemedView style={styles.sideView}>
                        <AntDesign name="arrowright" size={18} color={isDisabled ? '#D6D6D6' : '#0866FF'} />
                      </ThemedView>
                    </TouchableOpacity>
                  </ThemedView>
                ))}
              </ScrollView>
            </ThemedView>
          ))}
        </ScrollView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 16,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    // marginBottom: 10,
    paddingHorizontal: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 2,
    width: '90%'
  },
  searchInput: {
    flex: 1,
    fontFamily: 'OpenSans_400Regular',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 27,
    borderColor: '#ADCCFF',
    borderWidth: 1,
    padding: 8,
    // marginTop: 5,
    // marginRight: 1,
  },
  sideLine: {
    borderLeftWidth: 2,
    borderLeftColor: '#ADCCFF',
    backgroundColor: 'white',
    paddingLeft: 5,
  },
  edgeIcons: {
    gap: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    color: '#0755D4',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  imageContainer: {
    borderWidth: 1,
    padding: 25,
    borderColor: '#0866FF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginBottom: 10,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  category: {
    color: '#9F9900',
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
    marginBottom: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'OpenSans_700Bold',
    color: '#0866FF',
    marginHorizontal: 16,
  },
  price: {
    fontSize: 18,
    fontFamily: 'OpenSans_700Bold',
    color: '#0866FF',
    marginBottom: 10,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: '#043380CC',
    fontFamily: 'OpenSans_400Regular',
    marginBottom: 15,
    marginHorizontal: 16,
  },
  arrowContainer: {
    padding: 3,
    backgroundColor: "#043380",
    borderRadius: 20,
  },
  addToCartButton: {
    backgroundColor: "#0866FF",
    padding: 7,
    alignItems: 'center',
    borderRadius: 12,
    // height: 47,
    paddingHorizontal: 15,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 10,
    // width: '100%',
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginTop: 10,
  },
  sideView: {
    borderRadius: 29,
    padding: 2,
  },
  scrollcontainer: {
    // flex: 1,
    backgroundColor: 'white',
    // paddingVertical: 50,
    // paddingTop: 40,
    marginTop: 40,
    // paddingLeft: 25,
    flexGrow: 1,
    // marginBottom: 60,
    // // marginTop: 10,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans_700Bold',
    fontSize: 14,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 5,
    marginHorizontal: 16,
  },
  storeText: {
    fontSize: 14,
    color: '#043380',
    marginRight: 5,
    fontFamily: 'OpenSans_700Bold',
  },
  cartButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  categoryContainer: {
    marginBottom: 40,
    paddingTop: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginHorizontal: 16,
  },
  categoryText: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 14,
    backgroundColor: '#F9F8C5',
    padding: 5,
    paddingHorizontal: 10,
  },
  viewAll: {
    color: '#0866FF',
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular',
  },
  productCard: {
    // width: 150,
    // padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    // marginRight: 10,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: '#EAEAEA',
    marginTop: 20,
    marginLeft: 5,
  },
  // productListCard: {
  //     width: '48%',
  //     padding: 10,
  //     alignItems: 'center',
  //     backgroundColor: 'white',
  //     marginBottom: 10,
  //     // borderRadius: 10,
  //     // borderWidth: 1,
  //     borderColor: '#EAEAEA',
  // },
  productImageB: {
    width: 100,
    height: 100,
  },
  discountRow: {
    flexDirection: 'row',
    gap: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  discountTxt: {
    color: '#FF5E5E',
    fontSize: 14,
    fontFamily: 'OpenSans_700Bold',
  },
  productTxt: {
    marginTop: 10,
    // width: '80%',
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    color: '#0544AA',
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
  bottomImageContainer: {
    borderWidth: 1,
    padding: 20,
    borderColor: '#CEE0FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    // width: '80%',
    color: '#0544AA',
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
});

export default ProductDetailScreen;
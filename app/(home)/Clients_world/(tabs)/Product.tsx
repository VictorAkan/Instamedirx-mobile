import { Image, TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const products = {
  Malaria: [
    { id: 1, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria1.png') },
    { id: 2, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria2.png') },
    { id: 3, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../../../../assets/images/malaria3.png') },
  ],
  'Pain Relief': [
    { id: 4, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain1.png') },
    { id: 5, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain2.png') },
    { id: 6, name: 'Vitacillin Met 5...', price: '₦2,500', image: require('../../../../assets/images/pain3.png') },
  ],
};

const Product = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: string; image: any; quantity: number }[]>([]);
  const [addedToCartMap, setAddedToCartMap] = useState<{ [key: number]: boolean }>({});

  const toggleCartItem = (productId: number, product: any) => {
    setAddedToCartMap((prevMap) => {
      const isAdded = prevMap[productId];
      const newCount = isAdded ? cartCount - 1 : cartCount + 1;
      setCartCount(Math.max(0, newCount));

      if (isAdded) {
        setCartItems(cartItems.filter(item => item.id !== productId));
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }

      return {
        ...prevMap,
        [productId]: !isAdded,
      };
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerView}>
        <ThemedView style={styles.leftSide}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
            <AntDesign name="arrowleft" size={24} color="#032255" />
          </TouchableOpacity>
          <ThemedText style={styles.header}>Shop Now</ThemedText>
        </ThemedView>
        <ThemedView style={styles.edgeIcons}>
          <TouchableOpacity activeOpacity={0.9}>
            <MaterialIcons name="search" size={24} color="#0544AA" />
          </TouchableOpacity>
          <Link href="/ClientScreen/client_cart_screen" asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <View style={styles.cartIconContainer}>
                <MaterialCommunityIcons name="cart-outline" size={24} color="#0544AA" />
                {cartCount >= 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.scrollcontainer} showsVerticalScrollIndicator={false}>
        {Object.entries(products).map(([category, items]) => (
          <ThemedView key={category} style={styles.categoryContainer}>
            <ThemedView style={styles.categoryHeader}>
              <ThemedText style={styles.categoryText}>{category}</ThemedText>
            </ThemedView>
            <ScrollView style={{ marginTop: 15, flexGrow: 1 }} horizontal showsHorizontalScrollIndicator={false}>
              {items.map((product) => {
                const isAdded = addedToCartMap[product.id] || false;

                return (
                  <ThemedView key={product.id} style={styles.productCard}>
                    <TouchableOpacity
                      style={styles.imageContainer}
                      activeOpacity={0.8}
                      onPress={() =>
                        router.push({
                          pathname: "/ClientScreen/product_details/[id]",
                          params: {
                            id: product.id,
                            image: product.image,
                          }
                        })
                      }
                    >
                      <Image source={product.image} style={styles.productImage} />
                    </TouchableOpacity>
                    <ThemedText style={styles.productTxt}>{product.name}</ThemedText>
                    <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.addToCartButton,
                        { backgroundColor: isAdded ? '#CEE0FF' : '#0866FF' },
                      ]}
                      onPress={() => toggleCartItem(product.id, product)}
                    >
                      <ThemedText style={styles.addToCartText}>
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </ThemedText>
                      <ThemedView style={styles.sideView}>
                        <AntDesign name="arrowright" size={20} color={isAdded ? '#CEE0FF' : '#0866FF'} />
                      </ThemedView>
                    </TouchableOpacity>
                  </ThemedView>
                );
              })}
            </ScrollView>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollcontainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingLeft: 25,
    flexGrow: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 15,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },
  edgeIcons: {
    gap: 30,
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
  categoryContainer: {
    marginBottom: 20,
    paddingTop: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  categoryText: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 14,
    backgroundColor: '#F9F8C5',
    padding: 5,
    paddingHorizontal: 10,
  },
  productCard: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 10,
    borderColor: '#EAEAEA',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productTxt: {
    marginTop: 10,
    width: '100%',
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    color: '#0544AA',
  },
  imageContainer: {
    borderWidth: 1,
    padding: 20,
    borderColor: '#CEE0FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    width: '100%',
    color: '#0544AA',
  },
  addToCartButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 20,
  },
  sideView: {
    borderRadius: 29,
    padding: 4,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans_700Bold',
    fontSize: 14,
  },
});

export default Product;

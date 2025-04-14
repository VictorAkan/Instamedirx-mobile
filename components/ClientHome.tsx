import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Circle } from 'react-native-svg';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';




const ClientHomeCard = ({ item }: any) => {
    const router = useRouter();

    const goToConsultation = () => {
        router.push('/ClientScreen/IndividualConsultation');
    };

    return (
        <TouchableOpacity onPress={goToConsultation}>
            <View style={styles.card}>

                <View style={styles.cardItemContainer}>
                    <View style={styles.cardItemImage}>
                        <Image source={item.logo} style={styles.logo} />
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <FontAwesome6 name="angle-right" size={15} color="#0866FF" style={styles.icons} />

            </View>
        </TouchableOpacity>
    );
};

const NotificationsCard = ({ item }: any) => {
    const truncateMessage = (message, maxLength) => {
        if (message.length > maxLength) {
            return message.substring(0, maxLength) + "...";
        }
        return message;
    };

    return (
        <View style={styles.Notificationcard}>
            <View style={styles.NotificationscardItemContainer}>
                <View style={styles.NotificationsCardItemImage}>
                    <Image source={item.logo} style={styles.Notificationcardlogo} />
                    <Text style={styles.NotificationsCardname}>{item.name}</Text>
                    <Text style={styles.NotificationsCardtime}>{item.time}</Text>
                </View>
                <Text style={styles.NotificationsCardmessage}>{truncateMessage(item.message, 40)} </Text>
            </View>
        </View>
    );
};

// Define the productItem componentconst ProductItem = ({ item }) => {
const ProductItem = ({ item, addToCart }) => {
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        if (!addedToCart) {
            addToCart(1); // Increment cart count
            setAddedToCart(true);
        } else {
            addToCart(-1); // Decrement cart count
            setAddedToCart(false);
        }
    };

    return (
        <View style={styles.productItem}>
            <View style={styles.productImageContainer}>
                <Image source={item.image} style={styles.productImage} />
            </View>
            <Text style={styles.productName}>{item.name}</Text>

            {/* Wrap price + discount in a proper View */}
            <View style={styles.priceWrapper}>
                {item.discount && (
                    <View style={styles.pricetag}>
                        <Entypo name="price-tag" size={14} color="red" />
                        <Text style={styles.discount}> {item.discount}</Text>
                    </View>
                )}
                <Text style={styles.price}>{item.price}</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.addToCartButton,
                    addedToCart && styles.addToCartButtonAdded,
                ]}
                onPress={handleAddToCart}
            >
                <Text style={styles.addToCartText}>
                    {addedToCart ? 'Added' : 'Add to Cart'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
        </View>
    );
};




const ClientHome = ({ addToCart }) => {
    const route = useRouter()

    const addRouteProductScreen = () => {
        route.push('/ClientScreen/Product')
    }

    const [selectedStory, setSelectedStory] = useState<any | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const truncateText = (text: any, maxLength: any) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    const storiesData = [
        { id: "1", user: "Your shorts", image: require("../assets/images/doc1.png"), storyCount: 0, isYourStory: true },
        { id: "2", user: "Dr. Salam Ol...", image: require("../assets/images/doc2.png"), storyCount: 2 },
        { id: "3", user: "Glutasi", image: require("../assets/images/doc3.png"), storyCount: 1 },
        { id: "4", user: "Goodwill Sto...", image: require("../assets/images/doc4.png"), storyCount: 3 },
        { id: "5", user: "Tess", image: require("../assets/images/doc5.png"), storyCount: 1 },
    ];
    const pharmacists = [
        {
            id: "1",
            name: "Individual Consultation",
            logo: require("../assets/ClientPageSServiceImage/hand.png"),
        },
        {
            id: "2",
            name: "Family Consultation",
            logo: require("../assets/ClientPageSServiceImage/happy.png"),
        },
        {
            id: "3",
            name: "Antenatal Care",
            logo: require("../assets/ClientPageSServiceImage/pregnantwoman.png"),
        },
        {
            id: "4",
            name: "Adolescents and Children Consultation",
            logo: require("../assets/ClientPageSServiceImage/children.png"),
        },
        {
            id: "5",
            name: "Group Consultation",
            logo: require("../assets/ClientPageSServiceImage/partners.png"),
        }
    ];

    const Notifications = [
        {
            id: "1",
            name: "Dr Jane messaged you",
            logo: require("../assets/images/doc1.png"),
            time: "5s ago",
            message: "Hi Alfred, Dr. Jane just sent you a message. Go to the message tab to read the message."
        },
        {
            id: "2",
            name: "Dr Jane messaged you",
            logo: require("../assets/images/pharm1.png"),
            time: "5s ago",
            message: "Hi Alfred, Dr. Jane just sent you a message. Go to the message tab to read the message."
        },
        {
            id: "3",
            name: "Dr Jane messaged you",
            logo: require("../assets/images/setting.png"),
            time: "5s ago",
            message: "Hi Alfred, Dr. Jane just sent you a message. Go to the message tab to read the message."

        }
    ]

    const products = [
        { id: 1, name: 'Vitacillin Met 5...', price: '₦11,900', image: require('../assets/images/mageview.png') },
        { id: 2, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../assets/images/mageview.png'), discount: '50% discount' },
        { id: 3, name: 'Vitacillin Met 5...', price: '₦23,500', image: require('../assets/images/mageview.png'), discount: '20% discount' },
        { id: 4, name: 'Vitacillin Met 5...', price: '₦19,500', image: require('../assets/images/mageview.png') },
    ];

    const getDashedBorder = (storyCount: number) => {
        const radius = 37; // Radius of the circle
        const circumference = 2 * Math.PI * radius;

        if (storyCount === 0) {
            // No border
            return (
                <Svg width="80" height="80" style={{ position: 'absolute' }}>
                    <Circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#D6D6D6" // Change stroke color to gray
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            );
        } else if (storyCount === 1) {
            // Solid, filled border
            return (
                <Svg width="80" height="80" style={{ position: 'absolute' }}>
                    <Circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#007AFF"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            );
        } else {
            // Dashed border (storyCount > 1)
            const dashLength = circumference / (storyCount * 2);
            const gapLength = 7;
            const dashArray = Array(storyCount).fill(`${dashLength},${gapLength}`).join(' ');

            return (
                <Svg width="80" height="80" style={{ position: 'absolute' }}>
                    <Circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#007AFF"
                        strokeWidth="2"
                        strokeDasharray={dashArray}
                        fill="none"
                    />
                </Svg>
            );
        }
    };

    return (
        <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1, marginBottom: 40, }} showsVerticalScrollIndicator={false}>
            <ThemedText style={styles.sectionTitle}>Stories</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>View Stories from nearby doctors and pharmacies</ThemedText>
            <FlatList
                data={storiesData}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storyList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedStory(item.image)} activeOpacity={0.9}>
                        <ThemedView style={styles.storyWrapper}>
                            <ThemedView style={styles.storyBorder}>
                                {getDashedBorder(item.storyCount)}
                                <Image source={item.image} style={styles.storyImage} />
                                {item.isYourStory && (
                                    <ThemedView style={styles.addStoryIcon}>
                                        <ThemedText style={styles.plusText}>+</ThemedText>
                                    </ThemedView>
                                )}
                            </ThemedView>
                            <ThemedText style={styles.storyText}>{item.user}</ThemedText>
                        </ThemedView>
                    </TouchableOpacity>
                )}
            />
            {/* Story Viewer */}
            <Modal visible={!!selectedStory} transparent>
                <TouchableOpacity style={styles.modalBackground} onPress={() => setSelectedStory(null)}>
                    <Image source={require("../assets/images/docbg.jpeg")} style={styles.modalImage} />
                </TouchableOpacity>
            </Modal>

            <ThemedView style={styles.pharmHView}>
                <ThemedText style={styles.pharmTitle}>Services</ThemedText>
            </ThemedView>
            <View style={styles.pharmacyList}>
                {pharmacists.map((item) => (
                    <ClientHomeCard key={item.id} item={item} />
                ))}
            </View>
            <ThemedView style={styles.MedicationsHView}>
                <View style={styles.MedicationsTitleContainer}>
                    <ThemedText style={styles.MedicationsTitle}>Buy Medications</ThemedText>
                </View>
                <TouchableOpacity onPress={addRouteProductScreen}>
                    <ThemedText style={styles.MedicationsViewAll}>View All</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.pharmHViewTwo}>
                <ThemedText style={styles.pharmTitleTwo}>Recent Notifications</ThemedText>
            </ThemedView>

            <View style={styles.gridContainer}>
                {products.map((item) => (
                    <View key={item.id} style={styles.col}>
                        <ProductItem item={item} addToCart={addToCart} />
                    </View>
                ))}
            </View>

            <View>
                {Notifications.map((item) => (
                    <NotificationsCard key={item.id} item={item} />
                ))}
            </View>
        </ScrollView>
    );
}

export default ClientHome


const styles = StyleSheet.create({
    container: { flex: 1 },
    sectionTitle: {
        fontSize: 17,
        color: '#0866FF',
        marginTop: 35,
        fontFamily: 'OpenSans_700Bold',
        marginHorizontal: 20,
    },
    pharmTitle: {
        fontSize: 17,
        color: '#0866FF',
        // marginTop: 35,
        fontFamily: 'OpenSans_700Bold',
        marginHorizontal: 20,
    },
    sectionSubtitle: {
        color: '#043380',
        marginBottom: 20,
        marginTop: 9,
        fontFamily: 'OpenSans_400Regular',
        marginHorizontal: 20,
        fontSize: 12,
        fontWeight: 600,
    },
    segCont: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    segmentContainer: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    segment: {
        position: "absolute",
        height: 70,
        borderWidth: 3,
        borderColor: "blue",
        borderRadius: 40,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    storyList: {
        paddingHorizontal: 20,

    },
    storyWrapper: {
        marginRight: 10,
        alignItems: "center",

    },
    storyBorder: {
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        borderRadius: 40,

    },
    storyImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    addStoryIcon: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#0866FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    plusText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
    },
    storyText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
    },
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        justifyContent: "space-around",
        width: "100%",
        flexDirection: "row",
        marginBottom: 23,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderBottomWidth: 2,

    },
    cardItemContainer: {
        flexDirection: "row",
    },
    cardItemImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: "#CEE0FF",
        justifyContent: 'center',
        alignItems: 'center',

    },
    icons: {
        marginTop: 10,
    },
    pharmHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    logo: {
        width: 25,
        height: 25,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontSize: 14,
        marginRight: 10,
        fontFamily: 'OpenSans_600SemiBold',
        color: '#0866FF',
        width: "75%",
        marginLeft: 10,
        marginTop: 4,
    },
    pharmHView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 35,
        marginRight: 20,
    },
    pharmacyList: {
        padding: 20,
        borderBottomWidth: 3,
        borderColor: "#CEE0FF",
    },
    Notificationcard: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: "#CEE0FF",
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    NotificationsCardItemImage: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 5,
    },
    NotificationscardItemContainer: {
        width: "100%",
        flexDirection: 'column',
        justifyContent: "center",
    },
    NotificationsCardmessage: {
        fontSize: 14,
        color: '#0866FF',
        marginLeft: 50
    },
    NotificationsCardname: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#043380',
    },
    NotificationsCardtime: {
        fontSize: 12,
        color: '#0866FF',
        marginLeft: 10,
    },
    Notificationcardlogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 20,
    },
    nameAndTimeContainer: {
        flexDirection: 'column',
    },
    MedicationsHView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        paddingLeft: 20,
    },
    MedicationsTitleContainer: {
        width: 140,
        backgroundColor: "#FCFACC",
        justifyContent: "center",
        alignItems: 'center'
    },
    MedicationsTitle: {
        fontSize: 14,
        fontWeight: "medium",
        color: '#043380'
    },
    MedicationsViewAll: {
        fontSize: 15,
        color: '#043380',
        paddingRight: 40,
    },
    pharmHViewTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    pharmTitleTwo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 10,
        color: '#0866FF',
    },
    viewAllButton: {
        padding: 5,
    },
    viewAllText: {
        color: '#0866FF',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 3,
        borderColor: "#CEE0FF",
        paddingBottom: 30,
    },
    col: {
        width: '48%',
        marginBottom: 10,
    },
    productItem: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    productImageContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },

    productName: {
        fontSize: 16,
        marginTop: 10,
    },
    productPrice: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
    discount: {
        color: 'red',
        fontSize: 12,
    },
    pricetag: {
        flexDirection: "row",
        gap: 1,
    },
    price: {
        fontSize: 12,
        justifyContent: 'center',
        marginTop: 10,
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0866FF',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
    addToCartText: {
        color: 'white',
        marginRight: 5,
    },
    priceWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        minHeight: 40,
    },
    addToCartButtonAdded: {
        backgroundColor: 'gray', // Or any other color to indicate added
    },
})
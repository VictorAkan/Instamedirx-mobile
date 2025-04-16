import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome6, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Circle } from 'react-native-svg';
import { Link, useRouter } from 'expo-router';
import DoctorStoryScreen from './StoryComponent';

interface ClientsHomeProps {
    toggleCartItem: (id: any) => void;
    disabledButtons: { [key: string]: boolean };
}

const ClientsHome: React.FC<ClientsHomeProps> = ({ toggleCartItem, disabledButtons }) => {
    const [selectedStory, setSelectedStory] = useState<any | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const truncateText = (text: any, maxLength: any) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    const closeStory = () => {
      setSelectedStory(null)
    }

    const storiesData = [
        { id: "1", user: "Pharmcy Store", image: require("../assets/images/doc1.png"), storyCount: 1, },
        { id: "2", user: "Dr. Salam Ol...", image: require("../assets/images/doc2.png"), storyCount: 2 },
        { id: "3", user: "Glutasi", image: require("../assets/images/doc3.png"), storyCount: 1 },
        { id: "4", user: "Goodwill Sto...", image: require("../assets/images/doc4.png"), storyCount: 3 },
        { id: "5", user: "Tess", image: require("../assets/images/doc5.png"), storyCount: 1 },
    ];

    const services = [
        {
            title: 'Individual Consultation',
            icon: require('../assets/images/individual.png'),
        },
        {
            title: 'Family Consultation',
            icon: require('../assets/images/family.png'),
        },
        {
            title: 'Antenatal Care',
            icon: require('../assets/images/Antenatal.png'),
        },
        {
            title: 'Adolescents and Children Consultation',
            icon: require('../assets/images/Adolescent.png'),
        },
        {
            title: 'Group Consultation',
            icon: require('../assets/images/group_consultation.png'),
        },
    ];

    const medications = [
        { id: 34, name: 'Vitacillin Met 5...', price: '₦11,900', image: require('../assets/images/prod1.png') },
        { id: 35, name: 'Vitacillin Met 5...', price: '₦3,500', image: require('../assets/images/prod2.png'), discount: 50 },
        { id: 36, name: 'Vitacillin Met 5...', price: '₦23,500', image: require('../assets/images/prod3.png'), discount: 20 },
        { id: 37, name: 'Vitacillin Met 5...', price: '₦19,500', image: require('../assets/images/prod4.png') },
    ]

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
        <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <ThemedView style={styles.line} />
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
                                {/* {item.isYourStory && (
                                    <ThemedView style={styles.addStoryIcon}>
                                        <ThemedText style={styles.plusText}>+</ThemedText>
                                    </ThemedView>
                                )} */}
                            </ThemedView>
                            <ThemedText style={styles.storyText}>{item.user}</ThemedText>
                        </ThemedView>
                    </TouchableOpacity>
                )}
            />
            <ThemedView style={styles.line} />

            <ThemedText style={styles.sectionTitle}>Services</ThemedText>
            <ThemedView style={{ marginTop: 20 }} />
            {services.map((service, index) => (
                <Link key={index} href="/Clients_world/patients_report" asChild>
                    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                        <ThemedView style={styles.left}>
                            <ThemedView style={styles.iconContainer}>
                                <Image source={service.icon} style={styles.icon} />
                            </ThemedView>
                            <ThemedText style={styles.title}>{service.title}</ThemedText>
                        </ThemedView>
                        <FontAwesome name="angle-right" size={21} color="#0544AA" />
                    </TouchableOpacity>
                </Link>
            ))}
            {/* Story Viewer */}
            <Modal visible={!!selectedStory} transparent>
                <TouchableOpacity style={styles.modalBackground}>
                    <DoctorStoryScreen closeStory={closeStory} />
                </TouchableOpacity>
            </Modal>

            <ThemedView style={styles.line} />
            <ThemedView style={styles.categoryHeader}>
                <ThemedText style={styles.categoryText}>Buy Medications</ThemedText>
                <Link href="/Clients_world/pharm_shop" asChild>
                    <TouchableOpacity activeOpacity={0.8}>
                        <ThemedText style={styles.viewAll}>View All</ThemedText>
                    </TouchableOpacity>
                </Link>
            </ThemedView>
            <ThemedView style={styles.productGrid}>
                {medications.map((product) => (
                    <ThemedView key={product.id} style={styles.productListCard}>
                        <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8} onPress={() => {
                            router.push({
                                pathname: "/Clients_world/product_details/[id]",
                                params: {
                                    id: product.id,
                                    image: product.image,
                                    store: 'PharmC Store',
                                }
                            })
                        }}>
                            <Image source={product.image} style={styles.productImage} />
                        </TouchableOpacity>
                        <ThemedText style={styles.productTxt}>{product.name}</ThemedText>
                        {product.discount && <ThemedView style={styles.discountRow}>
                            <Feather name="tag" size={16} color="#FF5E5E" />
                            <ThemedText style={styles.discountTxt}>{product.discount}% discount</ThemedText>
                        </ThemedView>}
                        <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                        <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartButton, {
                            backgroundColor: disabledButtons[product.id] ? "#CEE0FF" : "#0866FF",
                            marginTop: product.discount ? 0 : 25
                        }]} onPress={() => toggleCartItem(product.id)}>
                            <ThemedText style={[styles.addToCartText, {
                                color: disabledButtons[product.id] ? '#8F8F8F' : '#fff'
                            }]}>Add to Cart</ThemedText>
                            <ThemedView style={styles.fSideView}>
                                <AntDesign name="arrowright" size={18} color={disabledButtons[product.id] ? '#D6D6D6' : '#0866FF'} />
                            </ThemedView>
                        </TouchableOpacity>
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView style={styles.line} />
            <ThemedText style={styles.sectionTitle}>Recent Notifications</ThemedText>
            <ThemedView style={{ marginTop: 30 }} />
            <ThemedView style={styles.mainNotContainer}>
                <ThemedView style={styles.notificationContainer}>
                    <ThemedView>
                        <Image source={require("../assets/images/doc1.png")} style={{
                            width: 48, height: 48
                        }} />
                    </ThemedView>
                    <ThemedView style={styles.notificationRow}>
                        <ThemedView style={styles.topPart}>
                            <ThemedText style={styles.notTopic}>Dr Jane messaged you</ThemedText>
                            <ThemedText style={styles.notSecs}>5s ago</ThemedText>
                        </ThemedView>
                        <ThemedText style={styles.notText}>{truncateText("Hi Alfred, Dr. Jane just sent you a message", 41)}</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.mainNotContainer}>
                <ThemedView style={styles.notificationContainer}>
                    <ThemedView>
                        <Image source={require("../assets/images/notpic2.png")} style={{
                            width: 48, height: 48
                        }} />
                    </ThemedView>
                    <ThemedView style={styles.notificationRow}>
                        <ThemedView style={styles.topPart}>
                            <ThemedText style={styles.notTopic}>PharmC messaged you</ThemedText>
                            <ThemedText style={styles.notSecs}>5s ago</ThemedText>
                        </ThemedView>
                        <ThemedText style={styles.notText}>{truncateText("Hi Alfred, PharmC replied to your message", 41)}</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.mainNotContainer}>
                <ThemedView style={styles.notificationContainer}>
                    <ThemedView>
                        <Image source={require("../assets/images/notpic3.png")} style={{
                            width: 48, height: 48
                        }} />
                    </ThemedView>
                    <ThemedView style={styles.notificationRow}>
                        <ThemedView style={styles.topPart}>
                            <ThemedText style={styles.notTopic}>Your card has been added</ThemedText>
                            <ThemedText style={styles.notSecs}>3s ago</ThemedText>
                        </ThemedView>
                        <ThemedText style={styles.notText}>{truncateText("Hi Alfred, you have successfully added your card", 41)}</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    sectionTitle: {
        fontSize: 16,
        color: '#0755D4',
        marginTop: 15,
        fontFamily: 'OpenSans_600SemiBold',
        marginHorizontal: 20,
    },
    line: {
        // flex: 1,
        height: 3,
        backgroundColor: '#f1faff',
        marginTop: 20,
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
        marginTop: 1,
        fontFamily: 'OpenSans_400Regular',
        marginHorizontal: 20,
        fontSize: 14,
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
        gap: 10,
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
        // backgroundColor: "rgba(0,0,0,0.9)",
        // justifyContent: "center",
        // alignItems: "center",
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
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0052cc',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#0866FF33',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        marginHorizontal: 18,
        paddingHorizontal: 20,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        gap: 15,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e6f2ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        // width: 24,
        // height: 24,
    },
    title: {
        fontSize: 14,
        color: '#0544AA',
        flexShrink: 1,
        fontFamily: 'OpenSans_400Regular',
        width: '78%'
    },
    arrow: {
        fontSize: 20,
        color: '#003366',
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 20,
    },
    categoryText: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
        backgroundColor: '#F9F8C5',
        padding: 5,
        paddingHorizontal: 10,
        color: '#4F4D00',
    },
    viewAll: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    productCard: {
        // width: 150,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        // borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    productListCard: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        // marginHorizontal: 10,
        width: '48%',
        // borderRadius: 10,
        // borderWidth: 1,
        marginBottom: 30,
        borderColor: '#EAEAEA',
    },
    productImage: {
        // width: 100,
        // height: 100,
    },
    discountRow: {
        flexDirection: 'row',
        gap: 4,
        alignSelf: 'flex-start',
        marginLeft: 12,
    },
    discountTxt: {
        color: '#FF5E5E',
        fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
    },
    productTxt: {
        marginTop: 10,
        // width: '100%',
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0544AA',
    },
    imageContainer: {
        borderWidth: 1,
        padding: 10,
        borderColor: '#CEE0FF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    productPrice: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        // width: '100%',
        color: '#0544AA',
        alignSelf: 'flex-start',
        marginLeft: 12,
        // textAlign: 'left',
    },
    addToCartButton: {
        backgroundColor: "#0866FF",
        padding: 7,
        alignItems: 'center',
        borderRadius: 10,
        // height: 47,
        paddingHorizontal: 15,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        gap: 10,
        // width: '100%',
        // marginTop: 20,
    },
    fSideView: {
        borderRadius: 30,
        padding: 2,
    },
    addToCartText: {
        color: "#FFFFFF",
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    notificationRow: {
        gap: 5,
    },
    notificationContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 15,
    },
    mainNotContainer: {
        borderBottomColor: '#CEE0FF',
        borderBottomWidth: 2,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    topPart: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },
    notTopic: {
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
        fontSize: 14,
    },
    notSecs: {
        color: '#043380CC',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    notText: {
        color: '#043380CC',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    sideView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }
})

export default ClientsHome
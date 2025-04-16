import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Circle } from 'react-native-svg';
import { Link } from 'expo-router';
import { RatingComponent } from '@/components/RatingComponent';
import DoctorStoryScreen from './StoryComponent';

const PharmacyCard = ({ item }: any) => {
    return (
        <ThemedView style={styles.card}>
            {/* Logo and Details */}
            <ThemedView style={styles.pharmHeader}>
                <Image source={require("../assets/images/pharmlog.png")} />
                <ThemedView style={styles.details}>
                    <ThemedView style={styles.titleRow}>
                        <ThemedText style={styles.name}>{item.name}</ThemedText>
                        <Image source={require("../assets/images/checkmark.png")} />
                    </ThemedView>
                    <ThemedText style={styles.location}>{`${item.location} | ${item.phone}`}</ThemedText>
                </ThemedView>
                <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={20} color="#0544AA" />
                </TouchableOpacity>
            </ThemedView>

            {/* Available Medications */}
            <ThemedText style={styles.medsTitle}>Available meds</ThemedText>
            <ThemedView style={styles.medsContainer}>
                {item.meds.map((med: any, index: any) => (
                    <ThemedView key={index} style={styles.medPill}>
                        <ThemedText style={styles.medText}>{med}</ThemedText>
                    </ThemedView>
                ))}
                <TouchableOpacity activeOpacity={0.8}>
                    <ThemedText style={styles.moreText}>+ More</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* Recommend Button */}
            <TouchableOpacity style={styles.recommendButton}>
                <Ionicons name="checkmark" size={18} color="white" />
                <ThemedText style={styles.recommendText}>Recommend</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};
 
export default function DocsHome() {
    const [selectedStory, setSelectedStory] = useState<any | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const truncateText = (text: any, maxLength: any) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    const closeStory = () => {
       setSelectedStory(null)
    }

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
            name: "HealthPlus Pharmacy",
            location: "Ikoyi, Lagos",
            phone: "07017809921",
            meds: ["Panadol", "Panadol", "Panadol"],
            logo: require("../assets/images/pharm1.png"),
        },
        {
            id: "2",
            name: "HealthPlus Pharmacy",
            location: "Ikoyi, Lagos",
            phone: "07017809921",
            meds: ["Panadol", "Panadol", "Panadol"],
            logo: require("../assets/images/pharm1.png"),
        },
        {
            id: "3",
            name: "HealthPlus Pharmacy",
            location: "Ikoyi, Lagos",
            phone: "07017809921",
            meds: ["Panadol", "Panadol", "Panadol"],
            logo: require("../assets/images/pharm1.png"),
        },
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
        <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <ThemedText style={styles.sectionTitle}>Add free short Ads</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>View Stories of doctors and pharmacist</ThemedText>
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
                <TouchableOpacity style={styles.modalBackground}>
                    <DoctorStoryScreen closeStory={closeStory} />
                </TouchableOpacity>
            </Modal>

            <ThemedView style={styles.pharmHView}>
                <ThemedText style={styles.pharmTitle}>Pharmacists</ThemedText>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd({ animated: true });
                    }
                }}>
                    <FontAwesome6 name="angle-right" size={20} color="#043380" />
                </TouchableOpacity>
            </ThemedView>
            <FlatList
                ref={flatListRef}
                data={pharmacists}
                renderItem={({ item }) => <PharmacyCard item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pharmacyList}
            />

            <ThemedText style={styles.sectionTitle}>Appointment list</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>Overview of appointments</ThemedText>
            <ThemedView style={styles.appointmentContainer}>
                <Image source={require("../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                <ThemedView style={styles.appointmentInfo}>
                    <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                    <ThemedText style={styles.appointmentType}>Video consultation</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.ongoingButton}>
                    <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.appointmentContainer}>
                <Image source={{ uri: "https://randomuser.me/api/portraits/men/2.jpg" }} style={styles.appointmentImage} />
                <ThemedView style={styles.appointmentInfo}>
                    <ThemedText style={styles.appointmentName}>Fred Obi</ThemedText>
                    <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.timeButton}>
                    <ThemedText style={styles.ongoingText}>11:45</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.appointmentContainer}>
                <Image source={{ uri: "https://randomuser.me/api/portraits/men/7.jpg" }} style={styles.appointmentImage} />
                <ThemedView style={styles.appointmentInfo}>
                    <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                    <ThemedText style={styles.appointmentType}>Video consultation</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.timeButton}>
                    <ThemedText style={styles.ongoingText}>11:45</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.appointmentContainer}>
                <Image source={{ uri: "https://randomuser.me/api/portraits/men/5.jpg" }} style={styles.appointmentImage} />
                <ThemedView style={styles.appointmentInfo}>
                    <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                    <ThemedText style={styles.appointmentType}>Video consultation</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.timeButton}>
                    <ThemedText style={styles.ongoingText}>11:45</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ThemedText style={[styles.sectionTitle, { marginTop: 50 }]}>Notifications</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>All recent activity received</ThemedText>
            <ThemedView style={styles.notificationView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.notificationRow}>
                    <Image source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} style={styles.avatar} />
                    <ThemedView style={styles.notGview}>
                        <ThemedText style={styles.headNot}>New appointment added</ThemedText>
                        <ThemedText style={styles.subNot}>{truncateText("Oscar David has been added to your appointment list", 30)}</ThemedText>
                    </ThemedView>
                    <ThemedText style={styles.timeText}>14:32</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.notificationRow}>
                    <ThemedView style={styles.iconRound}>
                        <MaterialIcons name="message" size={24} color="#043380" />
                    </ThemedView>
                    <ThemedView style={styles.notGview}>
                        <ThemedText style={styles.headNot}>Payment received</ThemedText>
                        <ThemedText style={styles.subNot}>{truncateText("Dr Sandra a payment has been made to your account", 30)}</ThemedText>
                    </ThemedView>
                    <ThemedText style={styles.timeText}>14:32</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.notificationRow}>
                    <ThemedView style={styles.iconRound}>
                        <Ionicons name="notifications-outline" size={24} color="#043380" />
                    </ThemedView>
                    <ThemedView style={styles.notGview}>
                        <ThemedText style={styles.headNot}>Canceled appointment</ThemedText>
                        <ThemedText style={styles.subNot}>{truncateText("You have a recently canceled appointment", 30)}</ThemedText>
                    </ThemedView>
                    <ThemedText style={styles.timeText}>14:32</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.notificationRow}>
                    <Image source={{ uri: "https://randomuser.me/api/portraits/men/4.jpg" }} style={styles.avatar} />
                    <ThemedView style={styles.notGview}>
                        <ThemedText style={styles.headNot}>Completed appointment</ThemedText>
                        <ThemedText style={styles.subNot}>{truncateText("Your appointment with David is completed", 30)}</ThemedText>
                    </ThemedView>
                    <ThemedText style={styles.timeText}>14:32</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ThemedText style={[styles.sectionTitle, { marginTop: 50 }]}>Ratings</ThemedText>
            <RatingComponent />
        </ScrollView>
    );
}

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
        marginBottom: 10,
        marginTop: 9,
        fontFamily: 'OpenSans_400Regular',
        marginHorizontal: 20,
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
        // backgroundColor: "rgba(0,0,0,0.9)",
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
        marginRight: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        // width: 300,
    },
    pharmHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    details: {
        // flex: 1,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontSize: 14,
        marginRight: 10,
        fontFamily: 'OpenSans_600SemiBold',
        color: '#043380',
    },
    location: {
        fontSize: 13,
        color: "#043380",
        fontFamily: 'OpenSans_400Regular',
    },
    medsTitle: {
        fontSize: 13,
        fontFamily: 'OpenSans_600SemiBold',
        color: "#0866FF",
        marginTop: 10,
    },
    medsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        flexWrap: "wrap",
    },
    medPill: {
        borderWidth: 1,
        borderColor: "#0866FF",
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginRight: 5,
        backgroundColor: '#F1FAFF',
    },
    medText: {
        color: "#0866FF",
        fontSize: 13,
        fontFamily: 'OpenSans_400Regular',
    },
    moreText: {
        color: "#0866FF",
        fontSize: 13,
        fontFamily: 'OpenSans_400Regular',
    },
    recommendButton: {
        flexDirection: "row",
        backgroundColor: "#0866FF",
        borderRadius: 20,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginHorizontal: 70,
    },
    recommendText: {
        color: "white",
        fontSize: 13,
        marginLeft: 5,
        fontFamily: 'OpenSans_600SemiBold',
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
    },
    pharmacistCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        gap: 8,
    },
    pharmacistImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    pharmacistName: {
        marginTop: 5,
        color: '#043380',
        fontFamily: 'OpenSans_700Bold',
    },
    pharmacistRole: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    starContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    appointmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 30,
        marginHorizontal: 20,
    },
    appointmentImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    appointmentInfo: {
        flex: 1,
        marginLeft: 10,
    },
    appointmentName: {
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
    },
    appointmentType: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    ongoingButton: {
        backgroundColor: '#A365F5',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    ongoingText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
    },
    timeButton: {
        backgroundColor: '#0866FF',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    notificationView: {
        backgroundColor: '#ebf3ff',
        borderRadius: 20,
        padding: 20,
        paddingHorizontal: 15,
        gap: 30,
    },
    notificationRow: {
        backgroundColor: '#ebf3ff',
        flexDirection: 'row',
        gap: 15,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
    },
    iconRound: {
        backgroundColor: '#ebf3ff',
        width: 45,
        height: 45,
        borderColor: '#0866FF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginRight: 5,
    },
    notGview: {
        backgroundColor: '#ebf3ff',
    },
    headNot: {
        fontSize: 17,
        color: '#043380',
        fontFamily: 'Inter_600SemiBold',
    },
    subNot: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    timeText: {
        alignSelf: 'flex-end',
        color: '#043380',
        fontFamily: 'Inter_500Medium',
    },
    pharmDets: {
        // 
    },
    sideView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }
})
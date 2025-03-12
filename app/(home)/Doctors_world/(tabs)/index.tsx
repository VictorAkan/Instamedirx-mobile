import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Circle } from 'react-native-svg';
import { Link } from 'expo-router';
import DrawerMenu from '@/components/DrawerMenu';
// import StoryCircle from '@/components/SegmentedStoryCircle';

export default function HomeScreen() {
    const [search, setSearch] = useState('');
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [selectedStory, setSelectedStory] = useState<any | null>(null);
    // { user: 'Your Story', stories: [], image: require("../../../../assets/images/doc1.png"), isYourStory: true },
    const storiesData = [
        { id: "1", user: "Your shorts", image: require("../../../../assets/images/doc1.png"), storyCount: 0, isYourStory: true },
        { id: "2", user: "Dr. Salam Ol...", image: require("../../../../assets/images/doc2.png"), storyCount: 2 },
        { id: "3", user: "Glutasi", image: require("../../../../assets/images/doc3.png"), storyCount: 1 },
        { id: "4", user: "Goodwill Sto...", image: require("../../../../assets/images/doc4.png"), storyCount: 3 },
        { id: "5", user: "Tess", image: require("../../../../assets/images/doc5.png"), storyCount: 1 },
    ];
    const pharmacists = Array(3).fill(null).map((_, index) => ({ id: index }));

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
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <ThemedView style={styles.header}>
                    <ThemedText style={styles.welcomeText}>Welcome, Dr. Sandra</ThemedText>
                    <ThemedView style={styles.sideView}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setDrawerVisible(true)}>
                            <Ionicons name="ellipsis-vertical" size={22} color="#0544AA" />
                        </TouchableOpacity>
                        <Link href="/Doctors_world/doc_messages_screen" asChild>
                        <TouchableOpacity activeOpacity={0.9}>
                            <Image source={require("../../../../assets/images/chaticon.png")} />
                        </TouchableOpacity>
                        </Link>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.searchBar}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Ionicons name="filter" size={20} color="#0544AA" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <ThemedView style={styles.sideLine}>
                        <ThemedText></ThemedText>
                    </ThemedView>
                    <TextInput
                        placeholder="Browse doctors and medications"
                        placeholderTextColor="#8F8F8F"
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity activeOpacity={0.9}>
                        <MaterialIcons name="search" size={24} color="#D6D6D6" />
                    </TouchableOpacity>
                </ThemedView>

                <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                                <View style={styles.storyWrapper}>
                                    <View style={styles.storyBorder}>
                                        {getDashedBorder(item.storyCount)}
                                        <Image source={item.image} style={styles.storyImage} />
                                        {item.isYourStory && (
                                            <View style={styles.addStoryIcon}>
                                                <Text style={styles.plusText}>+</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.storyText}>{item.user}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    {/* Story Viewer */}
                    <Modal visible={!!selectedStory} transparent>
                        <TouchableOpacity style={styles.modalBackground} onPress={() => setSelectedStory(null)}>
                            <Image source={require("../../../../assets/images/docbg.jpeg")} style={styles.modalImage} />
                        </TouchableOpacity>
                    </Modal>

                    <ThemedText style={styles.sectionTitle}>Pharmacists</ThemedText>
                    <FlatList
                        data={pharmacists}
                        renderItem={({ item }) => (
                            <ThemedView style={styles.pharmacistCard}>
                                <Image source={require("../../../../assets/images/pharm1.png")} style={styles.pharmacistImage} />
                                <ThemedView style={styles.pharmDets}>
                                    <ThemedText style={styles.pharmacistName}>Uche David</ThemedText>
                                    <ThemedText style={styles.pharmacistRole}>Pharmacist</ThemedText>
                                    <ThemedView style={styles.starContainer}>
                                        {[...Array(5)].map((_, i) => (
                                            <Ionicons key={i} name="star" size={18} color="gold" />
                                        ))}
                                    </ThemedView>
                                </ThemedView>
                            </ThemedView>
                        )}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />

                    <ThemedText style={styles.sectionTitle}>Appointment list</ThemedText>
                    <ThemedText style={styles.sectionSubtitle}>Overview of appointments</ThemedText>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Video consultation</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>Fred Obi</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Upcoming</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Upcoming</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Upcoming</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Completed</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Upcoming</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Completed</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.appointmentContainer}>
                        <Image source={require("../../../../assets/images/patientwithfixedappointment1.png")} style={styles.appointmentImage} />
                        <ThemedView style={styles.appointmentInfo}>
                            <ThemedText style={styles.appointmentName}>David Olu</ThemedText>
                            <ThemedText style={styles.appointmentType}>Voice call</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.ongoingButton}>
                            <ThemedText style={styles.ongoingText}>Ongoing</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ScrollView>
            </ThemedView>

            {isDrawerVisible && <DrawerMenu isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginTop: 60,
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0755D4',
        fontFamily: 'OpenSans_700Bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#ADCCFF',
        borderWidth: 1,
        padding: 10,
        marginTop: 15,
    },
    sideLine: {
        borderLeftWidth: 2,
        borderLeftColor: '#ADCCFF',
        backgroundColor: 'white',
        paddingLeft: 5,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'OpenSans_400Regular',
    },
    sectionTitle: {
        fontSize: 17,
        color: '#0866FF',
        marginTop: 35,
        fontFamily: 'OpenSans_700Bold',
    },
    sectionSubtitle: {
        color: '#043380',
        marginBottom: 10,
        marginTop: 9,
        fontFamily: 'OpenSans_400Regular',
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
        paddingHorizontal: 10,
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
    pharmDets: {
        // 
    },
    sideView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    }
});

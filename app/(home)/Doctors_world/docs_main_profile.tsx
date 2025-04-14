import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svg, { Circle } from 'react-native-svg';
import FeedScreen from "@/components/Posts";
import Qualifications from "@/components/Qualifications";
import DocDrawerMenu from "@/components/DocDrawerMenu";

const DocsMainProfile = () => {
    const [selectedTab, setSelectedTab] = useState("Posts");
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const router = useRouter();

    const getDashedBorder = (storyCount: number) => {
            const radius = 41; // Radius of the circle
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
                    <Svg width="420" height="420" style={{ position: 'absolute' }}>
                        <Circle
                            cx="60"
                            cy="60"
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
                    <Svg width="220" height="220" style={{ position: 'absolute' }}>
                        <Circle
                            cx="110"
                            cy="45"
                            r={radius}
                            stroke="#007AFF"
                            strokeWidth="3"
                            strokeDasharray={dashArray}
                            fill="none"
                        />
                    </Svg>
                );
            }
        };

    return (
            <ScrollView style={{ flexGrow: 1, flex: 1 }} showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.container}>
                {/* Profile Cover Photo */}
                <ThemedView style={styles.coverPhoto}>
                    <Image
                        source={require("../../../assets/images/coverimg.png")} // Replace with actual image
                        style={styles.coverImage}
                    />
                </ThemedView>

                <ThemedView style={styles.headerView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDrawerVisible(true)} activeOpacity={0.8} style={{ marginLeft: 5 }}>
                        <Ionicons name="ellipsis-vertical" size={22} color="#0544AA" />
                    </TouchableOpacity>
                </ThemedView>

            {/* Profile Picture */}
            <ThemedView style={styles.profileContainer}>
                {getDashedBorder(4)}
                <Image
                    source={require("../../../assets/images/docprofile.png")} // Replace with actual profile picture
                    style={styles.profileImage}
                />
            </ThemedView>

            {/* User Info */}
            <ThemedText style={styles.name}>Dr. Sandra Davis</ThemedText>
            <ThemedText style={styles.profession}>Gynecologist</ThemedText>

            {/* Stats */}
            <ThemedView style={styles.statsContainer}>
                <ThemedView style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>48.5k</ThemedText>
                    <ThemedText style={styles.statLabel}>Followers</ThemedText>
                </ThemedView>
                <ThemedView style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>49</ThemedText>
                    <ThemedText style={styles.statLabel}>Post</ThemedText>
                </ThemedView>
                <ThemedView style={styles.statItem}>
                    <ThemedText style={styles.statNumber}>1000</ThemedText>
                    <ThemedText style={styles.statLabel}>Following</ThemedText>
                </ThemedView>
            </ThemedView>

            {/* Bio */}
            <ThemedText style={styles.bio}>
                Compassionate and experienced gynecologist dedicated to women's health. Specializing in reproductive care, prenatal support, and wellness. Your health, my priority.
            </ThemedText>

            {/* Tabs */}
            <ThemedView style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "Posts" && styles.activeTab]}
                    onPress={() => setSelectedTab("Posts")}
                    activeOpacity={0.8}
                >
                    <ThemedText style={[styles.tabText, selectedTab === "Posts" && styles.activeTabText]}>Posts</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "Qualifications" && styles.activeTab]}
                    onPress={() => setSelectedTab("Qualifications")}
                    activeOpacity={0.8}
                >
                    <ThemedText style={[styles.tabText, selectedTab === "Qualifications" && styles.activeTabText]}>Qualifications</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* Tab Content */}
            <ThemedView style={styles.tabContent}>
                {selectedTab === "Posts" ? (
                    <FeedScreen />
                ) : (
                    <Qualifications />
                )}
            </ThemedView>
            <DocDrawerMenu isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />
        </ThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        gap: '80%',
        marginBottom: 20,
        marginTop: 30,
        paddingVertical: 20,
        position: "absolute",
        backgroundColor: "transparent",
    },
    coverPhoto: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: 200,
            },
            android: {
                height: 200,
            }
        }),
        position: "relative",
    },
    coverImage: {
        width: "100%",
        height: "100%",
    },
    imageBorder: {
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        borderRadius: 40,
    },
    profileContainer: {
        position: "absolute",
        // justifyContent: "center",
        top: 150,
        alignItems: "center",
        padding: 5,
        borderRadius: 65,
        backgroundColor: "transparent",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#fff",
    },
    name: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#043380',
        marginTop: 50,
    },
    profession: {
        fontSize: 14,
        color: "#043380",
        fontFamily: 'OpenSans_400Regular',
        marginTop: 3,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginTop: 10,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#043380',
    },
    statLabel: {
        fontSize: 14,
        color: "#043380",
        fontFamily: 'OpenSans_400Regular',
    },
    bio: {
        textAlign: "center",
        paddingHorizontal: 25,
        marginTop: 10,
        fontSize: 14,
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        lineHeight: 24,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#CEE0FF",
        borderRadius: 30,
        marginTop: 15,
        width: "80%",
        padding: 5,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#fff",
    },
    tabText: {
        fontSize: 16,
        color: "#032255",
        fontFamily: 'OpenSans_600SemiBold',
    },
    activeTabText: {
        color: "#032255",
        fontSize: 16,
        fontFamily: 'OpenSans_600SemiBold',
    },
    tabContent: {
        marginTop: 10,
        width: '100%',
    },
});

export default DocsMainProfile;

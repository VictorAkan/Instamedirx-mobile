import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import QualificationsComponent from "@/components/docs_profile/profile_qualifications";
import PostsComponent from "@/components/docs_profile/profile_posts";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AppBtn } from "@/components/AppButton";
import { useRouter } from "expo-router";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Qualification");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>

        {/* Profile section */}
        <View style={styles.profileContainer}>
          <View style={styles.profileBg}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../../../assets/images/doctorbg.png")} // Replace with your image path
                style={styles.profileImage}
              />
            </View>
          </View>

          <ThemedText style={styles.name}>Dr. Chisom Okoli</ThemedText>
          <ThemedText style={styles.title}>Gynaecologist</ThemedText>

          <ThemedText style={styles.discipline}>
            Discipline | Family planning, Menstrual disorder, Reproductive
            health
          </ThemedText>

          <ThemedView style={styles.reviewContainer}>
            <ThemedText style={styles.rating}>4.5</ThemedText>
            <MaterialIcons
              name="star-border-purple500"
              size={18}
              color="#EEE600"
            />
            <ThemedText style={styles.reviews}>(120 reviews)</ThemedText>
          </ThemedView>

          {/* <TouchableOpacity activeOpacity={0.8} style={styles.consultButton}>
                    <ThemedText style={styles.consultButtonText}>Book Consultation</ThemedText>
                    <Ionicons name="arrow-forward-circle" size={20} color="white" />
                </TouchableOpacity> */}
          <ThemedView style={{ marginTop: 25 }}>
            <AppBtn route="" value="Book Consultation" />
          </ThemedView>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tab,
                activeTab === "Qualification" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("Qualification")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Qualification" && styles.activeTabText,
                ]}
              >
                Qualifications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.tab, activeTab === "Posts" && styles.activeTab]}
              onPress={() => setActiveTab("Posts")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Posts" && styles.activeTabText,
                ]}
              >
                Posts
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on selected tab */}
        <ThemedView style={styles.tabContent}>
          {activeTab === "Qualification" ? (
            <QualificationsComponent />
          ) : (
            <PostsComponent />
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0866FF",
    height: 180,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    // width: 40,
    // height: 40,
    // borderRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  profileBg: {
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 90,
    // padding: 1
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -90,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // marginTop: 40,
  },
  profileImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#0866FF",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    marginTop: 10,
    color: "#043380",
  },
  title: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    marginTop: 2,
  },
  discipline: {
    fontSize: 16,
    color: "#043380CC",
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
    marginTop: 10,
    // marginHorizontal: 5,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    marginRight: 4,
  },
  reviews: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    marginLeft: 4,
  },
  consultButton: {
    backgroundColor: "#0072FF",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  consultButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f1faff",
    borderRadius: 15,
    marginTop: 40,
    width: "80%",
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  tabText: {
    fontSize: 16,
    color: "#04338099",
    fontFamily: "OpenSans_400Regular",
  },
  activeTabText: {
    color: "#043380",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  tabContent: {
    marginTop: 20,
    width: "100%",
  },
});

export default ProfilePage;

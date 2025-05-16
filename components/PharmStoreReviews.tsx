import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter, Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const averageRating = 4.5;
const ratingsCount = 120;
const ratingsBreakdown = [80, 25, 8, 4, 3]; // 5-star to 1-star counts

const maxBarWidth = 180;

const reviews = [
  {
    id: 1,
    rating: 4.5,
    title: "“On-time delivery”",
    description:
      "PharmC has a vast range of specialist prescription medicines which require a physician's prescription.",
    author: "Anonymous",
    date: "11/12/2024",
  },
  {
    id: 2,
    rating: 4.5,
    title: "“Easy Prescription Filling”",
    description:
      "PharmC has a vast range of specialist prescription medicines which require a physician's prescription.",
    author: "Anonymous",
    date: "11/12/2024",
  },
  {
    id: 3,
    rating: 4.5,
    title: "“Store was easy to find”",
    description:
      "PharmC has a vast range of specialist prescription medicines which require a physician's prescription.",
    author: "Anonymous",
    date: "11/12/2024",
  },
];

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <MaterialIcons
          key={i}
          name="star-border-purple500"
          size={18}
          color="#EEE600"
        />
      );
    } else {
      stars.push(
        <MaterialIcons key={i} name="star-border" size={18} color="#D6D6D6" />
      );
    }
  }
  return stars;
};

const PharmStoreReviews = () => {
  const [selectedHMO, setSelectedHMO] = useState("");
  const maxCount = Math.max(...ratingsBreakdown);
  const router = useRouter();

  const ReviewCard = ({ item }: { item: (typeof reviews)[0] }) => (
    <ThemedView style={styles.reviewCard}>
      <ThemedView style={styles.reviewerRow}>
        <ThemedView style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}>
        <ThemedView style={styles.iconCircle}>
          <FontAwesome name="user-o" size={20} color="#003366" />
        </ThemedView>
        <ThemedText style={styles.anonymous}>Anonymous</ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
          }}
        >
          {/* <ThemedText style={styles.anonymous}>Anonymous</ThemedText> */}
          <ThemedText style={styles.date}>{item.date}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedText style={styles.reviewTitle}>{item.title}</ThemedText>
      <ThemedView style={styles.ratingRow}>
        {renderStars(item.rating)}
        <ThemedText style={styles.ratingNumber}>{item.rating}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.reviewDescription}>
        {item.description}
      </ThemedText>
    </ThemedView>
  );

  return (
    // <SafeAreaView style={styles.container}>
    <View>
      {/* Average Rating */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View>
          <Text style={styles.avgRating}>{averageRating.toFixed(1)}</Text>
          {/* Stars */}
          {/* <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <MaterialIcons
            key={i}
            name="star"
            size={24}
            color={i <= Math.round(averageRating) ? '#FFD700' : '#E0E0E0'}
            style={styles.topStar}
          />
        ))}
      </View> */}
          <ThemedView style={styles.ratingRow}>
            <ThemedText style={styles.ratingNumber}>4.5</ThemedText>
            {renderStars(4.5)}
          </ThemedView>
          {/* Average and count */}
          <Text style={styles.ratingText}>
            <Text style={styles.countText}>{ratingsCount} ratings</Text>
          </Text>
        </View>
        {/* Breakdown */}
        <View style={styles.breakdownContainer}>
          {[5, 4, 3, 2, 1].map((star, idx) => {
            const count = ratingsBreakdown[idx];
            const barWidth = (count / maxCount) * maxBarWidth;
            return (
              <View style={styles.breakdownRow} key={star}>
                <Text style={styles.breakdownStar}>{star}</Text>
                <MaterialIcons
                  name="star-border-purple500"
                  size={12}
                  color="#FFCB45"
                />
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: barWidth }]} />
                </View>
                {/* Optionally, show count */}
                {/* <Text style={styles.breakdownCount}>{count}</Text> */}
              </View>
            );
          })}
        </View>
      </View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ReviewCard item={item} />}
        scrollEnabled={false}
      />
    </View>
    // </SafeAreaView>
  );
};

export default PharmStoreReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  avgRating: {
    fontSize: 64,
    fontFamily: "OpenSans_700Bold",
    color: "#032255",
    marginBottom: 4,
    marginTop: 8,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  topStar: {
    marginHorizontal: 1,
  },
  ratingText: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 14,
    // marginTop: 2,
  },
  starSmall: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
  countText: {
    color: "#043380CC",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  breakdownContainer: {
    width: "100%",
    marginTop: 4,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    marginLeft: 8,
  },
  breakdownStar: {
    width: 16,
    fontSize: 16,
    color: "#043380",
    marginRight: 1,
    fontFamily: "OpenSans_700Bold",
  },
  barBg: {
    height: 8,
    width: maxBarWidth,
    backgroundColor: "#F1FAFF",
    borderRadius: 5,
    marginLeft: 6,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: "#0544AA",
    borderRadius: 5,
  },
  breakdownCount: {
    marginLeft: 6,
    fontSize: 12,
    color: "#757575",
  },
  statusText: {
    color: "#0866FF",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rating: {
    fontSize: 16,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
  },
  star: {
    color: "#fbc02d",
    fontWeight: "bold",
  },

  reviewCard: {
    // backgroundColor: '#f5fbff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    // borderColor: '#e6f3ff',
    // borderWidth: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingNumber: {
    marginLeft: 8,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  reviewTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#043380",
    marginBottom: 8,
  },
  reviewDescription: {
    fontSize: 14,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
    marginBottom: 16,
    width: "95%",
  },
  reviewerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewView: {
    backgroundColor: "#F1FAFF",
    padding: 10,
    borderRadius: 10,
  },

  iconCircle: {
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 50,
    // width: 36,
    // height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    padding: 12,
    paddingHorizontal: 14,
    // marginLeft: 24,
    // alignSelf: 'center',
  },
  anonymous: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: "#043380",
    textAlign: "center",
    marginLeft: 10,
  },
  date: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: "#043380CC",
    textAlign: "center",
  },
});

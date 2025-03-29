import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    image: string;
}

const reviews: Review[] = [
    {
        id: "1",
        name: "Susan",
        rating: 5,
        comment: "Dr Sandra is good at what she does",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: "2",
        name: "Tobi",
        rating: 5,
        comment: "Dr Sandra is good at what she does",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
    },
];

export const RatingComponent = () => {
    return (
        <ThemedView style={styles.container}>
            {/* Overall Rating */}
            <ThemedView style={styles.overallRatingContainer}>
                <ThemedText style={styles.ratingNumber}>4.5</ThemedText>
                <AirbnbRating
                    defaultRating={5}
                    size={20}
                    showRating={false}
                    isDisabled
                />
            </ThemedView>

            {/* Rating Bar */}
            <ThemedView style={styles.ratingBarContainer}>
                {[5, 4, 3, 2, 1].map((star) => (
                    <ThemedView key={star} style={styles.ratingRow}>
                        <ThemedView style={styles.starRow}>
                            {[...Array(star)].map((_, i) => (
                                <ThemedText key={i} style={styles.star}>★</ThemedText>
                            ))}
                        </ThemedView>
                        <ThemedView style={styles.progressBar}>
                            <ThemedView
                                style={{
                                    width: `${star * 20}%`,
                                    backgroundColor: "#0866FF",
                                    height: "100%",
                                    borderRadius: 5,
                                }}
                            />
                        </ThemedView>
                    </ThemedView>
                ))}
            </ThemedView>

            {/* Reviews */}
            <ThemedView style={{ flex: 1 }}>
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <ThemedView>
                            <ThemedView style={styles.reviewCard}>
                                <Image source={{ uri: item.image }} style={styles.avatar} />
                                <ThemedView style={styles.reviewText}>
                                    <ThemedText style={styles.reviewerName}>{item.name}</ThemedText>
                                    <AirbnbRating
                                        defaultRating={item.rating}
                                        size={15}
                                        showRating={false}
                                        isDisabled
                                    />
                                </ThemedView>
                            </ThemedView>
                            <ThemedText style={styles.comment}>{item.comment}</ThemedText>
                        </ThemedView>
                    )}
                />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    overallRatingContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    ratingNumber: {
        fontSize: 70,
        fontFamily: "OpenSans_700Bold",
        paddingTop: 50,
    },
    ratingBarContainer: {
        marginTop: 10,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
        justifyContent: 'space-between',
        gap: 90,
        height: 15,
    },
    starRow: {
        flexDirection: "row",
        width: 50,
    },
    star: {
        color: "gold",
        fontSize: 27,
    },
    progressBar: {
        flex: 1,
        height: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 50,
    },
    reviewCard: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewText: {
        flex: 1,
        alignItems: "flex-start",
    },
    reviewerName: {
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
    },
    comment: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
});

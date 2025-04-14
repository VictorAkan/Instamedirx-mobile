import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, Animated } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FontAwesome, AntDesign, MaterialCommunityIcons, Fontisto, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const videos = [
    { id: '1', source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', name: "Sandra Davis" },
    { id: '2', source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', name: "Victor Uche" },
    { id: '3', source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', name: "Fred Olusegun" },
    { id: '4', source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', name: "Mark Gibson" },
];

interface Player {
    play: () => void;
    pause: () => void;
}

export default function ReelsScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [userVerified, setUserVerified] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = useState(0);
    const playerRefs = useRef<{ [key: number]: Player }>({});

    const router = useRouter();

    // Create video players outside of renderItem
    const videoPlayers = videos.map((video, index) =>
        useVideoPlayer(video.source, (player) => {
            player.timeUpdateEventInterval = 1;
            if (index === currentIndex) player.play();
        })
    );

    useEffect(() => {
        const player = videoPlayers[currentIndex];
        const updateProgress = (payload: any) => {
            const duration = player.duration ? player.duration : payload.duration;

            if (!duration) return;

            const progress = payload.currentTime / duration;
            setProgress(progress);
        };

        const subscription = player.addListener('timeUpdate', updateProgress);
        return () => {
            subscription.remove();
        };
    }, [currentIndex]);

    const handlePlayPause = () => {
        const player = videoPlayers[currentIndex];
        if (isPlaying) {
            playerRefs.current[currentIndex]?.pause();
        } else {
            playerRefs.current[currentIndex]?.play();
        }
        setIsPlaying(!isPlaying);
        setShowControls(true);
    };

    const handleTap = () => {
        setShowControls(false);
        setTimeout(() => setShowControls(!showControls), 3000);
    };

    const renderItem = ({ item, index }: any) => {
        const player = videoPlayers[index]; // Get the pre-initialized video player

        playerRefs.current[index] = player; // Store it in refs

        return (
            <TouchableOpacity style={styles.container} onPress={handleTap}>
                <VideoView player={player} style={styles.video} contentFit='cover' allowsFullscreen allowsPictureInPicture nativeControls={false} />
                <View style={styles.headerView}>
                    <View>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.rightView}>
                        <MaterialIcons name="search" size={24} color="#6389c8" />
                        <Image source={require("../../../../assets/images/addvid.png")} />
                    </View>
                </View>
                {showControls && (
                    <TouchableOpacity style={styles.overlay} onPress={handlePlayPause}>
                        <ThemedView style={styles.playView}>
                            <FontAwesome name={isPlaying ? "pause" : "play"} size={25} color="blue" />
                        </ThemedView>
                    </TouchableOpacity>
                )}
                {showControls && (
                    <View style={styles.sidebar}>
                        <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="like2" size={28} color="white" />
                            <Text style={styles.iconText}>12.1k</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome6 name="comment-alt" size={28} color="white" />
                            <Text style={styles.iconText}>12.1k</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Fontisto name="share-a" size={24} color="white" />
                            <Text style={styles.iconText}>12.1k</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.bottomBar}>
                    <View style={styles.topView}>
                        <Text style={styles.username}>Dr. {item.name}</Text>
                        {userVerified && <Image source={require("../../../../assets/images/checkmark.png")} />}
                        <TouchableOpacity style={styles.followBtn} activeOpacity={0.8}>
                            <Text style={styles.followTxt}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subView}>
                        <Text style={styles.caption}>Your health is your wealth!💙 Prioritize check-ups,...<Text style={styles.capEx}>More</Text></Text>
                    </View>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: progress * 100 }]} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            pagingEnabled
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / height);
                setCurrentIndex(index);
                videoPlayers.forEach((player, i) => {
                    if (i === index) player.play();
                    else player.pause();
                });
                setIsPlaying(true);
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: { width, height: height, backgroundColor: 'black', alignItems: 'center', },
    video: { width, height },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 40,
        paddingVertical: 20,
        position: "absolute",
        marginHorizontal: 20,
        justifyContent: "space-between",
        gap: '75%',
    },
    rightView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    overlay: { position: 'absolute', width, height, justifyContent: 'center', alignItems: 'center' },
    sidebar: { position: 'absolute', right: 20, bottom: 100, alignItems: 'center', gap: 25 },
    iconText: { color: 'white', fontSize: 16, fontFamily: 'OpenSans_600SemiBold', marginTop: 5, textAlign: 'center' },
    bottomBar: { position: 'absolute', bottom: 20, left: 20 },
    username: { color: 'white', fontFamily: 'OpenSans_700Bold', fontSize: 16 },
    caption: { color: 'white', fontSize: 16, fontFamily: 'OpenSans_600SemiBold', },
    followButton: { backgroundColor: 'blue', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginTop: 5 },
    followText: { color: 'white', fontWeight: 'bold' },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    followBtn: {
        backgroundColor: '#F1FAFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    followTxt: {
        color: '#0866FF',
        fontSize: 13,
        fontFamily: 'Inter_500Medium',
    },
    subView: {
        marginTop: 20,
        marginBottom: 20,
    },
    playView: {
        backgroundColor: '#F1FAFF',
        padding: 15,
        borderRadius: 40,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    capEx: {
        fontFamily: 'OpenSans_600SemiBold_Italic',
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 0,
        // left: 10,
        width: "100%",
        height: 5,
        backgroundColor: '#ddeaff',
        // borderRadius: 5,
    },
    progressBar: {
        height: 5,
        backgroundColor: '#0866FF',
        // borderRadius: 5,
    },
});

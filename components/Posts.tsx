import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { AntDesign, FontAwesome, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const posts = [
    {
        id: '1',
        type: 'photo',
        user: 'Dr. Sandra Davis',
        profession: 'Gynecologist',
        image: require("../assets/images/postimg.png"),
        likes: '12.1k',
        comments: '6.5k',
        shares: '2.5k',
        views: '40.2k',
    },
    {
        id: '2',
        type: 'video',
        user: 'Dr. Sandra Davis',
        profession: 'Gynecologist',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        likes: '8.9k',
        comments: '3.2k',
        shares: '1.1k',
        views: '28.9k',
    },
    {
        id: '3',
        type: 'photo',
        user: 'Dr. Sandra Davis',
        profession: 'Gynecologist',
        image: require("../assets/images/postimg.png"),
        likes: '12.1k',
        comments: '6.5k',
        shares: '2.5k',
        views: '40.2k',
    },
];

const Post = ({ item }: any) => {
    const [muted, setMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [userVerified, setUserVerified] = useState(true);
    const player = useVideoPlayer(item.video, player => player.play());

    const handlePlayPause = () => {
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <ThemedView style={styles.postContainer}>

            {item.type === 'photo' && (
                <Image source={item.image} style={styles.media} />
            )}
            {item.type === 'video' && (
                <ThemedView>
                    <VideoView style={styles.media} player={player} allowsFullscreen contentFit='cover' nativeControls={false} />
                    <TouchableOpacity style={styles.volumeIcon} onPress={() => setMuted(!muted)} activeOpacity={0.8}>
                        <MaterialIcons name={muted ? 'volume-off' : 'volume-up'} size={24} color='#043380' />
                    </TouchableOpacity>
                </ThemedView>
            )}

            <ThemedView style={styles.header}>
                <Image source={require("../assets/images/docprofile.png")} style={styles.avatar} />
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <ThemedText style={styles.userName}>{item.user}</ThemedText>
                        {userVerified && <Image source={require("../assets/images/checkmark.png")} />}
                    </View>
                    <ThemedText style={styles.profession}>{item.profession}</ThemedText>
                </View>
            </ThemedView>

            {item.type === 'video' && (
                <TouchableOpacity style={styles.overlay} onPress={handlePlayPause}>
                    <ThemedView style={styles.playView}>
                        <FontAwesome name={isPlaying ? "pause" : "play"} size={25} color="blue" />
                    </ThemedView>
                </TouchableOpacity>
            )}

            <ThemedView style={styles.actionView}>
                <ThemedView style={styles.actionRow}>
                    <TouchableOpacity style={styles.reactionBtn} activeOpacity={0.8}><AntDesign name="like2" size={24} color="#043380" /><ThemedText style={styles.statTxt}>{item.likes}</ThemedText></TouchableOpacity>
                    <TouchableOpacity style={styles.reactionBtn} activeOpacity={0.8}><FontAwesome6 name="comment-alt" size={24} color="#043380" /><ThemedText style={styles.statTxt}>{item.comments}</ThemedText></TouchableOpacity>
                    <TouchableOpacity style={styles.reactionBtn} activeOpacity={0.8}><Fontisto name="share-a" size={24} color="#043380" /><ThemedText style={styles.statTxt}>{item.shares}</ThemedText></TouchableOpacity>
                </ThemedView>
                <ThemedView style={styles.statsRow}>
                    <ThemedText style={styles.viewTxt}>{item.views} views</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

export default function FeedScreen() {
    return (
        <FlatList
            data={posts}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Post item={item} />}
        />
    );
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff',
        marginBottom: 10,
        // padding: 10,
        borderRadius: 8,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        paddingTop: 20,
    },
    overlay: { position: 'absolute', justifyContent: 'center', alignItems: 'center', left: 175, top: 230 },
    playView: {
        backgroundColor: '#F1FAFF',
        padding: 15,
        borderRadius: 40,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 12,
        fontFamily: 'OpenSans_700Bold',
        color: '#043380',
    },
    profession: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 11,
    },
    media: {
        // width: '100%',
        height: 500,
        marginTop: 10,
        position: 'relative',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        gap: 60,
    },
    actionView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    reactionBtn: {
        alignItems: 'center',
    },
    statTxt: {
        color: '#043380',
        fontSize: 15,
        fontFamily: 'OpenSans_600SemiBold',
        textAlign: 'center',
    },
    viewTxt: {
        color: '#043380',
        fontSize: 15,
        fontFamily: 'OpenSans_600SemiBold',
    },
    volumeIcon: {
        position: 'absolute',
        // top: 10,
        right: 10,
        bottom: 10,
        padding: 5,
    },
});

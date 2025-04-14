import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Modal, ImageBackground } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

const data = [
    {
        id: '1',
        title: '7 reasons why you should eat dates',
        image: require('../../assets/images/post1.jpeg'),
    },
    {
        id: '2',
        title: 'Health benefits of eating fruits regularly',
        image: require('../../assets/images/post2.jpeg'),
    },
    {
        id: '3',
        title: 'Do these to increase your sexual drive!',
        image: require('../../assets/images/post3.jpeg'),
    },
    {
        id: '4',
        title: 'Do these to increase your sexual drive!',
        image: require('../../assets/images/post3.jpeg'),
    },
    {
        id: '5',
        title: 'Do these to increase your sexual drive!',
        image: require('../../assets/images/post3.jpeg'),
    },
];

const PostsComponent = () => {
    // Sample data for posts
    const posts = [
        {
            id: '1',
            title: '7 reasons why you should eat dates',
            //   thumbnail: require('./assets/dates.jpg'), // Replace with actual image path
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
            id: '2',
            title: 'Health benefits of eating fruits regularly',
            //   thumbnail: require('./assets/fruits.jpg'), // Replace with actual image path
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        },
        {
            id: '3',
            title: 'Do these to increase your sexual drive!',
            //   thumbnail: require('./assets/health1.jpg'), // Replace with actual image path
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        },
        {
            id: '4',
            title: 'Do these to increase your sexual drive!',
            //   thumbnail: require('./assets/health2.jpg'), // Replace with actual image path
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        },
        {
            id: '5',
            title: 'Do these to increase your sexual drive!',
            //   thumbnail: require('./assets/health3.jpg'), // Replace with actual image path
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        },
    ];

    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
    const [fullScreenMode, setFullScreenMode] = useState(false);
    const [followed, setFollowed] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(null);

    const openModal = (item: any) => {
        setActiveItem(item);
        setModalVisible(true);
    };

    // const renderPostItem = ({ item, index }: any) => (
    //     <TouchableOpacity
    //         style={[styles.postItem, {
    //             width: COLUMN_WIDTH
    //         }]}
    //         onPress={() => {
    //             setSelectedVideoIndex(index);
    //             setFullScreenMode(true);
    //         }}
    //     >
    //         <Image source={item.thumbnail} style={styles.thumbnail} />
    //         <ThemedView style={styles.playIconContainer}>
    //             <Ionicons name="play" size={24} color="white" />
    //         </ThemedView>
    //         <ThemedText style={styles.postTitle} numberOfLines={2}>{item.title}</ThemedText>
    //     </TouchableOpacity>
    // );

    // Full screen video player component
    // const FullScreenVideoPlayer = () => {
    //     const renderVideoItem = ({ item }: any) => {
    //         const player = useVideoPlayer(item.videoUrl, (player) => {
    //             player.play();
    //         });

    //         return (
    //             <ThemedView style={styles.fullScreenVideoItem}>
    //                 <VideoView
    //                     player={player}
    //                     style={styles.fullScreenVideo}
    //                     allowsFullscreen
    //                 />
    //             </ThemedView>
    //         );
    //     };

    //     return (
    //         <ThemedView style={styles.fullScreenContainer}>
    //             <TouchableOpacity
    //                 style={styles.closeButton}
    //                 onPress={() => setFullScreenMode(false)}
    //             >
    //                 <Ionicons name="close" size={30} color="white" />
    //             </TouchableOpacity>

    //             <FlatList
    //                 data={posts}
    //                 renderItem={renderVideoItem}
    //                 keyExtractor={item => item.id}
    //                 initialScrollIndex={selectedVideoIndex}
    //                 pagingEnabled
    //                 showsVerticalScrollIndicator={false}
    //                 getItemLayout={(data, index) => ({
    //                     length: windowHeight,
    //                     offset: windowHeight * index,
    //                     index,
    //                 })}
    //             />
    //         </ThemedView>
    //     );
    // };

    // if (fullScreenMode && selectedVideoIndex !== null) {
    //     return <FullScreenVideoPlayer />;
    // }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.infoContainer}>
                <ThemedText style={styles.infoText}>
                    Hello, I share health tips and preventive care advice. Follow to receive notifications.
                </ThemedText>
                <TouchableOpacity onPress={() => setFollowed(!followed)} activeOpacity={0.7} style={styles.followButton}>
                    <ThemedText style={styles.followText}>
                        {followed === false ? "Follow" : "Followed"}
                    </ThemedText>
                    {followed === false ? <AntDesign name="pluscircleo" size={16} color="#C6C000" /> : <Ionicons name="checkmark-circle" size={18} color="#C6C000" />}
                </TouchableOpacity>
            </ThemedView>

            <View style={styles.grid}>
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => openModal(item)}
                        style={styles.itemContainer}
                        activeOpacity={0.6}
                    >
                        <ImageBackground
                            source={item.image}
                            style={styles.image}
                            imageStyle={{ resizeMode: 'cover' }}
                        >
                            <View style={styles.overlay}>
                                <Text style={styles.title}>{item.title}</Text>
                                <MaterialCommunityIcons name="send-outline" size={24} color="white" />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Fullscreen Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={false}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{activeItem?.title}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        // backgroundColor: '#f8f9fa',
        padding: 15,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 5,
    },
    followButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    followText: {
        color: '#C6C000',
        fontWeight: 'bold',
        marginRight: 5,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        padding: 5,
    },
    postItem: {
        // width: COLUMN_WIDTH,
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    playIconContainer: {
        position: 'absolute',
        right: 10,
        bottom: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postTitle: {
        fontSize: 12,
        padding: 8,
        color: '#333',
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenVideoItem: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenVideo: {
        width: '100%',
        height: '100%',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: 0.1
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: 190,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 6,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontFamily: 'OpenSans_700Bold',
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 10,
    },
    playIcon: {
        fontSize: 24,
        color: '#fff',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeBtn: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    },
    closeText: {
        fontSize: 16,
        color: '#000',
    },
});

export default PostsComponent;

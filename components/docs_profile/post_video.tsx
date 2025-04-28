import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
  ViewToken,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import OptionDrawer from "@/components/VideoOptionDrawer";

import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const reelHeight = height - 75;

interface VideoPost {
  id: string;
  title: string;
  user: {
    name: string;
    profileImage: string;
  };
  likes: number;
  comments: number;
  shares: number;
  postedTime: string;
  videoUrl: string;
}

interface VideoProps {
  videoPosts: VideoPost[];
  closeModal: () => void;
}

function ReelItem({ item, isActive, closeModal }: any) {
  const [muted, setMuted] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const router = useRouter();
  // Create a player for each video
  const player = useVideoPlayer(item.videoUrl, (player) => {
    player.loop = true;
    player.muted = muted;
    if (isActive) player.play();
    else player.pause();
  });

  // Listen to play/pause state
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // Pause/play on tap
  const togglePlay = () => {
    if (isPlaying) player.pause();
    else player.play();
  };

  const toggleMute = () => {
    setMuted((prev) => {
      const newMuted = !prev;
      player.muted = newMuted;
      return newMuted;
    });
  };

  // Pause if not active
  React.useEffect(() => {
    if (isActive) player.play();
    else player.pause();
  }, [isActive]);

  return (
    <View style={styles.reelContainer}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
      />
      <TouchableOpacity
        style={styles.touchableOverlay}
        activeOpacity={1}
        onPress={togglePlay}
      >
        {!isPlaying && (
          <View style={styles.pauseButton}>
            <Ionicons name="pause" size={28} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftView}>
          <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

          <Text style={styles.description}>{item.title}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
        >
          <Feather name="bookmark" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Bottom controls */}
      <View style={styles.controls}>
        <View style={styles.leftControls}>
          <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={28}
              color="#fff"
            />
            <Text style={styles.controlText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
            <Ionicons name="chatbubble-outline" size={28} color="#fff" />
            <Text style={styles.controlText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
            <Ionicons name="arrow-redo" size={28} color="#fff" />
            <Text style={styles.controlText}>{item.shares}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightControls}>
          <Text style={styles.timeText}>{item.postedTime}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setDrawerVisible(true)}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <OptionDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSelectCaption={() => {
          /* show caption picker */
        }}
        onSelectQuality={() => {
          /* show quality picker */
        }}
        onReport={() => {
          /* handle report */
        }}
      />
    </View>
  );
}

const PostReels: React.FC<VideoProps> = ({ videoPosts, closeModal }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index!);
      }
    }
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videoPosts}
        renderItem={({ item, index }: ListRenderItemInfo<VideoPost>) => (
          <ReelItem
            item={item}
            closeModal={closeModal}
            isActive={index === activeIndex}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={reelHeight}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  reelContainer: { width, height: reelHeight, backgroundColor: "#000" },
  video: { position: "absolute", width, height: reelHeight },
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  profilePic: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  username: { color: "#fff", fontFamily: "OpenSans_700Bold", fontSize: 16 },
  descriptionContainer: { position: "absolute", top: 40, left: 16, right: 100 },
  description: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    // marginTop: 10,
  },
  controls: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leftControls: { flexDirection: "row", alignItems: "center" },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  controlText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
  },
  rightControls: { flexDirection: "row", alignItems: "center" },
  timeText: {
    color: "#fff",
    marginRight: 16,
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
  },
});

export default PostReels;

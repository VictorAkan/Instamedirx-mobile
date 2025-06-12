import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function App() {
  const [volumeOn, setVolumeOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.doctorName}>Dr Chisom Okoli</Text>
          <Text style={styles.callDuration}>01:44:09</Text>
        </View>

        <TouchableOpacity style={styles.participantsButton}>
          <Image
            style={{
              width: 24,
              height: 16,
            }}
            source={require("../../../../assets/images/group_add.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Main Video Area */}
      <View style={styles.videoContainer}>
        <Image
          source={require("../../../../assets/images/docbg.jpeg")}
          style={styles.doctorVideo}
          resizeMode="cover"
        />
      </View>

      {/* Call Controls */}
      <View style={styles.controlsContainer}>
        <BlurView intensity={15} style={styles.controls}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientOverlay}
          >
            <TouchableOpacity
              style={[styles.controlButton, styles.endCallButton]}
              activeOpacity={0.7}
              onPress={() => {
                router.back();
                router.back();
              }}
            >
              {/* <Video color="#FFFFFF" size={24} /> */}
              <Image style={{
                width: 24,
                height: 8.86
              }} source={require("../../../../assets/images/call_end.png")} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVolumeOn(!volumeOn)}
              style={styles.controlButton}
              activeOpacity={0.7}
            >
              {volumeOn ? (
                <MaterialIcons
                  name="volume-up"
                  size={24}
                  color={volumeOn ? "#043380" : "#04338099"}
                />
              ) : (
                <MaterialIcons
                  name="volume-off"
                  size={24}
                  color={volumeOn ? "#043380" : "#04338099"}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVideoOn(!videoOn)}
              style={styles.controlButton}
              activeOpacity={0.7}
            >
              {videoOn ? (
                <Video color={videoOn ? "#043380" : "#04338099"} size={24} />
              ) : (
                <VideoOff color={videoOn ? "#043380" : "#04338099"} size={24} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAudioOn(!audioOn)}
              style={styles.controlButton}
              activeOpacity={0.7}
            >
              {audioOn ? (
                <Mic color={audioOn ? "#043380" : "#04338099"} size={24} />
              ) : (
                <MicOff color={audioOn ? "#043380" : "#04338099"} size={24} />
              )}
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 70,
    // paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: "center",
  },
  doctorName: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    marginBottom: 4,
  },
  callDuration: {
    fontSize: 14,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
  },
  participantsButton: {
    padding: 8,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  doctorVideo: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    backgroundColor: "#0544AA",
    paddingVertical: 40,
  },
  controls: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF33",
  },
  gradientOverlay: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    gap: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 1000,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  endCallButton: {
    backgroundColor: "#fff",
  },
});

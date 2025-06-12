import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { VideoOff, MicOff, Video, Mic, Expand } from "lucide-react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [volumeOn, setVolumeOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.doctorName}>Dr Chisom Okoli</Text>
          <Text style={styles.callDuration}>01:44:09</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* Main screen sharing area */}
      <View style={styles.screenSharingContainer}>
        <View style={styles.screenSharingContent}>
          <Text style={styles.screenSharingText}>
            You're sharing your screen
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.stopSharingButton}
          >
            <Text style={styles.stopSharingText}>Stop Sharing</Text>
          </TouchableOpacity>
        </View>

        {/* Maximize icon in bottom right */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.maximizeButton}
        >
          <Expand color="#043380" size={20} />
        </TouchableOpacity>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={10}
          style={styles.controls}
        >
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
              <Image
                style={{
                  width: 24,
                  height: 8.86,
                }}
                source={require("../../../../assets/images/call_end.png")}
              />
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

            <TouchableOpacity
              style={styles.controlButton}
              activeOpacity={0.7}
              onPress={() =>
                router.push("/Clients_world/call_screens/share_screen")
              }
            >
              <Image
                style={{
                  width: 20,
                  height: 18,
                }}
                source={require("../../../../assets/images/switchcamera.png")}
              />
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
    backgroundColor: "#474747",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: "#474747",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  doctorName: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  callDuration: {
    fontSize: 14,
    color: "#F1FAFF",
    fontFamily: "OpenSans_400Regular",
  },
  screenSharingContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#F1FAFF",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  screenSharingContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  screenSharingText: {
    fontSize: 16,
    color: "#043380",
    marginBottom: 15,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  stopSharingButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 15,
  },
  stopSharingText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#F1FAFF",
  },
  maximizeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: "#474747",
    gap: 16,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: "#474747",
  },
  controls: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    marginHorizontal: 16,
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

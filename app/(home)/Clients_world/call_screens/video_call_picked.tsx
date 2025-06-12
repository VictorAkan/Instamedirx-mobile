import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  VideoOff,
  MicOff,
  Video,
  Mic,
  MessagesSquare,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [volumeOn, setVolumeOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Main doctor video background */}
      <Image
        source={{
          uri: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
        }}
        style={styles.backgroundVideo}
        resizeMode="cover"
      />

      {/* Top header with gradient overlay */}
      {/* <LinearGradient
        colors={['rgba(0, 0, 0, 0.4)', 'transparent']}
        style={styles.topGradient}
      > */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => {
            router.back();
            router.back();
          }}
          activeOpacity={0.7}
          style={styles.headerButton}
        >
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.doctorName}>Dr Chisom Okoli</Text>
          <Text style={styles.callDuration}>01:44:09</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.headerButton, styles.rightTopButton]}
            onPress={() => router.push("/Clients_world/call_screens/add_to_call")}
          >
            <Image
              style={{
                width: 24,
                height: 16,
              }}
              tintColor={"#04338099"}
              source={require("../../../../assets/images/group_add.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.headerButton, styles.rightTopButton]}
          >
            <MessagesSquare color="#04338099" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {/* </LinearGradient> */}

      {/* Small patient video in bottom right */}
      <View style={styles.patientVideoContainer}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
          }}
          style={styles.patientVideo}
          resizeMode="cover"
        />
      </View>

      {/* Bottom controls with gradient overlay */}
      <View style={styles.controlsContainer}>
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={20}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width,
    // height: height,
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 10,
  },
  topHeader: {
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: "center",
    justifyContent: "center",
  },
  rightTopButton: {
    backgroundColor: "#fff",
  },
  headerCenter: {
    alignItems: "center",
  },
  doctorName: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    marginBottom: 2,
  },
  callDuration: {
    fontSize: 14,
    color: "#043380CC",
    fontFamily: "OpenSans_400Regular",
  },
  headerRight: {
    // flexDirection: 'row',
    gap: 10,
    marginTop: 60,
  },
  patientVideoContainer: {
    position: "absolute",
    bottom: 140,
    right: 24,
    width: 144,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1A202C",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  patientVideo: {
    width: "100%",
    height: "100%",
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 10,
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 24,
    gap: 24,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
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

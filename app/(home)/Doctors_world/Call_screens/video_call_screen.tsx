// import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const VideoCallScreen = () => {
    const [volumeButton, setVolumeButton] = useState(false);
    const [micButton, setMicButton] = useState(false);
    const router = useRouter();

    const changeVolumeIcon = () => {
        setVolumeButton(!volumeButton);
    }

    const changeMicIcon = () => {
        setMicButton(!micButton);
    }
    return (
        <View style={styles.container}>
            {/* Main Video */}
            <Image
                source={require("../../../../assets/images/person-called.png")} // Replace with actual image
                style={styles.mainVideo}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.callerName}>John Mark</Text>
                    <Text style={styles.callTimer}>00:01</Text>
                </View>
                <TouchableOpacity activeOpacity={0.9}>
                    <Ionicons name="ellipsis-vertical" size={22} color="#043380" />
                </TouchableOpacity>
            </View>

            {/* Floating Video Thumbnail */}
            <View style={styles.floatingVideoContainer}>
                <Image
                    source={require("../../../../assets/images/person-calling.png")} // Replace with actual image
                    style={styles.floatingVideo}
                />
                <TouchableOpacity style={styles.cameraIcon}>
                    <Ionicons name="camera-reverse" size={24} color="#3c3562" />
                </TouchableOpacity>
            </View>

            {/* Call Controls */}
            <View style={styles.controls}>
                <TouchableOpacity onPress={changeVolumeIcon} style={styles.controlButton} activeOpacity={0.6}>
                    {volumeButton === true ? <Ionicons name="volume-mute" size={32} color="#3c3562" /> : <Ionicons name="volume-high" size={32} color="#3c3562" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={changeMicIcon} style={styles.midButton} activeOpacity={0.8}>
                    {micButton === true ? <MaterialIcons name="mic" size={32} color="white" /> : <MaterialIcons name="mic-off" size={32} color="white" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} activeOpacity={0.6}>
                    <MaterialIcons name="videocam" size={32} color="#3c3562" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.endCall]} activeOpacity={0.6}>
                    {/* <MaterialIcons name="call-end" size={28} color="white" /> */}
                    <Image source={require("../../../../assets/images/call-disconnected.png")} style={{
                        width: 35,
                        height: 35,
                    }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    mainVideo: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    header: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        top: 40,
        left: 20,
        gap: '27%',
    },
    callerName: {
        color: "#043380",
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
        marginTop: 20,
    },
    callTimer: {
        color: "#043380",
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
    floatingVideoContainer: {
        position: "absolute",
        bottom: 150,
        right: 25,
        borderRadius: 20,
        overflow: "hidden",
    },
    floatingVideo: {
        width: 150,
        height: 182,
        borderRadius: 10,
    },
    cameraIcon: {
        position: "absolute",
        top: 5,
        right: 5,
        // backgroundColor: "rgba(0,0,0,0.5)",
        // borderRadius: 15,
        padding: 5,
    },
    controls: {
        position: "absolute",
        bottom: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 40,
    },
    controlButton: {
        // width: 60,
        // height: 60,
        backgroundColor: "white",
        // justifyContent: "center",
        padding: 15,
        borderRadius: 45,
        marginHorizontal: 10,
    },
    midButton: {
        backgroundColor: "#043380",
        padding: 15,
        borderRadius: 45,
        marginHorizontal: 10,
        opacity: 0.5,
    },
    endCall: {
        backgroundColor: "red",
    },
});

export default VideoCallScreen;

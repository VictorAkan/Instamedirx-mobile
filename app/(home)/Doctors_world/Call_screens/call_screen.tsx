import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Link } from "expo-router";

const CallScreen = () => {
    const [volumeButton, setVolumeButton] = useState(false);
    const [micButton, setMicButton] = useState(false);

    const changeVolumeIcon = () => {
        setVolumeButton(!volumeButton);
    }

    const changeMicIcon = () => {
        setMicButton(!micButton);
    }

    return (
        <ImageBackground source={require("../../../../assets/images/person-calling.png")} style={styles.container}>
            <View style={styles.topView}>
                <Text style={styles.name}>John Mark</Text>
                <Text style={styles.status}>Calling...</Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={changeVolumeIcon} activeOpacity={0.6}>
                    {volumeButton === true ? <Ionicons name="volume-mute" size={32} color="#3c3562" /> : <Ionicons name="volume-high" size={32} color="#3c3562" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.midButton} onPress={changeMicIcon} activeOpacity={0.8}>
                    {micButton === true ? <MaterialIcons name="mic" size={32} color="white" /> : <MaterialIcons name="mic-off" size={32} color="white" />}
                </TouchableOpacity>
                <Link href="/Doctors_world/Call_screens/video_call_screen" asChild>
                    <TouchableOpacity style={styles.midButton} activeOpacity={0.8}>
                        <MaterialIcons name="videocam" size={32} color="white" />
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={[styles.button, styles.endCall]} activeOpacity={0.6}>
                    {/* <MaterialIcons name="call-end" size={28} color="white" /> */}
                    <Image source={require("../../../../assets/images/call-disconnected.png")} style={{
                        width: 35,
                        height: 35,
                    }} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
    },
    topView: {
        position: "absolute",
        top: 50,
        marginTop: 80,
    },
    name: {
        color: "#043380",
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
    },
    status: {
        color: "#043380",
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
    controls: {
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "white",
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

export default CallScreen;

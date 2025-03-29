import React, { useRef } from "react";
import { Animated, TouchableOpacity, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

const DocDrawerMenu = ({ isVisible, onClose }: any) => {
    const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : 300, // Slide in/out
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {isVisible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.closeOverlay} />
                </TouchableWithoutFeedback>
            )}
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#043380" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <ThemedText style={styles.menuText}>Edit profile</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <ThemedText style={styles.menuText}>Add story</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <ThemedText style={styles.menuText}>Notification</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <ThemedText style={styles.menuText}>Settings</ThemedText>
                    </TouchableOpacity>
                    <Link href="/">
                        <TouchableOpacity style={styles.menuItem}>
                            <ThemedText style={styles.menuText}>Log out</ThemedText>
                        </TouchableOpacity>
                    </Link>
                </Animated.View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 80,
        // left: 0,
        right: 0,
        // bottom: 0,
        // backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        shadowColor: "#000",
        // shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        alignItems: "flex-end",
    },
    drawer: {
        width: 250,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 15,
        fontFamily: 'Inter_700Bold',
        color: "#043380",
    },
    closeOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
});

export default DocDrawerMenu;

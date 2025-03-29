import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

const DrawerMenu = ({ isVisible, onClose }: any) => {
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isVisible ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    return (
        <>
            {isVisible && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.9}>
                    <Ionicons name="close" size={24} color="#0866FF" />
                </TouchableOpacity>
                <Link href="/Doctors_world/docs_main_profile" asChild>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.9}>
                        <ThemedText style={styles.menuText}>Profile</ThemedText>
                    </TouchableOpacity>
                </Link>
                <Link href="/Doctors_world/doc_calender" asChild>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.9}>
                        <ThemedText style={styles.menuText}>Calendar</ThemedText>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.9}>
                    <ThemedText style={styles.menuText}>Notification</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.9}>
                    <ThemedText style={styles.menuText}>Settings</ThemedText>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    drawer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width * 0.7,
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    closeButton: {
        alignSelf: "flex-end",
        marginBottom: 30,
        marginTop: 40,
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuText: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: "#043380",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
});

export default DrawerMenu;

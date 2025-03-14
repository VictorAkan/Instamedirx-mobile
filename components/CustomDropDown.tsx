import React, { useState, useRef } from "react";
import {Pressable, FlatList, Modal, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { FontAwesome } from "@expo/vector-icons";

export const CustomDropdown = ({ data, scope, width }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };

    const handleSelect = (item: any) => {
        setSelectedItem(item);
        // onSelect(item);
        setIsVisible(false);
    };

    return (
        <ThemedView style={styles.container}>
            <Pressable style={styles.dropdownButton} onPress={toggleDropdown}>
                <ThemedText style={styles.buttonText}>{selectedItem ? selectedItem.label : scope}</ThemedText>
                <FontAwesome name="angle-down" size={24} color="black" />
            </Pressable>

            {isVisible && (
                <Modal transparent animationType="fade" visible={isVisible}>
                    <Pressable style={styles.overlay} onPress={() => setIsVisible(false)}>
                        <ThemedView style={styles.dropdown}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.value.toString()}
                                renderItem={({ item }) => (
                                    <Pressable style={styles.item} onPress={() => handleSelect(item)}>
                                        <ThemedText style={styles.itemText}>{item.label}</ThemedText>
                                    </Pressable>
                                )}
                            />
                        </ThemedView>
                    </Pressable>
                </Modal>
            )}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: 100,
        marginHorizontal: 27,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 12,
        marginBottom: 20,
    },
    dropdownButton: {
        padding: 12,
        // backgroundColor: "#ddd",
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 14,
        color: '#043380',
        fontFamily: 'OpenSans',
        fontWeight: 400,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        width: 200,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 9,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 16,
        color: '#043380',
        fontFamily: 'OpenSans',
        fontWeight: 400,
    },
    appContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
});

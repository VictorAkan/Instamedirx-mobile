import { FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';

const messages = [
    { id: '1', name: 'Dr. Emmanuel', message: 'Good day Fred, here is a report of your session', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', status: "un-read" },
    { id: '2', name: 'PharmC', message: 'Thank you for ordering your medications from us', time: '11:15pm', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', status: "un-read" },
    { id: '3', name: 'Dr. Sandra', message: 'Do you still want to go ahead with the consultation', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', status: "un-read" },
    { id: '4', name: 'Dr. Okoli', message: 'Good afternoon, doctor', time: '11:15pm', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', status: "read" },
    { id: '5', name: 'Medstore', message: 'Good day Fred, here is a list of your drugs as', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', status: "read" },
    { id: '6', name: 'Clement Pharm Store', message: 'Hello friend, what would you like to order', time: '11:15pm', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', status: "read" },
    { id: '7', name: 'Dr. Sandra', message: 'Good day Fred, here is a report of your sess', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', status: "un-read" },
    { id: '8', name: 'PharmC', message: 'Thank you for ordering your medications from us', time: '11:15pm', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', status: "un-read" },
    { id: '9', name: 'Dr. Emmanuel', message: 'Do you still want to go ahead with the consultation', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', status: "read" },
    { id: '10', name: 'Oscar Felix', message: 'Good afternoon, doctor', time: '11:15pm', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', status: "read" },
    { id: '11', name: 'Clement Pharm Store', message: 'Goodday Dr. Sandra', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', status: "un-read" },
    { id: '12', name: 'Oscar Felix', message: 'Good day Fred, here is a list of your drugs as', time: '11:15pm', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', status: "un-read" },
    { id: '13', name: 'Oscar Felix', message: 'Do you still want to go ahead with the consultation', time: '11:35pm', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', status: "un-read" },
];

export default function ClientMessagesScreen() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const truncateText = (text: any, maxLength: any) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Messages</ThemedText>
            </ThemedView>

            <ThemedView style={styles.searchBar}>
                <TextInput
                    placeholder="Search or start a new chat"
                    placeholderTextColor="#6B6B6B"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
                <TouchableOpacity activeOpacity={0.9}>
                    <MaterialIcons name="search" size={24} color="#8F8F8F" />
                </TouchableOpacity>
            </ThemedView>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.messageItem}
                        activeOpacity={0.9}
                        onPress={() => router.push({
                            pathname: "/Clients_world/clients_chats/[id]", params: {
                                id: item.id,
                                user: JSON.stringify(item),
                                image: item.avatar
                            }
                        })}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <ThemedView style={styles.messageText}>
                            <ThemedView style={styles.headRow}>
                                <ThemedText style={[styles.messageName, {
                                    color: item.status === "read" ? '#8F8F8F' : '#0544AA'
                                }]}>{item.name}</ThemedText>
                                <ThemedText style={[styles.messageTime, {
                                    color: item.status === "read" ? '#8F8F8F' : '#043380CC'
                                }]}>{item.time}</ThemedText>
                            </ThemedView>
                            <ThemedText style={[styles.messageContent, {
                                color: item.status === "read" ? '#8F8F8F' : '#043380CC'
                            }]}>{truncateText(item.message, 36)}</ThemedText>
                        </ThemedView>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
    },
    headerView: {
        // marginTop: 10,
        flexDirection: 'row',
        gap: 20,
        // alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 27,
        borderColor: '#0866FF',
        borderWidth: 1,
        padding: 8,
        marginTop: 15,
        marginBottom: 20,
        // marginHorizontal: 20,
    },
    header: {
        fontSize: 16,
        // marginBottom: 20,
        color: '#0755D4',
        fontFamily: 'OpenSans_600SemiBold',
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 15,
    },
    headRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 30,
        marginRight: 10,
        borderColor: '#0755D4',
        borderWidth: 2,
    },
    messageText: {
        flex: 1,
    },
    messageName: {
        fontFamily: 'OpenSans_600SemiBold',
        color: '#0544AA',
        fontSize: 16,
    },
    messageContent: {
        color: '#043380CC',
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
    },
    messageTime: {
        color: '#043380CC',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
})
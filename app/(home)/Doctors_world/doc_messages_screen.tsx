import { FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';

const messages = [
    { id: '1', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '3', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: '5', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: '6', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { id: '7', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: '8', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
    { id: '9', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: '10', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { id: '11', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: '12', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { id: '13', name: 'Oscar Felix', message: 'Goodday Dr. Sandra', time: '11:15', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
];

export default function DocMessagesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                    <AntDesign name="arrowleft" size={24} color="#032255" />
                </TouchableOpacity>
                <ThemedText style={styles.header}>Messages</ThemedText>
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
                            pathname: "/Doctors_world/doctors_chats/[id]", params: {
                                id: item.id, 
                                user: JSON.stringify(item),
                                image: item.avatar
                            }
                        })}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <ThemedView style={styles.messageText}>
                            <ThemedText style={styles.messageName}>{item.name}</ThemedText>
                            <ThemedText style={styles.messageContent}>{item.message}</ThemedText>
                        </ThemedView>
                        <ThemedText style={styles.messageTime}>{item.time}</ThemedText>
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
    headerView: {
        // marginTop: 10,
        flexDirection: 'row',
        gap: 20,
        // alignItems: 'center',
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        color: '#043380',
        fontFamily: 'OpenSans_700Bold',
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        marginBottom: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    messageText: {
        flex: 1,
    },
    messageName: {
        fontFamily: 'OpenSans_600SemiBold',
        color: '#043380',
        fontSize: 16,
    },
    messageContent: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    messageTime: {
        color: '#043380',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    }
})
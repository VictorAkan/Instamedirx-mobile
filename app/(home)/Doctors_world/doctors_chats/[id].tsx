import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign, MaterialIcons, FontAwesome6, Entypo } from '@expo/vector-icons';

export default function DocsChatScreen() {
    const { user, image } = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hi doctor', sender: 'user' },
        { id: '2', text: 'How are you doing Oscar', sender: 'doctor' },
        { id: '3', text: 'I haven’t been feeling well', sender: 'user' },
        { id: '4', text: 'Do you have medical history?', sender: 'doctor' },
        { id: '5', text: 'Yes Doctor', sender: 'user' },
        { id: '6', text: 'Send it to me', sender: 'doctor' },
    ]);

    let userName = 'Unknown User';

    if (typeof user === 'string') {
        try {
            const parsedUser = JSON.parse(user);
            if (parsedUser && typeof parsedUser === 'object' && 'name' in parsedUser) {
                userName = parsedUser.name;
            }
        } catch (e) {
            console.error('Invalid user data:', e);
        }
    }

    const imageUrl = typeof image === 'string' ? image : '';

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <ThemedView style={styles.leftView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                    <Image source={{ uri: imageUrl }} style={styles.headImage} />
                    <ThemedView style={styles.headerPack}>
                        <ThemedText style={styles.header}>{userName}</ThemedText>
                        <ThemedText style={styles.onlineText}>Online</ThemedText>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.edgeIcons}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <MaterialIcons name="call" size={28} color="#0755D4" />
                    </TouchableOpacity>
                    <Link href="/Doctors_world/Call_screens/call_screen" asChild>
                        <TouchableOpacity activeOpacity={0.9}>
                            <FontAwesome6 name="video" size={24} color="#0755D4" />
                        </TouchableOpacity>
                    </Link>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.currentDay}>
                <ThemedView style={{
                    backgroundColor: '#CEE0FF',
                    paddingHorizontal: 15,
                    padding: 5,
                    borderRadius: 20,
                }}>
                    <ThemedText style={styles.currDayTxt}>Today</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.chatBody}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ThemedView style={[styles.chatRow,
                        { alignSelf: item.sender === 'user' ? 'flex-start' : 'flex-end' }
                        ]}>
                            {item.sender === 'user' ? <Image source={{ uri: imageUrl }} style={styles.smallerImage} /> : ""}
                            <ThemedView>
                                <ThemedView style={[styles.chatBubble, item.sender === 'user' ? styles.userBubble : styles.doctorBubble]}>
                                    {item.sender === 'user' ? <ThemedText style={styles.timeText}>11:20</ThemedText> : ""}
                                    <ThemedText style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontFamily: 'Inter_600SemiBold',
                                    }}>{item.text}</ThemedText>
                                    {item.sender === 'doctor' ? <ThemedText style={styles.timeText}>11:20</ThemedText> : ""}
                                </ThemedView>
                                <ThemedText style={[styles.seenTxt,
                                { textAlign: item.sender === 'user' ? 'right' : 'left' }
                                ]}>Seen</ThemedText>
                            </ThemedView>
                            {item.sender === 'doctor' ? <Image source={require("../../../../assets/images/docprofile.png")} style={styles.smallerImage} /> : ""}
                        </ThemedView>
                    )}
                />
            </ThemedView>
            <ThemedView style={styles.bottomView}>
                <ThemedView style={styles.inputView}>
                    <TextInput placeholder='Message' placeholderTextColor='#CAC4D0' style={styles.input} />
                    <ThemedView style={styles.commMode}>
                        <TouchableOpacity activeOpacity={0.9}>
                            <MaterialIcons name="keyboard-voice" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}>
                            <Entypo name="attachment" size={24} color="black" />
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
                <TouchableOpacity activeOpacity={0.9} style={styles.sendBtn}>
                    <Image source={require("../../../../assets/images/emailsend.png")} />
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    currentDay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    currDayTxt: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'Inter_700Bold',
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'space-between',
        marginBottom: 30,
        borderBottomWidth: 2,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomColor: '#0866FF',

    },
    leftView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    seenTxt: {
        textAlign: 'center',
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 12,
    },
    headerPack: {},
    header: {
        fontSize: 16,
        color: '#043380',
        fontFamily: 'OpenSans_600SemiBold',
    },
    onlineText: {
        fontSize: 14,
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    headImage: {
        width: 60,
        height: 60,
        borderRadius: 35,
        marginLeft: 10,
    },
    smallerImage: {
        width: 40,
        height: 40,
        borderRadius: 35,
        marginLeft: 10,
    },
    edgeIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 40,
    },
    chatBody: {
        padding: 20,
        flex: 1,
    },
    chatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    chatBubble: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        paddingBottom: 2,
        // marginBottom: 10,
    },
    timeText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        alignSelf: 'flex-end',
        marginTop: 10,
        // justifySelf: 'flex-end',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#0866FF',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 20,
        width: '85%',
        marginRight: 15,
    },
    userBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#BA7FD6',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 0,
        marginLeft: 5,
    },
    doctorBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#0866FF',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 15,
    },
    input: {
        height: 40,
        // width: 300,
        paddingHorizontal: 10,
        // marginTop: 10,
    },
    commMode: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    bottomView: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    sendBtn: {
        backgroundColor: '#0866FF',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 40,
    }
});

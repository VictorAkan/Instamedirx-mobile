import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign, MaterialIcons, FontAwesome6, Entypo, Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function ClientsChatScreen() {
    const { user, image } = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello Doctor, I’m messaging you because I have a slight issue with my hearing', sender: 'doctor' },
        { id: '2', text: 'What’s wrong? Send a vn or start a video call', sender: 'user' },
        { id: '3', text: 'Gwarimpa estate', sender: 'doctor' },
    ]);
    const [moreMsgs, setMoreMsgs] = useState([
        { id: '1', text: 'Alright, Done.', sender: 'user' },
        { id: '2', text: 'Alright, Doc', sender: 'doctor' },
    ])

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
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.headerView}>
                <ThemedView style={styles.leftView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                    <ThemedView style={styles.headerPack}>
                        <ThemedText style={styles.header}>{userName}</ThemedText>
                        {/* <ThemedText style={styles.onlineText}>Online</ThemedText> */}
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
            <ThemedView style={styles.chatBody}>
                <ThemedView style={styles.currentDay}>
                    <ThemedView style={{
                        backgroundColor: '#f1faff',
                        // paddingHorizontal: 15,
                        padding: 5,
                        // borderRadius: 20,
                    }}>
                        <ThemedText style={styles.currDayTxt}>Thursday</ThemedText>
                    </ThemedView>
                </ThemedView>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ThemedView style={[styles.chatRow,
                        { alignSelf: item.sender === 'user' ? 'flex-start' : 'flex-end' }
                        ]}>
                            {/* {item.sender === 'user' ? <Image source={{ uri: imageUrl }} style={styles.smallerImage} /> : ""} */}
                            <ThemedView style={{
                                backgroundColor: '#f1faff'
                            }}>
                                <ThemedView style={[styles.chatBubble, item.sender === 'user' ? styles.userBubble : styles.doctorBubble]}>
                                    <ThemedText style={{
                                        color: item.sender === 'doctor' ? '#4D3366' : '#043380',
                                        fontSize: 16,
                                        fontFamily: 'OpenSans_600SemiBold',
                                        width: 300,
                                    }}>{item.text}</ThemedText>
                                    <ThemedText style={[styles.timeText, {
                                        color: item.sender === 'doctor' ? '#4D3366' : '#043380',
                                    }]}>11:35</ThemedText>
                                </ThemedView>
                                { item.sender === 'doctor' && <ThemedText style={[styles.seenTxt,
                                { textAlign: item.sender === 'doctor' ? 'right' : 'right' }
                                ]}>Seen</ThemedText>}
                            </ThemedView>
                            {/* {item.sender === 'doctor' ? <Image source={require("../../../../assets/images/docprofile.png")} style={styles.smallerImage} /> : ""} */}
                        </ThemedView>
                    )}
                />
                <ThemedView style={styles.currentDay}>
                    <ThemedView style={{
                        backgroundColor: '#f1faff',
                        // paddingHorizontal: 15,
                        padding: 5,
                        // borderRadius: 20,
                    }}>
                        <ThemedText style={styles.currDayTxt}>Monday 24/12/25</ThemedText>
                    </ThemedView>
                </ThemedView>
                <FlatList
                    data={moreMsgs}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ThemedView style={[styles.chatRow,
                        { alignSelf: item.sender === 'user' ? 'flex-start' : 'flex-end' }
                        ]}>
                            {/* {item.sender === 'user' ? <Image source={{ uri: imageUrl }} style={styles.smallerImage} /> : ""} */}
                            <ThemedView style={{
                                backgroundColor: '#f1faff'
                            }}>
                                <ThemedView style={[styles.chatBubble, item.sender === 'user' ? styles.userBubble : styles.doctorBubble]}>
                                    <ThemedText style={{
                                        color: item.sender === 'doctor' ? '#4D3366' : '#043380',
                                        fontSize: 16,
                                        fontFamily: 'OpenSans_600SemiBold',
                                        width: 300,
                                    }}>{item.text}</ThemedText>
                                    <ThemedText style={[styles.timeText, {
                                        color: item.sender === 'doctor' ? '#4D3366' : '#043380',
                                    }]}>11:35</ThemedText>
                                </ThemedView>
                                { item.sender === 'doctor' && <ThemedText style={[styles.seenTxt,
                                { textAlign: item.sender === 'doctor' ? 'right' : 'right' }
                                ]}>Seen</ThemedText>}
                            </ThemedView>
                            {/* {item.sender === 'doctor' ? <Image source={require("../../../../assets/images/docprofile.png")} style={styles.smallerImage} /> : ""} */}
                        </ThemedView>
                    )}
                />
            </ThemedView>
            <ThemedView style={styles.bottomView}>
                <ThemedView style={styles.inputView}>
                    <TextInput placeholder='Message' placeholderTextColor='#CAC4D0' style={styles.input} />
                    <ThemedView style={styles.commMode}>
                        <TouchableOpacity activeOpacity={0.9}>
                            <MaterialIcons name="keyboard-voice" size={24} color="#0755D4" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}>
                            <Ionicons name="attach" size={24} color="#0755D4" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={styles.sendBtn}>
                            <Ionicons name="send-sharp" size={20} color="white" />
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
                {/* <TouchableOpacity activeOpacity={0.9} style={styles.sendBtn}>
                    <Image source={require("../../../../assets/images/emailsend.png")} />
                </TouchableOpacity> */}
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    currentDay: {
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1faff'
    },
    currDayTxt: {
        fontSize: 14,
        color: '#8F8F8F',
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 20,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 10,
        justifyContent: 'space-between',
        // marginBottom: 30,
        paddingHorizontal: 20,
        paddingBottom: 15,

    },
    leftView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    seenTxt: {
        textAlign: 'center',
        color: '#02020266',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
    },
    headerPack: {},
    header: {
        fontSize: 16,
        color: '#0755D4',
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
        backgroundColor: '#f1faff',
    },
    chatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 40,
    },
    chatBubble: {
        padding: 10,
        borderRadius: 10,
        // flexDirection: 'row',
        gap: 10,
        paddingBottom: 2,
        backgroundColor: '#f1faff',
    },
    timeText: {
        // color: 'white',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
        alignSelf: 'flex-end',
        // marginTop: 10,
        // justifySelf: 'flex-end',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#0866FF',
        borderWidth: 2,
        borderRadius: 30,
        paddingLeft: 20,
        width: '100%',
        marginRight: 15,
        paddingVertical: 2,
        paddingRight: 15,
    },
    userBubble: {
        // alignSelf: 'flex-end',
        backgroundColor: '#CEE0FF',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        // marginLeft: 5,
        marginBottom: 10,
    },
    doctorBubble: {
        // alignSelf: 'flex-end',
        backgroundColor: '#CCB2E5',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 15,
    },
    input: {
        // height: 40,
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
        backgroundColor: '#f1faff',
        // paddingBottom: 40,
    },
    sendBtn: {
        backgroundColor: '#0755D4',
        // justifyContent: 'center',
        padding: 10,
        borderRadius: 40,
    }
});

import { Tabs } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false, // Hide tab titles
                headerShown: false, // Hide header title
                tabBarStyle: {
                    height: 75,
                    paddingBottom: 5, 
                    paddingTop: 18,
                    backgroundColor: 'white',
                },
                tabBarActiveTintColor: '#0544AA', 
                // tabBarActiveBackgroundColor: '#CEE0FF',// Active icon color
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <ThemedView
                            style={{
                                backgroundColor: focused ? '#CEE0FF' : 'transparent',
                                borderRadius: 50,
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // padding: 10,
                            }}
                        >
                            { focused ? <MaterialIcons name="home" size={28} color={focused ? '#0544AA' : '#698fcc'} /> : <MaterialCommunityIcons name="home-outline" size={28} color="#698fcc" /> }
                        </ThemedView>
                    ),
                }}
            />
            <Tabs.Screen
                name="appointment"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <ThemedView
                            style={{
                                backgroundColor: focused ? '#CEE0FF' : 'transparent',
                                borderRadius: 50,
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // padding: 10,
                            }}
                        >
                            {focused ? <Image source={require("../../../../assets/images/bookcontact.png")} /> : <Image source={require("../../../../assets/images/contactoutline.png")} /> }
                        </ThemedView>
                    ),
                }}
            />
            <Tabs.Screen
                name="clients_pharm_shop"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <ThemedView
                            style={{
                                backgroundColor: focused ? '#CEE0FF' : 'transparent',
                                borderRadius: 50,
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // padding: 10,
                            }}
                        >
                            {focused ? <MaterialCommunityIcons name="flower-tulip" size={28} color={focused ? '#0544AA' : '#698fcc'} /> : <MaterialCommunityIcons name="flower-tulip-outline" size={28} color="#698fcc" /> }
                        </ThemedView>
                    ),
                }}
            />
            <Tabs.Screen
                name="doc_video_post"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <ThemedView
                            style={{
                                backgroundColor: focused ? '#CEE0FF' : 'transparent',
                                borderRadius: 50,
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // padding: 10,
                            }}
                        >
                            {focused ? <Image source={require("../../../../assets/images/vidoutline.png")} /> : <Image source={require("../../../../assets/images/vid.png")} /> }
                        </ThemedView>
                    ),
                }}
            />
            <Tabs.Screen
                name="clients_profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ThemedView
                            style={{
                                backgroundColor: focused ? '#CEE0FF' : 'transparent',
                                borderRadius: 50,
                                width: 60,
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // padding: 10,
                            }}
                        >
                            <Image style={{ width: 25, height: 25, borderWidth: 1, borderColor: '#0866FF', borderRadius: 30 }} source={require("../../../../assets/images/client_profile.png")} />
                        </ThemedView>
                    ),
                }}
            />
        </Tabs>
    );
}
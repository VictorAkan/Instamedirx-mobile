import { Tabs } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

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
                        <View
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
                            { focused ? <MaterialIcons name="home" size={28} color={focused ? '#0544AA' : 'gray'} /> : <MaterialCommunityIcons name="home-outline" size={28} color="gray" /> }
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="appointment"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
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
                            {focused ? <Ionicons name="calendar" size={28} color={focused ? '#0544AA' : 'gray'} /> : <Ionicons name="calendar-outline" size={28} color="gray"/> }
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="docs_pharm_shop"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
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
                            {focused ? <MaterialCommunityIcons name="flower-tulip" size={28} color={focused ? '#0544AA' : 'gray'} /> : <MaterialCommunityIcons name="flower-tulip-outline" size={28} color="gray" /> }
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
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
                            {focused ? <Ionicons name="notifications" size={28} color={focused ? '#0544AA' : 'gray'} /> : <Ionicons name="notifications-outline" size={28} color="gray" /> }
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="docs_profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
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
                            {focused ? <Ionicons name="person-circle" size={28} color={focused ? '#0544AA' : 'gray'} /> : <FontAwesome6 name="user-circle" size={24} color="gray" /> }
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

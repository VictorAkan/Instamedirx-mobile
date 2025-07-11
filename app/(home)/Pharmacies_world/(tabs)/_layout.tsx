import { Tabs } from "expo-router";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 75,
          paddingBottom: 5,
          paddingTop: 18,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
        tabBarActiveTintColor: "#0544AA",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ThemedView
              style={{
                backgroundColor: focused ? "#CEE0FF" : "transparent",
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused ? (
                <MaterialIcons name="home" size={28} color="#0544AA" />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={28}
                  color="#698fcc"
                />
              )}
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
                backgroundColor: focused ? "#CEE0FF" : "transparent",
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused ? (
                <MaterialCommunityIcons
                  name="archive"
                  size={24}
                  color="#0544AA"
                />
              ) : (
                <MaterialCommunityIcons
                  name="archive-outline"
                  size={24}
                  color="#698fcc"
                />
              )}
            </ThemedView>
          ),
        }}
      />
      <Tabs.Screen
        name="docs_pharm_shop"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ThemedView
              style={{
                backgroundColor: focused ? "#CEE0FF" : "transparent",
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused ? (
                <MaterialCommunityIcons
                  name="truck-fast"
                  size={24}
                  color="#0544AA"
                />
              ) : (
                <MaterialCommunityIcons
                  name="truck-fast-outline"
                  size={24}
                  color="#698fcc"
                />
              )}
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
                backgroundColor: focused ? "#CEE0FF" : "transparent",
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused ? (
                <MaterialIcons name="smart-display" size={28} color="#0544AA" />
              ) : (
                <Foundation name="play-video" size={28} color="#698fcc" />
              )}
            </ThemedView>
          ),
        }}
      />
      <Tabs.Screen
        name="docs_profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <ThemedView
              style={{
                backgroundColor: focused ? "#CEE0FF" : "transparent",
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {focused ? (
                <MaterialIcons
                  name="account-circle"
                  size={28}
                  color="#0544AA"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={28}
                  color="#698fcc"
                />
              )}
            </ThemedView>
          ),
        }}
      />
    </Tabs>
  );
}

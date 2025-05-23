import { Tabs } from "expo-router";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";

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
          backgroundColor: "white",
        },
        tabBarActiveTintColor: "#0544AA",
        // tabBarActiveBackgroundColor: '#CEE0FF',// Active icon color
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
                justifyContent: focused ? "flex-start" : "center",
                paddingTop: focused ? 10 : 0
              }}
            >
              {focused ? (
                <MaterialIcons
                  name="home"
                  size={28}
                  color={focused ? "#0544AA" : "#698fcc"}
                />
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
                justifyContent: focused ? "flex-start" : "center",
                paddingTop: focused ? 10 : 0
              }}
            >
              {focused ? (
                <Image
                  source={require("../../../../assets/images/bookcontact.png")}
                />
              ) : (
                <Image
                  source={require("../../../../assets/images/contactoutline.png")}
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
                justifyContent: focused ? "flex-start" : "center",
                paddingTop: focused ? 10 : 0
              }}
            >
              {focused ? (
                <MaterialCommunityIcons
                  name="flower-tulip"
                  size={28}
                  color={focused ? "#0544AA" : "#698fcc"}
                />
              ) : (
                <MaterialCommunityIcons
                  name="flower-tulip-outline"
                  size={28}
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
                justifyContent: focused ? "flex-start" : "center",
                paddingTop: focused ? 10 : 0
              }}
            >
              {focused ? (
                <Image source={require("../../../../assets/images/addbox.png")} style={{
                  width: 21,
                  height: 21
                }} />
              ) : (
                <Image source={require("../../../../assets/images/vid.png")} />
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
                justifyContent: focused ? "flex-start" : "center",
                paddingTop: focused ? 10 : 0
              }}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  borderWidth: 1,
                  borderColor: "#0866FF",
                  borderRadius: 30,
                }}
                source={require("../../../../assets/images/docprofile.png")}
              />
            </ThemedView>
          ),
        }}
      />
    </Tabs>
  );
}

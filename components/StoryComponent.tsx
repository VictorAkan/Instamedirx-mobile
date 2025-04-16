import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient

interface DocStoryProps {
  closeStory: () => void
}

export default function DoctorStoryScreen({ closeStory }: DocStoryProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/images/docbg.jpeg")}
        resizeMode='cover'
      >
        {/* Top Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
          style={styles.topGradient}
          pointerEvents="none"
        />

        {/* Bottom Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.bottomGradient}
          pointerEvents="none"
        />

        {/* Top Story Bar */}
        <View style={styles.storyBarContainer}>
          <View style={styles.storyBar} />
        </View>

        {/* Profile Info Row */}
        <View style={styles.profileRow}>
          <View style={styles.leftRow}>
            <Image
              source={require("../assets/images/doc1.png")}
              style={styles.profilePic}
            />
            <Text style={styles.profileName}>
              <Text style={{ fontFamily: 'OpenSans_700Bold', color: '#fff', fontSize: 16 }}>Dr. Ifunaya</Text>
              <Text style={styles.timeText}> 16 min</Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={closeStory}>
            <Ionicons name="close-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Chat Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatText}>Start a chat with Dr. Ifunaya</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.arrowCircle}>
               <Ionicons name="send-sharp" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storyBarContainer: {
    height: 6,
    backgroundColor: 'transparent',
    marginTop: 4,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyBar: {
    width: '95%',
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 12,
    marginRight: 15,
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0866FF',
    marginRight: 8,
  },
  profileName: {
    fontSize: 15,
    color: '#fff',
    flexDirection: 'row',
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 60,
  },
  doctorImage: {
    width: '92%',
    height: '95%',
    borderRadius: 16,
    borderWidth: 0,
    resizeMode: 'cover',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    // alignItems: 'center',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#f7f7fa',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 18,
    marginHorizontal: 15,
  },
  chatText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'OpenSans_700Bold',
    // marginRight: 12,
  },
  arrowCircle: {
    // width: 28,
    // height: 28,
    backgroundColor: '#0755D4',
        // justifyContent: 'center',
        padding: 15,
        borderRadius: 40,
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 1,
    marginTop: -2,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 110, // adjust for how much of the top should be dark
    // zIndex: 2,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130, // adjust for how much of the bottom should be dark
    // zIndex: 2,
  },
});

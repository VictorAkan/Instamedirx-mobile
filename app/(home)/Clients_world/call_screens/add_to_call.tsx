import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  Image,
  Pressable, 
} from 'react-native';
import { 
  ArrowLeft, 
  PhoneOff, 
  Volume2, 
  VideoOff, 
  MicOff, 
  Calendar,
  Mic,
  Video,
  ChevronUp,
  ChevronsUp,
  AudioLines,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [volumeOn, setVolumeOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.consultationTitle}>Malaria Consultation</Text>
          <Text style={styles.callDuration}>01:44:09</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* Main video area - Doctor */}
      <ImageBackground source={{ uri: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg' }} style={styles.mainVideoContainer}>
        <View style={styles.doctorHeader}>
          <View style={styles.doctorInfo}>
            <View style={styles.statusIndicator} />
            <Text style={styles.doctorName}>Dr Chisom Okoli</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.muteButton}>
            <MicOff color="#043380CC" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.doctorVideoArea}>
          {/* Doctor image placeholder - in real app this would be video feed */}
          {/* <Image
            source={{ uri: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg' }}
            style={styles.doctorImage}
            resizeMode="cover"
          /> */}
        </View>
      </ImageBackground>

      {/* Bottom section with patient video and controls */}
      <View style={styles.bottomSection}>
        {/* Patient videos row */}
        <View style={styles.patientVideosRow}>
          {/* Patient 1 (You) */}
          <View style={styles.patientVideoContainer}>
            <View style={[styles.patientVideoSmall, {
              alignItems: 'center'
            }]}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 100,
                  marginTop: 10
                }}
                resizeMode="cover"
              />
              {/* <View style={styles.patientOverlay}>
                <Mic color="#FFFFFF" size={16} />
                <Text style={styles.patientLabel}>You</Text>
              </View> */}

              <View style={styles.bottomPersonView}>
                <AudioLines size={24} color="#fff" />
                <Text style={styles.youtxt}>You</Text>
              </View>
            </View>
          </View>

          {/* Patient 2 */}
          <View style={styles.patientVideoContainer}>
            <View style={styles.patientVideoSmall}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                style={styles.patientImage}
                resizeMode="cover"
              />
              <TouchableOpacity activeOpacity={0.7} style={styles.patientMuteButton}>
                <MicOff color="#043380CC" size={20} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.expandButton}>
                <ChevronUp color="#6B7280" size={16} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rightDoubArrow}>
            <Pressable style={styles.arrowBtn}>
              <ChevronsUp color="#043380" />
            </Pressable>
          </View>
        </View>

        {/* Bottom controls */}
        <View style={styles.bottomControls}>
                <BlurView
                  experimentalBlurMethod="dimezisBlurView"
                  intensity={50}
                  style={styles.controls}
                >
                  <LinearGradient
                    colors={["#97959533", "#9795951A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientOverlay}
                  >
                    <TouchableOpacity
                      style={[styles.controlButton, styles.endCallButton]}
                      activeOpacity={0.7}
                      onPress={() => {
                        router.back();
                        router.back();
                      }}
                    >
                      {/* <Video color="#FFFFFF" size={24} /> */}
                      <Image
                        style={{
                          width: 24,
                          height: 8.86,
                        }}
                        source={require("../../../../assets/images/call_end.png")}
                      />
                    </TouchableOpacity>
        
                    <TouchableOpacity
                      onPress={() => setVolumeOn(!volumeOn)}
                      style={styles.controlButton}
                      activeOpacity={0.7}
                    >
                      {volumeOn ? (
                        <MaterialIcons
                          name="volume-up"
                          size={24}
                          color={volumeOn ? "#043380" : "#04338099"}
                        />
                      ) : (
                        <MaterialIcons
                          name="volume-off"
                          size={24}
                          color={volumeOn ? "#043380" : "#04338099"}
                        />
                      )}
                    </TouchableOpacity>
        
                    <TouchableOpacity
                      onPress={() => setVideoOn(!videoOn)}
                      style={styles.controlButton}
                      activeOpacity={0.7}
                    >
                      {videoOn ? (
                        <Video color={videoOn ? "#043380" : "#04338099"} size={24} />
                      ) : (
                        <VideoOff color={videoOn ? "#043380" : "#04338099"} size={24} />
                      )}
                    </TouchableOpacity>
        
                    <TouchableOpacity
                      onPress={() => setAudioOn(!audioOn)}
                      style={styles.controlButton}
                      activeOpacity={0.7}
                    >
                      {audioOn ? (
                        <Mic color={audioOn ? "#043380" : "#04338099"} size={24} />
                      ) : (
                        <MicOff color={audioOn ? "#043380" : "#04338099"} size={24} />
                      )}
                    </TouchableOpacity>
        
                    <TouchableOpacity
                      style={styles.controlButton}
                      activeOpacity={0.7}
                      onPress={() =>
                        router.push("/Clients_world/call_screens/share_screen")
                      }
                    >
                      <Image
                        style={{
                          width: 20,
                          height: 18,
                        }}
                        source={require("../../../../assets/images/switchcamera.png")}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                </BlurView>
              </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FAFF',
  },
  topHeader: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
    // backgroundColor: '#F9FAFB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  consultationTitle: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: '#0544AA',
    marginBottom: 2,
  },
  callDuration: {
    fontSize: 14,
    color: '#043380CC',
    fontFamily: "OpenSans_400Regular",
  },
  mainVideoContainer: {
    flex: 1,
    margin: 16,
    // backgroundColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    // position: 'absolute',
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginRight: 8,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: '#043380CC',
  },
  muteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorVideoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  bottomPersonView: {
    marginTop: 10,
    gap: 10,
  },
  youtxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  bottomSection: {
    backgroundColor: '#F1FAFF',
    paddingTop: 16,
  },
  patientVideosRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  patientVideoContainer: {
    flex: 1,
  },
  patientVideoSmall: {
    height: 144,
    width: 128,
    backgroundColor: '#6B6B6B',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  patientImage: {
    width: '100%',
    height: '100%',
  },
  patientOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  patientLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  patientMuteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightDoubArrow: {
    alignSelf: 'flex-end'
  },
  arrowBtn: {
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
 bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
    // paddingTop: 16,
    backgroundColor: '#F1FAFF',
    gap: 16,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#F1FAFF',
  },
  controls: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    marginHorizontal: 16,
  },
  gradientOverlay: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    gap: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 1000,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  endCallButton: {
    backgroundColor: "#fff",
  },
});
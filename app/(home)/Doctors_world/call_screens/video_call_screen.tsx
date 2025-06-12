import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function App() {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const leftArrowsAnim = useRef(new Animated.Value(0)).current;
  const rightArrowsAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<any>(null);

  // Animate arrows continuously
  useEffect(() => {
    const animateArrows = () => {
      // Left arrows animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(leftArrowsAnim, {
            toValue: -10,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(leftArrowsAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Right arrows animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rightArrowsAnim, {
            toValue: 10,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(rightArrowsAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateArrows();

    // Auto-reject after 3 minutes
    timeoutRef.current = setTimeout(() => {
      handleReject();
    }, 180000); // 3 minutes

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAccept = () => {
    router.push("/Doctors_world/call_screens/video_call_picked")
  };

  const handleReject = () => {
    router.back();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      // Limit the slide within bounds
      const newValue = Math.max(-100, Math.min(100, gestureState.dx));
      slideAnim.setValue(newValue);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 80) {
        // Swiped right - accept call
        Animated.timing(slideAnim, {
          toValue: 150,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          handleAccept();
        });
      } else if (gestureState.dx < -80) {
        // Swiped left - reject call
        Animated.timing(slideAnim, {
          toValue: -150,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          handleReject();
        });
      } else {
        // Return to center
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Full Background Image */}
      <Image
        source={require("../../../../assets/images/doctorBackground.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        {/* Top Section with Doctor Info */}
        <View style={styles.topSection}>
          <Text style={styles.doctorName}>Dr Chisom Okoli</Text>
          <Text style={styles.callType}>Incoming video call...</Text>
        </View>

        {/* Bottom Section with Glass Effect */}
<View style={styles.bottomContainer}>
  {/* Backdrop for the glass effect */}
  <View style={styles.glassBackdrop} />
  
  {/* Glass panel with blur */}
  <BlurView 
    intensity={20} 
    style={styles.glassPanel}
    experimentalBlurMethod="dimezisBlurView"
  >
      <View style={styles.bottomContent}>
        {/* Swipe Controls */}
        <View style={styles.swipeContainer}>
          {/* Left arrows (reject) */}
          <Animated.View 
            style={[
              styles.arrowsContainer, 
              styles.leftArrows,
              { transform: [{ translateX: leftArrowsAnim }] }
            ]}
          >
            <ChevronLeft color="#FF7676" size={28} />
            <ChevronLeft color="#FF7676" size={28} style={styles.arrowSpacing} />
            <ChevronLeft color="#FF7676" size={28} style={styles.arrowSpacing} />
          </Animated.View>

          {/* Call Button */}
          <Animated.View
            style={[
              styles.callButtonContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity activeOpacity={0.9} style={styles.callButton}>
              <Phone color="#FFFFFF" size={32} />
            </TouchableOpacity>
          </Animated.View>

          {/* Right arrows (accept) */}
          <Animated.View 
            style={[
              styles.arrowsContainer, 
              styles.rightArrows,
              { transform: [{ translateX: rightArrowsAnim }] }
            ]}
          >
            <ChevronRight color="#00EC2B" size={28} style={styles.arrowSpacing} />
            <ChevronRight color="#00EC2B" size={28} style={styles.arrowSpacing} />
            <ChevronRight color="#00EC2B" size={28} />
          </Animated.View>
        </View>

        <Text style={styles.swipeText}>Swipe right to accept</Text>
      </View>
  </BlurView>
</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 55,
    left: 0,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  doctorName: {
    fontSize: 24,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    marginBottom: 8,
    textAlign: "center",
  },
  callType: {
    fontSize: 14,
    color: "#043380CC",
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
  },
   bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    overflow: 'hidden',
  },
  glassBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  glassPanel: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.2)'
    // borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.2)',
  },
  glassContent: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  blurContainer: {
    flex: 1,
    overflow: "hidden",
  },
  gradientContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeContainer: {
    // height: 100,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  arrowsContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  leftArrows: {
    left: width * 0.2,
  },
  rightArrows: {
    right: width * 0.2,
  },
  arrowSpacing: {
    marginLeft: -8,
    opacity: 0.7,
  },
  callButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 45,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  swipeText: {
    fontSize: 14,
    color: "#0544AA",
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
});

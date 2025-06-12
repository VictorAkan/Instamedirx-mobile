import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { PhoneCall } from 'lucide-react-native';
import { router } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const leftArrowsOpacity = useRef(new Animated.Value(1)).current;
  const rightArrowsOpacity = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<any>(null);

  const animateArrows = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(leftArrowsOpacity, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(rightArrowsOpacity, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(leftArrowsOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(rightArrowsOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  useEffect(() => {
    animateArrows();
    
    // Set 3-minute timeout
    timeoutRef.current = setTimeout(() => {
      // Navigate back (replace with your navigation logic)
      router.back()
    }, 180000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > SWIPE_THRESHOLD) {
        // Swiped right - accept call
        router.push("/Clients_world/call_screens/audio_call_picked")
      } else if (gestureState.dx < -SWIPE_THRESHOLD) {
        // Swiped left - decline call
        router.back();
      }
      
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
        <Image
          source={require("../../../../assets/images/doctorbg.png")}
          style={styles.profileImage}
        />
        <Text style={styles.doctorName}>Dr Chisom Okoli</Text>
        <Text style={styles.callStatus}>Incoming Audio Call...</Text>
      </View>

      <View style={styles.bottomSide}>
        <View style={styles.swipeContainer}>
        <Animated.View style={[styles.arrowsContainer, { opacity: leftArrowsOpacity }]}>
          {/* <Text style={[styles.arrows, styles.redArrows]}>{'<<<'}</Text> */}
          <FontAwesome name="angle-left" size={32} color="#FF7676" />
          <FontAwesome name="angle-left" size={32} color="#FF7676" />
          <FontAwesome name="angle-left" size={32} color="#FF7676" />
        </Animated.View>

        <Animated.View
          style={[
            styles.callButton,
            { transform: [{ translateX: pan.x }] },
          ]}
          {...panResponder.panHandlers}
        >
          {/* <Text style={styles.callButtonIcon}>📞</Text> */}
          <PhoneCall size={32} color="#34C759" />
        </Animated.View>

        <Animated.View style={[styles.arrowsContainer, { opacity: rightArrowsOpacity }]}>
          {/* <Text style={[styles.arrows, styles.greenArrows]}>{'>>>'}</Text> */}
          <FontAwesome name="angle-right" size={32} color="#00EC2B" />
          <FontAwesome name="angle-right" size={32} color="#00EC2B" />
          <FontAwesome name="angle-right" size={32} color="#00EC2B" />
        </Animated.View>
      </View>

      <Text style={styles.swipeText}>Swipe right to accept</Text>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingVertical: 60,
  },
  mainContainer: {
    backgroundColor: '#0544AA',
    height: '100%'
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
    // flex: 1,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    width: '100%',
    paddingBottom: 70,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  doctorName: {
    fontSize: 24,
    fontFamily: "OpenSans_600SemiBold",
    color: '#0544AA',
    marginBottom: 8,
  },
  callStatus: {
    fontSize: 14,
    color: '#043380CC',
    fontFamily: "OpenSans_400Regular",
    // opacity: 0.8,
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: 40,
  },
  arrowsContainer: {
    width: 60,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  arrows: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  redArrows: {
    color: '#FF4444',
  },
  greenArrows: {
    color: '#22C55E',
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    zIndex: 4
  },
  callButtonIcon: {
    fontSize: 30,
  },
  swipeText: {
    color: '#F1FAFF',
    fontSize: 14,
    marginTop: 20,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: 'center',
  },
  bottomSide: {
    backgroundColor: '#0544AA',
    // paddingBottom: 60,
    paddingTop: 350,
  },
});
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppBtn } from "@/components/AppButton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Calendar } from "@/components/Calendar";

interface Category {
  title: string;
  options: string[];
  single?: boolean;
}

interface FilterState {
  [key: string]: string[];
}

const categories: Category[] = [
  {
    title: "Appointment type",
    options: ["Group", "Single"],
    single: true,
  },
  {
    title: "Modality",
    options: ["Online audio", "Video call", "Texting", "Other modalities"],
    single: true,
  },
  {
    title: "Reason for appointment",
    options: ["General consultation", "Pediatrics", "Other reasons"],
    single: true,
  },
];

const BookAppointment = () => {
  const getDashedBorder = (storyCount: number) => {
    const radius = 41; // Radius of the circle
    const circumference = 2 * Math.PI * radius;

    if (storyCount === 0) {
      // No border
      return (
        <Svg width="80" height="80" style={{ position: "absolute" }}>
          <Circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#D6D6D6" // Change stroke color to gray
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      );
    } else if (storyCount === 1) {
      // Solid, filled border
      return (
        <Svg width="420" height="420" style={{ position: "absolute" }}>
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#007AFF"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      );
    } else {
      // Dashed border (storyCount > 1)
      const dashLength = circumference / (storyCount * 2);
      const gapLength = 7;
      const dashArray = Array(storyCount)
        .fill(`${dashLength},${gapLength}`)
        .join(" ");

      return (
        <Svg width="220" height="220" style={{ position: "absolute" }}>
          <Circle
            cx="110"
            cy="45"
            r={radius}
            stroke="#007AFF"
            strokeWidth="3"
            strokeDasharray={dashArray}
            fill="none"
          />
        </Svg>
      );
    }
  };

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleSelection = (
    category: string,
    option: string,
    single: boolean = false
  ) => {
    setSelectedFilters((prev) => {
      const currentItems = prev[category] || [];

      if (single) {
        return { ...prev, [category]: [option] };
      }

      const newItems = currentItems.includes(option)
        ? currentItems.filter((item) => item !== option) // Now safely works with arrays
        : [...currentItems, option];

      return { ...prev, [category]: newItems };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book an appointment</Text>
      </View>

     <ScrollView showsVerticalScrollIndicator={false}>
       <View style={styles.topRow}>
        <View>
          <View style={styles.profileContainer}>
            {getDashedBorder(4)}
            <Image
              source={require("../../../../assets/images/docprofile.png")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <View style={styles.aboutView}>
          <Text style={styles.name}>Dr. Sandra Davis</Text>
          <Text style={styles.specialization}>Gynecologist</Text>
        </View>
      </View>

      {categories.map(({ title, options, single }) => (
        <ThemedView style={{ paddingHorizontal: 15 }} key={title}>
          <TouchableOpacity
            style={styles.categoryBtn}
            activeOpacity={0.8}
            onPress={() =>
              setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
            }
          >
            <ThemedText style={styles.categoryTitle}>{title}</ThemedText>
            {expanded[title] ? (
              <Entypo name="chevron-up" size={18} color="#0755D4" />
            ) : (
              <Entypo name="chevron-down" size={18} color="#0755D4" />
            )}
          </TouchableOpacity>
          <ThemedView style={{
            marginBottom: 30
          }}>
            {expanded[title] && options.length > 0 && (
              <FlatList
                data={options}
                numColumns={1}
                scrollEnabled={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      selectedFilters[title]?.includes(item) &&
                        styles.selectedOption,
                    ]}
                    onPress={() => toggleSelection(title, item, single)}
                    activeOpacity={0.8}
                  >
                    <ThemedText style={styles.itemTxt}>{item}</ThemedText>
                  </TouchableOpacity>
                )}
              />
            )}
          </ThemedView>
        </ThemedView>
      ))}

      <View style={styles.calendarView}>
        <Calendar />
      </View>

      <View style={{
        marginTop: 30,
        padding: 20,
        gap: 20,
      }}>
        <Text style={styles.title}>Availability time slot</Text>
        <View style={styles.timeRow}>
          <View style={styles.timeView}>
            <Text style={styles.timeTxt}>10:00 AM</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeTxt}>12:00 AM</Text>
          </View>
        </View>
        <View style={styles.timeRow}>
          <View style={styles.timeView}>
            <Text style={styles.timeTxt}>13:00 AM</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeTxt}>14:00 AM</Text>
          </View>
        </View>
        <View style={styles.timeRow}>
          <View style={styles.timeView}>
            <Text style={styles.timeTxt}>14:30 AM</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeTxt}>15:00 AM</Text>
          </View>
        </View>
      </View>

      <View
        style={{
        marginTop: 30,
        padding: 20,
        gap: 20,
      }}
      >
        <Text style={styles.title}>
          Leave a message for the provider 
(Optional)
        </Text>
        <TextInput 
          multiline={true}
        numberOfLines={5}
        style={{
          height: 100,
          borderColor: '#0866FF',
          borderWidth: 1,
          padding: 10,
          textAlignVertical: 'top',
          borderRadius: 12,
        }}
        // placeholder="Enter text here..."
        />
      </View>

      <View
        style={{
        marginTop: 30,
        padding: 20,
        gap: 20,
      }}
      >
        <View style={styles.summaryView}>
          <Text style={styles.title}>Appointment summary</Text>
          <View style={{
            marginTop: 20
          }}>
            <Text style={styles.detailText}>
              Doctor: <Text style={styles.bodyText}>Dr Sandra Davis</Text>
            </Text>
            <Text style={styles.detailText}>
              Appointment type: <Text style={styles.bodyText}>Individual</Text>
            </Text>
            <Text style={styles.detailText}>
              Modality: <Text style={styles.bodyText}>In-person</Text>
            </Text>
            <Text style={styles.detailText}>
              Reason: <Text style={styles.bodyText}>Gynecology</Text>
            </Text>
            <Text style={styles.detailText}>
              Date: <Text style={styles.bodyText}>8th May, 2025</Text>
            </Text>
            <Text style={styles.detailText}>
              Time: <Text style={styles.bodyText}>12:00 AM</Text>
            </Text>
            <Text style={styles.detailText}>
              Cost: <Text style={styles.bodyText}>$75</Text>
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
        marginTop: 30,
        padding: 20,
        gap: 20,
        alignItems: 'center',
      }}
      >
        <TouchableOpacity 
        onPress={() => router.push("/Clients_world/appointment_process/payment")} 
        style={styles.payBtn} 
        activeOpacity={0.7}
        >
          <Text style={styles.payTxt}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    // paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    // marginTop: 10,
    gap: 10,
  },
  headerTitle: {
    color: "#043380",
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
  profileContainer: {
    // position: "absolute",
    // justifyContent: "center",
    // top: 100,
    alignItems: "center",
    padding: 5,
    borderRadius: 65,
    backgroundColor: "transparent",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  aboutView: {
    gap: 5,
  },
  name: {
    color: "#043380",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  specialization: {
    color: "#043380",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  itemTxt: {
    color: "#043380",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#0866FF',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 19,
    // marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    // marginVertical: 20,
    color: "#043380",
  },
  option: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#CEE0FF",
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 20,
  },
  selectedOption: { backgroundColor: "#CEE0FF", color: "white" },
  calendarView: {
    alignItems: 'center',
    padding: 10,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  timeView: {
    backgroundColor: '#F1FAFF',
    borderColor: '#0866FF',
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
  },
  title: {
    color: '#043380',
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  timeTxt: {
    color: '#0866FF',
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  summaryView: {
    borderColor: '#0866FF',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  detailText: {
    color: '#043380',
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    marginBottom: 5,
  },
  bodyText: {
    fontFamily: "OpenSans_400Regular",
  },
  payBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 70,
  },
  payTxt: {
    color: 'white',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  }
});

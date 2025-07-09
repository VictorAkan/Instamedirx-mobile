import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export const CurrentDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    const weekday = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .replace(".", "");
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return `${formattedWeekday}, ${formattedMonth} ${day}, ${year}`;
  };

  return (
    <ThemedView style={styles.dateContainer}>
      <ThemedText style={styles.dateText}>{formatDate(currentDate)}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "OpenSans_400Regular",
  },
});

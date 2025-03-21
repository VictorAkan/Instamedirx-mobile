import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For the arrow icons
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

// Type definitions
type DayData = {
    day: number;
    month: number;
    year: number;
    isCurrentMonth?: boolean;
    isTrailing?: boolean;
    isLeading?: boolean;
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const getDaysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number): number => {
        return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    };

    const getCalendarDays = (month: number, year: number): DayData[] => {
        const daysInMonth = getDaysInMonth(month, year);
        const firstDayOfMonth = getFirstDayOfMonth(month, year);
        const days: DayData[] = [];

        // Add trailing days from the previous month
        const daysInPrevMonth = getDaysInMonth(month - 1, year);
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({ day: daysInPrevMonth - i, month: month - 1, year, isTrailing: true });
        }

        // Add days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, month, year, isCurrentMonth: true });
        }

        // Add leading days from the next month
        const remainingDays = 42 - days.length; // Ensure a 6x7 grid
        for (let i = 1; i <= remainingDays; i++) {
            days.push({ day: i, month: month + 1, year, isLeading: true });
        }

        return days;
    };

    const calendarDays = getCalendarDays(currentMonth, currentYear);

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleDayPress = (dayData: DayData) => {
        setSelectedDate(new Date(dayData.year, dayData.month, dayData.day));
    };

    const isSameDate = (date1: Date | null, date2: Date): boolean => {
        if (!date1 || !date2) return false;
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView style={styles.header}>
                <TouchableOpacity onPress={goToPreviousMonth}>
                    <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <ThemedText style={styles.headerText}>
                    {months[currentMonth]} {currentYear}
                </ThemedText>
                <TouchableOpacity onPress={goToNextMonth}>
                    <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
            </ThemedView>

            {/* Days of the week */}
            <ThemedView style={styles.daysOfWeek}>
                {daysOfWeek.map((day, index) => (
                    <ThemedText key={index} style={styles.dayOfWeekText}>{day.substring(0, 3)}</ThemedText>
                ))}
            </ThemedView>

            {/* Calendar Grid */}
            <ThemedView style={styles.calendarGrid}>
                {calendarDays.map((dayData, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dayContainer,
                            isSameDate(selectedDate, new Date(dayData.year, dayData.month, dayData.day)) && styles.selectedDay,
                        ]}
                        onPress={() => handleDayPress(dayData)}
                        disabled={!dayData.isCurrentMonth} // Disable interaction with trailing/leading days if desired
                    >
                        <ThemedText
                            style={[
                                styles.dayText,
                                dayData.isTrailing && styles.trailingLeadingDayText,
                                dayData.isLeading && styles.trailingLeadingDayText,
                                isSameDate(selectedDate, new Date(dayData.year, dayData.month, dayData.day)) && styles.selectedDayText,
                            ]}
                        >
                            {dayData.day}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CEE0FF66',
        borderRadius: 20,
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#CEE0FF666',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    daysOfWeek: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: '#CEE0FF666',
    },
    dayOfWeekText: {
        fontSize: 12,
        color: '#555',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#CEE0FF666',
    },
    dayContainer: {
        width: '12.58%', // Approximate width for 7 columns
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        marginVertical: 3,
        marginHorizontal: 3,
        // borderWidth: 1, // For debugging grid layout
    },
    dayText: {
        fontSize: 16,
        color: '#333',
    },
    trailingLeadingDayText: {
        color: '#ccc',
    },
    selectedDay: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    selectedDayText: {
        color: '#fff',
    },
});

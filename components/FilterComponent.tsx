import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Entypo } from '@expo/vector-icons';

// Define types for categories and options
interface Category {
    title: string;
    options: string[];
    single?: boolean;
}

interface CategoryB {
    title: string;
    options: string[];
    single?: boolean;
}

interface FilterState {
    [key: string]: string[];
}

const categories: Category[] = [
    { title: 'Speciality', options: ['General Practitioner', 'Pharmacist', 'Dentist', 'Dermatologist', 'Gynaecologist'] },
    { title: 'Medication', options: ['Antibiotics', 'Pain relief', 'Allergies', 'Diabetes', 'Anti-hypertension', 'Supplements', 'Vitamins', 'Herbal', 'Tablets', 'Capsules', 'Syrups', 'Weight Loss', 'Anti-inflammatory', 'Anti-fungal', 'Anti-bacterial', 'Creams & Ointments', 'Malaria'] },
    { title: 'Service', options: ['Individual consultation', 'Family consultation', 'Antenatal care', 'Group consultation', 'Adolescents & children consultation'] },
    { title: 'Location', options: [] },
    { title: 'Gender', options: ['Male', 'Female'], single: true },
];

const categoriesB: CategoryB[] = [
    { title: 'Modality', options: ['In-person consultation', 'Video conference', 'Voice call', 'Message', 'Voice note'] },
    { title: 'Language', options: ['English', 'Yoruba', 'Igbo', 'Hausa'] }
];

export default function FilterPage() {
    const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
    const [price, setPrice] = useState<number>(2000);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [rating, setRating] = useState(2);

    const toggleSelection = (category: string, option: string, single: boolean = false) => {
        setSelectedFilters(prev => {
            const currentItems = prev[category] || [];

            if (single) {
                return { ...prev, [category]: [option] };
            }

            const newItems = currentItems.includes(option)
                ? currentItems.filter(item => item !== option)  // Now safely works with arrays
                : [...currentItems, option];

            return { ...prev, [category]: newItems };
        });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {categories.map(({ title, options, single }) => (
                <ThemedView style={{ paddingHorizontal: 15, }} key={title}>
                    <TouchableOpacity style={styles.categoryBtn} activeOpacity={0.8} onPress={() => setExpanded(prev => ({ ...prev, [title]: !prev[title] }))}>
                        <ThemedText style={styles.categoryTitle}>{title}</ThemedText>
                        {expanded[title] ? <Entypo name="chevron-down" size={24} color="#0755D4" /> : <Entypo name="chevron-up" size={24} color="#0755D4" />}
                    </TouchableOpacity>
                    <ThemedView>
                        {expanded[title] && options.length > 0 && (
                            <FlatList
                                data={options}
                                numColumns={2}
                                scrollEnabled={false}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.option, selectedFilters[title]?.includes(item) && styles.selectedOption]}
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
            <ThemedText style={styles.label}>Rating</ThemedText>
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={rating}
                onValueChange={setRating}
                minimumTrackTintColor="#0544AA"
                maximumTrackTintColor="#EEF8FF"
                thumbTintColor="#0544AA"
            />
            <ThemedView style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <ThemedView key={num} style={styles.starContainer}>
                        <ThemedText style={styles.number}>{num}</ThemedText>
                        <ThemedText style={[styles.star, { color: num <= rating ? '#FFD700' : '#C0C0C0' }]}>★</ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>
            {categoriesB.map(({ title, options, single }) => (
                <ThemedView style={{ paddingHorizontal: 15, }} key={title}>
                    <TouchableOpacity style={styles.categoryBtn} activeOpacity={0.8} onPress={() => setExpanded(prev => ({ ...prev, [title]: !prev[title] }))}>
                        <ThemedText style={styles.categoryTitle}>{title}</ThemedText>
                        {expanded[title] ? <Entypo name="chevron-down" size={24} color="#0755D4" /> : <Entypo name="chevron-up" size={24} color="#0755D4" />}
                    </TouchableOpacity>
                    <ThemedView>
                        {expanded[title] && options.length > 0 && (
                            <FlatList
                                data={options}
                                numColumns={2}
                                scrollEnabled={false}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.option, selectedFilters[title]?.includes(item) && styles.selectedOption]}
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
            <ThemedView style={styles.priceView}>
                <ThemedText style={styles.priceLabel}>Price range </ThemedText>
                <ThemedText style={styles.mainPrice}>{price} NGN</ThemedText>
            </ThemedView>
            <ThemedView>
                <Slider
                    style={{ width: '100%', height: 40, filter: '#0544AA' }}
                    minimumValue={0}
                    maximumValue={10000}
                    step={500}
                    value={price}
                    onValueChange={setPrice}
                />
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>
                <TouchableOpacity style={styles.applyButton}><ThemedText style={styles.buttonText}>Apply Filter</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.clearButton}>Clear</ThemedText></TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    categoryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTxt: {
        color: '#043380',
        fontSize: 15,
        fontFamily: 'OpenSans_600SemiBold',
    },
    priceView: {
        marginHorizontal: 20,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainPrice: {
        color: '#9F9900',
        fontFamily: 'OpenSans_600SemiBold',
        fontSize: 16,
    },
    categoryTitle: { fontSize: 16, fontFamily: 'OpenSans_600SemiBold', marginVertical: 20, color: '#0755D4' },
    option: { padding: 5, borderWidth: 1, borderColor: '#CEE0FF', borderRadius: 10, margin: 5, paddingHorizontal: 20, },
    selectedOption: { backgroundColor: '#CEE0FF', color: 'white' },
    priceLabel: { fontSize: 16, fontFamily: 'OpenSans_600SemiBold', marginVertical: 10, color: '#0755D4', },
    buttonContainer: { flexDirection: 'row', marginTop: 20, marginHorizontal: 20, marginBottom: 30, alignItems: 'center' },
    applyButton: { backgroundColor: '#0866FF', padding: 10, borderRadius: 15, paddingHorizontal: 20 },
    buttonText: { color: 'white', fontFamily: 'OpenSans_700Bold', fontSize: 14 },
    clearButton: { color: '#043380', fontFamily: 'OpenSans_700Bold', marginLeft: 30, fontSize: 16 },
    label: {
        fontSize: 16, fontFamily: 'OpenSans_600SemiBold', marginVertical: 10, color: '#0755D4', marginHorizontal: 20,
    },
    slider: {
        width: '90%',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 10,
        marginHorizontal: 20,
    },
    starContainer: {
        alignItems: 'center',
    },
    number: {
        fontSize: 14,
        color: '#000',
        fontWeight: 400,
    },
    star: {
        fontSize: 18,
    },
});

import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  View,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";

interface FilterData {
  categories: string[];
  brands: string[];
  forms: string[];
  datePeriod: string;
  customStartDate: string | null;
  customEndDate: string | null;
  expiryPeriod: string;
  rating: number;
  popularity: string;
  inventoryStatus: string[];
  priceRange: number;
  searchQuery: string;
}

interface PharmacyFilterScreenProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (filterData: FilterData) => void;
}

interface FilterChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

type SectionKey =
  | "category"
  | "brand"
  | "form"
  | "dateAdded"
  | "expiryDate"
  | "rating"
  | "popularity"
  | "inventoryStatus"
  | "priceRange";

// Static filter options
const CATEGORIES = [
  "Antibiotics",
  "Pain relief",
  "First aid",
  "Anti-diabetes",
  "Anti-hypertension",
  "Supplements",
  "Vitamins",
  "Wearables",
  "STD",
  "Toiletries",
  "Syrups",
  "Weight Loss",
];
const BRANDS = [
  "Emzor",
  "May & Baker",
  "Drugfield",
  "Bond",
  "Qualihealth",
  "Safco",
  "Swiss",
  "Sygen",
  "Tuyil",
];
const FORMS = [
  "Tablet",
  "Capsule",
  "Injection",
  "Syrup",
  "Powder/Sachet",
  "Lozenge",
  "Solution",
];
const DATE_PERIODS = [
  "Custom period",
  "This week",
  "Last week",
  "This month",
  "Last month",
  "This year",
  "Last year",
];
const EXPIRY_PERIODS = [
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months",
];
const POPULARITY_OPTIONS = [
  "Best sellers",
  "Most viewed",
  "Highest rated",
  "Trending",
];
const INVENTORY_STATUS_OPTIONS = [
  "Out of stock",
  "Expired",
  "In stock",
  "Near expiry",
];

const PharmacyFilterScreen: React.FC<PharmacyFilterScreenProps> = ({
  visible,
  onClose,
  onApplyFilter,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedDatePeriod, setSelectedDatePeriod] = useState<string>("");
  const [customStartDate, setCustomStartDate] = useState<string>("28/08/2024");
  const [customEndDate, setCustomEndDate] = useState<string>("17/01/2025");
  const [selectedExpiryPeriod, setSelectedExpiryPeriod] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedPopularity, setSelectedPopularity] = useState<string>("");
  const [selectedInventoryStatus, setSelectedInventoryStatus] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    form: true,
    dateAdded: true,
    expiryDate: true,
    rating: true,
    popularity: true,
    inventoryStatus: true,
    priceRange: true,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setCustomStartDate(selectedDate.toLocaleDateString("en-GB"));
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setCustomEndDate(selectedDate.toLocaleDateString("en-GB"));
    }
  };

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleSelection = (
    item: string,
    selectedArray: string[],
    setSelectedArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter((selected) => selected !== item));
    } else {
      setSelectedArray([...selectedArray, item]);
    }
  };

  const FilterChip: React.FC<FilterChipProps> = ({
    title,
    selected,
    onPress,
  }) => (
    <TouchableOpacity
      style={[styles.filterChip, selected && styles.selectedChip]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedText
        style={[styles.chipText, selected && styles.selectedChipText]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );

  const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    expanded,
    onToggle,
    children,
  }) => (
    <ThemedView style={styles.filterSection}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#0544AA"
        />
      </TouchableOpacity>
      {expanded && (
        <ThemedView style={styles.sectionContent}>{children}</ThemedView>
      )}
    </ThemedView>
  );

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedForms([]);
    setSelectedDatePeriod("");
    setSelectedExpiryPeriod("");
    setSelectedRating(0);
    setSelectedPopularity("");
    setSelectedInventoryStatus([]);
    setPriceRange(5000);
    setSearchQuery("");
  };

  const applyFilters = () => {
    const filterData: FilterData = {
      categories: selectedCategories,
      brands: selectedBrands,
      forms: selectedForms,
      datePeriod: selectedDatePeriod,
      customStartDate:
        selectedDatePeriod === "Custom period" ? customStartDate : null,
      customEndDate:
        selectedDatePeriod === "Custom period" ? customEndDate : null,
      expiryPeriod: selectedExpiryPeriod,
      rating: selectedRating,
      popularity: selectedPopularity,
      inventoryStatus: selectedInventoryStatus,
      priceRange: priceRange,
      searchQuery: searchQuery,
    };

    onApplyFilter(filterData);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>Filters</ThemedText>
        </ThemedView>
        <ThemedView style={styles.searchInputContainer}>
          {isInputFocused && (
            <>
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                activeOpacity={0.7}
                style={styles.clearButtonX}
              >
                <Ionicons name="close" size={20} color="#0544AA" />
              </TouchableOpacity>
              <ThemedView style={styles.separator} />
            </>
          )}
          <TextInput
            style={styles.searchInput}
            placeholder="Search filters..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8F8F8F"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <MaterialIcons name="search" size={24} color="#0544AA" />
        </ThemedView>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <FilterSection
            title="Categories"
            expanded={expandedSections.category}
            onToggle={() => toggleSection("category")}
          >
            <View style={styles.chipContainer}>
              {CATEGORIES.map((category) => (
                <FilterChip
                  key={category}
                  title={category}
                  selected={selectedCategories.includes(category)}
                  onPress={() =>
                    toggleSelection(
                      category,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Brands"
            expanded={expandedSections.brand}
            onToggle={() => toggleSection("brand")}
          >
            <View style={styles.chipContainer}>
              {BRANDS.map((brand) => (
                <FilterChip
                  key={brand}
                  title={brand}
                  selected={selectedBrands.includes(brand)}
                  onPress={() =>
                    toggleSelection(brand, selectedBrands, setSelectedBrands)
                  }
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Forms"
            expanded={expandedSections.form}
            onToggle={() => toggleSection("form")}
          >
            <View style={styles.chipContainer}>
              {FORMS.map((form) => (
                <FilterChip
                  key={form}
                  title={form}
                  selected={selectedForms.includes(form)}
                  onPress={() =>
                    toggleSelection(form, selectedForms, setSelectedForms)
                  }
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Date Added"
            expanded={expandedSections.dateAdded}
            onToggle={() => toggleSection("dateAdded")}
          >
            <View style={styles.chipContainer}>
              {DATE_PERIODS.map((period) => (
                <FilterChip
                  key={period}
                  title={period}
                  selected={selectedDatePeriod === period}
                  onPress={() => setSelectedDatePeriod(period)}
                />
              ))}
            </View>
            {selectedDatePeriod === "Custom period" && (
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerWrapper}>
                  <View style={styles.dateField}>
                    <ThemedText style={styles.dateLabel}>Start Date</ThemedText>
                    <TouchableOpacity
                      style={styles.dateInput}
                      onPress={() => setShowStartDatePicker(true)}
                    >
                      <ThemedText style={styles.dateText}>
                        {customStartDate}
                      </ThemedText>
                      <MaterialCommunityIcons
                        name="calendar-range-outline"
                        size={20}
                        color="#0544AA"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.dateFieldDivider} />
                  <View style={styles.dateField}>
                    <ThemedText style={styles.dateLabel}>End Date</ThemedText>
                    <TouchableOpacity
                      style={styles.dateInput}
                      onPress={() => setShowEndDatePicker(true)}
                    >
                      <ThemedText style={styles.dateText}>
                        {customEndDate}
                      </ThemedText>
                      <MaterialCommunityIcons
                        name="calendar-range-outline"
                        size={20}
                        color="#0544AA"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </FilterSection>
          <FilterSection
            title="Expiry Date"
            expanded={expandedSections.expiryDate}
            onToggle={() => toggleSection("expiryDate")}
          >
            <View style={styles.chipContainer}>
              {EXPIRY_PERIODS.map((period) => (
                <FilterChip
                  key={period}
                  title={period}
                  selected={selectedExpiryPeriod === period}
                  onPress={() => setSelectedExpiryPeriod(period)}
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Rating"
            expanded={expandedSections.rating}
            onToggle={() => toggleSection("rating")}
          >
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.ratingSlider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={selectedRating || 1}
                onValueChange={(val) => setSelectedRating(val)}
                minimumTrackTintColor="#0866FF"
                maximumTrackTintColor="#E5E5E5"
                thumbTintColor="#0866FF"
              />
              <View style={styles.ratingTicks}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <View key={i} style={styles.ratingTick} />
                ))}
              </View>
            </View>
            <View style={styles.ratingStarsContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.ratingStarWrapper}>
                  <Ionicons
                    name={i <= selectedRating ? "star" : "star-outline"}
                    size={20}
                    color={i <= selectedRating ? "#FFD700" : "#D6D6D6"}
                  />
                  <ThemedText style={styles.ratingStarLabel}>{i}</ThemedText>
                </View>
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Popularity"
            expanded={expandedSections.popularity}
            onToggle={() => toggleSection("popularity")}
          >
            <View style={styles.chipContainer}>
              {POPULARITY_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  title={option}
                  selected={selectedPopularity === option}
                  onPress={() => setSelectedPopularity(option)}
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Inventory Status"
            expanded={expandedSections.inventoryStatus}
            onToggle={() => toggleSection("inventoryStatus")}
          >
            <View style={styles.chipContainer}>
              {INVENTORY_STATUS_OPTIONS.map((status) => (
                <FilterChip
                  key={status}
                  title={status}
                  selected={selectedInventoryStatus.includes(status)}
                  onPress={() =>
                    toggleSelection(
                      status,
                      selectedInventoryStatus,
                      setSelectedInventoryStatus
                    )
                  }
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection
            title="Price Range"
            expanded={expandedSections.priceRange}
            onToggle={() => toggleSection("priceRange")}
          >
            <View style={styles.priceRangeContainer}>
              <View style={styles.priceRangeHeader}>
                <ThemedText style={styles.priceRangeTitle}>Price range</ThemedText>
                <ThemedText style={styles.priceRangeValue}>
                  {Math.round(priceRange).toLocaleString()} NGN
                </ThemedText>
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  style={{ width: "100%", height: 40 }}
                  minimumValue={0}
                  maximumValue={10000}
                  onValueChange={setPriceRange}
                  value={priceRange}
                  minimumTrackTintColor="#0866FF"
                  maximumTrackTintColor="#E5E5E5"
                  thumbTintColor="#0866FF"
                />
              </View>
              <View style={styles.priceInputsContainer}>
                <View style={styles.priceInputWrapper}>
                  <ThemedText style={styles.priceInputLabel}>0</ThemedText>
                </View>
                <View style={styles.priceInputWrapper}>
                  <ThemedText style={styles.priceInputLabel}>10000</ThemedText>
                </View>
              </View>
            </View>
          </FilterSection>
        </ScrollView>
        <ThemedView style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={applyFilters}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.applyButtonText}>Apply Filter</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearAllFilters}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
      {showStartDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          onChange={onStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          onChange={onEndDateChange}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1FAFF",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
    textAlign: "center",
    flex: 1,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1FAFF",
    gap: 12,
  },
  applyButton: {
    backgroundColor: "#0866FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  clearButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#043380",
  },
  clearButtonX: {
    padding: 2,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 27,
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginVertical: 12,
    borderColor: "#808080",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    marginLeft: 4,
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: "#D6D6D6",
    marginHorizontal: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
  },
  sectionContent: {
    marginTop: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ADCCFF",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: "#0866FF",
    borderColor: "#0866FF",
  },
  chipText: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#043380",
  },
  selectedChipText: {
    color: "#fff",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
  },
  clearButtonText: {
    color: "#043380",
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
  },
  datePickerContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  datePickerWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  dateField: {
    flex: 1,
    gap: 8,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ADCCFF",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#043380",
  },
  dateFieldDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: "OpenSans_400Regular",
    color: "#666666",
  },
  ratingContainer: {
    gap: 12,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 2,
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#043380",
    marginLeft: 8,
  },
  ratingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D6D6D6",
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
  selectedRatingDot: {
    borderColor: "#0866FF",
    backgroundColor: "#0866FF",
  },
  priceRangeContainer: {
    paddingVertical: 8,
  },
  priceRangeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  priceRangeTitle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0544AA",
  },
  priceRangeValue: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#0866FF",
  },
  sliderContainer: {
    marginBottom: 16,
  },
  priceInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  priceInputLabel: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#666666",
  },
  sliderWrapper: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    paddingVertical: 12,
  },
  ratingSlider: {
    width: "90%",
    height: 40,
  },
  ratingTicks: {
    position: "absolute",
    top: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingTick: {
    width: 2,
    height: 8,
    backgroundColor: "#8F8F8F",
  },
  ratingStarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 8,
  },
  ratingStarWrapper: {
    alignItems: "center",
  },
  ratingStarLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "OpenSans_400Regular",
    color: "#043380",
  },
});

export default PharmacyFilterScreen;
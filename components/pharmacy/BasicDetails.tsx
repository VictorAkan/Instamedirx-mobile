import { View, Text, TextInput, TouchableOpacity,Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export interface BasicDetailsData {
  productCategory?: string;
  medicationCategory?: string;
  brand?: string;
  manufacturer?: string;
  name?: string;
  price?: string;
  weight?: string;
  dosageForm?: string;
  stockUnits?: string;
  sku?: string;
  expiryDate?: string;
  description?: string;
}
const sampleWeights = ['500mg', '1g', '5g'];
const sampleDosageForms = ['Tablet', 'Capsule', 'Syrup'];
const sampleProductCategories = ['Prescription', 'Over-the-counter', 'Medical Supplies', 'Supplements'];
const sampleMedicationCategories = ['Antibiotics', 'Painkillers', 'Antiviral', 'Vitamins', 'Anti-inflammatory'];

function generateSKU(name: string, manufacturer: string): string {
  return `SKU-${name?.slice(0, 3).toUpperCase()}${manufacturer?.slice(0, 3).toUpperCase()}${Date.now()}`;
}
interface Props {
  data: BasicDetailsData;
  onUpdate: (data: BasicDetailsData) => void;
}

export function BasicDetails({ data, onUpdate }: Props) {
  const [autoGenerateSKU, setAutoGenerateSKU] = useState(true);
  
  const [showWeightDropdown, setShowWeightDropdown] = useState(false);
  const [showDosageFormDropdown, setShowDosageFormDropdown] = useState(false);
  return (
    <View style={{ gap: 48 }}>
      
      <View>
        <ThemedText style={{ 
          fontSize: 20, 
          fontFamily: "OpenSans_700Bold",
          color: "#0544AA",
          marginBottom: 16 
        }}>Add Product Manually</ThemedText>
        
       <View style={{ 
  borderWidth: 1, 
  borderStyle: 'dashed',
  borderColor: '#CEE0FF',
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
  position: 'relative' 
}}>
  <Text style={{ 
    color: '#8F8F8F',
    marginBottom: 8,
    fontFamily: "OpenSans_300Light",paddingBottom: 48
  }}>Take a snapshot or upload product image to autofill</Text>
  <View style={{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    left: 16,
    gap: 8
  }}>
    <MaterialIcons name="camera-enhance" size={24} color="#0544AA" />
    <MaterialIcons name="attach-file" size={24} color="#0544AA" />
  </View>
</View>
      </View>

      {/* Category Details */}
      <View style={{ gap: 24 }}>
        <ThemedText style={{ 
          fontSize: 16, 
          color: '#043380',
          fontFamily: "OpenSans_600SemiBold"
        }}>Category Details</ThemedText>
        
       <View style={{
  borderWidth: 1,
  borderColor: '#CEE0FF',
  borderRadius: 12,
  overflow: 'hidden'
}}>
  <Picker
    selectedValue={data.productCategory}
    onValueChange={(itemValue) => onUpdate({ ...data, productCategory: itemValue })}
    style={{
      height: 56,
      width: '100%'
    }}>
    <Picker.Item label="Product category" value="" color="#8F8F8F" />
    {sampleProductCategories.map((category) => (
      <Picker.Item key={category} label={category} value={category} />
    ))}
  </Picker>
</View>

<View style={{
  borderWidth: 1,
  borderColor: '#CEE0FF',
  borderRadius: 12,
  overflow: 'hidden'
}}>
  <Picker
    selectedValue={data.medicationCategory}
    onValueChange={(itemValue) => onUpdate({ ...data, medicationCategory: itemValue })}
    style={{
      height: 56,
      width: '100%'
    }}>
    <Picker.Item label="Medication Category" value="" color="#8F8F8F" />
    {sampleMedicationCategories.map((category) => (
      <Picker.Item key={category} label={category} value={category} />
    ))}
  </Picker>
</View>

        <TextInput 
          value={data.brand}
          onChangeText={(text) => onUpdate({ ...data, brand: text })}
          placeholder="Brand"
          placeholderTextColor="#8F8F8F"
          style={{
            height: 56,
            borderWidth: 1,
            borderColor: '#CEE0FF',
            borderRadius: 12,
            padding: 10,
            fontFamily: "OpenSans_400Regular"
          }}
        />

        <TextInput 
          value={data.manufacturer}
          onChangeText={(text) => onUpdate({ ...data, manufacturer: text })}
          placeholder="Manufacturer"
          placeholderTextColor="#8F8F8F"
          style={{
            height: 56,
            borderWidth: 1,
            borderColor: '#CEE0FF',
            borderRadius: 12,
            padding: 10,
            fontFamily: "OpenSans_400Regular"
          }}
        />
      </View>
      {/* Product Details */}
  <View style={{ gap: 24 }}>
    <ThemedText style={{ 
      fontSize: 16, 
      color: '#043380',
      fontFamily: "OpenSans_600SemiBold"
    }}>Product Details</ThemedText>

    <TextInput 
      value={data.name}
      onChangeText={(text) => onUpdate({ ...data, name: text })}
      placeholder="Name"
      placeholderTextColor="#8F8F8F"
      style={{
        height: 56,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderRadius: 12,
        padding: 10,
        fontFamily: "OpenSans_400Regular"
      }}
    />

    <TextInput 
      value={data.price}
      onChangeText={(text) => onUpdate({ ...data, price: text })}
      placeholder="Price"
      placeholderTextColor="#8F8F8F"
      keyboardType="numeric"
      style={{
        height: 56,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderRadius: 12,
        padding: 10,
        fontFamily: "OpenSans_400Regular"
      }}
    />

   <View style={{
  borderWidth: 1,
  borderColor: '#CEE0FF',
  borderRadius: 12,
  overflow: 'hidden'
}}>
  <Picker
    selectedValue={data.weight}
    onValueChange={(itemValue) => onUpdate({ ...data, weight: itemValue })}
    style={{
      height: 56,
      width: '100%'
    }}>
    <Picker.Item label="Select Weight" value="" color="#8F8F8F" />
    {sampleWeights.map((weight) => (
      <Picker.Item key={weight} label={weight} value={weight} />
    ))}
  </Picker>
</View>

 

  <View style={{
  borderWidth: 1,
  borderColor: '#CEE0FF',
  borderRadius: 12,
  overflow: 'hidden'
}}>
  <Picker
    selectedValue={data.dosageForm}
    onValueChange={(itemValue) => onUpdate({ ...data, dosageForm: itemValue })}
    style={{
      height: 56,
      width: '100%'
    }}>
    <Picker.Item label="Select Dosage Form" value="" color="#8F8F8F" />
    {sampleDosageForms.map((form) => (
      <Picker.Item key={form} label={form} value={form} />
    ))}
  </Picker>
</View>

    {showDosageFormDropdown && (
      <View style={{
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderRadius: 12,
        backgroundColor: 'white',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
      }}>
        {sampleDosageForms.map((form, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onUpdate({ ...data, dosageForm: form });
              setShowDosageFormDropdown(false);
            }}
            style={{
              padding: 10,
              borderBottomWidth: index < sampleDosageForms.length - 1 ? 1 : 0,
              borderBottomColor: '#CEE0FF',
            }}>
            <Text style={{ fontFamily: "OpenSans_400Regular" }}>{form}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}

    <TextInput 
      value={data.stockUnits}
      onChangeText={(text) => onUpdate({ ...data, stockUnits: text })}
      placeholder="Stock Units"
      placeholderTextColor="#8F8F8F"
      keyboardType="numeric"
      style={{
        height: 56,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderRadius: 12,
        padding: 10,
        fontFamily: "OpenSans_400Regular"
      }}
    />
  </View>

  {/* More Details */}
  <View style={{ gap: 24 }}>
    <ThemedText style={{ 
      fontSize: 16, 
      color: '#043380',
      fontFamily: "OpenSans_600SemiBold"
    }}>More Details</ThemedText>

    <View>
       <Text style={{ 
        color: '#8F8F8F', 
        fontFamily: "OpenSans_400Regular",
        marginBottom: 8 
      }}>
        Auto-generate SKU (Stock Keeping Unit)
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <TextInput 
          value={data.sku}
          onChangeText={(text) => onUpdate({ ...data, sku: text })}
          placeholder="SKU"
          placeholderTextColor="#8F8F8F"
          style={{
            flex: 1,
            height: 56,
            borderWidth: 1,
            borderColor: '#CEE0FF',
            borderRadius: 12,
            padding: 10,
            fontFamily: "OpenSans_400Regular"
          }}
          editable={!autoGenerateSKU}
        />
<Switch 
  value={autoGenerateSKU}
  onValueChange={(value) => {
    setAutoGenerateSKU(value);
    if (value) {
      onUpdate({ ...data, sku: generateSKU(data.name || '', data.manufacturer || '') });
    }
  }}
  trackColor={{ false: "#CEE0FF", true: "#f1faff" }}
  thumbColor={autoGenerateSKU ? "#0544AA" : "#f4f3f4"}
  style={{
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]  
  }}
/>
      </View>
     
    </View>

    <TextInput 
      value={data.expiryDate}
      onChangeText={(text) => onUpdate({ ...data, expiryDate: text })}
      placeholder="Expiry Date"
      placeholderTextColor="#8F8F8F"
      style={{
        height: 56,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderRadius: 12,
        padding: 10,
        fontFamily: "OpenSans_400Regular"
      }}
    />

    <TextInput 
      value={data.description}
      onChangeText={(text) => onUpdate({ ...data, description: text })}
      placeholder="Description"
      placeholderTextColor="#8F8F8F"
      multiline
      style={{
        height: 120,
        borderWidth: 1,
        borderColor: '#CEE0FF',
        borderRadius: 12,
        padding: 10,
        fontFamily: "OpenSans_400Regular",
        textAlignVertical: 'top'
      }}
    />
  </View>
    </View>
  );
}
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';

const pry20 = '#0544AA';
const yellow40 = '#C6C000';


export interface AdditionalInfoData {
  nafdac?: string;
  contraindications?: string;
  indications?: string;
  sideEffects?: string;
  activeIngredients?: string;
  minimumStockAlert?: string;
  supplier?: string;
  packetSize?: string;
  suggestedDose?: string;
  discount?: string;
  discountAvailable?: boolean;
  prescriptionRequired?: boolean;
}


interface AdditionalInfoProps {
  data: AdditionalInfoData;
  onUpdate: (data: AdditionalInfoData) => void;
  onSkip?: () => void;
}

export function AdditionalInfo({ data, onUpdate, onSkip }: AdditionalInfoProps) {
  
  const updateField = (field: keyof AdditionalInfoData, value: string | boolean) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

 
  const discountOptions = [
    { label: 'Select discount percentage', value: '' },
    { label: '5%', value: '5' },
    { label: '10%', value: '10' },
    { label: '15%', value: '15' },
    
    { label: '45%', value: '45' },
    { label: '50%', value: '50' }
  ];

  const fieldMappings = [
    { key: 'nafdac', label: 'NAFDAC' },
    { key: 'contraindications', label: 'Contraindications & warnings' },
    { key: 'indications', label: 'Indications' },
    { key: 'sideEffects', label: 'Side effects' },
    { key: 'activeIngredients', label: 'Active ingredients' },
    { key: 'minimumStockAlert', label: 'Minimum stock alert' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'packetSize', label: 'Packet size' }
  ];

  return (
    <View style={styles.container}>
      
      <View style={styles.headerRow}>
        <ThemedText style={styles.headerTitle}>Additional Information</ThemedText>
       <TouchableOpacity onPress={onSkip}>
          <ThemedText style={styles.skipText}>Skip</ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.subtitle}>Provide additional details about the product</ThemedText>

      
      {fieldMappings.map((field) => (
        <View key={field.key} style={styles.inputField}>
          <TextInput
            placeholder={field.label}
            value={data[field.key as keyof AdditionalInfoData] as string || ''}
            onChangeText={(value) => updateField(field.key as keyof AdditionalInfoData, value)}
            style={styles.textInput}
            placeholderTextColor="#666"
          />
        </View>
      ))}
      
     
      <View style={styles.inputField}>
        <TextInput
          placeholder="Suggest dosage"
          keyboardType="numeric"
          value={data.suggestedDose || ''}
          onChangeText={(value) => updateField('suggestedDose', value)}
          style={styles.textInput}
          placeholderTextColor="#666"
        />
      </View>
      
    
      <View style={[styles.pickerContainer, !data.discountAvailable && styles.dimmed]}>
        <Picker
          selectedValue={data.discount || ''}
          style={styles.picker}
          onValueChange={(itemValue) => updateField('discount', itemValue)}
          enabled={data.discountAvailable}
        >
          {discountOptions.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value}
              color={!data.discountAvailable ? '#999' : '#000'}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.checkboxRow}>
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => updateField('discountAvailable', !data.discountAvailable)}
        >
          <View style={[styles.checkbox, data.discountAvailable && styles.checkboxChecked]}>
            {data.discountAvailable && (
              <MaterialIcons name="check" size={16} color="#FFFFFF" />
            )}
          </View>
          
          <ThemedText style={styles.checkboxLabel}>Discount available</ThemedText>
        </TouchableOpacity>
      </View>

      
      <View style={styles.toggleRowLeft}>
        <ThemedText style={styles.toggleLabel}>Prescription needed</ThemedText>
        <Switch
          value={data.prescriptionRequired || false}
          onValueChange={(value) => updateField('prescriptionRequired', value)}
          trackColor={{ false: '#E5E7EB', true: pry20 }}
          thumbColor={data.prescriptionRequired ? '#FFFFFF' : '#FFFFFF'}
        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%'
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: pry20,
    fontFamily: "OpenSans_700Bold"
  },
  skipText: { 
    fontSize: 14, 
    fontWeight: '400', 
    color: yellow40,
    fontFamily: "OpenSans_400Regular"
  },
  subtitle: { 
    fontSize: 14, 
    fontWeight: '400', 
    color: '#666', 
     
    marginBottom: 24,
    fontFamily: "OpenSans_400Regular"
  },
  inputField: { 
    height: 56, 
    borderWidth: 1, 
    borderColor: "#CEE0FF", 
    borderRadius: 12, 
    justifyContent: 'center', 
    paddingHorizontal: 16, 
    marginBottom: 16,
    backgroundColor: '#FFFFFF'
  },
  textInput: { 
    fontSize: 14, 
    fontWeight: '400', 
    color: '#000',
    flex: 1,
    fontFamily: "OpenSans_400Regular"
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-start'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: pry20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  checkboxChecked: {
    backgroundColor: pry20
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '400',
   
    fontFamily: "OpenSans_400Regular"
  },
  pickerContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: '#CEE0FF',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  picker: {
    height: 56,
    color: '#000',
    fontFamily: "OpenSans_400Regular"
  },
  toggleRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
    justifyContent: 'flex-start'
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '400',
    
    fontFamily: "OpenSans_400Regular"
  },
  discountSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 56, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    paddingHorizontal: 16, 
    marginBottom: 16 
  },
  discountInput: { 
    flex: 1, 
    fontSize: 14, 
    fontWeight: '400',
    fontFamily: "OpenSans_400Regular"
  },
  toggleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16, 
    width: '100%', 
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  optionLabel: { 
    fontSize: 16, 
    fontWeight: '400', 
    color: pry20,
    fontFamily: "OpenSans_400Regular"
  },
  dimmed: { 
    opacity: 0.5 
  }
});
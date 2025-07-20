import { View, Text, ScrollView, Pressable, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { BasicDetails, BasicDetailsData } from '@/components/pharmacy/BasicDetails';
import { AdditionalInfo, AdditionalInfoData } from '@/components/pharmacy/AdditionalInfo';
import { UploadImages, UploadImagesData } from '@/components/pharmacy/UploadImages';
import CancelUploadModal from '@/components/pharmacy/cancel'; 

export default function ManualAddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [basicDetails, setBasicDetails] = useState<BasicDetailsData>({});
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoData>({});
const [uploadImages, setUploadImages] = useState<UploadImagesData>({ images: {} });
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const handleProceed = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      
      console.log('Final data:', { basicDetails, additionalInfo, uploadImages });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    router.back(); 
  };

  const handleReturn = () => {
    setIsModalVisible(false); 
  };

 const getCurrentComponent = () => {
  switch (currentStep) {
    case 1:
      return <BasicDetails data={basicDetails} onUpdate={setBasicDetails} />;
    case 2:
      return (
        <AdditionalInfo 
          data={additionalInfo} 
          onUpdate={setAdditionalInfo}
          onSkip={handleProceed} 
        />
      );
    case 3:
      return <UploadImages data={uploadImages} onUpdate={setUploadImages} />;
    default:
      return null;
  }
};

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setIsModalVisible(true); 
      return true; 
    });

    return () => backHandler.remove(); 
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 0, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 ,backgroundColor: '#f1faff',paddingHorizontal: 16, paddingVertical: 12}}>
            <Pressable onPress={() => setIsModalVisible(true)}> 
              <MaterialIcons name="arrow-back" size={24} color="#0544AA" />
            </Pressable>
            
            <View style={{ flex: 1, alignItems: 'center',padding:16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {[1, 2, 3].map((step) => (
                  <View key={step} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 24,
                      height: 24,
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: '#0544AA',
                      opacity: step > currentStep ? 0.2 : 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#0544AA' }}>{step}</Text>
                    </View>
                    {step < 3 && (
                      <View style={{
                        width: 40,
                        height: 2,
                        backgroundColor: '#0544AA',
                        opacity: step + 1 > currentStep ? 0.2 : 1,
                        marginHorizontal: 12
                      }} />
                    )}
                  </View>
                ))}
              </View>
              
              {/* Step Labels */}
              <View style={{ flexDirection: 'row', marginTop: 8, width: '100%', justifyContent: 'space-between' }}>
                <ThemedText style={{ 
                  opacity: currentStep === 1 ? 1 : 0.2,
                  fontSize: 12,
                  fontFamily: "OpenSans_600SemiBold"
                }}>Basic Details</ThemedText>
                <ThemedText style={{ 
                  opacity: currentStep === 2 ? 1 : 0.2,
                  fontSize: 12,
                  fontFamily: "OpenSans_600SemiBold"
                }}>Additional Info</ThemedText>
                <ThemedText style={{ 
                  opacity: currentStep === 3 ? 1 : 0.2,
                  fontSize: 12,
                  fontFamily: "OpenSans_600SemiBold"
                }}>Upload Images</ThemedText>
              </View>
            </View>
          </View>

          <View style={{ padding:10,  marginHorizontal: 5 }}>
          {getCurrentComponent()}

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 64 }}>
            <TouchableOpacity 
              onPress={handleProceed}
              style={{
                backgroundColor: '#0866FF',
                borderRadius: 12,
                padding: 6,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12
              }}>
              <Text style={{ 
                color: '#FFFFFF',
                fontFamily: "OpenSans_700Bold",
                fontSize: 14,
                letterSpacing: 0.56,
                lineHeight: 28
              }}>{currentStep === 3 ? 'Submit' : 'Proceed'}</Text>
              <View style={{
                width: 24,
                height: 24,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialIcons name="arrow-forward" size={16} color="#0866FF" />
              </View>
            </TouchableOpacity>

           <TouchableOpacity 
  onPress={() => {
    if (currentStep === 1) {
      setIsModalVisible(true);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }} 
  style={{
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#0544AA'
  }}>
  <Text style={{ 
    color: '#0544AA',
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
    letterSpacing: 0.56,
    lineHeight: 28
  }}>{currentStep > 1 ? 'Back' : 'Cancel'}</Text>
</TouchableOpacity>
          </View>
          </View>
        </View>
      </ScrollView>

      
      <CancelUploadModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onReturn={handleReturn}
      />
    </SafeAreaView>
  );
}
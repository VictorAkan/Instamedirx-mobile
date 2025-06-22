import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';

type FormData = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  proof: string | null;
};

const BankTransfer = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      proof: null,
    }
  });

  const pickImage = async (onChange: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("/Doctors_world/checkout_screens/bank-transfer-progress");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={24} color="#032255" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Bank Transfer</Text>

        {/* details view */}
        <View style={styles.detailsView}>
          <Text style={styles.title}>
            Enter sender details (as it appears on the transfer)
          </Text>

          <View style={styles.inputCollectionView}>
            <View>
              <Text style={styles.labelText}>Sender's Account Name</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Account name is required',
                  minLength: {
                    value: 2,
                    message: 'Account name must be at least 2 characters'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.input,
                      errors.accountName && styles.errorInput
                    ]}
                  />
                )}
                name="accountName"
              />
              {errors.accountName && (
                <Text style={styles.errorText}>{errors.accountName.message}</Text>
              )}
            </View>
            
            <View>
              <Text style={styles.labelText}>Account Number</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Account number is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Account number must contain only numbers'
                  },
                  minLength: {
                    value: 10,
                    message: 'Account number must be at least 10 digits'
                  },
                  maxLength: {
                    value: 16,
                    message: 'Account number must not exceed 16 digits'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      errors.accountNumber && styles.errorInput
                    ]}
                  />
                )}
                name="accountNumber"
              />
              {errors.accountNumber && (
                <Text style={styles.errorText}>{errors.accountNumber.message}</Text>
              )}
            </View>
            
            <View>
              <Text style={styles.labelText}>Bank Name</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Bank name is required',
                  minLength: {
                    value: 2,
                    message: 'Bank name must be at least 2 characters'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.input,
                      errors.bankName && styles.errorInput
                    ]}
                  />
                )}
                name="bankName"
              />
              {errors.bankName && (
                <Text style={styles.errorText}>{errors.bankName.message}</Text>
              )}
            </View>

            <Controller
              control={control}
              rules={{
                required: 'Proof of payment is required'
              }}
              render={({ field: { onChange, value } }) => (
                <Pressable 
                  onPress={() => pickImage(onChange)} 
                  style={styles.uploadView}
                >
                  {value ? (
                    <ImageBackground
                      source={{ uri: value }}
                      style={styles.imageBackground}
                    >
                      <Image
                        source={require("../../../../assets/images/cameraplus.png")}
                        style={styles.cameraIcon}
                      />
                      <Text style={styles.uploadText}>
                        Upload proof of payment while we confirm your transaction
                      </Text>
                    </ImageBackground>
                  ) : (
                    <View style={styles.uploadContent}>
                      <Image
                        source={require("../../../../assets/images/cameraplus.png")}
                        style={styles.cameraIcon}
                      />
                      <Text style={styles.uploadText}>
                        Upload proof of payment while we confirm your transaction
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
              name="proof"
            />
            {errors.proof && (
              <Text style={styles.errorText}>{errors.proof.message}</Text>
            )}
          </View>

          <View style={styles.pressContainer}>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={styles.pressView}
            >
              <Text style={styles.bankButtonText}>Done</Text>
              <View style={styles.arrowView}>
                <AntDesign name="arrowright" size={15} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#04338099",
  },
  detailsView: {
    backgroundColor: "#F1FAFF",
    borderRadius: 12,
    paddingTop: 24,
    paddingBottom: 64,
    paddingHorizontal: 12,
    gap: 32,
    marginTop: 10,
  },
  title: {
    color: "#043380",
    fontSize: 20,
    fontFamily: "OpenSans_400Regular",
  },
  inputCollectionView: {
    gap: 12,
  },
  labelText: {
    color: "#04338099",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  input: {
    borderColor: "#04338099",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  uploadView: {
    borderStyle: "dashed",
    borderColor: "#04338099",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 24,
    marginTop: 20,
  },
  uploadContent: {
    alignItems: "center",
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 32,
    height: 32,
  },
  uploadText: {
    color: "#04338099",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  bankButtonText: {
    color: "#043380",
    fontSize: 14,
    fontFamily: "OpenSans_700Bold",
    paddingVertical: 6,
  },
  arrowView: {
    borderRadius: 24,
    backgroundColor: "#043380",
    width: 24,
    height: 24,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pressView: {
    borderWidth: 1,
    borderColor: "#043380",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pressContainer: {
    alignItems: "flex-start",
  },
});
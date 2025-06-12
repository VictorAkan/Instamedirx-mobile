import React, { useState, useCallback, FC } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

interface RegTextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: any;
  label?: string;
  secureTextEntry?: boolean;
  required?: boolean;
  name: string;
  [key: string]: any;
}

const RegTextInput: FC<RegTextInputProps> = ({
  label,
  placeholder,
  placeholderTextColor = '#B2B2B2',
  style,
  secureTextEntry = false,
  required = false,
  name,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!errors[name];

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={required ? { required: 'This field is required' } : undefined}
      render={({ field }) => (
        <View style={{ marginBottom: 20 }}>
           <View style={[styles.container, style]}>
          {label && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>
                {label}
                {required && <Text style={styles.requiredText}>*</Text>}
              </Text>
            </View>
          )}
          <TextInput
            style={[
              styles.inputStyle,
              hasError && { borderColor: '#ED0404' },
              !hasError && isFocused && { borderColor: '#7335FA' },
            ]}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={value => {
              field.onChange(value);
              trigger(name);
            }}
            onBlur={() => {
              field.onBlur();
              setIsFocused(false);
            }}
            onFocus={handleFocus}
            value={field.value}
            {...rest}
          />
          
        </View>
        {hasError && (
            <Text style={styles.errorText}>
              {String(errors[name]?.message)}
            </Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#0866FF',
    borderRadius: 12,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    // marginBottom: 20,
    marginHorizontal: 27,
    height: 52,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputStyle: {
    fontSize: 16,
    // paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
  },
  label: {
    position: 'absolute',
    top: -20,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    color: '#043380',
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
  },
  requiredText: {
    color: '#E90E0E',
  },
  errorText: {
    color: '#ED0404',
    fontSize: 12,
    marginBottom: 20,
    marginHorizontal: 27,
  },
});

export default React.memo(RegTextInput);

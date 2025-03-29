import { TextInput, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function RegTextInput({
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    style,
    label,
    secureTextEntry,
    required,
    ...rest
}: any) {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>{label}<ThemedText style={styles.requiredText}>{required && '*'}</ThemedText></ThemedText>
            <TextInput
                style={styles.inputStyle}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                {...rest}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderWidth: 1,
        borderColor: '#0866FF',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        marginHorizontal: 27,
        height: 52,
    },
    inputStyle: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 5,
        color: 'black',
    },
    label: {
        position: 'absolute',
        top: -12,
        left: 15,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        color: '#043380',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    requiredText: {
        color: '#E90E0E',
    }
})
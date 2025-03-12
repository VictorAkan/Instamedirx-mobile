import { TextInput, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function CustomTextInput({
    value,
    onChangeText,
    placeholder,
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
                value={value}
                {...rest}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 12,
    },
    inputStyle: {
        borderRadius: 18,
        borderColor: '#007AFF',
        borderWidth: 1,
        height: 40,
    },
    label: {
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'InriaSerif_700Bold',
    },
    requiredText: {
        color: '#E90E0E',
    }
})
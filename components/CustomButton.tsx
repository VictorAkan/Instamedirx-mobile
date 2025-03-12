import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

export function CustomBtn({
    value,
    route
}: any) {
    return (
        <Link href={route} asChild>
            <TouchableOpacity style={styles.btn} activeOpacity={0.9}>
                <ThemedText style={styles.buttonTxt}>
                    {value}
                </ThemedText>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#0866FF",
        padding: 10,
        alignItems: 'center',
        borderRadius: 21,
        height: 45,
    },
    buttonTxt: {
        color: "#FFFFFF",
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
    }
})
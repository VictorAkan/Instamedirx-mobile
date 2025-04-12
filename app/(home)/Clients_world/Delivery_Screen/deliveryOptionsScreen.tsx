import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const deliveryOptions = [
    {
        id: 1,
        title: 'Click and collect',
        description:
            'Order online and pick up your medications at our various store loc...',
    },
    {
        id: 2,
        title: 'Home Delivery',
        description:
            'Order online and pick up your medications at our various store loc...',
        recommended: true,
    },
    {
        id: 3,
        title: 'Delivery Partner Services',
        description:
            'Order online and pick up your medications at our various store loc...',
    },
];


const deliveryOptionsScreen = () => {

    const [selected, setSelected] = useState(2);

    const router = useRouter();
      const handleProceed = () => {
          router.push("/ClientScreen/Delivery_Screen/PaymentScreen");
      };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, marginBottom: 20 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.pageTitle}>Checkout</Text>
                </View>
            </TouchableOpacity>

            {/* Stepper */}
            <View style={styles.stepper}>
                <View style={styles.stepItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
                    <Text style={styles.stepTextActive}>Shipping</Text>
                </View>
                <View style={styles.stepLine} />
                <View style={styles.stepItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#0066FF" />
                    <Text style={styles.stepText}>Delivery</Text>
                </View>
                <View style={styles.stepLine} />
                <View style={styles.stepItem}>
                    <Ionicons name="ellipse-outline" size={16} color="#0066FF" />
                    <Text style={styles.stepText}>Payment</Text>
                </View>
            </View>

            {/* Cart Summary */}
            <View style={styles.cartBox}>
                <View style={styles.cartRow}>
                    <Text style={styles.cartItemsText}>4 items in Cart</Text>
                    <MaterialIcons name="edit" size={20} color="#0066FF" />
                </View>
                <View style={styles.cartRow}>
                    <Text style={styles.cartTotalLabel}>Total</Text>
                    <Text style={styles.cartTotalValue}>₦14,000</Text>
                </View>
            </View>

            {/* Delivery Method */}
            <Text style={styles.deliveryTitle}>DELIVERY METHOD</Text>
            {deliveryOptions.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    onPress={() => setSelected(option.id)}
                    style={[
                        styles.optionBox,
                        selected === option.id && styles.optionBoxActive,
                    ]}
                >
                    <View style={styles.optionHeader}>
                        <View style={styles.radioRow}>
                            <View
                                style={[
                                    styles.radioOuter,
                                    selected === option.id && styles.radioOuterActive,
                                ]}
                            >
                                {selected === option.id && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.optionTitle}>{option.title}</Text>
                        </View>
                        <Entypo name="chevron-down" size={18} color="gray" />
                    </View>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                    {option.recommended && (
                        <View style={styles.recommendedTag}>
                            <Text style={styles.recommendedText}>Recommended</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}

            {/* Proceed to Payment Button */}
            <TouchableOpacity style={styles.paymentButton} onPress={handleProceed}>
                <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
                <Ionicons
                    name="arrow-forward-circle"
                    size={20}
                    color="#fff"
                    style={{ marginLeft: 8 }}
                />
            </TouchableOpacity>
            <Text style={styles.paymentNote}>
                *View delivery mode and shipping cost in checkout
            </Text>
        </ScrollView>
    )
}

export default deliveryOptionsScreen

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        color: "#0066FF",
    },


    stepper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    stepItem: {
        alignItems: "center",
        flexDirection: "column",
    },
    stepText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#0066FF",
    },
    stepTextActive: {
        marginLeft: 4,
        fontSize: 12,
        color: "#0066FF",
    },
    stepLine: {
        width: 20,
        height: 1,
        backgroundColor: "#0066FF",
        marginHorizontal: 6,
    },

    stepLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    cartBox: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 16,
        marginBottom: 25,
        shadowColor: "#0066FF",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        elevation: 4,
        marginTop: 30,
    },
    cartRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cartItemsText: {
        color: "#0066FF",
    },
    cartTotalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#0066FF",
    },
    cartTotalValue: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0066FF',
    },


    deliveryTitle: {
        fontWeight: 'bold',
        color: '#0066FF',
        marginBottom: 38,
        marginTop: 20,
    },
    optionBox: {
        borderWidth: 1,
        borderColor: '#0066FF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    optionBoxActive: {
        borderColor: '#0066FF',
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0066FF',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterActive: {
        borderColor: '#0066FF',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0066FF',
    },
    optionTitle: {
        fontWeight: 'bold',
        color: "#0066FF",
    },
    optionDescription: {
        marginTop: 4,
        fontSize: 13,
        color: '#0066FF',
    },
    recommendedTag: {
        backgroundColor: '#d1f5d3',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 6,
        alignSelf: 'flex-start',
    },
    recommendedText: {
        fontSize: 12,
        color: '#2e7d32',
    },
    paymentButton: {
        backgroundColor: '#0066FF',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 65,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "70%",
    },
    paymentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 8,
    },
    paymentNote: {
        fontSize: 12,
        color: '#0066FF',
        textAlign: 'center',
        marginTop: 6,
    },
});

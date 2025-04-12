import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput

} from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const PaymentScreen = () => {

    const [selectedMethod, setSelectedMethod] = useState('card');


    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                    <Ionicons name="checkmark-circle" size={16} color="#0066FF" />
                    <Text style={styles.stepText}>Payment</Text>
                </View>
            </View>


            {/* Order Summary */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>4 items in Cart</Text>
                    <AntDesign name="down" size={20} color="#0066FF" />
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryRowText}>Sub Total</Text>
                    <Text style={styles.summaryRowText}>₦14,000</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryRowText}>Delivery Fee</Text>
                    <Text style={styles.summaryRowText}>₦2,000</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>₦16,000</Text>
                </View>
            </View>

            {/* Payment Method */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
                {/* Card Method */}
                <TouchableOpacity onPress={() => setSelectedMethod('card')} style={styles.radioItem}>
                    <View style={[styles.radioCircle, selectedMethod === 'card' && styles.radioSelected]} />
                    <Text style={styles.radioLabel}>Debit/Credit Card</Text>
                </TouchableOpacity>
                {selectedMethod === 'card' && (
                    <>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput style={styles.input} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Card Number</Text>
                            <TextInput style={styles.input} keyboardType="numeric" />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Card Number</Text>
                                <TextInput style={[styles.input, styles.halfInputone]} />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Cvv</Text>
                                <TextInput style={[styles.input, styles.halfInputtwo]} />
                            </View>
                        </View>
                    </>
                )}

                {/* Other methods */}
                {['bank', 'ussd', 'cash'].map(method => (
                    <TouchableOpacity key={method} onPress={() => setSelectedMethod(method)} style={styles.radioItem}>
                        <View style={[styles.radioCircle, selectedMethod === method && styles.radioSelected]} />
                        <Text style={styles.radioLabel}>
                            {method === 'bank' ? 'Bank Transfer' : method === 'ussd' ? 'USSD' : 'Cash on Delivery'}
                        </Text>
                    </TouchableOpacity>
                ))}

            </View>


            {/* Pay Button */}
            <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay ₦16,000</Text>
                <Ionicons
                    name="arrow-forward-circle"
                    size={20}
                    color="#fff"
                    style={{ marginLeft: 8 }}
                />
            </TouchableOpacity>
        </ScrollView >
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        backgroundColor: '#fff',
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
    card: {
        backgroundColor: '#f9f9f9',
        padding: 14,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 1,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 14,
        color: "#0066FF",
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20
    },
    summaryText: {
        marginBottom: 10,
        color: "#0066FF",
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
        color: "#0066FF",
    },
    summaryRowText: {
        color: "#0066FF",
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#0066FF",
    },

    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 30,

    },
    radioCircle: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#007bff',
        marginRight: 10,

    },
    radioSelected: {
        backgroundColor: '#007bff',
    },
    radioLabel: {
        fontSize: 14,
        color: "#0066FF",
    },
    input: {
        borderWidth: 1,
        borderColor: '#0066FF',
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },


    inputGroup: {
        marginBottom: 24,
        position: "relative",
    },
    inputLabel: {
        position: "absolute",
        top: -10,
        left: 12,
        backgroundColor: "#fff",
        paddingHorizontal: 4,
        fontSize: 12,
        color: "#0066FF",
        zIndex: 1,
        fontWeight: "500",
    },
    halfInputone: {
        width: 200,
    },
    halfInputtwo: {
        width: 50,
    },

    payButton: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: "70%",
    },
    payButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

});

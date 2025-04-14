import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Linking } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useState } from 'react';
import { FontAwesome, FontAwesome6, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const QualificationsComponent = () => {
    const [showFullText, setShowFullText] = useState(false);
    const [selectedHMO, setSelectedHMO] = useState('');

    const handleDirection = (url: string) => {
        Linking.openURL(url);
    };

    const fullText = `As a dedicated and compassionate gynecologist with 5 years of experience, I am committed to providing personalized, high-quality care to women at every stage of life. My online consultation service is designed to offer a safe, convenient, and confidential space where patients can discuss their health concerns and receive expert advice without the need to visit a clinic in person.`;
    const previewText = fullText.substring(0, 130) + '...';
    // Array of specialties as shown in the image
    const specialties = [
        'Gynaecology',
        'Female health',
        'Adolescent health',
        'Family planning',
        'Mental Trauma',
        'Mental Trauma',
        'Mental Trauma',
        'Mental Trauma',
        'Mental Trauma',
        'Mental Trauma',
        'Mental Trauma',
        'Mental Trauma',
        'Physiotherapy',
    ];

    const modalities = [
        "Video conferencing",
        "audio calls",
        "voice notes",
        "in-person consultation",
    ];

    const paymentMethods = [
        "Cash",
        "Debit Card",
        "Bank Transfer",
        "USSD",
    ];

    const reviews = [
        {
            id: 1,
            rating: 4.5,
            title: "“Dr. Okoli was amazing”",
            description:
                "Dr.Okoli has a vast range of specialist prescription medicines which require a physician's prescription.",
            author: "Anonymous",
            date: "11/12/2024",
        },
        {
            id: 2,
            rating: 4.5,
            title: "“Dr. Okoli was amazing”",
            description:
                "Dr.Okoli has a vast range of specialist prescription medicines which require a physician's prescription.",
            author: "Anonymous",
            date: "11/12/2024",
        },
    ];

    const consultations = [
        {
            consultation: "Individual Consultation",
            price: "NGN 10,000",
        },
        {
            consultation: "Family Consultation",
            price: "NGN 20,000",
        }, {
            consultation: "Group Consultation",
            price: "NGN 20,000",
        }, {
            consultation: "Antenatal care",
            price: "NGN 15,000",
        }, {
            consultation: "Adolescents & Children Consultation",
            price: "NGN 25,000",
        },
    ]

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<MaterialIcons key={i} name="star-border-purple500" size={18} color="#EEE600" />);
            } else {
                stars.push(<MaterialIcons key={i} name="star-border" size={18} color="#D6D6D6" />);
            }
        }
        return stars;
    };

    const ReviewCard = ({ item }: { item: typeof reviews[0] }) => (
        <ThemedView style={styles.reviewCard}>
            <ThemedView style={styles.ratingRow}>
                {renderStars(item.rating)}
                <ThemedText style={styles.ratingNumber}>{item.rating}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.reviewTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.reviewDescription}>{item.description}</ThemedText>
            <ThemedView style={styles.reviewerRow}>
                <ThemedView style={styles.iconCircle}>
                    <FontAwesome name="user-o" size={20} color="#003366" />
                </ThemedView>
                <ThemedView style={{ marginLeft: 10 }}>
                    <ThemedText style={styles.anonymous}>Anonymous</ThemedText>
                    <ThemedText style={styles.date}>{item.date}</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );

    return (
        <ThemedView style={styles.container}>
            {/* Personal Statement Section */}
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Personal Statement</ThemedText>
                <ThemedText style={styles.statementText}>
                    {showFullText ? fullText : previewText}
                </ThemedText>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowFullText(prev => !prev)}>
                    <ThemedText style={styles.readMore}>{showFullText ? 'Show less' : 'Read more'}</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* Specialties Section */}
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Specialties</ThemedText>
                <ThemedView style={styles.tagsContainer}>
                    {specialties.map((specialty, index) => (
                        <ThemedView key={index} style={styles.tagItem}>
                            <ThemedText style={styles.tagText}>{specialty}</ThemedText>
                        </ThemedView>
                    ))}
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Modalities</ThemedText>
                {modalities.map((modality, index) => (
                    <ThemedView key={index} style={styles.modalityRow}>
                        <ThemedView style={styles.radioOuter}>
                            <ThemedView style={styles.radioInner} />
                        </ThemedView>
                        <ThemedText style={styles.modalityText}>{modality}</ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Reviews</ThemedText>
                <ThemedView style={styles.reviewView}>
                    <FlatList
                        data={reviews}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ReviewCard item={item} />}
                        scrollEnabled={false}
                    />
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Consultation Fees</ThemedText>
                <ThemedText style={styles.feesTitle}>•  fees are charges per session</ThemedText>
                {consultations.map((cons, id) => (
                    <TouchableOpacity style={styles.consRow} key={id} activeOpacity={0.7}>
                        <ThemedText style={styles.consText}>{cons.consultation}</ThemedText>
                        <ThemedText style={styles.consPrice}>{cons.price}</ThemedText>
                    </TouchableOpacity>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Medical Qualifications</ThemedText>

                {/* Degrees */}
                <ThemedText style={styles.subHeader}>Degrees</ThemedText>
                <View style={styles.bulletContainer}>
                    <ThemedText style={styles.bulletPoint}>•</ThemedText>
                    <ThemedText style={styles.bulletText}>MBBS (Bachelor of Medicine, Bachelor of Surgery)</ThemedText>
                </View>
                <View style={styles.bulletContainer}>
                    <ThemedText style={styles.bulletPoint}>•</ThemedText>
                    <ThemedText style={styles.bulletText}>MPH (Master of Public Health)</ThemedText>
                </View>

                {/* Certifications */}
                <ThemedText style={styles.subHeader}>Certifications</ThemedText>
                <View style={styles.bulletContainer}>
                    <ThemedText style={styles.bulletPoint}>•</ThemedText>
                    <ThemedText style={styles.bulletText}>Diploma in Reproductive Health (DRH)</ThemedText>
                </View>
                <View style={styles.bulletContainer}>
                    <ThemedText style={styles.bulletPoint}>•</ThemedText>
                    <ThemedText style={styles.bulletText}>FMCOG (Fellowship of the Medical College of Obstetricians and Gynecologists)</ThemedText>
                </View>
                <View style={styles.bulletContainer}>
                    <ThemedText style={styles.bulletPoint}>•</ThemedText>
                    <ThemedText style={styles.bulletText}>Certificate in Ultrasonography</ThemedText>
                </View>

                {/* License */}
                <ThemedText style={styles.subHeader}>License</ThemedText>
                <ThemedText style={styles.licenseText}>NIG-MED-112233</ThemedText>
                <ThemedText style={styles.licenseText}>MDCN/12345/2024</ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Payment Methods</ThemedText>
                {paymentMethods.map((pm, index) => (
                    <ThemedView key={index} style={styles.modalityRow}>
                        <ThemedView style={styles.radioOuter}>
                            <ThemedView style={styles.radioInner} />
                        </ThemedView>
                        <ThemedText style={styles.modalityText}>{pm}</ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Accepted HMOs</ThemedText>
                <ThemedView style={styles.dropdownWrapper}>
                    <Picker
                        selectedValue={selectedHMO}
                        onValueChange={(itemValue) => setSelectedHMO(itemValue)}
                        style={styles.dropdown}
                        dropdownIconColor="#043380"
                    >
                        <Picker.Item label="Leadway Health Insurance" value="leadway" />
                        <Picker.Item label="AXA Mansard" value="axa" />
                        <Picker.Item label="Hygeia HMO" value="hygeia" />
                    </Picker>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Address</ThemedText>

                <ThemedText style={styles.subHeader}>Office Address</ThemedText>
                <ThemedText style={styles.paragraph}>
                    4, Victoria street, off Queens avenue, Ikeja, Lagos State
                </ThemedText>

                <TouchableOpacity style={styles.button} onPress={() => handleDirection('https://maps.google.com')}>
                    <ThemedText style={styles.buttonText}>Get Direction</ThemedText>
                    <ThemedView style={styles.arrowView}>
                        <Feather name="arrow-up-right" size={20} color="white" />
                    </ThemedView>
                </TouchableOpacity>

                {/* Hospital Section */}
                <ThemedText style={styles.subHeader}>Affiliated Hospital</ThemedText>
                <ThemedText style={styles.paragraph}>
                    Ikeja Municipal Hospital, 24 Igbobi Street, off Allen Avenue, Ikeja, Lagos State.
                </ThemedText>

                <TouchableOpacity style={styles.button} onPress={() => handleDirection('https://maps.google.com')}>
                    <ThemedText style={styles.buttonText}>Get Direction</ThemedText>
                    <ThemedView style={styles.arrowView}>
                        <Feather name="arrow-up-right" size={20} color="white" />
                    </ThemedView>
                </TouchableOpacity>

                {/* Work Experience Section */}
                <ThemedText style={styles.sectionTitle}>Work Experience</ThemedText>
                <ThemedText style={styles.jobTitle}>National Orthopaedic Hospital, Igbobi, Lagos</ThemedText>
                <ThemedText style={styles.dateText}>Mar 2024 - Present</ThemedText>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Performed gynecological surgeries, including hysterectomies, laparoscopies, and D&C procedures.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Conducted routine gynecological examinations, including Pap smears, pelvic exams, and breast exams.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Diagnosed and managed gynecological conditions such as endometriosis, fibroids, and PCOS.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Collaborated with other healthcare professionals to provide holistic care for complex cases.
                    </ThemedText>
                </ThemedView>


                <ThemedText style={styles.jobTitle}>Iwo Road General Hospital, Iwo ROAD, ibadan, Oyo State</ThemedText>
                <ThemedText style={styles.dateText}>Feb 2021 - Mar 2024</ThemedText>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Performed gynecological surgeries, including hysterectomies, laparoscopies, and D&C procedures.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Participated in clinical research projects related to women's health.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Diagnosed and managed gynecological conditions such as endometriosis, fibroids, and PCOS.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Conducted routine gynecological examinations, including Pap smears, pelvic exams, and breast exams.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.bulletItem}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.addressBulletText}>
                        Collaborated with other healthcare professionals to provide holistic care for complex cases.
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#0866FF',
        marginBottom: 10,
        marginTop: 10,
    },
    statementText: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
    },
    readMore: {
        color: '#8055AA',
        fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
        marginTop: 5,
        textAlign: 'right',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagItem: {
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        margin: 7,
        borderColor: '#CEE0FF',
        borderWidth: 1,
    },
    tagText: {
        color: '#032255',
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
    },
    modalityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: 4,
    },
    modalityText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
    },
    reviewCard: {
        // backgroundColor: '#f5fbff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        // borderColor: '#e6f3ff',
        // borderWidth: 1,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingNumber: {
        marginLeft: 8,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
    },
    reviewTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#043380',
        marginBottom: 8,
    },
    reviewDescription: {
        fontSize: 14,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 16,
        width: '95%',
    },
    reviewerRow: {
        // flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    reviewView: {
        backgroundColor: '#F1FAFF',
        padding: 10,
        borderRadius: 10,
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#043380',
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 5,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#043380',
    },
    iconCircle: {
        borderWidth: 1,
        borderColor: '#003366',
        borderRadius: 50,
        // width: 36,
        // height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        padding: 12,
        paddingHorizontal: 14,
        marginLeft: 24,
        // alignSelf: 'center',
    },
    anonymous: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
        color: '#043380',
        textAlign: 'center',
    },
    date: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
        color: '#043380CC',
        textAlign: 'center',
    },
    feesTitle: {
        color: '#6B6B6B',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        marginBottom: 20,
    },
    consRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F1FAFF',
        padding: 15,
        marginBottom: 10,
        paddingVertical: 20
    },
    consText: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        width: '50%',
    },
    consPrice: {
        color: '#043380',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
    },
    subHeader: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#043380',
        marginTop: 16,
        marginBottom: 8,
    },
    bulletContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bulletPoint: {
        fontSize: 16,
        lineHeight: 22,
        marginRight: 6,
        color: '#1A1A1A',
    },
    bulletText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
        color: '#043380CC',
    },
    licenseText: {
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
        color: '#043380CC',
        marginBottom: 4,
    },
    dropdownWrapper: {
        borderWidth: 1,
        borderColor: '#0544AA',
        borderRadius: 15,
        // overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#F1FAFF',
    },
    dropdown: {
        // height: 50,
        color: '#043380CC',
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
    },
    paragraph: {
        fontSize: 16,
        color: '#043380CC',
        marginTop: 4,
        marginBottom: 10,
        fontFamily: 'OpenSans_400Regular',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#F1FAFF',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: '#043380',
        borderWidth: 1,
    },
    buttonText: {
        color: '#043380',
        marginRight: 4,
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    icon: {
        marginTop: 1,
    },
    jobTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans_700Bold',
        color: '#043380',
        marginBottom: 2,
        marginTop: 20,
    },
    dateText: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingRight: 8,
    },
    bullet: {
        fontSize: 20,
        lineHeight: 40,
        marginRight: 6,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
    },
    addressBulletText: {
        fontSize: 16,
        color: '#043380CC',
        fontFamily: 'OpenSans_400Regular',
        flex: 1,
        lineHeight: 40,
    },
    arrowView: {
        borderRadius: 20,
        backgroundColor: '#043380',
        padding: 2,
    }
});

export default QualificationsComponent;

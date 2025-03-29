import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Entypo, FontAwesome6, AntDesign } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const EditDocProfile = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const router = useRouter();

    const pickImage = async (setImage: any) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.coverImageContainer} onPress={() => pickImage(setCoverImage)}>
                <Image
                    source={coverImage ? { uri: coverImage } : { uri: "https://whatever.com" }}
                    style={styles.coverImage}
                />
                <ThemedView style={styles.headerView}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
                        <AntDesign name="arrowleft" size={24} color="#032255" />
                    </TouchableOpacity>
                </ThemedView>
                <ThemedView style={styles.coverView}>
                    <Entypo name="camera" size={24} color="#043380" />
                    <ThemedText style={styles.addCoverText}>Add cover image</ThemedText>
                </ThemedView>
            </TouchableOpacity>

            <ThemedView style={styles.body}>
                <View style={styles.profileSection}>
                    <Image
                        source={profileImage ? { uri: profileImage } : require("../../../assets/images/docprofile.png")}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.updatePhotoButton} onPress={() => pickImage(setProfileImage)} activeOpacity={0.8}>
                        <ThemedText style={styles.updatePhotoText}>Update photo</ThemedText>
                    </TouchableOpacity>
                </View>

                <ThemedView style={styles.optionsContainer}>
                    <Link href="/Doctors_world/edit_profile_screens/personal_information" asChild>
                        <TouchableOpacity style={styles.optionItem} activeOpacity={0.8}>
                            <ThemedText style={styles.optionText}>Personal information</ThemedText>
                            <FontAwesome6 name="angle-right" size={22} color="#043380" />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/Doctors_world/edit_profile_screens/professional_details" asChild>
                        <TouchableOpacity style={styles.optionItem} activeOpacity={0.8}>
                            <ThemedText style={styles.optionText}>Professional details</ThemedText>
                            <FontAwesome6 name="angle-right" size={22} color="#043380" />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/Doctors_world/edit_profile_screens/change_password" asChild>
                        <TouchableOpacity style={styles.optionItem} activeOpacity={0.8}>
                            <ThemedText style={styles.optionText}>Change password</ThemedText>
                            <FontAwesome6 name="angle-right" size={22} color="#043380" />
                        </TouchableOpacity>
                    </Link>
                </ThemedView>

                <ThemedText style={styles.sectionTitle}>Qualifications</ThemedText>

                <ThemedText style={styles.subTitle}>Licenses/Certification</ThemedText>
                <ThemedView style={styles.qualificationItem}>
                    <Image source={require("../../../assets/images/diploma.png")} style={styles.qualificationImage} />
                    <ThemedView>
                        <ThemedText style={styles.qualificationText}>Lagos State University</ThemedText>
                        <ThemedText style={styles.qualificationText}>Medicine & Surgery</ThemedText>
                        <ThemedText style={styles.qualificationSubText}>September 2020</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedText style={styles.subTitle}>Degrees/Diplomas</ThemedText>
                <ThemedView style={styles.qualificationItem}>
                    <Image source={require("../../../assets/images/diploma.png")} style={styles.qualificationImage} />
                    <ThemedView>
                        <ThemedText style={styles.qualificationText}>Lagos State University</ThemedText>
                        <ThemedText style={styles.qualificationText}>Medicine & Surgery</ThemedText>
                        <ThemedText style={styles.qualificationSubText}>September 2020</ThemedText>
                    </ThemedView>
                </ThemedView>
                <TouchableOpacity style={styles.editBtn}>
                    <ThemedText style={styles.editTxt}>Edit</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, flexGrow: 1, backgroundColor: '#d5d4d7' },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 20,
        marginTop: 40,
        paddingVertical: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        backgroundColor: '#d5d4d7',
        left: 2,
    },
    body: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#fff",
    },
    coverImageContainer: { alignItems: "center", padding: 20, backgroundColor: "#d5d4d7" },
    coverImage: { width: "100%", height: 150, resizeMode: "cover" },
    coverView: {
        position: "absolute",
        top: 60,
        backgroundColor: "#d5d4d7",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    addCoverText: {
        color: "#043380", fontSize: 15,
        fontFamily: 'Inter_500Medium',
    },
    profileSection: { alignItems: "center", marginTop: -60, },
    profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#fff" },
    updatePhotoButton: { backgroundColor: "#CEE0FF", padding: 10, borderRadius: 20, marginTop: 10, paddingHorizontal: 15, },
    updatePhotoText: {
        color: "#043380", fontSize: 14,
        fontFamily: 'OpenSans_700Bold',
    },
    optionsContainer: { padding: 20 },
    optionItem: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionText: { fontSize: 16, color: "#043380", fontFamily: 'Inter_700Bold', },
    sectionTitle: {
        color: "#043380", fontSize: 16,
        fontFamily: 'Inter_700Bold', marginLeft: 20, marginTop: 10, marginBottom: 20,
    },
    subTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', marginLeft: 20, marginTop: 20, color: "#043380" },
    qualificationItem: { flexDirection: "row", alignItems: "center", margin: 20 },
    qualificationImage: { marginRight: 25 },
    qualificationText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#043380' },
    qualificationSubText: { fontSize: 14, color: "#043380", fontFamily: 'Inter_400Regular', },
    editBtn: {
        padding: 15,
        borderColor: "#043380",
        borderWidth: 1,
        marginBottom: 30,
        borderRadius: 15,
        marginHorizontal: 90,
        marginTop: 20,
    },
    editTxt: {
        textAlign: 'center',
        fontSize: 15, fontFamily: 'Inter_500Medium', color: '#043380'
    },
});

export default EditDocProfile;

import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f8fafc',
                },
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                },
            }}
        >
            <Stack.Screen name="index" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="signup_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="forgot_password" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="verify_code" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="new_password" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/(tabs)" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/doc_messages_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/docs_main_profile" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/doc_calender" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/doctors_chats/[id]" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/pharm_drugs_categories/[id]" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/client_registration" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/email_verificaion" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/doctors_registration_screens/doctors_registration" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/doctors_registration_screens/doctors_details" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/doctors_registration_screens/doctors_qualifications" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/pharmacists_registration_screens/pharmacists_registration" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/pharmacists_registration_screens/pharmacists_qualifications" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="registration_screens/pharmacists_registration_screens/pharmacists_details" options={{
                headerShown: false,
            }} />
        </Stack>
    )
}
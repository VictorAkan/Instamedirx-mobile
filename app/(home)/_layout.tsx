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

            {/* Client's routes */}
            <Stack.Screen name="Clients_world/(tabs)" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/client_messages_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/clients_chats/[id]" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/patients_report" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/docs_list_filter" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/my_profile" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/client_cart_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/product_details/[id]" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/product_details/store_details" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/pharm_shop" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/doctors_profile" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Clients_world/product_details/store_products" options={{
                headerShown: false,
            }} />


            {/* Doctor's routes */}
            <Stack.Screen name="Doctors_world/(tabs)" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/doc_messages_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/doc_cart_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/edit_doc_profile" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/edit_profile_screens/change_password" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/edit_profile_screens/personal_information" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/edit_profile_screens/professional_details" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Delivery_screens/delivery_options" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Delivery_screens/home_delivery" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Delivery_screens/click_and_collect" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Delivery_screens/order_tracking" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Delivery_screens/payment" options={{
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
            <Stack.Screen name="Doctors_world/product_details/[id]" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/product_details/pharmcy_store_details" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/pharm_drugs_categories/[id]" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Call_screens/call_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/Call_screens/video_call_screen" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Doctors_world/product_details/store_products" options={{
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
            <Stack.Screen name="registration_screens/doctors_registration_screens/doc_email_verification" options={{
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
            <Stack.Screen name="registration_screens/pharmacists_registration_screens/pharm_email_verification" options={{
                headerShown: false,
            }} />
        </Stack>
    )
}
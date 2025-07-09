import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

// Dummy doctor image (replace with your own asset or remote URL)
const doctorImg = require('../../../../assets/images/apptclientprofile.png'); // Place a placeholder doctor image here

const TABS = ['Upcoming', 'Completed', 'Cancelled'];

const appointments = [
  // {
  //   id: 1,
  //   name: 'Dr. Chisom Okoli',
  //   specialty: 'Psychiatrist',
  //   date: 'Tuesday, March 15',
  //   time: '10:00AM',
  //   type: 'Video consultation',
  //   status: 'Pending',
  // },
  {
    id: 2,
    name: 'Stephany Lawson',
    specialty: 'Client',
    date: 'Tuesday, March 15',
    time: '10:00AM',
    type: 'Video consultation',
    status: 'Upcoming',
  },
  {
    id: 3,
    name: 'Stephany Lawson',
    specialty: 'Client',
    date: 'Tuesday, March 15',
    time: '10:00AM',
    type: 'Video consultation',
    status: 'Completed',
    followUp: true,
  },
  {
    id: 4,
    name: 'Stephany Lawson',
    specialty: 'Client',
    date: 'Tuesday, March 15',
    time: '10:00AM',
    type: 'Video consultation',
    status: 'Cancelled',
  },
];

function AppointmentCard({ appointment, tab }: any) {
  return (
    <View
      style={[
        styles.card,
        tab === 'Cancelled' && styles.cancelledCard,
      ]}
    >
      <View style={styles.row}>
        <Image source={doctorImg} style={[styles.avatar, 
          tab === 'Cancelled' && styles.avatarRound,
        ]} />
        <View style={styles.info}>
          <Text style={[styles.name, 
            tab === 'Cancelled' && {
              color: '#664488',
            }
          ]}>{appointment.name}</Text>
          <Text style={[styles.specialty, 
            tab === 'Cancelled' && {
              color: '#664488',
            }
          ]}>{appointment.specialty}</Text>
          {tab === 'Pending' && (
            <View style={styles.detailsRow}>
            <View style={styles.detailRow}>
              <MaterialIcons name="date-range" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="schedule" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Feather name="video" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.type}</Text>
            </View>
          </View>
          )}
          {tab === 'Upcoming' && (
            <View style={styles.detailsRow}>
            <View style={styles.detailRow}>
              <MaterialIcons name="date-range" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="schedule" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Feather name="video" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.type}</Text>
            </View>
          </View>
          )}
          {tab === 'Completed' && (
            <View style={styles.detailsRow}>
            <View style={styles.detailRow}>
              <MaterialIcons name="date-range" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="schedule" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Feather name="video" size={18} color="#B4C2D9" />
              <Text style={styles.detailText}>{appointment.type}</Text>
            </View>
          </View>
          )}
        </View>
        <TouchableOpacity style={styles.closeBtn}>
          <Ionicons name="close" size={24} color={tab === 'Cancelled' ? "#664488" : "#043380"} />
        </TouchableOpacity>
      </View>
      {tab === 'Pending' && (
        <TouchableOpacity style={styles.completeBtn}>
          <Text style={styles.completeBtnText}>Complete Booking</Text>
        </TouchableOpacity>
      )}
      {tab === 'Upcoming' && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.joinBtn}>
            <Text style={styles.joinBtnText}>Join Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rescheduleBtn}>
            <Text style={styles.rescheduleBtnText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      )}
      {tab === 'Completed' && (
        <TouchableOpacity
          style={appointment.followUp ? styles.followUpBtn : styles.bookAgainBtn}
        >
          <Text style={styles.followUpBtnText}>
            {appointment.followUp ? 'Book Follow-up' : 'Book Again'}
          </Text>
        </TouchableOpacity>
      )}
      {tab === 'Cancelled' && (
        <TouchableOpacity style={styles.initiateBtn}>
          <Text style={styles.initiateBtnText}>Initiate Booking</Text>
        </TouchableOpacity>
      )}
      {/* Follow-up badge */}
      {tab === 'Completed' && appointment.followUp && (
        <View style={styles.followUpBadge}>
          <Text style={styles.followUpBadgeText}>Follow-up Required</Text>
        </View>
      )}
    </View>
  );
}

export default function AppointmentTabs() {
  const [activeTab, setActiveTab] = useState('Upcoming');

  // Filter appointments based on tab
  const filtered = appointments.filter(
    (a) => a.status === activeTab || (activeTab === 'Completed' && a.status === 'Completed')
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                <AntDesign name="arrowleft" size={24} color="#032255" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Appointments</Text>
            </View>
      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === tab && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sectional Notices */}
      {activeTab === 'Upcoming' && (
        <Text style={styles.sectionText}>These are your upcoming appointments!</Text>
      )}
      {activeTab === 'Completed' && (
        <Text style={styles.sectionText}>Follow up patients you’ve consulted.</Text>
      )}
      {activeTab === 'Cancelled' && (
        <Text style={styles.sectionText}>Reschedule your cancelled appointments!</Text>
      )}

      {/* Appointment Cards */}
      <ScrollView style={styles.cardsList}>
        {filtered.map((appt) => (
          <View key={appt.id}>
            <AppointmentCard appointment={appt} tab={activeTab} />
            <AppointmentCard appointment={appt} tab={activeTab} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    // marginTop: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    color: "#043380",
    marginLeft: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#F7FAFC',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#C6C000',
  },
  tabText: {
    fontSize: 16,
    color: '#B4C2D9',
    fontFamily: "OpenSans_600SemiBold",
  },
  tabTextActive: {
    color: '#0544AA',
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FFF9E5',
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  noticeIcon: { fontSize: 18, marginRight: 6 },
  noticeText: { fontSize: 16, color: '#04338099', flex: 1, fontFamily: "OpenSans_400Regular", },
  sectionText: {
    fontSize: 16, color: '#04338099', fontFamily: "OpenSans_400Regular",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  cardsList: { flex: 1, paddingHorizontal: 10 },
  card: {
    backgroundColor: '#F1FAFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 14,
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 2,
  },
  cancelledCard: {
    backgroundColor: '#F6ECFA',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    // width: 64,
    // height: 64,
    // borderRadius: 32,
    marginRight: 12,
    // backgroundColor: '#E0E0E0',
  },
  avatarRound: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#DDCCEE',
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontFamily: "OpenSans_700Bold", color: '#0544AA' },
  specialty: { fontSize: 14, color: '#0544AA', marginBottom: 2, fontFamily: "OpenSans_400Regular", },
  detailsRow: { marginTop: 4 },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  detailText: { fontSize: 14, color: '#04338099', marginBottom: 2, fontFamily: "OpenSans_400Regular", },
  closeBtn: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  completeBtn: {
    backgroundColor: '#0866FF',
    borderRadius: 12,
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  completeBtnText: { color: '#fff', fontFamily: "OpenSans_700Bold", fontSize: 14 },
  actionRow: { flexDirection: 'row', marginTop: 14, justifyContent: 'space-between' },
  joinBtn: {
    backgroundColor: '#0866FF',
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  joinBtnText: { color: '#fff', fontFamily: "OpenSans_700Bold", fontSize: 14 },
  rescheduleBtn: {
    // backgroundColor: '#F0F4F8',
    // borderRadius: 8,
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  rescheduleBtnText: { color: '#043380', fontFamily: "OpenSans_700Bold", fontSize: 14 },
  followUpBtn: {
    backgroundColor: '#0866FF',
    borderRadius: 12,
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  bookAgainBtn: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  followUpBtnText: { color: '#fff', fontFamily: "OpenSans_700Bold", fontSize: 14 },
  initiateBtn: {
    backgroundColor: '#9966CC',
    borderRadius: 12,
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  initiateBtnText: { color: '#fff', fontFamily: "OpenSans_700Bold", fontSize: 14 },
  followUpBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFFFE5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#9F9900',
  },
  followUpBadgeText: {
    color: '#777300',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Facility {
  id: string;
  name: string;
  availableTimes: string[];
}

// placeholder
// TODO: fetch all facilities and available times per facility for all days (or derive available days and time from stored reservations)
const facilities: Facility[] = [
  { id: '1', name: 'Gym', availableTimes: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { id: '2', name: 'Spa', availableTimes: ['9:00 AM', '11:00 AM', '3:00 PM'] },
];

const ReservationSystemScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />

      <Text style={styles.header}>Available Facilities for {selectedDate}</Text>
      {facilities.map((facility) => (
        <View key={facility.id} style={styles.facility}>
          <Text style={styles.facilityName}>{facility.name}</Text>
          {/* TODO: get times per day */}
          {facility.availableTimes.map((time, index) => (
            <TouchableOpacity key={index} style={styles.timeSlot}>
              <Text>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  facility: {
    marginBottom: 20,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeSlot: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ReservationSystemScreen;

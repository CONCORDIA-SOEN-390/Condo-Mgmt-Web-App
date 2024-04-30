import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import { useUser } from '../../context/UserContext';



const MOCK_PROPERTIES = [
  {
      id: '1',
      name: 'Granite Heights',
      address: '123 Quarry Road',
      propertyType: 'Residential',
      companyId: 1001
  },
  {
      id: '2',
      name: 'Pine Valley Apartments',
      address: '456 Pine Tree Drive',
      propertyType: 'Residential',
      companyId: 1002
  },
  {
      id: '3',
      name: 'Industrial Business Park',
      address: '789 Industrial Blvd',
      propertyType: 'Commercial',
      companyId: 1003
  },
  {
      id: '4',
      name: 'Downtown Co-Work',
      address: '1010 Central Avenue',
      propertyType: 'Commercial',
      companyId: 1004
  },
  {
      id: '5',
      name: 'Suburban Retail Plaza',
      address: '404 Notfound Lane',
      propertyType: 'Retail',
      companyId: 1005
  }
];

const MOCK_FACILITIES = [
  {
    id: '1',
    name: 'Gym',
    description: 'A state-of-the-art gym equipped with modern fitness equipment.',
    reservations: [
      {
        reservation_id: '101',
        start_time: '2024-04-10T09:00:00Z',
        end_time: '2024-04-10T11:00:00Z',
        user_id: '501'
      },
      {
        reservation_id: '102',
        start_time: '2024-04-12T14:00:00Z',
        end_time: '2024-04-12T15:00:00Z',
        user_id: '502'
      }
    ]
  },
  {
    id: '2',
    name: 'Spa',
    description: 'A luxurious spa offering a variety of relaxing treatments.',
    reservations: [
      {
        reservation_id: '201',
        start_time: '2024-04-15T10:00:00Z',
        end_time: '2024-04-15T12:00:00Z',
        user_id: '503'
      }
    ]
  },
  {
    id: '3',
    name: 'Conference Room',
    description: 'Fully equipped conference room suitable for business meetings and presentations.',
    reservations: [
      {
        reservation_id: '301',
        start_time: '2024-04-20T13:00:00Z',
        end_time: '2024-04-20T15:00:00Z',
        user_id: '504'
      }
    ]
  }
];


const ReservationSystemScreen = () => {
  const { units } = useUser();
  const today = new Date().toISOString().split('T')[0];
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedDate, setSelectedDate] = useState(today);
  const [facilities, setFacilities] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  //-----------Properties----------------

  /**
   * const propertyItems = Array.from(units.reduce((map, unit) => {
    if (!map.has(unit.property.propertyId)) {
      map.set(unit.property.propertyId, {
        label: unit.property.address,
        value: unit.property.propertyId.toString()
      });
    }
    return map;
  }, new Map()).values());
   * 
   */
  
  const propertyItems = MOCK_PROPERTIES.map(property => ({
    label: property.address,
    value: property.id
  }));

  useEffect(() => {
    if (selectedPropertyId) {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1; // JavaScript months are 0-indexed
      fetchReservationsWithFacilities(selectedPropertyId, year, month);
    }
  }, [selectedPropertyId]);

  //----------------Reservations----------------

  /**
   * const fetchReservationsWithFacilities = async (propertyId, year, month) => {
    try {
      const monthString = `${year}-${month.toString().padStart(2, '0')}`;  // Ensure month is two digits
      const response = await fetch(`/api/getReservationsWithFacilities/${propertyId}?year=${year}&month=${monthString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch facilities and reservations');
      }
      const data = await response.json();
      setFacilities(data);  // Assuming API returns a list of facilities with nested reservations
    } catch (error) {
      console.error('Failed to fetch facilities and reservations:', error);
    }
  };
   * 
   */
  
  const fetchReservationsWithFacilities = async (propertyId, year, month) => {
    setIsLoading(true);
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Use mock data for testing
    console.log("Mock facilities loaded:", MOCK_FACILITIES);
    setFacilities(MOCK_FACILITIES);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Facilities state updated:", facilities);
  }, [facilities]);


  useEffect(() => {
    if (selectedFacilityId && facilities.length > 0) {
      const facilityReservations = facilities.find(f => f.id === selectedFacilityId)?.reservations || [];
      const availableTimes = calculateAvailableTimes(facilityReservations, selectedFacilityId);
      setAvailableTimes(availableTimes);
    }
  }, [selectedDate, facilities, selectedFacilityId]);
  
  


  const selectFacility = (id) => {
    setSelectedFacilityId(id);
    setSelectedTime('');
    const facility = facilities.find(f => f.id === id);
    if (facility) {
      const availableTimes = calculateAvailableTimes(facility.reservations, id);
      console.log("Available times calculated:", availableTimes);
      setAvailableTimes(availableTimes);
    } else {
      setAvailableTimes([]);
    }
  };

  const calculateAvailableTimes = (reservations, facilityId) => {
    const now = new Date();
    const selectedDayStart = new Date(selectedDate);
    selectedDayStart.setHours(6, 0, 0, 0);
    const selectedDayEnd = new Date(selectedDate);
    selectedDayEnd.setHours(24, 0, 0, 0);
  
    let slots = [];
    for (let time = selectedDayStart; time < selectedDayEnd; time.setMinutes(time.getMinutes() + 30)) {
      slots.push(new Date(time));
    }
  
    const occupied = reservations.flatMap(reservation => {
      const start = new Date(reservation.start_time);
      const end = new Date(reservation.end_time);
      let busySlots = [];
      for (let current = new Date(start); current < end; current.setMinutes(current.getMinutes() + 30)) {
        busySlots.push(new Date(current));
      }
      return busySlots;
    });
  
    const available = slots.filter(slot => !occupied.some(busy => busy.getTime() === slot.getTime() && now <= slot));
    return available.map(slot => `${slot.getHours()}:${slot.getMinutes() === 0 ? '00' : '30'}`);
  };

  const makeReservation = async () => {
    const startTime = new Date(`${selectedDate}T${selectedTime}:00`);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes later
  
    try {
      const response = await fetch('../../next_project/src/app/api/addReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          facilityId: selectedFacilityId,
          propertyId: selectedPropertyId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        })
      });
  
      const result = await response.json();
      if (response.status === 200) {
        alert(`Reservation made for ${selectedDate} at ${selectedTime} in facility ${facilities.find(f => f.id === selectedFacilityId)?.name}`);
      } else {
        alert(`Failed to make reservation: ${result.message}`);
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Failed to connect to the server.');
    }
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };


  return (
    <ScrollView style={styles.container}>
      <RNPickerSelect
        onValueChange={setSelectedPropertyId}
        items={propertyItems}
        placeholder={{ label: "Select a property", value: null }}
      />
      <Calendar
        onDayPress={({ dateString }) => setSelectedDate(dateString)}
        onMonthChange={({ dateString }) => setCurrentMonth(dateString.slice(0, 7))}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        minDate={today} // Disables past dates
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Text>Loading facilities and reservations...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.header}>Select a Facility</Text>
          {facilities && facilities.map((facility) => (
            <TouchableOpacity
              key={facility.id}
              style={selectedFacilityId === facility.id ? styles.selectedFacility : styles.facility}
              onPress={() => selectFacility(facility.id)}
            >
              <Text style={styles.facilityName}>{facility.name}</Text>
              {selectedFacilityId === facility.id && (
                <>
                  <Text style={styles.description}>{facility.description}</Text>
                  <Text style={styles.description}>Opening hours: 6:00 AM - 12:00 PM</Text>
                </>
              )}
            </TouchableOpacity>
          ))}
          {selectedFacilityId && (
            <>
              <Text style={styles.header}>Available Times for {facilities.find(f => f.id === selectedFacilityId)?.name}</Text>
              <RNPickerSelect
                onValueChange={setSelectedTime}
                items={availableTimes.map(time => ({ label: time, value: time }))}
                placeholder={{ label: "Select a time", value: null }}
              />
              <Button
                title="Make Reservation"
                onPress={makeReservation}
                disabled={!selectedTime} // Button is disabled if no time is selected
                color="#1E90FF"
              />
            </>
          )}
        </>
      )}
    </ScrollView>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loaderContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  facility: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedFacility: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
});


export default ReservationSystemScreen;



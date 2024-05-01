import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Placeholder data
// ** TODO Connect to backend
const ownerInfo = {
  profilePicture: 'https://via.placeholder.com/100',
  userName: 'John Doe',
  contactEmail: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
};

const properties = [
  {
    name: 'Property A',
    address: '1111 One Street',
    condoUnits: [
      { address: '1111 One Street', unit: 101, size: 5.5, parking: 101, locker: 101 },
      { address: '1111 One Street', unit: 102, size: 4, parking: 102, locker: 102 },
    ],
  },
  {
    name: 'Property B',
    address: '2222 Two Avenue',
    condoUnits: [
      { address: '2222 Two Avenue', unit: 201, size: 6, parking: 201, locker: 201 },
      { address: '2222 Two Avenue', unit: 202, size: 3, parking: 202, locker: 202 },
    ],
  },
];

const financialStatus = {
  outstandingFees: '$200',
  paymentHistory: [
    { date: '2023-01-01', amount: '$100', description: 'Monthly condo fee', address: '1111 One Street', unitNumber: '101A' },
    { date: '2023-02-01', amount: '$100', description: 'Annual maintenance fee', address: '1111 One Street', unitNumber: '101A' },
    { date: '2023-03-01', amount: '$120', description: 'Special assessment fee', address: '1111 One Street', unitNumber: '101A' },
  ],
};

const requests = [
  { type: 'Moving Out', status: 'Pending' },
  { type: 'Intercom Change', status: 'Completed' },
];

const DashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.box}>
          <Image source={{ uri: ownerInfo.profilePicture }} style={styles.profilePic} />
          <Text style={styles.userName}>{ownerInfo.userName}</Text>
          <Text style={styles.infoText}>Email: {ownerInfo.contactEmail}</Text>
          <Text style={styles.infoText}>Phone: {ownerInfo.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Condo Information</Text>
            {properties.map((property, index) => (
              <TouchableOpacity key={index} style={styles.section} onPress={() => handlePropertyPress(property)}>
                <View style={styles.box}>
                  <Text style={styles.sectionTitle}>{property.name}</Text>
                  <Text style={styles.infoText}>Address: {property.address}</Text>
                  {property.condoUnits.map((unit, unitIndex) => (
                    <View key={unitIndex} style={styles.unitCard}>
                      <Text style={styles.unitText}>Address: {unit.address}</Text>
                      <Text style={styles.unitText}>Unit: {unit.unit}</Text>
                      <Text style={styles.unitText}>Size: {unit.size}</Text>
                      <Text style={styles.unitText}>Parking: {unit.parking}</Text>
                      <Text style={styles.unitText}>Locker: {unit.locker}</Text>
                    </View>
                  ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Financial Status</Text>
          <Text style={styles.infoText}>Outstanding Fees: {financialStatus.outstandingFees}</Text>
          <Text style={styles.infoText}>Payment History:</Text>
          {financialStatus.paymentHistory.map((payment, index) => (
            <TouchableOpacity key={index} style={styles.paymentItem}>
              <Text style={styles.paymentText}>Date: {payment.date}</Text>
              <Text style={styles.paymentText}>Amount: {payment.amount}</Text>
              <Text style={styles.paymentText}>Description: {payment.description}</Text>
              <Text style={styles.paymentText}>Address: {payment.address}</Text>
              <Text style={styles.paymentText}>Unit Number: {payment.unitNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Submitted Requests</Text>
          {requests.map((request, index) => (
            <TouchableOpacity key={index} style={styles.requestItem}>
              <Text style={styles.requestText}>{request.type}</Text>
              <Text style={[styles.requestText, { color: request.status === 'Pending' ? 'orange' : 'green' }]}>
                {request.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark gray
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555', // Medium gray
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 3,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
  },
  requestText: {
    fontSize: 16,
  },
});

export default DashboardScreen;

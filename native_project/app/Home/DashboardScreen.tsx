import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

// Placeholder data
// ** TODO Connect to backend
const ownerInfo = {
  profilePicture: 'https://via.placeholder.com/100',
  userName: 'John Doe',
  contactEmail: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
};

const condoInfo = {
  unitId: '101A',
  size: '5.5 rooms',
  parking: 'S201',
  locker: 'L302',
};

const financialStatus = {
  outstandingFees: '$200',
  paymentHistory: [
    { date: '2023-01-01', amount: '$100' },
    { date: '2023-02-01', amount: '$100' },
  ],
};

const requests = [
  { type: 'Moving Out', status: 'Pending' },
  { type: 'Intercom Change', status: 'Completed' },
];

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Image source={{ uri: ownerInfo.profilePicture }} style={styles.profilePic} />
        <Text style={styles.userName}>{ownerInfo.userName}</Text>
        <Text>Email: {ownerInfo.contactEmail}</Text>
        <Text>Phone: {ownerInfo.phoneNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text>Unit ID: {condoInfo.unitId}</Text>
        <Text>Size: {condoInfo.size}</Text>
        <Text>Parking: {condoInfo.parking}</Text>
        <Text>Locker: {condoInfo.locker}</Text>
      </View>

      <View style={styles.section}>
        <Text>Outstanding Fees: {financialStatus.outstandingFees}</Text>
        <Text>Payment History:</Text>
        {financialStatus.paymentHistory.map((payment, index) => (
          <Text key={index}>{payment.date}: {payment.amount}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Submitted Requests:</Text>
        {requests.map((request, index) => (
          <Text key={index}>{request.type}: {request.status}</Text>
        ))}
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
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default DashboardScreen;

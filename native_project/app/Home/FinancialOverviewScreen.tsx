import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface CondoFeeDetails {
  monthlyFee: number;
  outstandingBalance: number;
}

interface PaymentRecord {
  date: string;
  amount: number;
}

const condoFeeDetails: CondoFeeDetails = {
  monthlyFee: 500,
  outstandingBalance: 150,
};

const paymentHistory: PaymentRecord[] = [
  { date: '2024-01-01', amount: 500 },
  { date: '2024-02-01', amount: 500 },
];

const FinancialOverviewScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Condo Fee Details</Text>
        <Text style={styles.detail}>Monthly Fee: ${condoFeeDetails.monthlyFee}</Text>
        <Text style={styles.detail}>Outstanding Balance: ${condoFeeDetails.outstandingBalance}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.header}>Payment History</Text>
        {paymentHistory.map((record, index) => (
          <View key={index} style={styles.record}>
            <Text style={styles.recordText}>Date: {record.date}</Text>
            <Text style={styles.recordText}>Amount: ${record.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  box: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  record: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  recordText: {
    fontSize: 16,
  },
});

export default FinancialOverviewScreen;

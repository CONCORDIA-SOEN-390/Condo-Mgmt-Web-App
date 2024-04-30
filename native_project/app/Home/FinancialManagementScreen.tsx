import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const FinancialManagementScreen = () => {
  const [condoFeePerSqft, setCondoFeePerSqft] = useState('');
  const [condoFeeParking, setCondoFeeParking] = useState('');
  const [maintenanceAndRepairs, setMaintenanceAndRepairs] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [landscapingAndSnowRemoval, setLandscapingAndSnowRemoval] = useState<string>('');
  const [securityServices, setSecurityServices] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('');

  const handleSave = () => {
    Alert.alert('Data Saved', 'Your financial data has been saved.');
  };

  const handleGenerateReport = () => {
    Alert.alert('Report Generated', 'Your financial report has been generated.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputGroup}>
      <Text style={styles.labelGroup}>Basic Condo Fees:</Text>

        <Text style={styles.label}>Condo Fee per Sqft:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={condoFeePerSqft}
          onChangeText={setCondoFeePerSqft}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Condo Fee per Parking Spot:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={condoFeeParking}
          onChangeText={setCondoFeeParking}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.labelGroup}>Operational Costs:</Text>

        <Text style={styles.label}>Maintenance and Repairs</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={maintenanceAndRepairs}
          onChangeText={setMaintenanceAndRepairs}
        />

        <Text style={styles.label}>Utilities</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={utilities}
          onChangeText={setUtilities}
        />

        <Text style={styles.label}>Landscaping and Snow Removal</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={landscapingAndSnowRemoval}
          onChangeText={setLandscapingAndSnowRemoval}
        />

        <Text style={styles.label}>Security Services</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={securityServices}
          onChangeText={setSecurityServices}
        />

        <Text style={styles.label}>Insurance</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={insurance}
          onChangeText={setInsurance}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Data" onPress={handleSave} />
      </View>

      {/* TODO: Create conditional rendering between inputting costs/fees and financial history/report generations */}
      <View style={styles.buttonContainer}>
        <Button title="Generate Financial Report" onPress={handleGenerateReport} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  labelGroup: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default FinancialManagementScreen;

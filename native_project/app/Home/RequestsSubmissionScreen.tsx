import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


type RequestType = 'moving' | 'intercom' | 'access' | '';

const RequestsSubmissionScreen = () => {
  const [requestType, setRequestType] = useState<RequestType>('');
  const [details, setDetails] = useState<string>('');

  const handleSubmit = () => {
    // Placeholder for submission logic
    Alert.alert("Request Submitted", `Type: ${requestType}\nDetails: ${details}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Request Type:</Text>
      <Picker
        selectedValue={requestType}
        style={styles.picker}
        onValueChange={(itemValue) => setRequestType(itemValue as RequestType)}
      >
        <Picker.Item label="Select request type" value="" />
        <Picker.Item label="Moving" value="moving" />
        <Picker.Item label="Intercom Changes" value="intercom" />
        <Picker.Item label="Access Requests" value="access" />
        {/* Add more request types as needed */}
      </Picker>

      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        onChangeText={setDetails}
        value={details}
        placeholder="Enter any relevant details"
      />

      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top', // Align text at the top on Android
  },
});

export default RequestsSubmissionScreen;

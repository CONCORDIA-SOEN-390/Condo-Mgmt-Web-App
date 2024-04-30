import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

interface PropertyProfile {
  name: string;
  address: string;
  unitCount: number;
  parkingCount: number;
  lockerCount: number;
}

const initialProfile: PropertyProfile = {
  name: '',
  address: '',
  unitCount: 0,
  parkingCount: 0,
  lockerCount: 0,
};

const PropertyManagementScreen = () => {
  const [profile, setProfile] = useState<PropertyProfile>(initialProfile);

  const handleSave = () => {

  };

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.label}>Property Name:</Text>
        <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
            style={styles.input}
            value={profile.address}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
        />

        <Text style={styles.label}>Unit Count:</Text>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={profile.unitCount.toString()}
            onChangeText={(text) => setProfile({ ...profile, unitCount: parseInt(text, 10) || 0 })}
        />

        <Text style={styles.label}>Parking Count:</Text>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={profile.parkingCount.toString()}
            onChangeText={(text) => setProfile({ ...profile, parkingCount: parseInt(text, 10) || 0 })}
        />

        <Text style={styles.label}>Locker Count:</Text>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={profile.lockerCount.toString()}
            onChangeText={(text) => setProfile({ ...profile, lockerCount: parseInt(text, 10) || 0 })}
        />

        <Button title="Save Property Profile" onPress={handleSave} /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default PropertyManagementScreen;

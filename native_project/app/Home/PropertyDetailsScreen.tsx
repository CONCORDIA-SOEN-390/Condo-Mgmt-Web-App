import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

interface PropertyDetails {
    unitId: string;
    size: string;
    parkingSpotId: string;
    lockerId: string;
    documents: Document[];
  }
  
  interface Document {
    id: string;
    title: string;
    url: string; 
  }

const propertyDetails: PropertyDetails = {
  unitId: 'Unit 101',
  size: '3 Bedroom',
  parkingSpotId: 'P1',
  lockerId: 'L3',
  documents: [
    { id: '1', title: 'Condo Declaration', url: 'https://docs.google.com/document/d/15Tcj-xYO5Ap4KmkBgPmv1-hnwFAqh5j1CC0RYuYRzJ4/edit' },
    { id: '2', title: 'Annual Budget', url: 'https://docs.google.com/document/d/15Tcj-xYO5Ap4KmkBgPmv1-hnwFAqh5j1CC0RYuYRzJ4/edit' },
  ],
};

const PropertyDetailsScreen = () => {
  const openDocument = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Property Details</Text>

      <View style={styles.detailSection}>
        <Text style={styles.detailTitle}>Unit ID: {propertyDetails.unitId}</Text>
        <Text style={styles.detail}>Size: {propertyDetails.size}</Text>
        <Text style={styles.detail}>Parking Spot ID: {propertyDetails.parkingSpotId}</Text>
        <Text style={styles.detail}>Locker ID: {propertyDetails.lockerId}</Text>
      </View>

      <Text style={styles.header}>Documents</Text>
      {propertyDetails.documents.map((doc) => (
        <TouchableOpacity key={doc.id} style={styles.documentItem} onPress={() => openDocument(doc.url)}>
          <Text style={styles.documentTitle}>{doc.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
  },
  documentItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
  },
  documentTitle: {
    fontSize: 16,
  },
});

export default PropertyDetailsScreen;

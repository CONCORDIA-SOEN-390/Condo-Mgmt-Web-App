import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

interface Document {
  id: string;
  title: string;
  url: string;
}

interface PropertyDetails {
  unitId: string;
  size: string;
  parkingSpotId: string;
  lockerId: string;
  documents: Document[];
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
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Unit ID:</Text>
          <Text style={styles.detail}>{propertyDetails.unitId}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Size:</Text>
          <Text style={styles.detail}>{propertyDetails.size}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Parking Spot ID:</Text>
          <Text style={styles.detail}>{propertyDetails.parkingSpotId}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Locker ID:</Text>
          <Text style={styles.detail}>{propertyDetails.lockerId}</Text>
        </View>
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  detail: {
    fontSize: 16,
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

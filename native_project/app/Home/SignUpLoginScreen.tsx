import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const SignUpLoginScreen = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    registrationKey: '',
    profilePicture: null,
  });

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setUserInfo({ ...userInfo, profilePicture: response.assets[0].uri });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={userInfo.username}
        onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={userInfo.phoneNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => setUserInfo({ ...userInfo, phoneNumber: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Registration Key"
        value={userInfo.registrationKey}
        onChangeText={(text) => setUserInfo({ ...userInfo, registrationKey: text })}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
        <Text>Choose Profile Picture</Text>
      </TouchableOpacity>
      {userInfo.profilePicture && (
        <Image source={{ uri: userInfo.profilePicture }} style={styles.image} />
      )}
      {/* TODO: AUTH */}
      <Button title="Sign Up/Login" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default SignUpLoginScreen;

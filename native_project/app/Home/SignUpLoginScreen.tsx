import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpLoginScreen = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    registrationKey: '',
    password: '',
    confirmPassword: '',
  });

  const [isSignUp, setIsSignUp] = useState(true); // Default to sign-up mode
  const navigation = useNavigation(); // Initialize navigation

  const handleSignUpLogin = () => {
    // Perform sign-up or login logic
    // For demonstration purposes, always navigate to the dashboard upon login
    navigation.navigate('./DashboardScreen.tsx');
  };

  return (
    <View style={styles.container}>
      {/* User Info Section */}
      {isSignUp && (
        <View style={styles.section}>
          <TextInput
            placeholder="Username"
            value={userInfo.username}
            onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
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
        </View>
      )}
      {/* Credential Section */}
      <View style={styles.section}>
        <TextInput
          placeholder="Email"
          value={userInfo.email}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={userInfo.password}
          secureTextEntry={true}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          style={styles.input}
        />
        {isSignUp && (
          <TextInput
            placeholder="Confirm Password"
            value={userInfo.confirmPassword}
            secureTextEntry={true}
            onChangeText={(text) => setUserInfo({ ...userInfo, confirmPassword: text })}
            style={styles.input}
          />
        )}
      </View>
      {/* Sign Up/Login Button */}
      <Button
        title={isSignUp ? 'Sign Up' : 'Login'}
        onPress={handleSignUpLogin}
      />
      {/* Toggle Sign Up/Login */}
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggleButton}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
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
  section: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  toggleButton: {
    marginTop: 10,
    color: 'blue',
  },
});

export default SignUpLoginScreen;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './components/GeneralComponents/DrawerNavigator';
import { UserProvider } from './context/UserContext';
 

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer > 
        <DrawerNavigator></DrawerNavigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

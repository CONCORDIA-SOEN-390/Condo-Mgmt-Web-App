import { Button } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
      <Button
        onPress={() => navigation.navigate('Profile')}
        title="Profile"
      />
    );
  }
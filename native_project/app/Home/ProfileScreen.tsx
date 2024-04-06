import { Button } from "react-native";

export default function ProfileScreen({ navigation }) {
    return (
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Condo 360"
      />
    );
  }
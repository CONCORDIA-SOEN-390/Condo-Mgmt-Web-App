import { Button } from "react-native";

export default function PropertyScreen({ navigation }) {
    return (
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Condo 360"
      />
    );
  }
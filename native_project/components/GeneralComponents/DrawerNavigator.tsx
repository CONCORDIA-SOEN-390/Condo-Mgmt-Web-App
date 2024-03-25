import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../app/Home/HomeScreen';
import ProfileScreen from '../../app/Home/ProfileScreen';
import PropertyScreen from '../../app/Home/PropertyScreen';
import DocumentScreen from '../../app/Home/DocumentScreen';
import ReservationScreen from '../../app/Home/ReservationScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
        drawerContentOptions = {{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Property" component={PropertyScreen} />
      <Drawer.Screen name="Document" component={DocumentScreen} />
      <Drawer.Screen name="Reservation" component={ReservationScreen} />
    </Drawer.Navigator>
  );
}
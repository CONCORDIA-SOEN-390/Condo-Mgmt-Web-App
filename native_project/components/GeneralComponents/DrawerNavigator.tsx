import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpLoginScreen from '../../app/Home/SignUpLoginScreen';
import DashboardScreen from '../../app/Home/DashboardScreen';
import FinancialManagementScreen from '../../app/Home/FinancialManagementScreen';
import ReservationSystemScreen from '../../app/Home/ReservationSystemScreen';
import RequestsSubmissionScreen from '../../app/Home/RequestsSubmissionScreen';
import PropertyManagementScreen from '../../app/Home/PropertyManagementScreen';
import PropertyDetailsScreen from '../../app/Home/PropertyDetailsScreen';
import FinancialOverviewScreen from '../../app/Home/FinancialOverviewScreen';

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
      <Drawer.Screen name="Login/SignUp" component={SignUpLoginScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Financial Management" component={FinancialManagementScreen} />
      <Drawer.Screen name="Financial Overview" component={FinancialOverviewScreen} />
      <Drawer.Screen name="Reservation System" component={ReservationSystemScreen} />
      <Drawer.Screen name="Request Submission" component={RequestsSubmissionScreen} />
      <Drawer.Screen name="Property Management" component={PropertyManagementScreen} />
      <Drawer.Screen name="Property Details" component={PropertyDetailsScreen} />
    </Drawer.Navigator>
  );
}
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/login';
import TabNavigation from './tabNavigation';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LOGIN" component={LoginScreen} />
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
}
export default StackNavigation;

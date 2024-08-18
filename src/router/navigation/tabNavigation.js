import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from '../../screens/users';
import TaskScreen from '../../screens/task';
import FavoriteScreen from '../../screens/favorites';
import getTabIcon from './getTabIcon';
import PostStack from './postStack';
import AppColors from '../../theme/AppColors';

import LoginScreen from '../../screens/auth/login';
import ResetPasswordScreen from '../../screens/auth/reset-password';

import {headersPlaceholder} from './headersPlaceholder';


const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        header: () => headersPlaceholder(route),
        tabBarIcon: ({color}) => getTabIcon(route.name, color),
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.secondary,
        tabBarLabel: '',
        tabBarStyle: {
          height: '10%',
          padding: 10,
        },
      })}>
      <Tab.Screen name="USERS" component={UserScreen} />
      <Tab.Screen name="POSTS" component={PostStack} />
      <Tab.Screen name="TASKS" component={TaskScreen} />
      <Tab.Screen name="FAVORITES" component={FavoriteScreen} />
      <Tab.Screen name="LOGIN" component={LoginScreen} />
      <Tab.Screen name="RESET_PASSWORD" component={ResetPasswordScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigation;

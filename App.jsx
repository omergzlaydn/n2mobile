import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/router/navigation/tabNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';

const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;

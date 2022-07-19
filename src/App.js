import * as React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import UserStack from './routes/userStack';
import AboutStack from './routes/aboutStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ToastProvider textStyle={{ fontSize: 20 }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={UserStack} />
          <Drawer.Screen name="About Us" component={AboutStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
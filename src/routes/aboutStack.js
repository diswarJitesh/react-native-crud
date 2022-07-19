import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../screens/About';
import Header from '../screens/shared/header';
import GlobalConstants from '../metadata/GlobalConstants';

const Stack = createStackNavigator();
const aboutStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={GlobalConstants.screenOptions}
    >
      <Stack.Screen
        name="aboutus"
        component={About}
       options={{ headerTitle: (props) => <Header navigation={navigation} title='About Us'/> }}
      />
    </Stack.Navigator>
  );
}

export default aboutStack;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddUserScreen from '../screens/AddUserScreen';
import UserScreen from '../screens/UserScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import Header from '../screens/shared/header';
import GlobalConstants from '../metadata/GlobalConstants';

const Stack = createStackNavigator();
const userStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={GlobalConstants.screenOptions}
    >
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ headerTitle: (props) => <Header navigation={navigation} title='Users List'/> }}
        
      />
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: 'Add User' }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: 'User Detail' }}
      />
    </Stack.Navigator>
  );
}

export default userStack;
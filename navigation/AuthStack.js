import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login';
import Signup from '../screen/Signup';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

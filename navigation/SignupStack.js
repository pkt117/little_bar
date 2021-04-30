import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screen/Signup';
import LikeSelect from '../screen/LikeSelect';

const Stack = createStackNavigator();

export default function SignupSelect() {
  return (
    <Stack.Navigator initialRouteName="Signup" headerMode="none">
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LikeSelect" component={LikeSelect} />
    </Stack.Navigator>
  );
}

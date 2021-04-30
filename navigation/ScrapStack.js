import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Scrap from '../screen/Scrap';
import ScrapCocktailScreen from '../screen/ScrapCocktailScreen';
import ScrapEdit from '../screen/ScrapEdit';

const Stack = createStackNavigator();

export default function ScrapStack() {
  return (
    <Stack.Navigator initialRouteName="Scrap" headerMode="none">
      <Stack.Screen name="Scrap" component={Scrap} />
      <Stack.Screen
        name="ScrapCocktailScreen"
        component={ScrapCocktailScreen}
      />
      <Stack.Screen name="ScrapEdit" component={ScrapEdit} />
    </Stack.Navigator>
  );
}

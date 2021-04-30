import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../screen/Search';
// import Filter from '../screen/Filter';
import FilterStack from './FilterStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import CocktailScreen from '../screen/CocktailScreen';
import Search_List from '../screen/Search_List';
import Filter_List from '../screen/Filter_List';
const Stack = createStackNavigator();

export default function SearchStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Search') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="Filter" headerMode="none">
      <Stack.Screen
        name="Filter"
        component={FilterStack}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Search_List" component={Search_List} />
      <Stack.Screen
        name="Filter_List"
        component={Filter_List}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen name="CocktailScreen" component={CocktailScreen} />
    </Stack.Navigator>
  );
}

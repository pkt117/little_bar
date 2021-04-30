import React from 'react';
import Home from './HomeStack';
import Profile from '../screen/Profile';
import Scrap from './ScrapStack';
import Search from './SearchStack';
// import Search from './FilterStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Scrap') {
            iconName = focused ? 'md-bookmark' : 'md-bookmark-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'orange',
        inactiveTintColor: 'white',
        showLabel: false,
        style: {
          backgroundColor: 'black',
        },
        // keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Scrap"
        component={Scrap}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainStack;

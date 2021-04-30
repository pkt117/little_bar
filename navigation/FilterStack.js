import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ingredient from '../screen/Filter_Ingredient';
import Color from '../screen/Filter_Color';
import Taste from '../screen/Filter_Taste';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const {height, width} = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const Filter = () => {
  const navigations = useNavigation();

  const _filterClear = () => {
    firestore().collection('users').doc(auth().currentUser.uid).update({
      filter_Color: firestore.FieldValue.delete(),
      filter_Ingredient: firestore.FieldValue.delete(),
      filter_Taste: firestore.FieldValue.delete(),
    });
  };

  useEffect(() => {
    _filterClear();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: 'black'}}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}>
      <View
        style={{
          backgroundColor: 'black',
          paddingBottom: 10,
          flex: 0.6,
          flexDirection: 'row',

          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            width: '70%',
            borderRadius: 15,
            paddingLeft: 10,
            marginTop: 27,
            backgroundColor: 'white',
            paddingVertical: 8,
          }}
          onPress={() => navigations.navigate('Search')}>
          <Text style={{fontSize: 15, opacity: 0.4}}>
            {' '}
            검색어를 입력해주세요
          </Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        style={{flex: 5}}
        initialRouteName="Ingredient"
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          labelStyle: {
            fontSize: 17.5,
            fontFamily: '남양주고딕Light',
            fontWeight: 'bold',
          },

          style: {
            backgroundColor: 'black',
            // borderBottomWidth: 0.383,
            // borderColor: 'white',
          },
        }}>
        <Tab.Screen
          name="Ingredient"
          component={Ingredient}
          options={{tabBarLabel: '재료'}}
        />
        <Tab.Screen
          name="Color"
          component={Color}
          options={{tabBarLabel: '색'}}
        />
        <Tab.Screen
          name="Taste"
          component={Taste}
          options={{tabBarLabel: '맛'}}
        />
      </Tab.Navigator>
    </KeyboardAwareScrollView>
  );
};

export default function FilterStack() {
  return <Filter />;
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    paddingTop: 40,
    paddingHorizontal: 10,

    // fontFamily: 'MapoGoldenPier',
  },
});

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import check from '../image/check.png';
import {useNavigation} from '@react-navigation/native';

import bar from '../image/bar.png';

const ColorSelect = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
  margin-top: 16px;
  margin-bottom: 13px;
  margin-right: 30px;
  margin-left: 52px;
  align-items: center;
  justify-content: center;
`;
const TasteText = styled.Text`
  position: absolute;
  top: 33px;
  left: 91px;
  padding: 7px 0 7px 6px;
  border-radius: 19px;
  width: 135px;
  text-align: center;
`;

const Filter_Taste = () => {
  const [sweet100, setSweet100] = useState(false);
  const [sweet75, setSweet75] = useState(false);
  const [sweet50, setSweet50] = useState(false);
  const [sweet25, setSweet25] = useState(false);
  const [sweet0, setSweet0] = useState(false);
  const navigations = useNavigation();

  const _selectCategory = async (item, select) => {
    // console.log(select);
    if (select) {
      firestore().collection('users').doc(auth().currentUser.uid).update({
        filter_Taste: item,
      });
    } else {
      firestore().collection('users').doc(auth().currentUser.uid).update({
        filter_Taste: firestore.FieldValue.delete(),
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <View style={styles.colorContainer}>
        <Image source={bar} style={styles.bar} />
        <View style={{flexDirection: 'row'}}>
          <ColorSelect
            activeOpacity={1}
            style={{backgroundColor: '#F9F6FF', zIndex: 1}}
            onPress={() => {
              setSweet100(!sweet100);
              setSweet75(false);
              setSweet50(false);
              setSweet25(false);
              setSweet0(false);

              _selectCategory('단맛100%', !sweet100);
            }}>
            <Image source={check} style={{opacity: sweet100 ? 1 : 0}} />
          </ColorSelect>
          <TasteText
            style={{backgroundColor: 'rgba(255,255,255,0.7)', color: 'black'}}>
            단 맛 100%!
          </TasteText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ColorSelect
            activeOpacity={1}
            style={{backgroundColor: '#E4D2FF', zIndex: 1}}
            onPress={() => {
              setSweet100(false);
              setSweet75(!sweet75);
              setSweet50(false);
              setSweet25(false);
              setSweet0(false);

              _selectCategory('약간의알콜향', !sweet75);
            }}>
            <Image source={check} style={{opacity: sweet75 ? 1 : 0}} />
          </ColorSelect>
          <TasteText
            style={{
              backgroundColor: 'rgba(228, 210, 255,0.7)',
              color: '#22225B',
            }}>
            약간의 알콜향
          </TasteText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ColorSelect
            activeOpacity={1}
            style={{backgroundColor: '#C7A8F5', zIndex: 1}}
            onPress={() => {
              setSweet100(false);
              setSweet75(false);
              setSweet50(!sweet50);
              setSweet25(false);
              setSweet0(false);

              _selectCategory('씀반달반', !sweet50);
            }}>
            <Image source={check} style={{opacity: sweet50 ? 1 : 0}} />
          </ColorSelect>
          <TasteText
            style={{
              backgroundColor: 'rgba(199, 168, 245,0.7)',
              color: '#222267',
            }}>
            씀 반 달 반
          </TasteText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ColorSelect
            activeOpacity={1}
            style={{backgroundColor: '#A185D9', zIndex: 1}}
            onPress={() => {
              setSweet100(false);
              setSweet75(false);
              setSweet50(false);
              setSweet25(!sweet25);
              setSweet0(false);

              _selectCategory('약간의단맛', !sweet25);
            }}>
            <Image source={check} style={{opacity: sweet25 ? 1 : 0}} />
          </ColorSelect>
          <TasteText
            style={{
              backgroundColor: 'rgba(161, 133, 217,0.7)',
              color: '#C4C4F3',
            }}>
            약간의 단 맛
          </TasteText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ColorSelect
            activeOpacity={1}
            style={{backgroundColor: '#7D7DB9', zIndex: 1}}
            onPress={() => {
              setSweet100(false);
              setSweet75(false);
              setSweet50(false);
              setSweet25(false);
              setSweet0(!sweet0);

              _selectCategory('어른의맛', !sweet0);
            }}>
            <Image source={check} style={{opacity: sweet0 ? 1 : 0}} />
          </ColorSelect>
          <TasteText
            style={{
              backgroundColor: 'rgba(125, 125, 185, 0.7)',
              color: 'white',
            }}>
            어른의 맛
          </TasteText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submit}
        onPress={() => navigations.navigate('Filter_List')}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>필터 검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    marginTop: 20,
    width: '87%',
    height: 500,
    backgroundColor: 'rgba(138, 138, 138,0.5)',
    borderRadius: 25,
    marginBottom: 15,
  },

  colorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  checkIcon: {
    marginBottom: 10,
  },
  submit: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 40,

    borderColor: 'transparent',
    backgroundColor: 'white',
  },

  bar: {
    position: 'absolute',
    top: 30,
    left: 81,
    height: 420,
  },
});

export default Filter_Taste;

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
import Ingredient from './Filter_Ingredient';
import {useNavigation} from '@react-navigation/native';

const ColorSelect = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 30px;
  margin-left: 25px;
  align-items: center;
  justify-content: center;
`;

const Filter_Color = () => {
  const [red, setRed] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [green, setGreen] = useState(false);
  const [blue, setBlue] = useState(false);
  const [trans, setTrans] = useState(false);
  const [orange, setOrange] = useState(false);
  const [brown, setBrown] = useState(false);
  const [pink, setPink] = useState(false);
  const [black, setBlack] = useState(false);
  const [white, setWhite] = useState(false);
  const [purple, setPurple] = useState(false);
  const navigations = useNavigation();

  const _selectCategory = async (item, select) => {
    // console.log(select);
    if (select) {
      firestore().collection('users').doc(auth().currentUser.uid).update({
        filter_Color: item,
      });
    } else {
      firestore().collection('users').doc(auth().currentUser.uid).update({
        filter_Color: firestore.FieldValue.delete(),
      });
    }
  };
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <View style={styles.colorContainer}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <ColorSelect
                onPress={() => {
                  setRed(!red);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);

                  _selectCategory('빨간색', !red);
                }}
                style={{
                  backgroundColor: 'red',
                }}>
                <Image source={check} style={{opacity: red ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>빨간색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setYellow(!yellow);
                  setRed(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);

                  _selectCategory('노랑색', !yellow);
                }}
                style={{backgroundColor: 'yellow'}}>
                <Image source={check} style={{opacity: yellow ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>노란색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setGreen(!green);
                  setRed(false);
                  setYellow(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('초록색', !green);
                }}
                style={{backgroundColor: 'green'}}>
                <Image source={check} style={{opacity: green ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>초록색</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View>
              <ColorSelect
                onPress={() => {
                  setBlue(!blue);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('파란색', !blue);
                }}
                style={{backgroundColor: 'blue'}}>
                <Image source={check} style={{opacity: blue ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>파란색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setTrans(!trans);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('투명색', !trans);
                }}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1.3,
                  borderColor: 'white',
                }}>
                <Image source={check} style={{opacity: trans ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>투명색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setOrange(!orange);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('주황색', !orange);
                }}
                style={{backgroundColor: 'orange'}}>
                <Image source={check} style={{opacity: orange ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>주황색</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View>
              <ColorSelect
                onPress={() => {
                  setBrown(!brown);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('갈색', !brown);
                }}
                style={{backgroundColor: '#964B00'}}>
                <Image source={check} style={{opacity: brown ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>갈색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setPink(!pink);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setBlack(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('분홍색', !pink);
                }}
                style={{backgroundColor: 'pink'}}>
                <Image source={check} style={{opacity: pink ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>분홍색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setBlack(!black);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setWhite(false);
                  setPurple(false);
                  _selectCategory('검정색', !black);
                }}
                style={{backgroundColor: 'black'}}>
                <Image source={check} style={{opacity: black ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>검정색</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <ColorSelect
                onPress={() => {
                  setWhite(!white);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setPurple(false);
                  _selectCategory('흰색', !white);
                }}
                style={{backgroundColor: 'white'}}>
                <Image source={check} style={{opacity: white ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>흰색</Text>
            </View>
            <View>
              <ColorSelect
                onPress={() => {
                  setPurple(!purple);
                  setRed(false);
                  setYellow(false);
                  setGreen(false);
                  setBlue(false);
                  setTrans(false);
                  setOrange(false);
                  setBrown(false);
                  setPink(false);
                  setBlack(false);
                  setWhite(false);
                  _selectCategory('보라색', !purple);
                }}
                style={{backgroundColor: 'purple'}}>
                <Image source={check} style={{opacity: purple ? 1 : 0}} />
              </ColorSelect>
              <Text style={styles.colorText}>보라색</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => navigations.navigate('Filter_List')}>
          <Text style={styles.filterText}>필터 검색</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 12,
    borderColor: 'transparent',
    backgroundColor: 'white',
  },
  filterText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: '남양주고딕Light',
    fontSize: 14.5,
  },
});

export default Filter_Color;

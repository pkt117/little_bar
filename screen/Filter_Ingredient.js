import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import checkIcon from '../image/checkMaterial.png';
import {useNavigation} from '@react-navigation/native';

const materials = [
  {id: 0, value: '계란흰자', checked: false},
  {id: 1, value: '그랑마니에르', checked: false},
  {id: 2, value: '그레나딘', checked: false},
  {id: 3, value: '깔루아', checked: false},
  {id: 4, value: '꿀', checked: false},
  {id: 5, value: '데킬라', checked: false},
  {id: 6, value: '드라이 버무스', checked: false},
  {id: 7, value: '라임 주스', checked: false},
  {id: 8, value: '럼', checked: false},
  {id: 9, value: '레몬 주스', checked: false},
  {id: 10, value: '말리부', checked: false},
  {id: 11, value: '맥주', checked: false},
  {id: 12, value: '메로나', checked: false},
  {id: 13, value: '미도리', checked: false},
  {id: 14, value: '바카디', checked: false},
  {id: 15, value: '베일리스', checked: false},
  {id: 16, value: '보드카', checked: false},
  {id: 17, value: '블루 큐라소', checked: false},
  {id: 18, value: '설탕 시럽', checked: false},
  {id: 19, value: '소주', checked: false},
  {id: 20, value: '스크류바', checked: false},
  {id: 21, value: '스프라이트', checked: false},
  {id: 22, value: '아마레또', checked: false},
  {id: 23, value: '아이스크림', checked: false},
  {id: 24, value: '에너지드링크', checked: false},
  {id: 25, value: '오렌지 주스', checked: false},
  {id: 26, value: '우스터 소스', checked: false},
  {id: 27, value: '우유', checked: false},
  {id: 28, value: '위스키', checked: false},
  {id: 29, value: '이온음료', checked: false},
  {id: 30, value: '자몽 주스', checked: false},
  {id: 31, value: '잭다니엘', checked: false},
  {id: 32, value: '진', checked: false},
  {id: 33, value: '체리브랜디', checked: false},
  {id: 34, value: '초코우유', checked: false},
  {id: 35, value: '커피', checked: false},
  {id: 36, value: '코코넛우유', checked: false},
  {id: 37, value: '콜라', checked: false},
  {id: 38, value: '크렌베리 주스', checked: false},
  {id: 39, value: '크림 드 카시스', checked: false},
  {id: 40, value: '타바코 소스', checked: false},
  {id: 41, value: '탄산수', checked: false},
  {id: 42, value: '토닉워터', checked: false},
  {id: 43, value: '토마토 주스', checked: false},
  {id: 44, value: '트리플 섹', checked: false},
  {id: 45, value: '파인애플 주스', checked: false},
  {id: 46, value: '피치 리큐어', checked: false},
  {id: 47, value: '휘핑크림', checked: false},
];

const Filter_Ingredient = () => {
  const [list, setList] = useState([]);
  const [material, setMaterial] = useState(materials);
  const navigations = useNavigation();
  useEffect(() => {
    _filterReset();
  }, []);
  const _filterReset = () => {
    firestore().collection('users').doc(auth().currentUser.uid).update({
      filter_Ingredient: firestore.FieldValue.delete(),
    });
    setList([]);
    setMaterial(
      [
        {id: 0, value: '계란흰자', checked: false},
        {id: 1, value: '그랑마니에르', checked: false},
        {id: 2, value: '그레나딘', checked: false},
        {id: 3, value: '깔루아', checked: false},
        {id: 4, value: '꿀', checked: false},
        {id: 5, value: '데킬라', checked: false},
        {id: 6, value: '드라이 버무스', checked: false},
        {id: 7, value: '라임 주스', checked: false},
        {id: 8, value: '럼', checked: false},
        {id: 9, value: '레몬 주스', checked: false},
        {id: 10, value: '말리부', checked: false},
        {id: 11, value: '맥주', checked: false},
        {id: 12, value: '메로나', checked: false},
        {id: 13, value: '미도리', checked: false},
        {id: 14, value: '바카디', checked: false},
        {id: 15, value: '베일리스', checked: false},
        {id: 16, value: '보드카', checked: false},
        {id: 17, value: '블루 큐라소', checked: false},
        {id: 18, value: '설탕 시럽', checked: false},
        {id: 19, value: '소주', checked: false},
        {id: 20, value: '스크류바', checked: false},
        {id: 21, value: '스프라이트', checked: false},
        {id: 22, value: '아마레또', checked: false},
        {id: 23, value: '아이스크림', checked: false},
        {id: 24, value: '에너지드링크', checked: false},
        {id: 25, value: '오렌지 주스', checked: false},
        {id: 26, value: '우스터 소스', checked: false},
        {id: 27, value: '우유', checked: false},
        {id: 28, value: '위스키', checked: false},
        {id: 29, value: '이온음료', checked: false},
        {id: 30, value: '자몽 주스', checked: false},
        {id: 31, value: '잭다니엘', checked: false},
        {id: 32, value: '진', checked: false},
        {id: 33, value: '체리브랜디', checked: false},
        {id: 34, value: '초코우유', checked: false},
        {id: 35, value: '커피', checked: false},
        {id: 36, value: '코코넛우유', checked: false},
        {id: 37, value: '콜라', checked: false},
        {id: 38, value: '크렌베리 주스', checked: false},
        {id: 39, value: '크림 드 카시스', checked: false},
        {id: 40, value: '타바코 소스', checked: false},
        {id: 41, value: '탄산수', checked: false},
        {id: 42, value: '토닉워터', checked: false},
        {id: 43, value: '토마토 주스', checked: false},
        {id: 44, value: '트리플 섹', checked: false},
        {id: 45, value: '파인애플 주스', checked: false},
        {id: 46, value: '피치 리큐어', checked: false},
        {id: 47, value: '휘핑크림', checked: false},
      ].concat(),
    );
  };

  const _selectMaterial = async (item) => {
    // console.log(materialList[item.id].checked);
    let refreshList = material;
    let imsiList = list;
    if (imsiList.indexOf(item.value) === -1) {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          filter_Ingredient: firestore.FieldValue.arrayUnion(item.value),
        });
      imsiList.push(item.value);
      refreshList[item.id].checked = true;
    } else {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          filter_Ingredient: firestore.FieldValue.arrayRemove(item.value),
        });
      imsiList.splice(imsiList.indexOf(item.value), 1);
      refreshList[item.id].checked = false;
    }
    // console.log(list);

    setMaterial(refreshList.concat());
    setList(imsiList.concat());

    if (imsiList.length === 0) {
      firestore().collection('users').doc(auth().currentUser.uid).update({
        filter_Ingredient: firestore.FieldValue.delete(),
      });
    }
    // console.log(this.state.list);
  };

  const _materialChecklist = () => {
    return material.map((item) => {
      return (
        <View key={item.id}>
          <TouchableOpacity
            style={styles.textList}
            onPress={() => _selectMaterial(item)}>
            <Text style={styles.materialText}>{item.value}</Text>
            {item.checked ? (
              <Image source={checkIcon} style={{opacity: 1}} />
            ) : (
              <Image source={checkIcon} style={{opacity: 0}} />
            )}
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View
        style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={styles.submit} onPress={() => _filterReset()}>
          <Text style={styles.filterText}>필터 초기화</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView style={styles.materialContainer}>
          {_materialChecklist()}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.submit2}
          onPress={() => navigations.navigate('Filter_List')}>
          <Text style={styles.filterText2}>필터 검색</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  materialContainer: {
    marginTop: 20,
    marginBottom: 13,
    padding: 10,
    width: '87%',
    height: 480,
    backgroundColor: 'rgba(138, 138, 138,0.5)',
    borderRadius: 25,
  },

  textList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 15,
    paddingLeft: 15,
    marginBottom: 20,
  },
  materialText: {
    fontSize: 20,
    color: 'white',
    // fontFamily: '남양주고딕Light',
  },
  submit: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    // paddingHorizontal: 35,
    paddingHorizontal: 30,
    marginTop: 10,
    borderColor: 'transparent',
    backgroundColor: '#00002D',
  },
  submit2: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    // paddingHorizontal: 35,
    paddingHorizontal: 40,
    borderColor: 'transparent',
    backgroundColor: 'white',
    marginBottom: 9,
  },
  filterText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: '남양주고딕Light',
    fontSize: 14.5,
  },
  filterText2: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: '남양주고딕Light',
    fontSize: 14.5,
  },
});

export default Filter_Ingredient;

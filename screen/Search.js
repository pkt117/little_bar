import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Caution from '../image/Caution.png';
import {removeWhitespace} from '../utils/common';

const {width, height} = Dimensions.get('screen');
const FilterButton = styled.TouchableOpacity`
  position: absolute;
  top: 18px;
  right: 13px;
  elevation: 6;
`;

const Search = ({navigation, navigation: {navigate}}) => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const user = auth().currentUser;
  const navigations = useNavigation();

  const _onClickSearchButton = () => {
    if (searchText !== '') {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          search_history: firestore.FieldValue.arrayRemove(searchText),
        });

      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          search_history: firestore.FieldValue.arrayUnion(searchText),
        });
    }
    setLoading(!loading);
    navigate('Search_List', {searchText: searchText});
    setSearchText('');
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {search_history} = documentSnapshot.data();
          if (!search_history) setHistoryList([]);
          else {
            setHistoryList(search_history.reverse());
          }
          // console.log(historyList);
        }
      });
  };
  const _handleChangeText = (text) => {
    setSearchText(removeWhitespace(text));
  };
  const _historyDelete = (item) => {
    // console.log(item);
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        search_history: firestore.FieldValue.arrayRemove(item),
      });

    setLoading(!loading);
  };

  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const _allDelete = () => {
    firestore().collection('users').doc(auth().currentUser.uid).update({
      search_history: firestore.FieldValue.delete(),
    });
    setHistoryList([]);
  };

  const _latestSearch = () => {
    // console.log(historyList);
    if (!historyList.length) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Image source={Caution} />
          <Text style={{color: 'white', fontSize: 20, marginTop: 40}}>
            최근 검색기록이 없습니다
          </Text>
        </View>
      );
    } else {
      return historyList.map((item) => {
        return (
          <View key={item}>
            <TouchableOpacity
              onPress={() => {
                navigate('Search_List', {searchText: item});
              }}>
              <Text style={styles.flatText}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flatButton}
              onPress={() => _historyDelete(item)}>
              <Ionicons name="close-outline" size={35} color="white" />
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'black'}}
      behavior="height"
      keyboardVerticalOffset={60}>
      <View
        style={{
          backgroundColor: 'black',
          paddingBottom: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigations.goBack()}
          style={styles.back}>
          <Ionicons name="chevron-back" size={35} color="white" />
        </TouchableOpacity>

        <TextInput
          activeOpacity={0.9}
          placeholder="검색어를 입력해주세요"
          onChangeText={(text) => {
            setSearchText(text);
            _handleChangeText(text);
          }}
          value={searchText}
          returnKeyType="search"
          style={{
            borderWidth: 1,
            borderColor: 'white',
            width: '70%',
            borderRadius: 15,
            paddingLeft: 10,
            marginTop: 27,
            backgroundColor: 'white',
            paddingVertical: 3,
          }}
          onSubmitEditing={() => {
            _onClickSearchButton();
          }}></TextInput>
        <TouchableOpacity
          style={{paddingTop: 36, paddingHorizontal: 17}}
          onPress={() => setSearchText('')}>
          <Text style={{color: 'white', fontSize: 17}}>취소</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.textDeco}>최근 검색</Text>
        <TouchableOpacity onPress={() => _allDelete()}>
          <Text style={styles.textDeco}>전체 삭제</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.searchContainer}>{_latestSearch()}</ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(70, 70, 70, 0.70)',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
  },
  searchButtonText: {
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 17,
    color: 'white',
  },
  searchContainer: {
    backgroundColor: 'black',
    width: '100%',
    marginTop: 10,
    marginBottom: 50,
  },
  textDeco: {
    color: 'white',
    paddingTop: 10,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  flatText: {
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(20, 20, 20, 1)',
    padding: 5,
    paddingVertical: 11,
    fontSize: 20,
    marginLeft: 10,
    color: 'white',
  },
  flatButton: {
    position: 'absolute',
    right: 10,
    padding: 7,
  },
  back: {
    // position: 'absolute',
    // top: 10,
    // left: 10,
    paddingTop: 30,
    paddingHorizontal: 10,
    zIndex: 1,
  },
});

export default Search;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import check from '../image/check_white.png';

const ScrapEdit = ({navigation: {navigate}, route}) => {
  const navigations = useNavigation();
  const [selectList, setSelectList] = useState([]);

  const _select = (name) => {
    let list = selectList;
    if (selectList.indexOf(name) !== -1) {
      list.splice(list.indexOf(name), 1);
    } else {
      list.push(name);
    }
    setSelectList(list.concat());
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          justifyContent: 'center',
          paddingTop: 40,
          paddingBottom: 15,
          marginBottom: 10,
          backgroundColor: '#74C55A',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigations.goBack()}
          style={{position: 'absolute', top: 38, left: 10}}>
          <Ionicons name="chevron-back" size={35} color="white" />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 25}}>
          삭제할 항목을 선택하세요
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 19,
        }}>
        <TouchableOpacity>
          <Text style={{color: '#74C55A', fontSize: 15}}>전체 선택</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {route.params.post.map((item) => (
            <TouchableOpacity
              style={{flexDirection: 'column'}}
              key={item.Name}
              onPress={() => _select(item.Name)}>
              <Image
                source={{uri: item.imgUrl}}
                style={styles.imageStyle}
                resizeMode="stretch"
              />
              <Text style={styles.name}>{item.Name}</Text>
              <View
                numberOfLines={1}
                style={{
                  paddingLeft: 13,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {item.hashtag.map((item2) => (
                  <Text
                    style={styles.tag}
                    key={item.Name + item.hashtag.indexOf(item2)}>
                    {item.hashtag.indexOf(item2) < 3 ? `#${item2}` : ''}
                    {/* {item2 === '' ? '' : ` #${item2}`} */}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    width: 175,
    height: 230,
    margin: 15.2,
  },
  name: {
    color: 'white',
    fontSize: 19,
    paddingLeft: 10,
  },
  tag: {
    color: 'white',
    fontSize: 14,
  },
});

export default ScrapEdit;

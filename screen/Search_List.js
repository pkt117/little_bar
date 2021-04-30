import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Search_List = ({navigation, route, navigation: {navigate}}) => {
  const navigations = useNavigation();
  const [posts, setPosts] = useState([]);
  const getRecipe = async () => {
    try {
      const list = [];

      await firestore()
        .collection('cocktailA')
        .where('keyword', 'array-contains', route.params.searchText)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const {
              Name,
              imgUrl,
              hashtag,
              recipe,
              provider,
              materials,
            } = doc.data();

            list.push({
              Name,
              imgUrl,
              hashtag,
              recipe,
              provider,
              materials,
            });
          });
        });
      setPosts(list);

      //   console.log(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
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

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            width: '70%',
            borderRadius: 15,
            paddingLeft: 10,

            backgroundColor: 'white',
            paddingVertical: 8,
            marginLeft: 10,
          }}
          onPress={() => navigations.navigate('Search')}>
          <Text style={{fontSize: 15, opacity: 0.4}}>
            {' '}
            검색어를 입력해주세요
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 19,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>
            총 {posts.length}개
          </Text>
          {/* <Text style={{color: 'white'}}>곧 수정</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {posts.map((item) => (
            <TouchableOpacity
              style={{flexDirection: 'column'}}
              key={item.Name}
              onPress={() => navigate('CocktailScreen', {item: item})}>
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
    fontSize: 22,
    paddingLeft: 13,
  },
  tag: {
    color: 'white',
    fontSize: 14,
  },
});

export default Search_List;

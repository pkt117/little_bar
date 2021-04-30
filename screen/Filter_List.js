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
import auth from '@react-native-firebase/auth';

const Filter_List = ({navigation: {navigate}, navigation}) => {
  const navigations = useNavigation();
  const [imsiPosts, setImsiPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const item = [];
  let ingredient = null;

  const getRecipe = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        const {
          filter_Ingredient,
          filter_Color,
          filter_Taste,
        } = documentSnapshot.data();
        item.push({
          filter_Ingredient,
          filter_Color,
          filter_Taste,
        });
        ingredient = filter_Ingredient;
      });
    _recipeList();
    // console.log(item[0].filter_Color);
    //   console.log(item[0].filter_Ingredient);
    // console.log(item[0].filter_color);
  };
  const _recipeList = async () => {
    const list = [];
    if (item[0].filter_Color !== undefined) {
      await firestore()
        .collection('cocktailA')
        // .where('materials', 'in_array', ingredient)
        .where('color', 'array-contains', item[0].filter_Color)
        // .where('taste','array-contains',item[0].filter_Taste)

        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //   console.log(doc.data());

            const {
              Name,
              imgUrl,
              hashtag,
              recipe,
              provider,
              materials,
            } = doc.data();
            if (ingredient !== undefined) {
              let su = 0;
              for (let i = 0; i < ingredient.length; i++) {
                if (materials.indexOf(ingredient[i]) !== -1) {
                  su = 1;
                } else {
                  su = 0;
                }
              }
              if (su === 1) {
                list.push({
                  Name,
                  imgUrl,
                  hashtag,
                  recipe,
                  provider,
                  materials,
                });
              }
            } else {
              list.push({
                Name,
                imgUrl,
                hashtag,
                recipe,
                provider,
                materials,
              });
            }
          });
        });
      setPosts(list);
      //   _recipeList2();

      //   console.log(list);
      //   console.log(ingredient);
    } else if (ingredient !== undefined) {
      await firestore()
        .collection('cocktailA')
        .where('materials', 'array-contains', ingredient[0])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //   console.log(doc.data());

            const {
              Name,
              imgUrl,
              hashtag,
              recipe,
              provider,
              materials,
            } = doc.data();
            if (ingredient.length > 1) {
              let su = 0;
              for (let i = 1; i < ingredient.length; i++) {
                if (materials.indexOf(ingredient[i]) !== -1) {
                  su = 1;
                } else {
                  su = 0;
                }
              }
              if (su === 1) {
                list.push({
                  Name,
                  imgUrl,
                  hashtag,
                  recipe,
                  provider,
                  materials,
                });
              }
            } else {
              list.push({
                Name,
                imgUrl,
                hashtag,
                recipe,
                provider,
                materials,
              });
            }
          });
        });
      setPosts(list);
    }
  };

  const _refresh = () => {
    firestore().collection('users').doc(auth().currentUser.uid).update({
      filter_Color: firestore.FieldValue.delete(),
      filter_Ingredient: firestore.FieldValue.delete(),
      filter_Taste: firestore.FieldValue.delete(),
    });
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
          onPress={() => {
            navigation.reset({routes: [{name: 'Filter'}]});
            _refresh();
          }}
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
          <Text style={{color: 'white', fontSize: 15}}>
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
    fontSize: 19,
    paddingLeft: 10,
  },
  tag: {
    color: 'white',
    fontSize: 14,
  },
});

export default Filter_List;

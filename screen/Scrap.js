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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Scrap = ({navigation: {navigate}}) => {
  const [posts, setPosts] = useState([]);

  const _getScrapList = () => {
    const list = [];
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {scrap} = documentSnapshot.data();

          if (scrap.length > 0) {
            firestore()
              .collection('cocktailA')
              .where('Name', 'in', scrap)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
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
                // console.log(list);
                setPosts(list);
              });
          }
        }
      });
  };

  useEffect(() => {
    _getScrapList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{alignItems: 'center', marginTop: 30, marginBottom: 10}}>
        <Text style={{color: 'white', fontSize: 25}}>저장된 레시피</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 19,
        }}>
        <Text style={{color: 'white', fontSize: 15}}>총 {posts.length}개</Text>
        <TouchableOpacity onPress={() => navigate('ScrapEdit', {post: posts})}>
          <Text style={{color: '#74C55A', fontSize: 15}}>편집</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {posts.map((item) => (
            <TouchableOpacity
              style={{flexDirection: 'column'}}
              key={item.Name}
              onPress={() => navigate('ScrapCocktailScreen', {item: item})}>
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

export default Scrap;

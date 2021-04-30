import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import heart from '../image/heart.png';
import broken_heart from '../image/broken_heart.png';

const {width, height} = Dimensions.get('screen');

const LikeSelect = ({navigation, route}) => {
  const [cocktail, setCocktail] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const navigations = useNavigation();

  const getRecipe = async () => {
    try {
      const list = [];

      await firestore()
        .collection('cocktailA')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {Name, imgUrl} = doc.data();
            list.push({
              name: Name,
              imgUrl,
            });
          });
        });

      setCocktail(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipe();
    // console.log(route.params.userUid);
  }, []);

  const _cocktailClick = (name) => {
    list = likeList;

    if (list.indexOf(name) === -1) {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          Like: firestore.FieldValue.arrayUnion(name),
        });
      list.push(name);
    } else {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          Like: firestore.FieldValue.arrayRemove(name),
        });
      let index = list.indexOf(name);
      list.splice(index, 1);
    }
    setLikeList(list.concat());
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.title}>취향 분석</Text>
      <Text style={styles.littleTitle}>
        좋아하는 칵테일을 세 개 이상 선택해주세요
      </Text>
      <ScrollView style={styles.scroll}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 23,
          }}>
          {cocktail.map((item) => {
            return (
              <View key={item.name} style={styles.imageView}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.imageButton}
                  onPress={() => _cocktailClick(item.name)}>
                  <Image
                    resizeMode="stretch"
                    source={{uri: item.imgUrl}}
                    imageStyle={{borderRadius: 42.5}}
                    style={styles.imageStyle}
                  />
                  {likeList.indexOf(item.name) === -1 ? null : (
                    <Image source={heart} style={styles.heartImage} />
                  )}
                </TouchableOpacity>
                <Text style={styles.imageText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => navigations.navigate('Login')}>
        <Text style={styles.finishText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 80,
  },

  littleTitle: {
    color: 'white',
    fontSize: 13,
    marginTop: 15,
  },
  scroll: {
    marginTop: 15,
    width: '85%',

    backgroundColor: 'white',
    borderRadius: 30,
    marginBottom: 20,

    paddingTop: 30,
    paddingHorizontal: 30,
  },
  imageStyle: {
    width: 77,
    height: 77,
    borderRadius: 38.5,
    // margin: 5,
    // elevation: 14,
  },
  imageView: {
    marginVertical: 15,
    marginHorizontal: 4.2,
    alignItems: 'center',
  },
  imageText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 88,
    marginTop: 3,
  },
  imageButton: {
    width: 77,
    height: 77,

    borderRadius: 38.5,
    margin: 5,
    elevation: 13,
  },
  finishButton: {
    width: '85%',
    height: 54,
    backgroundColor: '#74C55A',
    borderWidth: 1.5,
    borderColor: 'black',

    // marginBottom: 35,
    borderRadius: 20,
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 60,
    marginBottom: 30,
  },
  finishText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontFamily: 'MapoGoldenPier',
    fontWeight: 'bold',
  },
  heartImage: {
    position: 'absolute',
    top: 24,
    left: 23,
  },
});

export default LikeSelect;

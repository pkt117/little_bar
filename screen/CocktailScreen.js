import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {getCurrentUser} from '../utils/firebase';
import styled from 'styled-components';
import heart_click from '../image/like_heart_click.png';
import heart from '../image/like_heart.png';
import scrap from '../image/scrap.png';
import scrap_click from '../image/scrap_click.png';

const {height, width} = Dimensions.get('screen');
const StyledImage = styled.Image`
  background-color: white;
  border-radius: ${({rounded}) => (rounded ? 50 : 0)}px;
`;

const CocktailScreen = ({navigation, route}) => {
  const [profile, setProfile] = useState('');
  const [likes, setLikes] = useState([]);
  const [scraps, setScraps] = useState([]);

  let su = 0;

  const getUser = async (provider) => {
    // console.log(provider);
    try {
      await firestore()
        .collection('users')
        .where('name', '==', provider)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {profileImg} = doc.data();
            setProfile(profileImg);
            // console.log(profileImg);
          });
        });

      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const {scrap, Like} = documentSnapshot.data();
            setScraps(scrap);
            setLikes(Like);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser(route.params.item.provider);
  }, []);
  const navigations = useNavigation();

  const recipeWay = (item2) => {
    if (item2 !== '') {
      return (
        <Text style={styles.recipeText} key={su++}>
          {route.params.item.recipe.indexOf(item2) + 1}. {item2}
        </Text>
      );
    }
  };

  const _scrapClick = (name) => {
    const imsiScraps = scraps;
    if (imsiScraps.indexOf(name) !== -1) {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          scrap: firestore.FieldValue.arrayRemove(name),
        });
      imsiScraps.splice(imsiScraps.indexOf(name), 1);
    } else {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          scrap: firestore.FieldValue.arrayUnion(name),
        });
      imsiScraps.push(name);
    }
    setScraps(imsiScraps.concat());
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigations.goBack()}
          style={styles.back}>
          <Ionicons name="chevron-back" size={35} color="white" />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 32, marginTop: 5.5}}>
          {route.params.item.Name}
        </Text>
        <TouchableOpacity
          style={styles.scrapIcon}
          onPress={() => _scrapClick(route.params.item.Name)}>
          {scraps.indexOf(route.params.item.Name) === -1 ? (
            <Image source={scrap} />
          ) : (
            <Image source={scrap_click} />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <StyledImage
            style={styles.profileImg}
            rounded
            source={profile ? {uri: profile} : null}
          />
          <Text style={{color: 'white', fontSize: 15}}>
            "{route.params.item.provider}"바텐더님의 레시피
          </Text>
          <ImageBackground
            source={{uri: route.params.item.imgUrl}}
            style={styles.postImage}
            resizeMode="stretch"
          />

          <View style={{flexDirection: 'row'}}>
            {route.params.item.hashtag.map((item2) => (
              <Text style={styles.tag} key={item2}>
                {item2 === '' ? '' : ` #${item2}`}
              </Text>
            ))}
          </View>
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={{color: 'white', fontSize: 15}}>만드는 방법</Text>
            <View style={styles.recipeContainer}>
              {route.params.item.recipe.map((item2) => recipeWay(item2))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  recipeContainer: {
    width: width - 20,
    backgroundColor: 'rgba(100, 100, 100,0.3)',
    marginTop: 10,
    marginBottom: 30,
  },
  recipeText: {
    color: 'white',
    fontSize: 16,
    marginTop: 13,
    marginBottom: 13,
    marginLeft: 10,
  },
  postImage: {
    marginTop: 7,
    marginBottom: 20,
    width: 310,
    height: 310,
    flex: 1,
  },
  profileImg: {
    marginTop: 50,
    marginBottom: 10,
    width: 28,
    height: 28,
  },
  tag: {
    color: 'white',
    fontSize: 17,
  },
  scrapIcon: {
    position: 'absolute',
    top: 15,
    right: 40,
  },
});
export default CocktailScreen;

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

import ImageSlide from '../components/ImageSlide';
import rightButton from '../image/rightButton.png';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 62) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 82%;
  left: 50%;
  margin-left: -55px;
  margin-right: -22.5px;
  width: 110px;
  height: 45px;
`;

const ShadowText = styled.Text`
  text-shadow: 2px 2px 6px gray;
`;

const Home = () => {
  const [weeklyRecipeData, setWeeklyRecipeDate] = useState('');
  const [sojuCocktail, setSojuCocktail] = useState([]);
  const [movieCocktail, setMovieCocktail] = useState([]);

  const getRecipe = async () => {
    try {
      await firestore()
        .collection('weeklyRecipe')
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            console.log('weekly Recipe: ', documentSnapshot.data());
            setWeeklyRecipeDate(documentSnapshot.data());
          });
        });
    } catch (e) {
      console.log(e);
    }

    try {
      const list1 = [];

      await firestore()
        .collection('recipe')
        .where('home-category', '==', '영화속칵테일')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {name, imgUrl} = doc.data();
            list1.push({
              name,
              imgUrl,
            });
          });
        });
      setMovieCocktail(list1);
    } catch (e) {
      console.log(e);
    }

    try {
      const list2 = [];

      await firestore()
        .collection('recipe')
        .where('home-category', '==', '소주칵테일')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {name, imgUrl} = doc.data();
            list2.push({
              name,
              imgUrl,
            });
          });
        });
      setSojuCocktail(list2);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <Container>
      <Poster source={{uri: weeklyRecipeData.imgUrl}}>
        <ShadowText style={styles.textDeco}>금주의 칵테일</ShadowText>
        <ShadowText style={styles.weeklyTitle}>
          {weeklyRecipeData.name}
        </ShadowText>

        <Gradient
          colors={[
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.0)',
            'rgba(0,0,0,0.0)',
            'rgba(0,0,0,1)',
          ]}></Gradient>
        <ButtonContainer style={styles.recipeGoButton}>
          <Text style={styles.goButtonText}>레시피{'\n'}보러가기</Text>
          <ShadowText>
            <Image source={rightButton} />{' '}
          </ShadowText>
        </ButtonContainer>
      </Poster>
      <ImageSlide label="영화 속 칵테일" item={movieCocktail} />
      <ImageSlide label="소주 칵테일" item={sojuCocktail} />
    </Container>
  );
};

const styles = StyleSheet.create({
  textDeco: {
    position: 'absolute',
    top: 40,
    bottom: 0,
    left: 15,
    right: 0,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    elevation: 5,
  },
  weeklyTitle: {
    position: 'absolute',
    top: 105,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    elevation: 5,
    fontSize: 30,
  },
  recipeGoButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.40)',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goButtonText: {
    textAlign: 'center',
    paddingHorizontal: 17,
    fontSize: 13,
    color: 'white',
  },
});

export default Home;

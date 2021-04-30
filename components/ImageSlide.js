import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
const Container = styled.View`
  padding: 20px 0;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  margin: 0 0 5px 10px;
  padding-bottom: 10px;
`;

const Scroll = styled.ScrollView`
  padding-left: 10px;
`;

const PostCard = styled.TouchableOpacity`
  padding-right: 9px;
  padding-horizontal: 4px;
`;

const PostImage = styled.ImageBackground`
  width: ${Math.round((Dimensions.get('window').width * 28) / 100)}px;
  height: 180px;
  justify-content: flex-end;
  align-items: center;
`;

const ShadowText = styled.Text`
  text-shadow: 2px 2px 6px gray;
  border-width: 1px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.41);
  margin-bottom: 14px;
  width: ${Math.round((Dimensions.get('window').width * 28) / 100)}px;
  border-color: transparent;
  text-align: center;
`;

const ImageSlide = ({label, item}) => {
  const navigations = useNavigation();
  return (
    <Container>
      <Label>{label}</Label>
      <Scroll horizontal>
        {item.map((item) => {
          return (
            <PostCard
              key={String(item.name)}
              activeOpacity={0.4}
              onPress={() =>
                navigations.navigate('CocktailScreen', {item: item})
              }>
              <PostImage
                resizeMode="cover"
                source={{uri: item.imgUrl}}
                imageStyle={{borderRadius: 20}}>
                <ShadowText>{item.name}</ShadowText>
              </PostImage>
            </PostCard>
          );
        })}
      </Scroll>
    </Container>
  );
};

export default ImageSlide;

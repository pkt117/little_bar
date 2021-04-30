import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import * as ImagePicker from "expo-image-picker";
import {Alert} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const StyledImage = styled.Image`
  background-color: white;
  border-radius: ${({rounded}) => (rounded ? 50 : 0)}px;
`;

const Container = styled.View`
  align-self: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #464646;
  position: absolute;
  bottom: 17px;
  right: -4px;

  width: 32px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
  name: 'photo-camera',
  size: 22,
})`
  color: white;
`;

const PhotoButton = ({onPress}) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Image = ({url, imageStyle, rounded, showButton, onChangeImage}) => {
  const [imageUrl, setImageUrl] = useState(null);

  const _handleEditButton = () => {
    const options = {noData: true};
    try {
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('response', response);
        if (response.uri) {
          setImageUrl(response.uri);
          onChangeImage(response.uri);
        }
      });
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    }
  };
  // useEffect(() => {
  //   onChangeImage(imageUrl);
  // }, [imageUrl]);

  return (
    <Container style={{paddingVertical: 20}}>
      <StyledImage
        source={{uri: imageUrl ? imageUrl : url || null}}
        // sourece={{ uri: url }}
        style={imageStyle}
        rounded={rounded}
      />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Image.defaultProps = {
  rounded: false,
  showButton: false,
  onChangeImage: () => {},
};

Image.propTypes = {
  url: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
  showButton: PropTypes.bool,
  onChangeImage: PropTypes.func,
};

export default Image;

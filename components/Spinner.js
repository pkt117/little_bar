import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  z-index: 2;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: black;
`;

const Spinner = () => {
  return (
    <Container>
      <ActivityIndicator size={'large'} color="white" />
    </Container>
  );
};

export default Spinner;

import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import backButton from '../image/backButton.png';
import SignupImage from '../image/SignupImage.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {signup} from '../utils/firebase';
import {UserContext} from '../contexts';

const SignupButton = styled.TouchableOpacity`
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;

const {width, height} = Dimensions.get('window');

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigations = useNavigation();
  const {dispatch} = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please enter your name.';
      } else if (!validateEmail(email)) {
        _errorMessage = 'Please verify your email';
      } else if (password.length < 6) {
        _errorMessage = 'The password must contain 6 characters at least.';
      } else if (password !== passwordConfirm) {
        _errorMessage = 'Passwords need to match.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [email, password, passwordConfirm, name]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage),
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      const user = await signup({email, password, name});
      //   Alert.alert('Signup Success', user.email);
      //   console.log('User account created & signed in!');
      dispatch(user);
    } catch (e) {
      //   Alert.alert('Signup Error', e.message);
      console.log('Signup Error', e.message);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <ImageBackground
        source={SignupImage}
        style={styles.imageContainer}
        resizeMode="stretch">
        <TouchableOpacity
          onPress={() => navigations.navigate('Login')}
          style={{paddingTop: 30, paddingHorizontal: 20}}>
          <Image source={backButton} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            style={styles.inputDesignOne}
            placeholder="NAME"
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            returnKeyType="next"
            onChangeText={(text) => setName(text)}
            onSubmitEditing={() => {
              setName(name.trim());
              emailRef.current.focus();
            }}
            onBlur={() => setName(name.trim())}
          />
          <TextInput
            ref={emailRef}
            value={email}
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setEmail(removeWhitespace(text))}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="ID"
            returnKeyType="next"
            style={styles.inputDesign}
          />
          <TextInput
            ref={passwordRef}
            value={password}
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(removeWhitespace(text))}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="PASSWARD"
            returnKeyType="next"
            secureTextEntry={true}
            style={styles.inputDesign}
          />
          <TextInput
            ref={passwordConfirmRef}
            label="password Confirm"
            value={passwordConfirm}
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
            placeholder="PASSWARD CONFIRM"
            returnKeyType="done"
            secureTextEntry={true}
            style={styles.inputDesign}
          />
          <SignupButton
            onPress={_handleSignupButtonPress}
            disabled={disabled}
            style={styles.signupBtn}>
            <Text style={styles.signupText}>SIGN UP</Text>
          </SignupButton>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  inputContainer: {alignItems: 'center', justifyContent: 'center'},
  inputDesignOne: {
    width: width - 100,
    height: 50,
    fontSize: 16,
    backgroundColor: 'rgba(10,10,10,0.6)',
    borderWidth: 1.5,
    borderColor: 'gray',
    color: 'white',
    marginTop: 180,
    borderRadius: 20,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputDesign: {
    width: width - 100,
    height: 50,
    fontSize: 16,
    backgroundColor: 'rgba(10,10,10,0.6)',
    borderWidth: 1.5,
    borderColor: 'gray',
    color: 'white',
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  signupBtn: {
    width: width - 100,
    height: 50,
    backgroundColor: 'rgb(178, 190, 195)',
    borderWidth: 1.5,
    borderColor: 'black',
    marginTop: 80,
    borderRadius: 20,
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 23,
    color: 'rgb(45, 52, 54)',
    fontFamily: 'MapoGoldenPier',
    fontWeight: 'bold',
  },
});
export default Signup;

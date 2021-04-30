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

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import styled from 'styled-components/native';
import {signup} from '../utils/firebase';
import {UserContext} from '../contexts';
import firestore from '@react-native-firebase/firestore';

const SignupButton = styled.TouchableOpacity`
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;

const {width, height} = Dimensions.get('window');

const Signup = ({navigation: {navigate}}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  // const {dispatch} = useContext(UserContext);
  // const navigations = useNavigation();

  const [nameList, setNameList] = useState([]);
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
    let imsi;
    let list = [];
    firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          imsi = documentSnapshot.data().name;
          list.push(imsi);
          // console.log(list);
        });
      });
    setNameList(list);
  }, []);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage),
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    if (nameList.indexOf(name) !== -1) {
      Alert.alert('Signup Error', '닉네임이 중복입니다.');
    } else {
      try {
        const user = await signup({email, password, name});
        //   Alert.alert('Signup Success', user.email);
        //   console.log('User account created & signed in!');
        // dispatch(user);
        const uid = user.uid;
        console.log(uid);
        // navigations.navigate('LikeSelect', {uid});
        navigate('LikeSelect', {userUid: uid});
      } catch (e) {
        //   Alert.alert('Signup Error', e.message);
        console.log('Signup Error', e.message);
      }
    }
  };
  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <View style={styles.Container}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.welcome}>어서오세요!{'\n'}little bar 입니다.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            style={styles.inputDesign}
            placeholder="닉네임"
            placeholderTextColor="white"
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
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setEmail(removeWhitespace(text))}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="아이디"
            returnKeyType="next"
            style={styles.inputDesign}
          />
          <TextInput
            ref={passwordRef}
            value={password}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(removeWhitespace(text))}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="비밀번호"
            returnKeyType="next"
            secureTextEntry={true}
            style={styles.inputDesign}
            maxLength={15}
          />
          <TextInput
            ref={passwordConfirmRef}
            label="password Confirm"
            value={passwordConfirm}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
            placeholder="비밀번호 확인"
            returnKeyType="done"
            secureTextEntry={true}
            style={styles.inputDesign}
            maxLength={15}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <SignupButton
            onPress={_handleSignupButtonPress}
            disabled={disabled}
            style={styles.signupBtn}>
            <Text style={styles.signupText}>회원가입</Text>
          </SignupButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'black',
    width: width,
    height: height,
  },
  inputContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 260,
    marginBottom: 20,
  },

  inputDesign: {
    width: width - 100,
    height: 50,
    fontSize: 16,
    marginLeft: 34,
    borderBottomWidth: 1.5,
    borderColor: 'white',
    color: 'white',
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  signupBtn: {
    width: width - 86,
    height: 54,
    backgroundColor: '#74C55A',
    borderWidth: 1.5,
    borderColor: 'black',
    marginTop: 80,
    borderRadius: 20,
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontFamily: 'MapoGoldenPier',
    fontWeight: 'bold',
  },
  title: {
    position: 'absolute',
    top: 40,
    left: 43,
    color: 'white',
    fontSize: 24,
  },
  welcome: {
    position: 'absolute',
    top: 130,
    left: 43,
    color: 'white',
    fontSize: 34,
  },
});
export default Signup;

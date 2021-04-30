import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace, validateEmail} from '../utils/common';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {login} from '../utils/firebase';
import {ProgressContext, UserContext} from '../contexts';
import {GoogleLogin, FacebookLogin} from '../components';
import DialogAndroid from 'react-native-dialogs';
import auth from '@react-native-firebase/auth';
import Lock from '../image/Lock.png';
import userImg from '../image/user.png';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const LoginButton = styled.TouchableOpacity`
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;

DialogAndroid.assignDefaults({
  keyboardType: 'email-address',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isSelected, setSelection] = useState(false);

  const {spinner} = useContext(ProgressContext);
  const {dispatch} = useContext(UserContext);

  const passwordRef = useRef();

  const navigations = useNavigation();

  const _autoLogin = async () => {
    AsyncStorage.getItem('userData', (err, result) => {
      const userData = JSON.parse(result);
      // console.log('userData', userData.user);
      if (userData !== null) {
        dispatch(userData.user);
      }
    });
  };

  useEffect(() => {
    _autoLogin();
    // AsyncStorage.removeItem('userData');
  }, []);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.',
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({email, password});
      //   Alert.alert("Login Success", user.email);
      console.log(user);
      dispatch(user);

      if (isSelected) {
        AsyncStorage.setItem(
          'userData',
          JSON.stringify({
            // email: email,
            // uid: auth().currentUser.uid,
            user: user,
          }),
        );
      }
    } catch (e) {
      Alert.alert('Login Error', '아이디 또는 비밀번호를 다시 확인하세요.');
    } finally {
      spinner.stop();
    }
  };

  const forgotPassword = async () => {
    const {action, text} = await DialogAndroid.prompt(
      '비밀번호 찾기',
      '이메일 주소를 입력해주세요.',
    );
    if (action === DialogAndroid.actionPositive) {
      console.log(`You submitted: "${text}"`);

      if (text === '') {
        Alert.alert('', '이메일을 입력해주세요.');
      } else {
        auth()
          .sendPasswordResetEmail(text)
          .then(function () {
            // Password reset email sent.
            Alert.alert('이메일 발송완료', '비밀번호를 재설정해주세요.');
          })
          .catch(function (error) {
            // Error occurred. Inspect error.code.
            Alert.alert('error', error.message);
          });
      }
    }
  };

  return (
    <KeyboardAwareScrollView stlye={{backgroundColor: 'black'}}>
      <View style={styles.Container}>
        <Text style={styles.title}>little bar</Text>
        <Text style={styles.littleTitle}>손 안에 작은 칵테일 바</Text>
        <View style={styles.loginContainer}>
          <Image source={userImg} style={styles.userIcon} />
          <TextInput
            isFocused={isFocused}
            value={email}
            placeholder={'ID'}
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            style={styles.idPw}
            returnKeyType="next"
            onChangeText={_handleEmailChange}
            onFocus={() => setIsFocused(true)}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Image source={Lock} style={styles.lockIcon} />
          <TextInput
            value={password}
            ref={passwordRef}
            isFocused={isFocused}
            placeholder={'Password'}
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            style={styles.idPw}
            secureTextEntry={true}
            maxLength={15}
            returnKeyType="none"
            onFocus={() => setIsFocused(true)}
            onChangeText={_handlePasswordChange}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              position: 'absolute',
              top: 135,
              right: 55,
            }}>
            <Text style={{color: 'white', marginTop: 6.5}}>자동 로그인</Text>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              tintColors={{true: 'white'}}
              onPress={() => {
                setChecked(!checked);
              }}
              style={styles.loginCheck}
            />
          </View>
          <LoginButton
            style={styles.lgButton}
            disabled={disabled}
            onPress={_handleLoginButtonPress}>
            <Text style={styles.lgText}>로그인</Text>
          </LoginButton>
        </View>
        <View style={styles.etcButton}>
          <TouchableOpacity style={styles.etcBtn} onPress={forgotPassword}>
            <Text style={styles.etcBtnText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.etcBtn}
            onPress={() => navigations.navigate('Signup')}>
            <Text style={styles.etcBtnText}>회원가입</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sns}>SNS 계정으로 간편로그인하세요</Text>
        <View style={styles.etcButton2}>
          <FacebookLogin />
          <GoogleLogin />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'black',
  },
  loginContainer: {alignItems: 'center', marginTop: 65},
  userIcon: {
    position: 'absolute',
    top: 35,
    left: 57,
    zIndex: 1,
  },
  lockIcon: {
    position: 'absolute',
    top: 106,
    left: 57,
    zIndex: 1,
  },
  idPw: {
    width: width - 115,
    height: 50,
    fontSize: 16,
    backgroundColor: 'rgba(10,10,10,0.6)',
    borderBottomWidth: 1.5,
    borderColor: 'white',
    color: 'white',
    marginTop: 20,

    paddingVertical: 10,
    paddingLeft: 27,
  },
  lgButton: {
    width: width - 100,
    height: 50,
    backgroundColor: '#74C55A',
    borderWidth: 1.5,
    borderColor: 'black',
    marginTop: 50,
    borderRadius: 20,
    justifyContent: 'center',
  },
  lgText: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
    // fontFamily: 'MapoGoldenPier',
    // fontWeight: 'bold',
  },
  etcButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  etcButton2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  etcBtn: {
    marginLeft: 50,
    marginRight: 35,
    width: width - 330,
    height: 20,
    backgroundColor: 'transparent',

    marginTop: 10,

    justifyContent: 'center',
  },
  etcBtnText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  loginCheck: {zIndex: 1, alignSelf: 'center'},
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: 130,
    fontSize: 60,
    fontWeight: 'bold',
  },
  littleTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  sns: {
    marginTop: 70,
    opacity: 0.7,
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;

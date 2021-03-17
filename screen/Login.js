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
import bgImage from '../image/LgImage.png';
import {removeWhitespace, validateEmail} from '../utils/common';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {login} from '../utils/firebase';
import {ProgressContext, UserContext} from '../contexts';
import {GoogleLogin, FacebookLogin} from '../components';
import DialogAndroid from 'react-native-dialogs';
import auth from '@react-native-firebase/auth';

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

  const {spinner} = useContext(ProgressContext);
  const {dispatch} = useContext(UserContext);

  const passwordRef = useRef();

  const navigations = useNavigation();

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
      dispatch(user);
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
    <KeyboardAwareScrollView>
      <ImageBackground
        source={bgImage}
        style={styles.imageContainer}
        resizeMode="stretch">
        <View style={styles.loginContainer}>
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
          <TextInput
            value={password}
            ref={passwordRef}
            isFocused={isFocused}
            placeholder={'Password'}
            placeholderTextColor="#707070"
            underlineColorAndroid="transparent"
            style={styles.idPw}
            secureTextEntry={true}
            maxLength={8}
            returnKeyType="none"
            onFocus={() => setIsFocused(true)}
            onChangeText={_handlePasswordChange}
          />
          <LoginButton
            style={styles.lgButton}
            disabled={disabled}
            onPress={_handleLoginButtonPress}>
            <Text style={styles.lgText}>LOGIN</Text>
          </LoginButton>
        </View>
        <View style={styles.etcButton}>
          <TouchableOpacity style={styles.etcBtn} onPress={forgotPassword}>
            <Text style={styles.etcBtnText}>FIND</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.etcBtn}
            onPress={() => navigations.navigate('Signup')}>
            <Text style={styles.etcBtnText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.etcButton2}>
          <FacebookLogin />
          <GoogleLogin />
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
  loginContainer: {alignItems: 'center', marginTop: 285},
  idPw: {
    width: width - 100,
    height: 50,
    fontSize: 16,
    backgroundColor: 'rgba(10,10,10,0.6)',
    borderWidth: 1.5,
    borderColor: 'gray',
    color: 'white',
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  lgButton: {
    width: width - 100,
    height: 50,
    backgroundColor: 'rgb(178, 190, 195)',
    borderWidth: 1.5,
    borderColor: 'black',
    marginTop: 30,
    borderRadius: 20,
    justifyContent: 'center',
  },
  lgText: {
    textAlign: 'center',
    fontSize: 23,
    color: 'rgb(45, 52, 54)',
    fontFamily: 'MapoGoldenPier',
    fontWeight: 'bold',
  },
  etcButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  etcButton2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 85,
  },
  etcBtn: {
    marginHorizontal: 23,
    width: width - 330,
    height: 20,
    backgroundColor: 'rgb(178, 190, 195)',
    opacity: 0.7,
    marginTop: 25,
    borderColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
  },
  etcBtnText: {
    fontSize: 10.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;

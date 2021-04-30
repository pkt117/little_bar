import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {logout, getCurrentUser} from '../utils/firebase';
import {ProgressContext, UserContext} from '../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImagePick} from '../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import profileScreen from '../image/profileScreen.png';
import heart from '../image/heartIcon.png';
import lock from '../image/lockIcon.png';
import information from '../image/information.png';
import idea from '../image/idea.png';
import comment from '../image/comment.png';
import right from '../image/right.png';
import DialogAndroid from 'react-native-dialogs';

const {width, height} = Dimensions.get('screen');

const Profile = () => {
  const {spinner} = useContext(ProgressContext);
  const user = auth().currentUser;
  const {dispatch} = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState('');
  const [name, setName] = useState('');

  const getProfile = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        const {profileImg} = documentSnapshot.data();
        console.log(profileImg);
        setPhotoUrl(profileImg);
      });

    setName(user.displayName);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const _ChangeImage = async (url) => {
    let filename = `/profile/${user.uid}/profileImg.png`;

    const task = storage().ref(filename).putFile(url);

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    // Alert.alert(
    //   "Photo uploaded!",
    //   "Your photo has been uploaded to Firebase Cloud Storage!"
    // );

    const uri = await storage().ref(filename).getDownloadURL();
    // 이미지 스토리지에 업로드

    firestore().collection('users').doc(auth().currentUser.uid).update({
      profileImg: uri,
    });
  };

  const _nameChange = async () => {
    let imsi;
    const list = [];
    firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          imsi = documentSnapshot.data().name;
          list.push(imsi);
        });
      });
    const {action, text} = await DialogAndroid.prompt(
      '이름 변경',
      '이름을 입력해주세요.',
    );
    if (action === DialogAndroid.actionPositive) {
      // console.log(`You submitted: "${text}"`);

      if (text === '') {
        Alert.alert('', '이름을 입력해주세요.', [
          {
            text: 'ok',
            onPress: _nameChange,
          },
        ]);
      } else {
        if (list.indexOf(text) !== -1) {
          Alert.alert('닉네임 중복', '다시 입력해주세요.', [
            {
              text: 'ok',
              onPress: _nameChange,
            },
          ]);
        } else {
          setName(text);

          user.updateProfile({
            displayName: text,
          });

          firestore().collection('users').doc(auth().currentUser.uid).update({
            name: text,
          });
          Alert.alert('', '이름 변경완료');
        }
      }
    }
  };
  const _logoutAlert = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '예',
          onPress: _handleLogoutButtonPress,
        },
        {text: '아니오', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
      AsyncStorage.removeItem('userData');
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };
  return (
    <ImageBackground source={profileScreen} style={styles.container}>
      <ImagePick
        rounded
        url={photoUrl}
        showButton
        onChangeImage={(url) => {
          setPhotoUrl(url);
          _ChangeImage(url);
        }}
        imageStyle={{
          width: 105,
          height: 105,
          resizeMode: 'cover',
          marginTop: 85,
        }}
      />
      <Text style={styles.text}>{name}</Text>
      <Text
        style={{
          color: 'black',
          fontSize: 17,
          lineHeight: 20,
          fontWeight: '100',
        }}>
        바텐더님
      </Text>
      <TouchableOpacity onPress={_nameChange}>
        <Text
          style={{
            color: '#74C55A',
            marginTop: 5,
            fontSize: 15,
          }}>
          이름 바꾸기
        </Text>
      </TouchableOpacity>
      <Text style={styles.line}>{''}</Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 360,
          left: 20,
        }}>
        <Image source={heart} style={{marginTop: 5}} />
        <Text style={styles.listText}>좋아요 한 칵테일 수정</Text>
        <Image source={right} style={{marginTop: 7, marginLeft: 134}} />
      </TouchableOpacity>
      <Text
        style={{
          borderBottomWidth: 0.4,
          paddingHorizontal: width,
          borderBottomColor: '#D1D1D1',
          position: 'absolute',
          top: 385,
        }}>
        {''}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 425,
          left: 17,
        }}>
        <Image source={comment} style={{marginTop: 5}} />
        <Text style={styles.listText}>내가 쓴 댓글</Text>
        <Image source={right} style={{marginTop: 7, marginLeft: 214}} />
      </TouchableOpacity>
      <Text
        style={{
          borderBottomWidth: 0.4,
          paddingHorizontal: width,
          borderBottomColor: '#D1D1D1',
          position: 'absolute',
          top: 450,
        }}>
        {''}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 490,
          left: 20,
        }}>
        <Image source={idea} style={{marginTop: 1}} />
        <Text style={styles.listText}>제안하기</Text>
        <Image source={right} style={{marginTop: 7, marginLeft: 242}} />
      </TouchableOpacity>
      <Text
        style={{
          borderBottomWidth: 0.4,
          paddingHorizontal: width,
          borderBottomColor: '#D1D1D1',
          position: 'absolute',
          top: 515,
        }}>
        {''}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 555,
          left: 22.5,
        }}>
        <Image source={information} style={{marginTop: 5}} />
        <Text style={styles.listText}>정보</Text>
        <Image source={right} style={{marginTop: 7, marginLeft: 283}} />
      </TouchableOpacity>
      <Text
        style={{
          borderBottomWidth: 0.4,
          paddingHorizontal: width,
          borderBottomColor: '#D1D1D1',
          position: 'absolute',
          top: 575,
        }}>
        {''}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 615,
          left: 21.8,
        }}
        onPress={_logoutAlert}>
        <Image source={lock} style={{marginTop: 5}} />
        <Text style={styles.listText}>계정 관리</Text>
        <Image source={right} style={{marginTop: 7, marginLeft: 237}} />
      </TouchableOpacity>
      <Text
        style={{
          borderBottomWidth: 0.4,
          paddingHorizontal: width,
          borderBottomColor: '#D1D1D1',
          position: 'absolute',
          top: 640,
        }}>
        {''}
      </Text>

      {/* <Button
        containerStyle={{marginTop: 30}}
        onPress={_logoutAlert}
        title="logout"
      /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: 'black',
  },
  text: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 21,
    marginLeft: 10,
  },
  line: {
    borderBottomWidth: 0.5,
    paddingHorizontal: width,
    borderBottomColor: '#D1D1D1',
  },
});
export default Profile;

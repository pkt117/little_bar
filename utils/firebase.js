import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const login = async ({email, password}) => {
  const {user} = await auth().signInWithEmailAndPassword(email, password);
  return user;
}; // 로그인

export const signup = async ({email, password, name}) => {
  //   await auth().createUserWithEmailAndPassword(email, password);

  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      //   Alert.alert('Signup Success', email);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        // console.log("That email address is already in use!");
        Alert.alert('Signup Error', error.message);
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Signup Error', error.message);
        // console.log("That email address is invalid!");
      }

      console.error(error);
    });

  const user = auth().currentUser;

  await user.updateProfile({
    displayName: name,
  });

  firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .set({
      name: name,
      email: email,
      createdAt: firestore.Timestamp.fromDate(new Date()),
      profileImg:
        'https://firebasestorage.googleapis.com/v0/b/capston193-7eac6.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=085519df-d7d2-41ea-a597-938a79160785',
      //userImg: storageUrl,
      scrap: firestore.FieldValue.arrayUnion(),
    });

  return user;
};
// 회원가입

export const getCurrentUser = () => {
  const {
    displayName,
    email,
    uid,
    // photoURL
  } = auth().currentUser;
  // console.log(auth().currentUser);
  return {
    name: displayName,
    email,
    uid,
    // photoUrl: photoURL
  };
}; // 유저정보

export const logout = async () => {
  return await auth().signOut();
};
// 로그아웃

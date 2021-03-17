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
      //userImg: storageUrl,
    });

  return user;
};
// 회원가입

export const logout = async () => {
  return await auth().signOut();
};
// 로그아웃

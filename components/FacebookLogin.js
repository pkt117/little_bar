import React, {useContext, useEffect, useState} from 'react';
import {Alert, TouchableOpacity, Image} from 'react-native';
import {UserContext, ProgressContext} from '../contexts';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';
import facebookIcon from '../image/facebookIcon.png';
import auth from '@react-native-firebase/auth';

const FacebookLogin = () => {
  const {dispatch} = useContext(UserContext);
  const {spinner} = useContext(ProgressContext);

  const signIn = async () => {
    try {
      spinner.start();
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const user = auth().currentUser;
      //   Alert.alert('Login Success!', user.email);

      dispatch(user);
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set({
          name: user.displayName,
          email: user.email,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          //userImg: storageUrl,
        });
      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (e) {
      console.log({e});
    } finally {
      spinner.stop();
    }
  };

  return (
    <TouchableOpacity onPress={signIn} style={{marginHorizontal: 35}}>
      <Image source={facebookIcon} />
    </TouchableOpacity>
  );
};

export default FacebookLogin;

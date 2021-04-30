import React, {useContext, useEffect, useState} from 'react';
import {Alert, TouchableOpacity, Image} from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {UserContext, ProgressContext} from '../contexts';
import googleIcon from '../image/googleIcon.png';
import firestore from '@react-native-firebase/firestore';

const GoogleLogin = () => {
  const {dispatch} = useContext(UserContext);
  const {spinner} = useContext(ProgressContext);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '688956965275-364l6ujif44q0kcha2eqnohoru9eovqk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  const signIn = async () => {
    try {
      spinner.start();

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //   this.setState({ userInfo });
      // Alert(JSON.stringify(userInfo));
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      await auth().signInWithCredential(googleCredential);
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
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      spinner.stop();
    }
  };

  // async function onGoogleButtonPress() {
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   console.log(idToken);
  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }

  return (
    <TouchableOpacity onPress={signIn} style={{marginHorizontal: 35}}>
      <Image source={googleIcon} />
    </TouchableOpacity>
  );
};

export default GoogleLogin;

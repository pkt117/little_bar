import React, {useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './navigation';
import {ProgressProvider, UserProvider} from './contexts';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserProvider>
      <ProgressProvider>
        <Navigation />
      </ProgressProvider>
    </UserProvider>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TouchID from 'react-native-touch-id';
import SplashScreen from 'react-native-splash-screen';

import AuthStackScreen from './Screens/AuthStackScreen';
import TabScreen from './Screens/TabScreen';
import ProductDetails from './Screens/ProductDetails';



import AsyncStorage from '@react-native-async-storage/async-storage';
// Get local storage data
const getData = async () => {
  let ball = '';
  try {
    const value = await AsyncStorage.getItem('userData');
    if (value != null) {
      ball = JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }

  return ball;
}

const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <RootStack.Screen name="tab" component={TabScreen} />
      <RootStack.Screen name="auth" component={AuthStackScreen} options={{
        presentation: 'transparentModal',
        cardOverlayEnabled: true,
        cardOverlay: true,
      }} />
      <RootStack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: 'true' }} />
    </RootStack.Navigator>
  )
}

const App = () => {

  //const [isAuth, setIsAuth] = useState(false);
  const [LoginUserData, setLoginUserData] = useState([]);
  getData().then(e => setLoginUserData(e));

  const optionalConfigObject = {
    title: 'Provide Your Touch ID', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  useEffect(() => {
    
   // handleBiometric();
    SplashScreen.hide();
    // setTimeout(() => {
    //   handleBiometric();
    // }, 10000);

  }, []);

  const handleBiometric = () => {
    //console.log("hiiii");
    TouchID.isSupported(optionalConfigObject).then((biometryType) => {
      //console.log("hello");
      if (biometryType === 'FaceID') {
        //console.log('FaceID is supported.');
      } else {
        //console.log('TouchID is supported.');
        if (LoginUserData) {
          return null;
        }
        TouchID.authenticate('', optionalConfigObject)
          .then(success => {
            //console.log('success', success)
            setLoginUserData(success);
            //SplashScreen.show();
          })
          .catch(err => {
            //console.log('Error', err)
            BackHandler.exitApp();
          })
      }
    }
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

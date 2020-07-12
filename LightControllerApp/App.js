/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {Platform, InteractionManager, StyleSheet, Image} from 'react-native';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import homeScreen from './screens/homeScreen';
import deviceScreen from './screens/deviceScreen';
import settingScreen from './screens/settingScreen';
import setTimerScreen from './screens/setTimerScreen';
import historyScreen from './screens/historyScreen';
import addingScreen from './screens/addingScreen';
import timerScreen from './screens/timerScreen';
import addRoomScreen from './screens/addRoomScreen';
import SplashScreen from 'react-native-splash-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';


import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyADawFZYkBiSUoh5bdWpescXF0V2DvDvvk',
  authDomain: 'lightappdemo-dc252.firebaseapp.com',
  databaseURL: 'https://lightappdemo-dc252.firebaseio.com',
  projectId: 'lightappdemo-dc252',
  storageBucket: 'lightappdemo-dc252.appspot.com',
  messagingSenderId: '670980151251',
  appId: '1:670980151251:web:245ac428bec24de86a0126',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function readUserData() {
  firebase
    .database()
    .ref('deviceList/Bedroom/0')
    .once('value', function(snapshot) {
      console.log(snapshot.val());
    });
}
const MyTheme = {
  dark: false,
  colors: {
    primary: '#ffffff',
    background: '#ffffff',
    card: '#2095f3',
    text: '#ffffff',
    border: '#ffffff',
  },
};

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
//-------------------------------------------------------------------------------
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();
      if (waitingTime <= 1) {
          InteractionManager.runAfterInteractions(() => {
              if (!timerFix[id]) {
                  return;
              }
              delete timerFix[id];
              fn(...args);
          });
          return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
          const ttl = Date.now() + time;
          const id = '_lt_' + Object.keys(timerFix).length;
          runTask(id, fn, ttl, args);
          return id;
      }
      return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
      if (typeof id === 'string' && id.startsWith('_lt_')) {
          _clearTimeout(timerFix[id]);
          delete timerFix[id];
          return;
      }
      _clearTimeout(id);
  };
}

//-------------------------------------------------------------------------------
const AppNavigator = createStackNavigator();
const screenOption = navigation => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigation.navigate('Home');
      }}>
      <Image source={require('./icons/homeIcon.png')} style={styles.image} />
    </TouchableOpacity>
  ),
});
const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  readUserData();
  return (
    <NavigationContainer theme = {MyTheme}>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name="Home" component={homeScreen} />
        <AppNavigator.Screen options={screenOption} name="AddRoom" component={addRoomScreen} />
        <AppNavigator.Screen options={screenOption} name="Device" component={deviceScreen} />
        <AppNavigator.Screen options={screenOption} name="Setting" component={settingScreen} />
        <AppNavigator.Screen options={screenOption} name="SetTimer" component={setTimerScreen} />
        <AppNavigator.Screen options={screenOption} name="History" component={historyScreen} />
        <AppNavigator.Screen options={screenOption} name="Adding" component={addingScreen} />
        <AppNavigator.Screen options={screenOption} name="Timer" component={timerScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginStart: 15,
  },
});

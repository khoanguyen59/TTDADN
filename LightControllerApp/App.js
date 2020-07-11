import 'react-native-gesture-handler';
import React, { useEffect, Component } from 'react';
import {NavigationContainer,} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from './screens/homeScreen';
import deviceScreen from './screens/deviceScreen';
import settingScreen from './screens/settingScreen';
import setTimerScreen from './screens/setTimerScreen';
import historyScreen from './screens/historyScreen';
import addingScreen from './screens/addingScreen';
import timerScreen from './screens/timerScreen';
import addRoom from './screens/addRoomScreen';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'




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
import {Platform, InteractionManager} from 'react-native';

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
console.disableYellowBox = true;
const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  
  readUserData();
  
  return (
    <View style = {{flex:1}}>
      <NavigationContainer
        theme = {MyTheme}
        >
        <AppNavigator.Navigator>
          <AppNavigator.Screen name="Home" component={homeScreen} />
          <AppNavigator.Screen name="AddRoom" component={addRoom} />
          <AppNavigator.Screen name="Device" component={deviceScreen} />
          <AppNavigator.Screen name="Setting" component={settingScreen} />
          <AppNavigator.Screen name="SetTimer" component={setTimerScreen} />
          <AppNavigator.Screen name="History" component={historyScreen} />
          <AppNavigator.Screen name="Adding" component={addingScreen} />
          <AppNavigator.Screen name="Timer" component={timerScreen} />
          
        </AppNavigator.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default App;

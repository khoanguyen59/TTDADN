import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
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
const AppNavigator = createStackNavigator();
const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  readUserData();
  return (
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
  );
};
export default App;

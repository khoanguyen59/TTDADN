import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  VirtualizedList,
  FlatList,
} from 'react-native';
import ScreenTemplate from './screenTemplate';
import {globalStyles} from '../styles/global';
import TimersDropdown from '../components/timer_components/timersDropdown';
import * as firebase from 'firebase';

const screenIdx = 4;

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
/*const timerDataList = [
  {
    key: '1',
    location: 'Room 101',
    timerItems: [
      {
        deviceID: '69',
        deviceType: 'Light',
        setTime: '09:00',
        setDates: [true, true, false, true, true, true, false],
      },
      {
        deviceID: '43',
        deviceType: 'Light',
        setTime: '21:00',
        setDates: [true, false, false, true, false, true, false],
      },
    ],
  },
];*/
var timerDataList;

async function readTimerData() {
  var snapshot = await firebase
    .database()
    .ref('/timingList')
    .once('value');
  return snapshot.val();
}
timerDataList = readTimerData();

export default function timerScreen({navigation}) {
  var customizedList = [];
  for (let element of Object.keys(timerDataList._55)) {
    timerDataList._55[element] = timerDataList._55[element].filter(function(x) {
      return x !== undefined;
    });
    timerDataList._55[element].map(e => {
      e.room = element;
    });
    customizedList.push(timerDataList._55[element]);
  }

  const timersDropdowns = (
    <FlatList
      style={{marginBottom: 50, marginTop: -50}}
      data={customizedList}
      renderItem={({item}) => (
        <TimersDropdown key={item[0].deviceID} timerData={item} />
      )}
    />
  );

  return (
    <ScreenTemplate
      screenIndex={screenIdx}
      navigation={navigation}
      bodyComponents={timersDropdowns}
    />
  );
}

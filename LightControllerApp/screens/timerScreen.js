import React, { useState, useEffect } from 'react';
import {
  FlatList,
} from 'react-native';
import ScreenTemplate from './screenTemplate';
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

export default function timerScreen({ navigation }) {

  const [roomList, setRoomList] = useState([]);

  const readRoomData = () => {
    firebase
      .database()
      .ref('roomList')
      .once('value')
      .then(snapshot => {setRoomList(snapshot.val())});
  }

  useEffect(() => { readRoomData() }, []);
  
  const timersDropdowns = (
    <FlatList
      keyExtractor={item => item.roomID.toString()}
      style={{ marginBottom: 50, marginTop: -50 }}
      data={roomList}
      renderItem={({ item }) => (
        <TimersDropdown 
          key={item.roomID.toString()} 
          roomName={item.roomName} 
          firstRoomName = {roomList[0].roomName}
        />
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

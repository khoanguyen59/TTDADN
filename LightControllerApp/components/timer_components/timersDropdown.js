import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import TimerItem from './timerItem';
import {globalStyles} from '../../styles/global';
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

// readDeviceData = () => {
//   firebase
//     .database()
//     .ref('timingList/')
//     .once('value')
//     .then(snapshot => {
//       this.setState({TimingList: snapshot.val()});
//     });
// };

//var initDropdown = true;
//var hidden = true;

export default function TimersDropdown({timerData}) {

  const [timerItems, setTimerItems] = useState(timerData);
  const [displayItems, setDisplayItems] = useState([]);

  const locationTab = (
    <TouchableOpacity
      style={styles.locationTab}
      onPress={
        () => {
          //setDisplayItems(displayItems.length == 0 ? /*(initDropdown ? timerData : timerItems)*/ timerItems : []);
          //initDropdown = false;
          setTimerItems(timerItems.length == 0 ? timerData : [])
        }
        }>
      <Text style={globalStyles.whiteTitle}> {timerData[0].room} </Text>
    </TouchableOpacity>
  );

  function deleteTimer(timerToDelete){
    const idxToDel = timerItems.indexOf(timerItems.filter((timer) => timer == timerToDelete)[0]);

    Alert.alert(
      'Alert',
      'Are you sure?',
      [
        {text: 'No', onPress:()=> console.log('Cancelled')},
        {text: 'Yes', onPress:()=> {
          firebase.database().ref('timingList').child(timerToDelete.room).child(idxToDel).remove(
            (error) => {
                setTimerItems(prevTimerItems => prevTimerItems.filter((timerItem, index)=> index != idxToDel));
                alert('Removed Successfully');
              }
          )
          .then(
            () => firebase.database().ref('timingList').child(timerToDelete.room).set(
            timerItems.filter((timerItem, index) => index != idxToDel)))
          .catch(
            (error) => { alert("Remove Failed: " + error.message); }
          );
          //setTimerItems(prevTimerItems => prevTimerItems.filter((timerItem,index)=>index != idxToDel));
          //firebase.database().ref('timingList').child(timerToDelete.room).set(timerItems);
          // alert('deleted');
        }}
      ]
    )
  }

  return (
    <View>
      {locationTab}
      {timerItems.map(item => (
        <TouchableOpacity
        style={styles.border}
        onLongPress={() => deleteTimer(item)}>
          <TimerItem
            key={item.deviceID}
            deviceName={item.deviceName}
            setTime={item.time}
            setDates={Object.values(item.day)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  locationTab: {
    borderWidth: 2,
    backgroundColor: 'rgb(36, 48, 94)',
  },
  border: {
    borderWidth: 2,
    backgroundColor: 'rgb(255, 48, 94)',
  },
});

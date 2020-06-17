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

<<<<<<< HEAD
// readDeviceData = () => {
//   firebase
//     .database()
//     .ref('timingList/')
//     .once('value')
//     .then(snapshot => {
//       this.setState({TimingList: snapshot.val()});
//     });
// };
=======


>>>>>>> 6c80307d7705990e8efde9bc059a207aa6960d26

export default function TimersDropdown({timerData}) {
  const [timerItems, setTimerItems] = useState([]);
  const locationTab = (
    <TouchableOpacity
      style={styles.locationTab}
      onPress={() => setTimerItems(timerItems.length == 0 ? timerData : [])}>
      <Text style={globalStyles.whiteTitle}> {timerData[0].room} </Text>
    </TouchableOpacity>
  );
<<<<<<< HEAD
  // console.log(169, timerItems);
=======
  console.log(169, timerItems);
>>>>>>> 6c80307d7705990e8efde9bc059a207aa6960d26

  // delete function
  function deleteTimer(item){
    var i = 0;
    for(let element of timerData){
      if(item == element){
        console.log(i);
        break;
      }
      i = i+ 1;
    }
<<<<<<< HEAD
    // console.log(i);
    Alert.alert(
      'Alert',
      'Are you sure?',
=======
    console.log(i);
    Alert.alert(
      'Delete timer',
      'Are you sure to delete this timer?',
>>>>>>> 6c80307d7705990e8efde9bc059a207aa6960d26
      [
        {text: 'No', onPress:()=> console.log('cancelled')},
        {text:'Yes', onPress:()=>{
          firebase.database().ref('timingList').child(item.room).child(i).remove();
<<<<<<< HEAD
          // timerData.splice(i,1);
          firebase.database().ref('timingList').child(item.room).set(timerData);
          alert('deleted');
          setTimerItems(timerItems.filter((item,index) => index != i));
=======
          timerData.splice(i,1);
          firebase.database().ref('timingList').child(item.room).set(timerData)
          alert('deleted');
>>>>>>> 6c80307d7705990e8efde9bc059a207aa6960d26
          // TimersDropdown({timerData});
        }}
      ]
    )
  }
  // touch able item
  return (
    <View>
      {locationTab}
      {timerItems.map(item => (
        <TouchableOpacity
        style={styles.border}
        // delete on press
        onPress={() => deleteTimer(item)}>
          <TimerItem
            key={item.deviceID}
            deviceName={item.deviceName}
            setTime={item.time}
            setDates={Object.values(item.day)}
          />
        </TouchableOpacity> 
        // timerItems.map()
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
  }
});

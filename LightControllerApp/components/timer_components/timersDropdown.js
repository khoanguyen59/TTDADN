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


export default function TimersDropdown({timerData}) {
  const [timerItems, setTimerItems] = useState([]);
  const locationTab = (
    <TouchableOpacity
      style={styles.locationTab}
      onPress={() => setTimerItems(timerItems.length == 0 ? timerData : [])}>
      <Text style={globalStyles.whiteTitle}> {timerData[0].room} </Text>
    </TouchableOpacity>
  );
  // console.log(169, timerItems);
  
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
    // console.log(i);
    Alert.alert(
      'Alert',
      'Are you sure?',
      [
        {text: 'No', onPress:()=> console.log('cancelled')},
        {text:'Yes', onPress:()=>{
          firebase.database().ref('timingList').child(item.room).child(i).remove();
          setTimerItems(timerItems.filter((item,index) => index != i));
          // timerData.splice(i,1);
          firebase.database().ref('timingList').child(item.room).set(timerData);
          alert('deleted');
          
          // TimersDropdown({timerData});
        }}
      ]
    )
  }
  // day in database follow ABC's so must convert to 2-S
  function convertDay(item){
    var date = {
      Monday:'true',
      Tuesday:'true',
      Wednesday:'true',
      Thursday:'true',
      Friday:'true',
      Saturday:'true',
      Sunday:'true',
    }
    date.Monday = item.Monday;
    date.Tuesday = item.Tuesday;
    date.Wednesday = item.Wednesday;
    date.Thursday = item.Thursday;
    date.Friday = item.Friday;
    date.Saturday = item.Saturday;
    date.Sunday = item.Sunday;
    return date;
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
            //convert day of item
            setDates={Object.values(convertDay(item.day))}
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
  }
});

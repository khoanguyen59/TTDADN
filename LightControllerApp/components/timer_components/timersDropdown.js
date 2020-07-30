import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert,ToastAndroid} from 'react-native';
import TimerItem from './timerItem';
import {globalStyles} from '../../styles/global';
import * as firebase from 'firebase';
import { Badge } from 'react-native-elements'

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


export default function TimersDropdown({roomName, firstRoomName}) {

  const [timerItems, setTimerItems] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState([true]);
  const [count, setCount] = useState([]);

  if (isFirstRender){
    firebase.database().ref('timingList/' + roomName).once('value').then(snapshot => {
      setTimerItems((roomName === firstRoomName)&&(snapshot.val()!=null )? snapshot.val():[]);
      setCount(snapshot.val());});
    setIsFirstRender(false);
  }
  
  const locationTab = (
    <TouchableOpacity
      style={styles.locationTab}
      onPress={
        () => {
          if (timerItems.length === 0) {
            firebase.database().ref('timingList/' + roomName).once('value').then(snapshot => {
              setTimerItems(snapshot.val()!=null ? snapshot.val(): []);});
          }
          else setTimerItems([]);
          
          }
        }>
      <Text style={globalStyles.whiteTitle}> {roomName} </Text>
      <Badge value={count?(count.length>9?'9+':count.length):0} 
      badgeStyle = {
        count?
        {...globalStyles.alternativeColor,}:{backgroundColor:'#BFBFBF'}
      } 
      containerStyle={{
        position: 'absolute',
        right:20,
        top:'30%',
      }}/>
    </TouchableOpacity>
  );

  function deleteTimer(timerToDelete){
    const idxToDel = timerItems.indexOf(timerItems.filter((timer) => timer == timerToDelete)[0]);

    Alert.alert(
      'Delete',
      'Are you sure?',
      [
        {text: 'No', onPress:()=> console.log('Cancelled')},
        {text: 'Yes', onPress:()=> {
          firebase.database().ref('timingList/' + roomName).child(idxToDel).remove(
            (error) => {
                setTimerItems(prevTimerItems => prevTimerItems.filter((timerItem, index)=> index != idxToDel));
                ToastAndroid.show('Removed Successfully', ToastAndroid.LONG);
                firebase.database().ref('timingList/' + roomName).once('value').then(snapshot => {
                  setCount(snapshot.val());});
                console.log(count.length)
              }
          )
          .then(
            () => firebase.database().ref('timingList/' + roomName).set(
            timerItems.filter((timerItem, index) => index != idxToDel)))
          .catch(
            (error) => { ToastAndroid.show('Remove Failed: ' + error.message, ToastAndroid.LONG); }
          );
        }}
      ]
    )
  }
  
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
  
  return (
    <View>
      {locationTab}
      {timerItems.map(item => (
        <TouchableOpacity
        style={styles.border}
        onLongPress={() => deleteTimer(item)}>
          <TimerItem
            key={item.deviceName + item.deviceID.toString() + item.time}
            deviceName={item.deviceName}
            setTime={item.time}
            setDates={Object.values(convertDay(item.day))}
            action={item.off}
          />
        </TouchableOpacity>
      ))
      }
    </View>
  );
  // console.log(roominTimer)
}

const styles = StyleSheet.create({
  locationTab: {
    ...globalStyles.primaryColor,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
});

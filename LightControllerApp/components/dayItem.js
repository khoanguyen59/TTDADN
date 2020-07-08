//This file defines weekday components for setTimerScreen
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {selectedRoom} from '../screens/homeScreen.js';
import {selectedList} from './deviceItem.js';
import {selectedTime} from '../screens/setTimerScreen.js';
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

export var selectedDays = [false, false, false, false, false, false, false];

export function eraseDayList() {
  selectedDays = [false, false, false, false, false, false, false];
}

async function numChildCount(room) {
  const snapshot = await firebase
    .database()
    .ref('/timingList/' + room)
    .once('value');
  return snapshot.numChildren();
}

export async function setTimer() {
  var currentCount = await numChildCount(selectedRoom);
  for (let element of selectedList) {
    firebase
      .database()
      .ref('timingList/' + selectedRoom)
      .child(currentCount)
      .set({
        deviceID: element.deviceID,
        deviceName: element.deviceName,
        time: selectedTime,
      });
    firebase
      .database()
      .ref('timingList/' + selectedRoom)
      .child(currentCount)
      .child('day')
      .set({
        Monday: selectedDays[0],
        Tuesday: selectedDays[1],
        Wednesday: selectedDays[2],
        Thursday: selectedDays[3],
        Friday: selectedDays[4],
        Saturday: selectedDays[5],
        Sunday: selectedDays[6],
      });
    currentCount += 1;
  }
}

class WeekDayComponent extends Component {
  state = {
    selected: false,
  };

  toggleSelect = () => {
    this.setState({
      selected: !this.state.selected,
    });
    if (!this.state.selected) {
      selectedDays[this.props.number - 2] = true;
    } else {
      selectedDays[this.props.number - 2] = false;
    }
    console.log(selectedDays);
  };

  render = () => {
    return (
      <TouchableOpacity onPress={() => this.toggleSelect()}>
        <View style={this.state.selected ? styles.itemPress : styles.item}>
          <Text style={styles.title}>{this.props.number}</Text>
          {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginLeft: 10,
  },
  itemPress: {
    borderWidth: 1,
    borderColor: 'green',
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginLeft: 10,
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 5,
  },
});

export default WeekDayComponent;

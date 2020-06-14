import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {selectedRoom} from '../screens/homeScreen.js';
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

export var selectedList = [];

export function eraseList() {
  selectedList = [];
}

async function numChildCount(date) {
  const snapshot = await firebase
    .database()
    .ref('/logList/' + date)
    .once('value');
  return snapshot.numChildren();
}

export async function toggleState() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = today.getMinutes();
  var formattedDate = dd + '-' + mm + '-' + yyyy;
  var formattedTime = hh + ':' + min;
  var currentCount = await numChildCount(formattedDate);

  for (let element of selectedList) {
    firebase
      .database()
      .ref('deviceList/' + selectedRoom)
      .child(element.deviceID - 1)
      .update({
        deviceID: element.deviceID,
        deviceName: element.deviceName,
        deviceState: !element.deviceState,
        deviceType: element.deviceType,
      });
    console.log(element);
    console.log(element.deviceState);
    firebase
      .database()
      .ref('logList/' + formattedDate)
      .child(currentCount)
      .set({
        action: element.deviceState ? 'off' : 'on',
        autoControlled: false,
        deviceID: element.deviceID,
        deviceName: element.deviceName,
        room: selectedRoom,
        time: formattedTime,
      });
    currentCount += 1;
  }
}

//as props strictly reference to class Device Screen
function escapeStrict(arr, obj) {
  for (let element of arr) {
    if (JSON.stringify(obj) === JSON.stringify(element)) {
      return element;
    }
  }
  return -1;
}

function removeA(arr, what) {
  var ax;
  if ((ax = arr.indexOf(what)) !== -1) {
    arr.splice(ax, 1);
  }
  return arr;
}

class FlatListComponent extends Component {
  state = {
    selected: false,
  };

  toggleSelect = () => {
    if (this.props.deviceType === 'Light') {
      this.setState({
        selected: !this.state.selected,
      });
      if (!this.state.selected) {
        selectedList.push(this.props);
      } else {
        removeA(selectedList, escapeStrict(selectedList, this.props));
      }
    }
    console.log(selectedList);
  };

  renderTick = () => {
    if (this.state.selected) {
      return (
        <View>
          <Image
            source={require('../icons/greenTickIcon.png')}
            style={styles.image}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  render = () => {
    return (
      <TouchableOpacity
        style={this.props.deviceState ? styles.itemOn : styles.item}
        onPress={() => this.toggleSelect()}>
        <View>
          <Text style={styles.title}>
            {this.props.deviceType} {this.props.deviceID}
          </Text>
          {this.renderTick()}
          {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemOn: {
    backgroundColor: '#7cfc00',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  name: {
    fontSize: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: 60,
    height: 60,
    top: -60,
    left: 200,
    resizeMode: 'contain',
  },
});

export default FlatListComponent;

import React, {Component, useState, useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {selectedRoom} from '../screens/homeScreen.js';
import * as firebase from 'firebase';
import MQTTConnection from '../mqtt/mqttConnection';
import MQTTObserver from '../mqtt/mqttObserver';
import mqttSubject from '../mqtt/mqttSubject.js';

const firebaseConfig = {
  apiKey: 'AIzaSyADawFZYkBiSUoh5bdWpescXF0V2DvDvvk',
  authDomain: 'lightappdemo-dc252.firebaseapp.com',
  databaseURL: 'https://lightappdemo-dc252.firebaseio.com',
  projectId: 'lightappdemo-dc252',
  storageBucket: 'lightappdemo-dc252.appspot.com',
  messagingSenderId: '670980151251',
  appId: '1:670980151251:web:245ac428bec24de86a0126',
};

const publishTopic = 'Topic/LightD';

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

export async function toggleState(element) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = today.getMinutes();
  var formattedDate = dd + '-' + mm + '-' + yyyy;
  var formattedTime = hh + ':' + min;
  var currentCount = await numChildCount(formattedDate);

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

  var message = {
    device_id: element.deviceID.toString(),
    values: [element.deviceState ? '0' : '1', '255'],
    room: selectedRoom,
  };
  await MQTTConnection.publish(publishTopic, JSON.stringify(message), 2, false);
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

// class FlatListComponent extends Component {
//   state = {
//     selected: false,
//     switchVal: this.props.deviceState,
//     statusState:
//       this.props.deviceType == 'Light' ? this.props.deviceState : false,
//     observer: this.props.deviceType == 'Light' ? null : new MQTTObserver(0),
//   };

//   toggleSelect = () => {
//     if (this.props.deviceType === 'Light') {
//       this.setState({
//         selected: !this.state.selected,
//       });
//       if (!this.state.selected) {
//         selectedList.push(this.props);
//       } else {
//         removeA(selectedList, escapeStrict(selectedList, this.props));
//       }
//     }
//     console.log(selectedList);
//   };

//   render = () => {
//     const avatar_url =
//       this.props.deviceType == 'Light'
//         ? require('../icons/light-on.png')
//         : require('../icons/light-sensor.png');
//     return this.props.deviceType == 'Light' ? (
//       <ListItem
//         style={this.state.selected ? styles.itemOn : styles.item1}
//         leftAvatar={{source: avatar_url}}
//         title={this.props.deviceName}
//         subtitle={this.props.deviceState == true ? 'State: On' : 'State: Off'}
//         onPress={() => this.toggleSelect()}
//         switch={{
//           onValueChange: value => {
//             this.setState({switchVal: value});
//             toggleState(this.props);
//             this.setState({statusState: !this.state.statusState});
//           },
//           value: this.state.switchVal,
//         }}

//         /*<Text style={styles.name}>{title.devicePosition}</Text>*/
//       />
//     ) : (
//       <ListItem
//         style={styles.item2}
//         leftAvatar={{source: avatar_url}}
//         title={this.props.deviceName}
//         onPress={() => this.toggleSelect()}
//         /*<Text style={styles.name}>{title.devicePosition}</Text>*/
//       />
//     );
//   };
// }

function FlatListComponent({ deviceData }) {
  const [selected, setSelected] = useState(false);
  const [switchVal, setSwitchVal] = useState(deviceData.deviceState);
  const [statusState, setStatusState] = useState(deviceData.deviceState);
  const [observer, setObserver] = useState(new MQTTObserver(onValuesUpdate));
  
  const onValuesUpdate = (values) => { 
    if (deviceData.deviceType != 'Sensor') return;
    
    setStatusState(values);
  }

  useEffect(() => {
    mqttSubject.registerObserver(observer);

    return () => mqttSubject.removeObserver(observer);
  }, []);

  const toggleSelect = () => {
    if (deviceData.deviceType === 'Light') {
      setSelected(!selected);

      if (!selected) {
        selectedList.push(deviceData);
      } 
      else {
        removeA(selectedList, escapeStrict(selectedList, deviceData));
      }
    }

    console.log("Selected list: " + selectedList);
  };

  const avatar_url =
  deviceData.deviceType == 'Light'
      ? require('../icons/light-on.png')
      : require('../icons/light-sensor.png');
  
  const lightComponent = (
    <ListItem
      style={selected ? styles.itemOn : styles.item1}
      leftAvatar={{source: avatar_url}}
      title={deviceData.deviceName}
      subtitle={deviceData.deviceState == true ? 'State: On' : 'State: Off'}
      onPress={() => toggleSelect()}
      switch={{
        onValueChange: value => {
          setSwitchVal(value);
          toggleState(deviceData);
          setStatusState(!statusState);
        },
          value: switchVal,
      }}
        /*<Text style={styles.name}>{title.devicePosition}</Text>*/
  />);

  const sensorComponent = (
    <ListItem
    style={styles.item2}
    leftAvatar={{source: avatar_url}}
    title={deviceData.deviceName}
    onPress={() => toggleSelect()}
    /*<Text style={styles.name}>{title.devicePosition}</Text>*/
    />
  );

  return deviceData.deviceType == 'Light' ? lightComponent : sensorComponent;
}

const styles = StyleSheet.create({
  item1: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item2: {
    backgroundColor: 'gray',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemOn: {
    backgroundColor: 'green',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 30,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
  },
  image: {
    width: 60,
    height: 60,
  },
  switch: {
    transform: [{scaleX: 1.4}, {scaleY: 1.4}],
  },
});

export default FlatListComponent;

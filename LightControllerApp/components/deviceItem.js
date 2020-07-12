import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {selectedRoom} from '../screens/homeScreen.js';
import * as firebase from 'firebase';
import MQTTConnection from '../mqtt/mqttConnection';

const firebaseConfig = {
  apiKey: 'AIzaSyADawFZYkBiSUoh5bdWpescXF0V2DvDvvk',
  authDomain: 'lightappdemo-dc252.firebaseapp.com',
  databaseURL: 'https://lightappdemo-dc252.firebaseio.com',
  projectId: 'lightappdemo-dc252',
  storageBucket: 'lightappdemo-dc252.appspot.com',
  messagingSenderId: '670980151251',
  appId: '1:670980151251:web:245ac428bec24de86a0126',
};
const subscribeTopic = 'Topic/Light';
const publishTopic = 'Topic/LightD';
const myUserName = 'BKvm';
const myPassword = 'Hcmut_CSE_2020';

//const uri = 'mqtt://52.230.26.121:1883';
const uri = 'mqtt://52.187.125.59:1883';

/*MQTTConnection.create('kiet', subscribeTopic, publishTopic,
  {
    uri: uri,
    user: myUserName,
    pass: myPassword,
  });

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}*/

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

class FlatListComponent extends Component {
  state = {
    selected: false,
    switchVal: this.props.deviceState,
    statusState:
      this.props.deviceType == 'Light' ? this.props.deviceState : false,
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

  switchRender = () => {
    return (
      <Switch
        style={styles.switch}
        onValueChange={value => {
          this.setState({switchVal: value});
          toggleState(this.props);
          this.setState({statusState: !this.state.statusState});
        }}
        value={this.state.switchVal}
      />
    );
  };

  render = () => {
    const avatar_url =
      this.props.deviceType == 'Light'
        ? require('../icons/light-on.png')
        : require('../icons/light-sensor.png');
    return this.props.deviceType == 'Light' ? (
      <ListItem
        style={this.state.selected ? styles.itemOn : styles.item1}
        leftAvatar={{source: avatar_url}}
        title={this.props.deviceName}
        subtitle={this.props.deviceState == true ? 'State: On' : 'State: Off'}
        onPress={() => this.toggleSelect()}
        switch={{
          onValueChange: value => {
            this.setState({switchVal: value});
            toggleState(this.props);
            this.setState({statusState: !this.state.statusState});
          },
          value: this.state.switchVal,
        }}

        /*<Text style={styles.name}>{title.devicePosition}</Text>*/
      />
    ) : (
      <ListItem
        style={styles.item2}
        leftAvatar={{source: avatar_url}}
        title={this.props.deviceName}
        onPress={() => this.toggleSelect()}
        /*<Text style={styles.name}>{title.devicePosition}</Text>*/
      />
    );
  };
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

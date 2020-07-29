import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {selectedRoom} from '../screens/homeScreen.js';
import * as firebase from 'firebase';
import MQTTConnection from '../mqtt/mqttConnection';
import mqttSubject from '../mqtt/mqttSubject';
import MQTTObserver from '../mqtt/mqttObserver';
import ProgressCircle from 'react-native-progress-circle';

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

export async function toggleState(element, deviceState) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = today.getMinutes();
  var formattedDate = dd + '-' + mm + '-' + yyyy;
  var formattedTime = hh + ':' + min;
  var currentCount = await numChildCount(formattedDate);

  var ref = firebase.database().ref('deviceList/' + selectedRoom);
  var query = ref.orderByChild('deviceID').equalTo(element.deviceID);
  query.once('value', function(snapshot) {
    snapshot.forEach(function(child) {
      //console.log(child.key);
      firebase
        .database()
        .ref('deviceList/' + selectedRoom)
        .child(child.key)
        .update({
          deviceID: element.deviceID,
          deviceName: element.deviceName,
          //deviceState: !element.deviceState,
          deviceState: deviceState,
          deviceType: element.deviceType,
        });
    });
  });

  firebase
    .database()
    .ref('logList/' + formattedDate)
    .child(currentCount)
    .set({
      //action: element.deviceState ? 'off' : 'on',
      action: deviceState ? 'on' : 'off',
      autoControlled: false,
      deviceID: element.deviceID,
      deviceName: element.deviceName,
      room: selectedRoom,
      time: formattedTime,
    });

  var message = [{
    device_id: element.deviceID.toString(),
    //values: [element.deviceState ? '0' : '1', '255'],
    //room: selectedRoom, not necessary anymore after reindex
    values: [deviceState ? '1' : '0', '255'],
  }];
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

function FlatListComponent({deviceData}) {
  const [selected, setSelected] = useState(false);
  const [switchVal, setSwitchVal] = useState(deviceData.deviceState);
  const [statusState, setStatusState] = useState(deviceData.deviceState);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const onValuesUpdate = values => {
    if (
      deviceData.deviceType != 'Sensor' ||
      deviceData.deviceID != values.device_id
    ) return;

    console.log("Should Update");
    setShouldUpdate(!shouldUpdate);
  };

  const [observer, setObserver] = useState(new MQTTObserver(onValuesUpdate));

  useEffect(() => {
    mqttSubject.registerObserver(observer);

    return () => mqttSubject.removeObserver(observer);
  }, [shouldUpdate]);

  const toggleSelect = () => {
    if (deviceData.deviceType === 'Light') {
      setSelected(!selected);

      if (!selected) {
        selectedList.push(deviceData);
      } else {
        removeA(selectedList, escapeStrict(selectedList, deviceData));
      }
    }

    //console.log('Selected list: ' + selectedList);
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
          toggleState(deviceData, !statusState);
          setStatusState(!statusState);
        },
        value: switchVal,
      }}
      /*<Text style={styles.name}>{title.devicePosition}</Text>*/
    />
  );

  const sensorComponent = (
    <ListItem
      style={styles.item2}
      leftAvatar={{source: avatar_url}}
      title={deviceData.deviceName}
      onPress={() => toggleSelect()}
      rightElement={
        <ProgressCircle
          percent={Math.round((statusState / 255) * 100)}
          radius={20}
          borderWidth={8}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff">
          <Text style={statusState > 250 ? { fontSize : 8 } : {fontSize: 10}}>
            {Math.round((statusState / 255) * 100).toString() + '%'}
          </Text>
        </ProgressCircle>
      }
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

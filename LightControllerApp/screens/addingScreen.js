import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import ScreenTemplate from './screenTemplate';
import { selectedRoom } from '../screens/homeScreen.js';
import { globalStyles } from '../styles/global';
import * as firebase from 'firebase';
import { set } from 'react-native-reanimated';

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

const screenIdx = 2;

const LIGHT_TYPE = 'Light';
const SENSOR_TYPE = 'Sensor';

export default function addingScreen({ navigation }) {
  //TODO
  const [deviceName, setDeviceName] = useState('');
  const [deviceState, setDeviceState] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [deviceSensor, setDeviceSensor] = useState(0);

  const [nameError, setNameErr] = useState(false);
  const [stateError, setStateErr] = useState(false);
  const [typeError, setTypeErr] = useState(false);
  const [sensorError, setSensorErr] = useState(false);
  const [seletedType, setSeletedType] = useState('');
  const [seletedState, setSeletedState] = useState('');
  const [selectedSensor, setSelectedSensor] = useState('');

  const [sensorList, setSensorList] = useState([]);
  const [currentCount, setCurrentCount] = useState(0);
  const [nextID, setNextID] = useState(0);
  const [controlList, setControlList] = useState([]);

  useEffect(() => readCurrentCount(selectedRoom));
  useEffect(() => getNextID());
  useEffect(() => getSensorList(selectedRoom));
  useEffect(() => getControlList());

  function readCurrentCount(room) {
    firebase
      .database()
      .ref('deviceList/' + room)
      .once('value')
      .then(snapshot => setCurrentCount(snapshot.numChildren()));
  }

  function getNextID() {
    firebase
      .database()
      .ref('nextID')
      .once('value')
      .then(snapshot => setNextID(snapshot.val()));
  }

  function getSensorList(room) {
    firebase
      .database()
      .ref('deviceList/' + room)
      .orderByChild('deviceType').equalTo('Sensor')
      .once('value')
      .then(snapshot => setSensorList(snapshot.val()));
  }

  function getControlList(){
    firebase
      .database()
      .ref('controlList')
      .once('value')
      .then(snapshot => setControlList(snapshot.val()));
  }

  function onConfirm() {
    //var currentCount = await readCurrentCount(selectedRoom);

    if (deviceName === '') {
      setNameErr(true);
    }
    else if (deviceType !== LIGHT_TYPE && deviceType !== SENSOR_TYPE) {
      setTypeErr(true);
    }
    else if
      ((deviceType === LIGHT_TYPE &&
        (deviceState !== 'true' && deviceState !== 'false')) ||
      (deviceType === SENSOR_TYPE && isNaN(deviceState))
    ) {
      setStateErr(true);
    }
    else if (deviceSensor === 0) {
      setSensorErr(true);
    }
    else {
      firebase
        .database()
        .ref('deviceList/' + selectedRoom)
        .child(currentCount)
        .set({
          deviceID: nextID,
          deviceName: deviceName,
          deviceState:
            deviceType === SENSOR_TYPE ? deviceState : deviceState === 'true',
          deviceType: deviceType,
        })
        .then(() => {
          ToastAndroid.show('Device added successfully', ToastAndroid.LONG);
        });

      firebase
        .database()
        .ref()
        .update({
          nextID: nextID + 1,
        });

      for (let control of controlList) {
        if (control.sensorID === deviceSensor) {
          control.lightsID.push(nextID);
          firebase
            .database()
            .ref('controlList')
            .set(controlList);
          break;
        }
      }
    }
  }

  const reset = () => {
    setDeviceName('');
    setDeviceState(false);
    setDeviceType('');
    setSeletedType('');
    setSeletedState('');
  };

  function nameErrorRender() {
    return <Text style={styles.errorText}>Device name must not be empty!</Text>;
  }

  function typeErrorRender() {
    return <Text style={styles.errorText}>Please choose a device type!</Text>;
  }

  function stateErrorRender() {
    if (deviceType === LIGHT_TYPE) {
      return (
        <Text style={styles.errorText}>Please pick an initial value!</Text>
      );
    }
  }

  function sensorErrorRender() {
    if (deviceType === LIGHT_TYPE) {
      return (
        <Text style={styles.errorText}>Please pick a sensor!</Text>
      );
    }
  }

  function setDevicesType(value) {
    setDeviceType(value);
    setSeletedType(value);
    // if(value === 'Light'){setState(false)}else{setState(500)}
  }

  function setDeviceStage(value) {
    setDeviceState(value);
    setSeletedState(value);
  }

  function setSensor(value) {
    setDeviceSensor(+value);
    setSelectedSensor(sensorList.filter((sensor)=>sensor.deviceID===+value)[0].deviceName);
  }

  function renderType() {
    return (
      <View style={styles.textInputContainer}>
        <Picker
          selectedValue={seletedType}
          onValueChange={value => setDevicesType(value)}>
          <Picker.Item label="Choose Device Type" value="0" color="red" />
          <Picker.Item label="LIGHT" value="Light" />
          <Picker.Item label="SENSOR" value="Sensor" />
        </Picker>
        {typeError && typeErrorRender()}
      </View>
    );
  }

  function renderState() {
    switch (deviceType) {
      case LIGHT_TYPE: {
        return (
          <View style={styles.textInputContainer}>
            <Picker
              selectedValue={seletedState}
              onValueChange={value => setDeviceStage(value)}>
              <Picker.Item label="Pick Light State" value="0" color="red" />
              <Picker.Item label="ON STATE" value="true" />
              <Picker.Item label="OFF STATE" value="false" />
            </Picker>
            {stateError && stateErrorRender()}
          </View>
        );
      }
      case SENSOR_TYPE: {
        return (
          <View style={styles.textInputContainer}>
            <Text style={styles.textSensorValue}>
              PICK VALUE : {seletedState ? seletedState : 0}
            </Text>
            <Slider
              style={styles.slideSensorValue}
              step={1}
              maximumValue={1023}
              value={100}
              onValueChange={value => setDeviceStage(value)}
            />
            {stateError && stateErrorRender()}
          </View>
        );
      }
      default: {
        <View style={styles.textInputContainer} />;
      }
    }
  }

  function renderSensorPicker() {
    if (deviceType == LIGHT_TYPE) {
      return (
        <View style={styles.textInputContainer}>
          <Picker
            selectedValue={selectedSensor}
            onValueChange={value => setSensor(value)}>
            <Picker.Item label="Pick A Sensor" value={0} color="red" />
            {Object.keys(sensorList).map((key) => {
              return (<Picker.Item label={sensorList[key].deviceName} value={sensorList[key].deviceID} key={key} />)
            })}
          </Picker>
          {sensorError && sensorErrorRender()}
        </View>
      );
    }
  }

  //console.log(sensorList);

  return (
    <ScreenTemplate
      screenIndex={screenIdx}
      navigation={navigation}
      bodyComponents={
        <View style={styles.searchContainer}>
          {renderType()}
          {renderState()}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={name => setDeviceName(name)}
              placeholder="Device Name"
            />
            {nameError && nameErrorRender()}
          </View>
          {renderSensorPicker()}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => onConfirm()}>
            <Text style={styles.saveText}>ADD NEW DEVICE</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    bottom: 40,
  },
  textInputContainer: {
    marginTop: 20,
    height: 50,
    padding: 10,
  },
  textInput: {
    ...globalStyles.regularText,
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    paddingStart: 20,
    paddingEnd: 20,
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  saveButton: {
    ...globalStyles.alternativeColor,
    position: 'absolute',
    height: 40,
    width: 150,
    alignSelf: 'center',
    marginTop: 320,
    borderRadius: 30,
    justifyContent: 'center',
  },
  saveText: {
    ...globalStyles.regularText,
    alignSelf: 'center',
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  textSensorValue: {
    padding: 10,
    width: 200,
    fontSize: 16,
  },
  slideSensorValue: {
    width: Dimensions.get('window').width - 150,
    alignSelf: 'flex-end',
    bottom: 25,
  },
});
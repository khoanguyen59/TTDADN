import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import ScreenTemplate from './screenTemplate';
import NavigationTab from '../components/navigationTab';
import DeviceListItem from '../custom_components/deviceListItem';
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

const screenIdx = 2;

async function numChildCount(room) {
  const snapshot = await firebase
    .database()
    .ref('/deviceList/' + room)
    .once('value');
  return snapshot.numChildren();
}

export default function addingScreen({navigation}) {
  //TODO
  const [deviceName, setName] = useState('');
  const [deviceState, setState] = useState(false);
  const [deviceType, setType] = useState('');

  const [nameError, setNameErr] = useState(false);
  const [stateError, setStateErr] = useState(false);
  const [typeError, setTypeErr] = useState(false);

  async function onConfirm() {
    var currentCount = await numChildCount(selectedRoom);

    if (deviceName === '') {
      setNameErr(true);
    } else if (deviceType !== 'Light' && deviceType !== 'Sensor') {
      setTypeErr(true);
    } else if (
      (deviceType === 'Light' &&
        (deviceState !== 'true' && deviceState !== 'false')) ||
      (deviceType === 'Sensor' && isNaN(deviceState))
    ) {
      setStateErr(true);
    } else {
      firebase
        .database()
        .ref('deviceList/' + selectedRoom)
        .child(currentCount)
        .set({
          deviceID: currentCount + 1,
          deviceName: deviceName,
          deviceState: deviceType === 'Sensor' ? deviceState : deviceState === 'true',
          deviceType: deviceType,
        });
      navigation.navigate('Device');
    }
  }

  function nameErrorRender() {
    return (
      <Text style={styles.errorText}>Tên thiết bị không được để trống</Text>
    );
  }

  function typeErrorRender() {
    return (
      <Text style={styles.errorText}>
        Kiểu thiết bị chỉ có thể là Light hoặc Sensor
      </Text>
    );
  }

  function stateErrorRender() {
    return (
      <Text style={styles.errorText}>
        Nhập số nguyên trong khoảng 0-1023 nếu kiểu thiết bị là Sensor,
        true/false nếu kiểu thiết bị là Light
      </Text>
    );
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={name => setName(name)}
          placeholder="Device Name"
        />
        {nameError && nameErrorRender()}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={state => setState(state)}
          placeholder="Device State"
        />
        {stateError && stateErrorRender()}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={type => setType(type)}
          placeholder="Device Type"
        />
        {typeError && typeErrorRender()}
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText} onPress={() => onConfirm()}>
          Add New Device
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 20,
    height: 50,
    padding: 10,
  },
  textInput: {
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#2095f3',
    position: 'absolute',
    height: 40,
    width: 150,
    alignSelf: 'center',
    marginTop: 240,
    borderRadius: 30,
    justifyContent: 'center',
  },
  saveText: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
});

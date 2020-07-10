<<<<<<< HEAD
import React, {useState} from 'react';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> AddDevice_homescreen_fix
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
<<<<<<< HEAD
  Image,
  ToastAndroid,
} from 'react-native';
import ScreenTemplate from './screenTemplate';
import NavigationTab from '../components/navigationTab';
import DeviceListItem from '../custom_components/deviceListItem';
import {selectedRoom} from '../screens/homeScreen.js';
import * as firebase from 'firebase';
=======
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import ScreenTemplate from './screenTemplate';
import {selectedRoom} from '../screens/homeScreen.js';
import {globalStyles} from '../styles/global';
import * as firebase from 'firebase';
import { set } from 'react-native-reanimated';
>>>>>>> AddDevice_homescreen_fix

const firebaseConfig = {
  apiKey: 'AIzaSyADawFZYkBiSUoh5bdWpescXF0V2DvDvvk',
  authDomain: 'lightappdemo-dc252.firebaseapp.com',
  databaseURL: 'https://lightappdemo-dc252.firebaseio.com',
  projectId: 'lightappdemo-dc252',
  storageBucket: 'lightappdemo-dc252.appspot.com',
  messagingSenderId: '670980151251',
  appId: '1:670980151251:web:245ac428bec24de86a0126',
};

<<<<<<< HEAD
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
=======
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const screenIdx = 2;

const LIGHT_TYPE = 'Light';
const SENSOR_TYPE = 'Sensor';

export default function addingScreen({navigation}) {
  //TODO
  const [deviceName, setDeviceName] = useState('');
  const [deviceState, setDeviceState] = useState(false);
  const [deviceType, setDeviceType] = useState('');
>>>>>>> AddDevice_homescreen_fix

  const [nameError, setNameErr] = useState(false);
  const [stateError, setStateErr] = useState(false);
  const [typeError, setTypeErr] = useState(false);
<<<<<<< HEAD

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
=======
  const [seletedType, setSeletedType] = useState('');
  const [seletedState, setSeletedState] = useState('');
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => readCurrentCount(selectedRoom));

  function readCurrentCount(room) {
      firebase
      .database()
      .ref('deviceList/' + room)
      .once('value')
      .then(snapshot => setCurrentCount(snapshot.numChildren()));
  }

  function onConfirm() {
    //var currentCount = await readCurrentCount(selectedRoom);

    if (deviceName === '') 
    {
      setNameErr(true);
    } 
    else if (deviceType !== LIGHT_TYPE && deviceType !== SENSOR_TYPE) 
    {
      setTypeErr(true);
    } 
    else if 
    ((deviceType === LIGHT_TYPE &&
        (deviceState !== 'true' && deviceState !== 'false')) ||
      (deviceType === SENSOR_TYPE && isNaN(deviceState))) 
    {
      setStateErr(true);
    } 
    else 
    {
      firebase
      .database()
      .ref('deviceList/' + selectedRoom)
      .child(currentCount)
      .set({
        deviceID: currentCount + 1,
        deviceName: deviceName,
        deviceState: deviceType === SENSOR_TYPE ? deviceState : deviceState === 'true',
        deviceType: deviceType,
      }).then(() => {
        ToastAndroid.show(`Device added successfully`, ToastAndroid.LONG);
      });
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
    return (
      <Text style={styles.errorText}>Device name must not be empty!</Text>
>>>>>>> AddDevice_homescreen_fix
    );
  }

  function typeErrorRender() {
    return (
      <Text style={styles.errorText}>
<<<<<<< HEAD
        Kiểu thiết bị chỉ có thể là Light hoặc Sensor
=======
        Please choose a device type!
>>>>>>> AddDevice_homescreen_fix
      </Text>
    );
  }

  function stateErrorRender() {
<<<<<<< HEAD
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
=======
    if(deviceType === LIGHT_TYPE){
      return (
        <Text style={styles.errorText}>
          Please pick an initial value!
        </Text>
      );
    }
    // truong hop sensor luon tao default value 500
    // else if(deviceType === 'Sensor'){
    //   return (
    //     <Text style={styles.errorText}>
    //       vui lòng chọn giá trị ban đầu của cảm biến
    //     </Text>
        
    //   );
    // }
    
  }

  function setDevicesType(value){
    setDeviceType(value);
    setSeletedType(value);
    // if(value === 'Light'){setState(false)}else{setState(500)}
  }

  function setDeviceStage(value){
    setDeviceState(value);
    setSeletedState(value);
  }

  function renderType(){
    return(
      <View style={styles.textInputContainer}>
        <Picker
          selectedValue = {seletedType}
          onValueChange = {(value) => setDevicesType(value)}>
          <Picker.Item label = "Choose Device Type" value = "0" color='red'></Picker.Item>
          <Picker.Item label = "LIGHT" value = "Light"></Picker.Item>
          <Picker.Item label = "SENSOR" value = "Sensor"></Picker.Item>
        </Picker>
        {typeError && typeErrorRender()}
      </View>
    )
  }

  function renderState(){
    switch(deviceType){
      case LIGHT_TYPE:{
        return(
          <View style={styles.textInputContainer}>
            <Picker
              selectedValue = {seletedState}
              onValueChange = {(value) => setDeviceStage(value)}>
              <Picker.Item label = "Pick Light State" value = "0" color = 'red'></Picker.Item>
              <Picker.Item label = "ON STATE" value = "true"></Picker.Item>
              <Picker.Item label = "OFF STATE" value = "false"></Picker.Item>
            </Picker>
            {stateError && stateErrorRender()}
          </View>
        )
      }
      case SENSOR_TYPE:{
        return(
          <View style={styles.textInputContainer}>
            <Text style ={styles.textSensorValue}>PICK VALUE : {seletedState ? seletedState : 100}</Text>
            <Slider
              style = {styles.slideSensorValue}
              step = {1}
              maximumValue = {255}
              value = {100}
              onValueChange ={(value) => setDeviceStage(value)}
            ></Slider>
            {stateError && stateErrorRender()}
          </View>
        )
      }
      default:{<View style={styles.textInputContainer}></View>}
    }
  }
  
  return (
    <ScreenTemplate
      screenIndex={screenIdx}
          navigation={navigation}
          bodyComponents = {
            <View style = {styles.searchContainer}>
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
              <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => onConfirm()}>
                <Text style={styles.saveText}>ADD NEW DEVICE</Text>
              </TouchableOpacity>
            </View>
          }
        />          
>>>>>>> AddDevice_homescreen_fix
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  textInputContainer: {
    marginTop: 20,
    height: 60,
    padding: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
=======
  searchContainer:{
    bottom: -20
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
>>>>>>> AddDevice_homescreen_fix
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  saveButton: {
<<<<<<< HEAD
    backgroundColor: '#2095f3',
    position: 'absolute',
    height: 50,
    width: 150,
    alignSelf: 'center',
    marginTop: 250,
=======
    ...globalStyles.alternativeColor,
    position: 'absolute',
    height: 40,
    width: 150,
    alignSelf: 'center',
    marginTop: 240,
>>>>>>> AddDevice_homescreen_fix
    borderRadius: 30,
    justifyContent: 'center',
  },
  saveText: {
<<<<<<< HEAD
    fontSize: 18,
=======
    ...globalStyles.regularText,
>>>>>>> AddDevice_homescreen_fix
    alignSelf: 'center',
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
<<<<<<< HEAD
=======
  textSensorValue:{
    padding: 10, 
    width : 200,
    fontSize: 16
  },
  slideSensorValue:{
    width: Dimensions.get('window').width - 150, 
    alignSelf : 'flex-end',
    bottom: 25,
  }
>>>>>>> AddDevice_homescreen_fix
});

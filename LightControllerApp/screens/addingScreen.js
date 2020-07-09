import React, {useState, Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Picker,
  Slider,
  Dimensions,
  Alert,
} from 'react-native';
import ScreenTemplate from './screenTemplate';
import NavigationTab from '../components/navigationTab';
import DeviceListItem from '../custom_components/deviceListItem';
import {selectedRoom} from '../screens/homeScreen.js';
import * as firebase from 'firebase';
import {NativeModules} from 'react-native';
const {ToastModule} = NativeModules;


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
  const [seletedType, setseletedType] = useState('');
  const [seletedState, setseletedState] = useState('');

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
      ToastModule.showText(`add success`, ToastModule.LENGTH_LONG);
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
        vui lòng chọn loại thiết bị Đèn/Cảm biến
      </Text>
    );
  }

  function stateErrorRender() {
    if(deviceType === 'Light'){
      return (
        <Text style={styles.errorText}>
          vui lòng chọn giá trị ban đầu của đèn
        </Text>
      );
    }// truong hop sensor luon tao default value 500
    // else if(deviceType === 'Sensor'){
    //   return (
    //     <Text style={styles.errorText}>
    //       vui lòng chọn giá trị ban đầu của cảm biến
    //     </Text>
        
    //   );
    // }
    
  }
  function setTypeDevice(value){
    setType(value);
    setseletedType(value);
    // if(value === 'Light'){setState(false)}else{setState(500)}
  }
  function setStageDevice(value){
    setState(value);
    setseletedState(value);
  }
  function renderType(){
    return(
      <View style={styles.textInputContainer}>
        <Picker
          selectedValue = {seletedType}
          onValueChange = {setTypeDevice.bind()}
        >
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
    case 'Light':{
      return(
        <View style={styles.textInputContainer}>
          <Picker
            selectedValue = {seletedState}
            onValueChange = {setStageDevice.bind()}
          >
            <Picker.Item label = "Pick Light State" value = "0" color = 'red'></Picker.Item>
            <Picker.Item label = "ON state" value = "true"></Picker.Item>
            <Picker.Item label = "OFF state" value = "false"></Picker.Item>
          </Picker>
          {stateError && stateErrorRender()}
        </View>
      )
    }
    case 'Sensor':{
      return(
        <View style={styles.textInputContainer}>
          <Text style ={styles.textsensorvalue}>PICK VALUE : {seletedState ? seletedState : 500}</Text>
          <Slider
            style = {styles.slidesensorvalue}
            step = {1}
            maximumValue = {1023}
            value = {500}
            onValueChange = {setStageDevice.bind()}
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
          screenIndex={2}
          navigation={navigation}
          bodyComponents = {
            <View style = {styles.searchContainer}>
              {renderType()}
              {renderState()}
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={name => setName(name)}
                  placeholder="Device Name"
                />
                {nameError && nameErrorRender()}
              </View>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText} onPress={() => onConfirm()}>
                  Add New Device
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
    
    
  );
}

const styles = StyleSheet.create({
  searchContainer:{
    bottom: -20
  },
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
  textsensorvalue:{
    padding: 10, 
    width : 200,
    fontSize: 16
  },
  slidesensorvalue:{
    width: Dimensions.get('window').width - 150, 
    alignSelf : 'flex-end',
    bottom: 25,
  }
});

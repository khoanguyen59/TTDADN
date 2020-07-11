import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Alert
} from 'react-native';

import * as firebase from 'firebase';

import FlatListComponent from '../components/deviceItem.js';
import {selectedRoom} from './homeScreen.js';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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


class addRoom extends React.Component {
    state = {
       RoomID: '',
       RoomName: '',
       RoomList: [],
       writeRoom: false
    }

    readRoomData = () => {
    firebase
        .database()
        .ref('roomList/')
        .once('value')
        .then(snapshot => {
        this.setState({RoomList: snapshot.val()});
        });
    };




    handleRoomID = (text) => {
       this.setState({ RoomID: text })
    }
    handleRoomName = (text) => {
        this.setState({ RoomName: text })
    }

    SubmitRoom = (RoomID, RoomName, listRoom) => {
        this.setState({writeRoom: true});
        var num = 0;
        var lIndex = null;
        console.log('-------------------------------')
        for(let element of listRoom){
            num = num + 1;
        }
         lIndex = listRoom.findIndex(obj => parseInt(obj.roomID) === RoomID)
         console.log(num);
        if(lIndex == -1){
            this.UpdateRoom(num,RoomID,RoomName);
            Alert.alert('Room is added');
        }
        else{
            Alert.alert('RoomID already existed');
        }
        console.log(listRoom);
    }

    UpdateRoom = (key,RoomID, RoomName) =>{
        firebase.database().ref('roomList/').child(key)
        .set({
            roomID:     RoomID,
            roomName:   RoomName,
        })
    }
    render() {
      this.readRoomData();
       return (
          <View style = {styles.container}>
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Room ID here,     e.g., 101"
                placeholderTextColor = 'white'
               //  placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {this.handleRoomID}/>

             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Room Name Here,     e.g., Classroom"
                placeholderTextColor = 'white'
               //  placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {this.handleRoomName}/>

             <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                   () => this.SubmitRoom(parseInt(this.state.RoomID), this.state.RoomName , this.state.RoomList)
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
             </TouchableOpacity>
          </View>
       )
    }
 }

 const styles = StyleSheet.create({
    container: {
       flex: 1,
       paddingTop: 23,
    },
    input: {
       margin: 15,
       paddingLeft: 10,
       height: 60,
       borderColor: 'black',
       borderWidth: 2,
       borderRadius: 20,
       backgroundColor: '#00ffff'
    },
    submitButton: {
       backgroundColor: '#8a2be2',
       padding: 10,
       margin: 15,
       height: 40,
       width: 150,
       alignSelf: 'center',
       borderRadius: 45,
       alignItems: 'center',
    },
    submitButtonText:{
       color: 'white',
    }
 })

export default addRoom

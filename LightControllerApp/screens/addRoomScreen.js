import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Image,
  ToastAndroid
} from 'react-native';
import { globalStyles } from '../styles/global';
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
        });/*.then(() => {
         ToastAndroid.show('Room added successfully!', ToastAndroid.LONG);
       });*/
    }

    render() {
      this.readRoomData();
       return (
          <View style = {styles.container}>
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Room ID,     e.g., 101"
                //placeholderTextColor = 'white'
               //  placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {this.handleRoomID}/>

             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Room Name,     e.g., Classroom"
                //placeholderTextColor = 'white'
               //  placeholderTextColor = "black"
                autoCapitalize = "none"
                onChangeText = {this.handleRoomName}/>

             <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                   () => this.SubmitRoom(parseInt(this.state.RoomID), this.state.RoomName , this.state.RoomList)
                }>
                {/* <Text style = {styles.submitButtonText}>Submit</Text> */}
                <Image 
                  style={{resizeMode: 'contain', width: 30, height: 30}}
                  source={require('../icons/plusIcon.png')} 
                  />
             </TouchableOpacity>
          </View>
       )
    }
 }

 const styles = StyleSheet.create({
    container: {
       flex: 1,
       paddingTop: 23,
       bottom: -90
    },
    input: {
       margin: 15,
       paddingLeft: 10,
       height: 50,
       borderColor: 'black',
       borderWidth: 1,
       borderRadius: 20,
       //backgroundColor: '#00ffff'
    },
    submitButton: {
       ...globalStyles.alternativeColor,
       padding: 10,
       margin: 30,
       height: 40,
       width: 100,
       alignSelf: 'center',
       borderRadius: 45,
       alignItems: 'center',
       justifyContent: 'center',
    },
    submitButtonText:{
       color: 'white',
    },
    image: {
      width: 30,
      height: 30,
    },
 })

export default addRoom

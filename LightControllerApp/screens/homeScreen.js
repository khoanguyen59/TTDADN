import React from 'react';
import {View, FlatList, StyleSheet, Text,Button, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {globalStyles} from '../styles/global';
import {eraseList} from '../components/deviceItem.js';

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

export var selectedRoom;

class homeScreen extends React.Component {
  state = {
    RoomList: [],
  };

  readRoomData = () => {
    firebase
      .database()
      .ref('roomList')
      .once('value')
      .then(snapshot => {
        this.setState({RoomList: snapshot.val()});
      });
  };

  renderItem = ({item}) => {
    const {navigation} = this.props.navigation;
    return (
      <TouchableOpacity
        pointerEvents="none"
        style={styles.item}
        onPress={() => {
          selectedRoom = item.roomName;
          this.props.navigation.navigate('Device');
          eraseList();
        }}>
        <Text style={styles.title} pointerEvents="none">
          {item.roomID}
        </Text>
        <Text style={styles.name} pointerEvents="none">
          {item.roomName}
        </Text>
      </TouchableOpacity>
    );
  };

  render = () => {
    this.readRoomData();
    const {navigation} = this.props.navigation;
    return (
      <View style={styles.container} pointerEvents="box-none">
        <FlatList
          pointerEvents="none"
          style = {styles.container_flatlist}
          numColumns= {2}
          navigation={navigation}
          data={this.state.RoomList}
          renderItem={this.renderItem}
          keyExtractor={item => item.roomID.toString()}
        />
          <Button
          style = {styles.addButton}
          title = "Add room"
          onPress = {() => {this.props.navigation.navigate('AddRoom');}
          }
          />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  container_flatlist:{
    flex: 1,
    marginVertical: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#2095f3',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    width: Dimensions.get('window').width / 2 - 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  title: {
    fontSize: 32,
    color: 'white'
  },
  name: {
    fontSize: 16,
    color: 'white'
  },
  addButton: {
    ...globalStyles.alternativeColor,
    position: 'absolute',
    bottom:0,
    left:0,
  }
});

export default homeScreen;

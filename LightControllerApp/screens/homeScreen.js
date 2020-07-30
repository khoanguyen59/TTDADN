import React from 'react';
import {View, FlatList, StyleSheet, Text,Button, Dimensions, Image,
        Animated} from 'react-native';
import {TouchableHighlight, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {globalStyles} from '../styles/global';
import {eraseList} from '../components/deviceItem.js';
import Swiper from 'react-native-swiper'
// import MovableView from 'react-native-movable-view';
// import { Icon } from 'react-native-elements'
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
    Guidestate : false,
    animated: new Animated.Value(1),
    show: true,
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
  renderguide = ()=>{
      return (
        <Animated.View style = {{
          flex :1,
          // position:'absolute',
          transform: [{
            scale: this.state.animated.interpolate({
              inputRange:[0,1],
              outputRange:[0,1]
            })
          }]
        }}>
          <Swiper style = {{}} showsButtons={true}>
            <View style={styles.slide}>
              <Image source = {require('../images/home.png') } style = {styles.imageGuide} ></Image>
            </View>
            <View style={styles.slide}>
              <Image source = {require('../images/device.png') } style = {styles.imageGuide} ></Image>
            </View>
            <View style={styles.slide}>
              <Image source = {require('../images/AddDevice.png') } style = {styles.imageGuide} ></Image>
            </View>
            <View style={styles.slide}>
              <Image source = {require('../images/Timer.png') } style = {styles.imageGuide} ></Image>
            </View>
            <View style={styles.slide}>
              <Image source = {require('../images/Timerscreen.png') } style = {styles.imageGuide} ></Image>
            </View>
            <View style={styles.slide}>
              <Image source = {require('../images/History.png') } style = {styles.imageGuide} ></Image>
              <View style = {styles.closeGuidecontain}>
                <TouchableOpacity 
                  style={styles.bottomContainer}
                  onPress = {()=>{
                    this.setState({Guidestate : false})
                  }}>
                <Text style={{color: '#ffffff',
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}>Close Guide</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
        </Animated.View>
      )
    
  }
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

  rendershowGuidebtn =()=>{
    return(
        // <MovableView style={{
        //   // position:'relative',
        //   // backgroundColor:'red',
        //   top: 60,
        //   right: 60,
        //   height:60, 
        //   width:60,
        //   borderRadius:30,
        // }}>
        <View style={{
          position:'absolute',
          // backgroundColor:'red',
          bottom: 50,
          right: 10,
          height:60, 
          width:60,
          borderRadius:30,
        }}>
          <TouchableOpacity 
            style={{
              ...globalStyles.alternativeColor,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent:'center',
              padding: 10,
              height: 50,
              width: 50,
              borderRadius:30,
              bottom: 5,
              right: 5,
            }}
            activeOpacity = {0}
            onPress = {()=>{
              this.setState({Guidestate : true}),
              this.state.animated.setValue(0),
              Animated.spring(this.state.animated,{
                toValue:1,
                duration:2000,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Image source = {require('../icons/Guide.png') } style = {styles.image} ></Image>
          </TouchableOpacity>
        </View>
        //</MovableView>
    );
  }

  render = () => {
    this.readRoomData();
    const {navigation} = this.props.navigation;
    if (this.state.Guidestate) {return this.renderguide();}
    return (
      <View style={styles.container} pointerEvents="box-none">
        <View
          style = {styles.guide}
        >
          <Text style={styles.guideText}>
            Pick a  room
          </Text>
        </View>
        <FlatList
          pointerEvents="none"
          style = {styles.container_flatlist}
          numColumns= {2}
          navigation={navigation}
          data={this.state.RoomList}
          renderItem={this.renderItem}
          keyExtractor={item => item.roomID}
        />
        {this.rendershowGuidebtn()}
        <View
          style = {styles.containAddbtn}
        >
          <TouchableHighlight
            style = {styles.addButton}
            onPress={() => {
              this.props.navigation.navigate('AddRoom');
            }}>
            <Text style = {styles.textStyle}>Add Room</Text>
            {/* <Icon name='rowing' /> */}
          </TouchableHighlight>
        </View>
      </View>
    );
  }   
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
  guide:{
    position:'relative',
    height : 40,
    width : '100%',
    ...globalStyles.alternativeColor,
    justifyContent:'center',
    alignItems:'center',
  },
  guideText:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
  containAddbtn:{
    height : 35,
    width : '100%',
    backgroundColor : 'red',
    justifyContent:'center',
    alignItems:'center',
  },
  addButton: {
    ...globalStyles.alternativeColor,
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  closeGuidecontain:{
    flex: 1,
    position :'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    height: '8%',
    width: '50%',
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  imageGuide: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '85%',
    resizeMode: 'contain',
    borderRadius:30,
  },
});
export default homeScreen;

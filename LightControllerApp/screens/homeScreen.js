import React from 'react';
import {View, FlatList, StyleSheet, Text,Button, Dimensions, Image,
        Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {globalStyles} from '../styles/global';
import {eraseList} from '../components/deviceItem.js';
import Swiper from 'react-native-swiper'
import MovableView from 'react-native-movable-view';

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
    animated: new Animated.Value(1)
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
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>And simple</Text>
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
        <MovableView style={{
          position:'absolute',
          // backgroundColor:'red',
          height:60, 
          width:60,
          borderRadius:30,
        }}>
          <TouchableOpacity
            style={{
              ...globalStyles.alternativeColor,
              alignItems: 'center',
              justifyContent:'center',
              padding: 10,
              height:60,
              width:60,
              borderRadius:30,
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
        </MovableView>
    );
  }

  render = () => {
    this.readRoomData();
    const {navigation} = this.props.navigation;
    if (this.state.Guidestate) {return this.renderguide();}
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
        {this.rendershowGuidebtn()}
        <View style = {styles.addButton}>
          <Button
            style = {{flex:1}}
            title = "Add room"
            onPress = {() => {this.props.navigation.navigate('AddRoom');}
            }
          />
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
    // ...globalStyles.alternativeColor,
    position: 'absolute',
    flexDirection: 'column',
    bottom:0,
    right:0,
    width :'100%',
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
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default homeScreen;

import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as firebase from 'firebase';

import FlatListComponent from '../components/deviceItem.js';
import {selectedRoom} from './homeScreen.js';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global.js';
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

class deviceScreen extends React.Component {
  state = {
    showControlMode: false,
    DeviceList: [],
  };

  readDeviceData = () => {
    firebase
      .database()
      .ref('deviceList/' + selectedRoom)
      .once('value')
      .then(snapshot => {
        this.setState({DeviceList: snapshot.val()});
      });
  };

  // readDeviceData = () => {
  //   firebase
  //     .database()
  //     .ref('deviceList/' + selectedRoom)
  //     .on('value', snapshot => {
  //       this.setState({ DeviceList: snapshot.val() });
  //     });
  // };

  toggleControl = () => {
    this.setState({
      showControlMode: !this.state.showControlMode,
    });
  };

  renderControlButton = () => {
    return (
      <View style={styles.actionButtonContainer}>
        <MovableView
          disabled={false}>
          <TouchableOpacity
            style={styles.timerButton}
            activeOpacity = {0}
            onPress={() => this.props.navigation.navigate('SetTimer')}>
            <Image
              source={require('../icons/timerIcon_white.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </MovableView>
      </View>
    );
  };

  render = () => {
    this.readDeviceData();
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <View style={styles.headButton}>
            <Button title={selectedRoom.toString()} color={globalStyles.alternativeColor}/>
          </View>
        </View>
        <View style={styles.bodyContainer}>
        <TouchableWithoutFeedback >
          <FlatList
            style={{marginBottom: 60,}}
            pointerEvents={'box-none'}
            data={this.state.DeviceList}
            style= {{marginBottom: 72}}
            keyExtractor={item => item.deviceID.toString()}
            renderItem={({item}) => {
              return <FlatListComponent deviceData={item} />;
            }}
          />
        </TouchableWithoutFeedback>
        {this.renderControlButton()}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.bottomButtonOn}>
              <Image
                source={require('../icons/deviceIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Adding')}>
              <Image
                source={require('../icons/addingIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('History')}>
              <Image
                source={require('../icons/historyIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Timer')}>
              <Image
                source={require('../icons/timerListIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'space-between',
  },
  actionButtonContainer: {  
    //flex: 1,
    position: 'absolute',
    bottom: -30,
    right: -5,
  },
  headContainer: {   
    flex: 1, 
    fontWeight: 'bold'
  },
  bodyContainer: {
    flex: 8,
  },
  headButton: {
    ...globalStyles.alternativeColor,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  name: {
    fontSize: 16,
  },
  timerButton: {
    ...globalStyles.alternativeColor,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    padding: 10,
    right: 15,
    bottom: 70,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 36,
    width: '100%',
    maxWidth: 450,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  bottomButtonContainer: {
    flex: 1,
  },
  image: {
    //...StyleSheet.absoluteFillObject,
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButtonOn: {
    ...globalStyles.primaryColor,
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
  },
  bottomButton: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
  },
});

export default deviceScreen;

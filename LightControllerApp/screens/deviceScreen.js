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

  toggleControl = () => {
    this.setState({
      showControlMode: !this.state.showControlMode,
    });
  };

  renderControlButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.timerButton}
          onPress={() => this.props.navigation.navigate('SetTimer')}>
          <Image
            source={require('../icons/timerIcon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render = () => {
    this.readDeviceData();
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <View style={styles.headButton}>
            <Button title={selectedRoom} style = {{backgroundColor: '#edf6fe'}}/>
          </View>
        </View>
        <TouchableWithoutFeedback>
          <FlatList
            pointerEvents={'box-none'}
            data={this.state.DeviceList}
            keyExtractor={item => item.deviceID.toString()}
            style={{marginBottom: 80}}
            renderItem={({item}) => {
              return <FlatListComponent {...item} />;
            }}
          />
        </TouchableWithoutFeedback>
        {this.renderControlButton()}
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
                source={require('../icons/timerIcon.png')}
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
    justifyContent: 'space-between',
  },
  headContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
  },
  headButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9c2ff',
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    left: 15,
    bottom: 70,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 36,
    width: '100%',
    maxWidth: 450,
  },
  bottomButtonContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButtonOn: {
    flex: 1,
    backgroundColor: '#2095f3',
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default deviceScreen;

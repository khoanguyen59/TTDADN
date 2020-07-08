import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SummaryItem from '../components/summaryItem';

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

class historyScreen extends React.Component {
  state = {
    isDatePickerVisible: false,
    pickedDate: '',
    isTimeRender: false,
    logList: [],
  };

  readLogData = () => {
    firebase
      .database()
      .ref('logList/' + this.state.pickedDate)
      .once('value')
      .then(snapshot => {
        this.setState({logList: snapshot.val()});
        //console.log(JSON.stringify(this.state.pickedDate));
      });
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false, isTimeRender: true});
  };

  monthNumber = month => {
    switch (month) {
      case 'Jan':
        return '1';
      case 'Feb':
        return '2';
      case 'Mar':
        return '3';
      case 'Apr':
        return '4';
      case 'May':
        return '5';
      case 'Jun':
        return '6';
      case 'Jul':
        return '7';
      case 'Aug':
        return '8';
      case 'Sep':
        return '9';
      case 'Oct':
        return '10';
      case 'Nov':
        return '11';
      case 'Dec':
        return '12';
    }
  };

  handleDatePicked = date => {
    const mdate = date.toString().split(' ');

    this.setState({
      pickedDate: mdate[2] + '-' + this.monthNumber(mdate[1]) + '-' + mdate[3],
    });
    console.log(this.state.pickedDate);
    this.hideDatePicker();
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  renderDate = () => {
    return <Text>{this.state.pickedDate}</Text>;
  };

  renderList = () => {
    if (this.state.isTimeRender) {
      return (
        <FlatList
          data={this.state.logList}
          keyExtractor={item => {
            item.deviceID;
          }}
          style={{marginBottom: 40}}
          renderItem={({item, index}) => {
            return <SummaryItem {...[item, index]} />;
          }}
        />
      );
    } else {
      return null;
    }
  };

  render = () => {
    this.readLogData();
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Button title="Log Summary" />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Select Date</Text>
          <TouchableOpacity
            onPress={() => this.showDatePicker()}
            style={styles.timeButton}>
            {this.state.isTimeRender && this.renderDate()}
          </TouchableOpacity>
        </View>
        <DateTimePicker
          mode="date"
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
        />
        {this.renderList()}
        <View style={styles.bottomContainer}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Device')}>
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
            <TouchableOpacity style={styles.bottomButtonOn}>
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
  },
  headContainer: {
    width: '100%',
    maxWidth: 450,
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  dateText: {
    fontSize: 20,
    flex: 0.5,
  },
  timeButton: {
    backgroundColor: 'white',
    flex: 0.8,
    borderWidth: 1,
    borderColor: 'black',
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
  bottomButton: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomButtonOn: {
    flex: 1,
    backgroundColor: '#2095f3',
  },
});

export default historyScreen;

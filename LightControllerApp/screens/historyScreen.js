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

const DeviceList = [
  {
    summaryID: '01',
    summaryAction: 'Off',
    summaryRoom: '101',
    summaryAuto: false,
    summaryTime: '7:00',
  },
  {
    summaryID: '01',
    summaryAction: 'On',
    summaryRoom: '102',
    summaryAuto: false,
    summaryTime: '19:00',
  },
  {
    summaryID: '02',
    summaryAction: 'Off',
    summaryRoom: '103',
    summaryAuto: true,
    summaryTime: '0:10',
  },
  {
    summaryID: '03',
    summaryAction: 'On',
    summaryRoom: '103',
    summaryAuto: true,
    summaryTime: '8:00',
  },
  {
    summaryID: '04',
    summaryAction: 'Off',
    summaryRoom: '201',
    summaryAuto: false,
    summaryTime: '17:00',
  },
  {
    summaryID: '01',
    summaryAction: 'Off',
    summaryRoom: '101',
    summaryAuto: false,
    summaryTime: '7:00',
  },
  {
    summaryID: '01',
    summaryAction: 'On',
    summaryRoom: '102',
    summaryAuto: false,
    summaryTime: '19:00',
  },
  {
    summaryID: '02',
    summaryAction: 'Off',
    summaryRoom: '103',
    summaryAuto: true,
    summaryTime: '0:10',
  },
  {
    summaryID: '03',
    summaryAction: 'On',
    summaryRoom: '103',
    summaryAuto: true,
    summaryTime: '8:00',
  },
  {
    summaryID: '04',
    summaryAction: 'Off',
    summaryRoom: '201',
    summaryAuto: false,
    summaryTime: '17:00',
  },
];

class historyScreen extends React.Component {
  state = {
    isDatePickerVisible: false,
    pickedDate: new Date().toDateString,
    isTimeRender: false,
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false, isTimeRender: true});
  };

  handleDatePicked = date => {
    const mdate = date.toString().split(' ');

    this.setState({
      pickedDate: mdate[0] + ', ' + mdate[1] + ' ' + mdate[2] + ', ' + mdate[3],
    });
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
          data={DeviceList}
          keyExtractor={item => item.deviceID}
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

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import WeekDayComponent from '../components/dayItem';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {setTimer} from '../components/dayItem.js';

const weekDays = [
  {
    day: 'Mon',
    number: 2,
  },
  {
    day: 'Tue',
    number: 3,
  },
  {
    day: 'Wed',
    number: 4,
  },
  {
    day: 'Thu',
    number: 5,
  },
  {
    day: 'Fri',
    number: 6,
  },
  {
    day: 'Sat',
    number: 7,
  },
  {
    day: 'Sun',
    number: 8,
  },
];

export var selectedTime;

class setTimerScreen extends React.Component {
  state = {
    showControlMode: false,
    isDatePickerVisible: false,
    pickedTime: '00 : 00',
    isTimeRender: true,
    switchVal: false,
  };

  onConfirm = () => {
    setTimer(this.state.switchVal, this.state.pickedTime);
    this.props.navigation.navigate('Device');
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false, isTimeRender: true });
  };

  handleDatePicked = date => {
    const mdate = date.toString().split(' ');
    const time = mdate[4].split(':');
    this.setState({
      pickedTime: time[0] + ':' + time[1],
    });
    selectedTime = this.state.pickedTime;
    this.hideDatePicker();
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  renderTime = () => {
    return <Text style={styles.text}>{this.state.pickedTime}</Text>;
  };

  render = () => {
    return (
      <View style={styles.container}>
        {/*Header Navigation*/}
        {/* <View style={styles.headContainer}>
          <Button title="Set Timer" />
        </View> */}
        {/*Select Weekday*/}
        <View style={styles.dayList}>
          <WeekDayComponent {...weekDays[0]} />
          <WeekDayComponent {...weekDays[1]} />
          <WeekDayComponent {...weekDays[2]} />
          <WeekDayComponent {...weekDays[3]} />
          <WeekDayComponent {...weekDays[4]} />
          <WeekDayComponent {...weekDays[5]} />
          <WeekDayComponent {...weekDays[6]} />
        </View>
        <TouchableOpacity
          onPress={() => this.showDatePicker()}
          style={styles.timeButton}>
          {this.state.isTimeRender && this.renderTime()}
        </TouchableOpacity>
        <DateTimePicker
          mode="time"
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
        />
        <View style={styles.switchContainer}>
          <View
            style = {styles.SwitchText}
          >
            <Text
              style = {{
                alignSelf: 'center',
                justifyContent:'center',
              }}
            >{this.state.switchVal? 'ON' : 'OFF'}</Text>
          </View>
          <Text>     </Text>
          <Switch
            style={styles.switch}
            onValueChange={value => this.setState({switchVal: value})}
            value={this.state.switchVal}
          />
        
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => this.onConfirm()}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        {/*Footer Navigation*/}
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
    width: '100%',
    maxWidth: 450,
    flexDirection: 'column',
  },
  dayList: {
    position: 'absolute',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
    marginTop: 100,
  },
  timeButton: {
    alignItems: 'center',
    backgroundColor: '#99cccc',
    position: 'absolute',
    height: 45,
    width: 150,
    alignSelf: 'center',
    marginTop: 200,
    borderRadius: 10,
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 300,
    position: 'absolute',
  },
  switch: {
    transform: [{scaleX: 1.8}, {scaleY: 1.8}],
  },
  saveButton: {
    backgroundColor: '#2095f3',
    position: 'absolute',
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginTop: 380,
    borderRadius: 10,
    justifyContent: 'center',
    // padding: 10,
    // margin: 15,
    // height: 40,
    // width: 150,
    // alignSelf: 'center',
    // borderRadius: 45,
    // alignItems: 'center',
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
  text: {
    fontSize: 30,
    alignSelf: 'center',
  },
  saveText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#4eb151',
    position: 'absolute',
    alignSelf: 'center',
    width: 100,
    height: 40,
    marginTop: 150,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  SwitchText:{
    width:30,
    height:25,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#99cccc',
    borderRadius: 10,
    // borderColor: 'black',
    // borderWidth:0.5
  }
});

export default setTimerScreen;

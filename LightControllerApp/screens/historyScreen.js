import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Image,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SummaryItem from '../components/summaryItem';
import ScreenTemplate from './screenTemplate';
import {globalStyles} from '../styles/global';
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

const screenIdx = 3;

function convertMonthToNumber(month) 
{
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

function formatDate(date) 
{
  return (date[2].startsWith("0") ? date[2][1] : date[2]) + '-' + convertMonthToNumber(date[1]) + '-' + date[3];
}

function getCurrentDate() 
{
  const currentDate = new Date().toString().split(' ');
  return formatDate(currentDate);
}

export default function historyScreen({ navigation }){
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDate, setPickedDate] = useState(getCurrentDate());
  const [logList, setLogList] = useState([]);

  const readLogData = () => {
    firebase
    .database()
    .ref('logList/' + pickedDate)
    .once('value')
    .then(snapshot => {
      setLogList(snapshot.val());
    })
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
    
  const handleDatePicked = (date) => {
    const mdate = date.toString().split(' ');
    setPickedDate(mdate[2] + '-' + convertMonthToNumber(mdate[1]) + '-' + mdate[3]);
    //hideDatePicker();
  };
  
  const title = (
    <View style={styles.headContainer}>
      <Button title={"Log Summary " + pickedDate}/>
    </View>
  );

  const onButtonPress = () => setDatePickerVisibility(true);

  const logListComponent = (
    <View style={{flex: 8}}>
      <FlatList
      data={logList}
      keyExtractor={item => { item.deviceID.toString() + item.time }}
      renderItem={({item, index}) => <SummaryItem {...[item, index]} />}
    />
    </View>
  );

  const noEventImage = (
    <View style={{...styles.imageContainer, flex: 8}}>
      <Image style={styles.image} source={require('../icons/eventIcon.png')}/>
      <Text style={styles.noEventText}>{"No activity have been recorded\n that day."}</Text>
    </View>
  )

  const body = (
    <View style={{flex:1}}>
      {logList ? logListComponent : noEventImage}
      <View style={styles.datePickButtonContainer}>
        <View style={styles.datePickButton}>
          <Button 
            color={globalStyles.alternativeColor.backgroundColor}
            title={"PICK A DATE"}
            onPress={onButtonPress}
            />  
          <DateTimePicker
            mode="date"
            isVisible={isDatePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDatePicker}
          />
        </View>  
      </View>
    </View>
  );

  useEffect(() => {
    hideDatePicker();
    readLogData();
  }, [pickedDate]);

  return (
    <ScreenTemplate
      screenIndex={screenIdx}
      navigation={navigation}
      headComponents={title}
      bodyComponents={body}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    width: '100%',
    maxWidth: 450,
  },
  datePickButtonContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 40,
  },
  datePickButton: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  noEventText: {
    ...globalStyles.regularText,
    textAlign: 'center',
  }
});
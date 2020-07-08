import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {globalStyles} from '../../styles/global';

const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const actionTxt = { on: 'ON', off: 'OFF'};

export default function TimerItem({deviceName, setTime, setDates, action}) {
  return (
    <View style={styles.timerItemContainer}>
      <View style={styles.itemContainer}>
        <Text style={globalStyles.title}>{deviceName}</Text>
        <Text style={styles.boldText}>{setTime}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.boldText}>{action ? actionTxt.off : actionTxt.on}</Text>
        <View style={styles.datesContainer}>
          {setDates.map((date, index) => (
            <Text key={index} style={date ? styles.boldText : styles.fadedText}>
              {' ' + daysOfWeek[index] + ' '}
            </Text>
          )
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderColor: 'lightgrey',
    borderWidth: 1
  },
  fadedText: {
    ...globalStyles.regularText,
    color: 'lightgrey',
  },
  boldText: {
    ...globalStyles.regularText,
    fontWeight: 'bold',
  },
  itemContainer: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datesContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer:{
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

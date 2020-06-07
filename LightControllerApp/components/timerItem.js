import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const daysOfWeek = ['2', '3', '4', '5', '6', '7', 'S'];

export default function TimerItem({ deviceName, setTime, setDates }) {


  return (
    <View style={styles.timerItemContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.textStyle}>{deviceName}</Text>
        <Text style={styles.boldTextStyle}>{setTime}</Text>
        </View>
      <View style={styles.datesContainer}>
        {
          setDates.map((date, index) =>
            <Text style={styles.underlinedTextStyle}>{date? daysOfWeek[index] + ' ' : '  '}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timerItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(238, 219, 117)',
    justifyContent: 'space-around',
    height: 100,
    margin: 10,
    borderRadius: 10
  },
  textStyle: {
    fontSize: 32,
  },
  boldTextStyle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  underlinedTextStyle: {
    fontSize: 32,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  itemContainer: {
    margin: 5,
    //backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  datesContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

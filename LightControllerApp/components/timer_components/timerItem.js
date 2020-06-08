import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global';

const daysOfWeek = ['2', '3', '4', '5', '6', '7', 'S'];

export default function TimerItem({ deviceName, setTime, setDates }) {
  return (
    <View style={styles.timerItemContainer}>
      <View style={styles.itemContainer}>
        <Text style={globalStyles.title}>{deviceName}</Text>
        <Text style={styles.boldText}>{setTime}</Text>
        </View>
      <View style={styles.datesContainer}>
        { setDates.map((date, index) =>
            <Text
              key={index}
              style={styles.borderText}>
                {date? daysOfWeek[index] : '  '}
            </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timerItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(172, 213, 56)',
    justifyContent: 'space-around',
    height: 100,
    margin: 10,
    borderRadius: 10
  },
  boldText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  borderText: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 20,
    margin: 3,
    padding: 3
  },
  itemContainer: {
    margin: 5,
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

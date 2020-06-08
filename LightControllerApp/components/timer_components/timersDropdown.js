import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import TimerItem from './timerItem';
import { globalStyles } from '../../styles/global';

export default function TimersDropdown({ timerData }) {
  const [timerItems, setTimerItems] = useState([]);

  const locationTab = (
    <TouchableOpacity
      style={styles.locationTab}
      onPress={() => setTimerItems(timerItems.length == 0? timerData.timerItems : [])}>
      <Text style={globalStyles.whiteTitle}> {timerData.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {locationTab}
      {timerItems.map((item) =>
        <TimerItem
          key={item.deviceID}
          deviceName={item.deviceType + ' ' + item.deviceID}
          setTime={item.setTime}
          setDates={item.setDates}/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  locationTab: {
    borderWidth: 2,
    backgroundColor: 'rgb(36, 48, 94)',
  },
})

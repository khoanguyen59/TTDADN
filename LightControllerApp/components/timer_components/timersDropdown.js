import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import TimerItem from './timerItem';
import { globalStyles } from '../../styles/global';

export default function TimersDropdown({ timerData }) {
  const [timerItems, setTimerItems] = useState([]);

  return (
    <View>
      {/*Location Tab*/}
      <TouchableOpacity
        style={styles.locationTab}
        onPress={() => setTimerItems(timerItems.length == 0? timerData.timerItems : [])}>
        <Text style={globalStyles.title}>{timerData.location}</Text>
      </TouchableOpacity>

      {/*Timer item flatlist*/}
      <View style={styles.timerContainer}>
      <FlatList
        keyExtractor={item => item.deviceID}
        data={timerItems}
        renderItem={({item}) =>
          <TimerItem
            deviceName={item.deviceType + ' ' + item.deviceID}
            setTime={item.setTime}
            setDates={item.setDates}/>
        }
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationTab: {
    borderWidth: 3,
    borderColor: 'rgb(48, 72, 162)',
    backgroundColor: '#2095f3',
  },
  timerContainer: {
    backgroundColor: 'pink',
    
  }
})

import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ScreenTemplate from './screenTemplate';
import TimerItem from '../components/timerItem';
import { globalStyles } from '../styles/global';

const screenIdx = 4;

const timerItemsTest = [
  {
    deviceID: '69',
    deviceType: 'Light',
    setTime: '9:00',
    setDates: [true, true, false, true, true, true, false]
  },
  {
    deviceID: '43',
    deviceType: 'Light',
    setTime: '21:00',
    setDates: [true, false, false, true, false, true, false]
  }
];

const locationAndTimerItems = [
  {
    location: 'Room 101',
    timerItems: [
      {
        deviceID: '69',
        deviceType: 'Light',
        setTime: '9:00',
        setDates: [true, true, false, true, true, true, false]
      },
      {
        deviceID: '43',
        deviceType: 'Light',
        setTime: '21:00',
        setDates: [true, false, false, true, false, true, false]
      }
    ]
  },
  {
    location: 'Room 102',
    timerItems: [
      {
        deviceID: '23',
        deviceType: 'Light',
        setTime: '6:00',
        setDates: [false, true, true, true, true, true, true]
      },
      {
        deviceID: '23',
        deviceType: 'Light',
        setTime: '21:00',
        setDates: [true, true, true, true, true, true, true]
      }
    ]
  },
]

export default function timerScreen({ navigation }) {
  const [timerItems, setTimerItems] = useState(timerItemsTest);

  const timerItemList = (
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
  );

  const locationTab = (
    <View>
      <TouchableOpacity
        style={styles.locationTab}
        onPress={() => setTimerItems(timerItems.length == 0? timerItemsTest : [])}>
        <Text style={globalStyles.title}>Room 101</Text>
      </TouchableOpacity>
      { timerItemList }
    </View>
  );

  return (
    <ScreenTemplate
      screenIndex={ screenIdx }
      navigation={ navigation }
      bodyComponents={ locationTab }
    />
  )
}

const styles = StyleSheet.create({
  locationTab: {
    backgroundColor: '#2095f3',
  },
  title: {
    fontSize: 32,
  }
})

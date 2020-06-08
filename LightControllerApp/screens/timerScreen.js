import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ScreenTemplate from './screenTemplate';
import { globalStyles } from '../styles/global';
import TimersDropdown from '../components/timer_components/timersDropdown';

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

const timerDataList = [
  {
    key: '1',
    location: 'Room 101',
    timerItems: [
      {
        deviceID: '69',
        deviceType: 'Light',
        setTime: '09:00',
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
    key: '2',
    location: 'Room 102',
    timerItems: [
      {
        deviceID: '23',
        deviceType: 'Light',
        setTime: '06:00',
        setDates: [false, true, true, true, true, true, true]
      },
      {
        deviceID: '25',
        deviceType: 'Light',
        setTime: '21:00',
        setDates: [true, true, true, true, true, true, true]
      }
    ]
  },
  {
    key: '3',
    location: 'Room 201',
    timerItems: [
      {
        deviceID: '77',
        deviceType: 'Light',
        setTime: '16:00',
        setDates: [false, false, false, false, false, true, false]
      },
      {
        deviceID: '56',
        deviceType: 'Light',
        setTime: '22:00',
        setDates: [true, false, true, true, false, true, false]
      }
    ]
  },
  {
    key: '4',
    location: 'Room 202',
    timerItems: [
      {
        deviceID: '22',
        deviceType: 'Light',
        setTime: '07:00',
        setDates: [false, true, true, true, true, true, true]
      },
      {
        deviceID: '66',
        deviceType: 'Light',
        setTime: '21:00',
        setDates: [true, true, true, true, true, true, true]
      },
      {
        deviceID: '72',
        deviceType: 'Light',
        setTime: '15:00',
        setDates: [false, true, true, false, true, true, true]
      }
    ]
  },
]

export default function timerScreen({ navigation }) {
  /*const timersDropdowns = (
    <View>
      <FlatList
        data={timerDataList}
        renderItem={({item}) => {
            <TimersDropdown timerData={item} />
          }
        }
      />
    </View>
  );*/

  const timersDropdowns = (
    <View>
      {timerDataList.map((item) => <TimersDropdown timerData={item}/>)}
    </View>
  );

  return (
    <ScreenTemplate
      screenIndex={ screenIdx }
      navigation={ navigation }
      bodyComponents={
        timersDropdowns
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

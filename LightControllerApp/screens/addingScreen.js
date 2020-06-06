import React from 'react';
import { StyleSheet, TextInput, View, FlatList, ToastAndroid } from 'react-native';
import ScreenTemplate from './screenTemplate';
import NavigationTab from '../custom_components/navigationTab';
import DeviceListItem from '../custom_components/deviceListItem';

const testDeviceList = [
  {
    deviceID: '08',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '09',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
]

export default function addingScreen({ navigation }) {
  //TODO
  const searchDevice = () => () => ToastAndroid.show("Search button pressed!", ToastAndroid.LONG);

  const searchBar = (
      <View style={styles.searchContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeHolder='Search for a device...'
          />
        </View>
        <View style={styles.searchIconContainer}>
          <NavigationTab
            pressHandler={searchDevice}
            imageSrc={require('../icons/searchIcon.png')}
          />
        </View>
      </View>
    );

  const deviceList = (
    <FlatList
      keyExtractor={(item) => item.deviceID}
      data={testDeviceList}
      renderItem={({item}) =>
        <DeviceListItem item={item} />
      }
    />
  );

  return (
    <ScreenTemplate
      navigation={ navigation }
      headComponents={ searchBar }
      bodyComponents={ deviceList }
    />
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  textInputContainer: {
    flex: 9,
    padding: 10,
  },
  textInput: {
    backgroundColor: 'rgb(199, 234, 247)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6
  },
  searchIconContainer: {
    flex: 1,
    padding: 10
  }
});

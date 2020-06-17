import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import ScreenTemplate from './screenTemplate';
import NavigationTab from '../components/navigationTab';
import DeviceListItem from '../custom_components/deviceListItem';

const screenIdx = 2;
const testDeviceList = [
  {
    deviceID: '08',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '09',
    deviceType: 'Sensor',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '12',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '19',
    deviceType: 'Sensor',
    deviceState: false,
    deviceRoom: '101',
  },
];

export default function addingScreen({navigation}) {
  //TODO
  const searchDevice = () =>
    ToastAndroid.show('Search button pressed!', ToastAndroid.LONG);

  const searchBar = (
    <View style={styles.searchContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeHolder="Search for a device..."
        />
      </View>
      <View style={styles.searchIconContainer}>
        <TouchableOpacity onPress={searchDevice}>
          <Image
            style={styles.image}
            source={require('../icons/searchIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const deviceList = (
    <FlatList
      keyExtractor={item => item.deviceID.toString()}
      data={testDeviceList}
      renderItem={({item}) => <DeviceListItem item={item} />}
    />
  );

  return (
    <ScreenTemplate
      screenIndex={screenIdx}
      navigation={navigation}
      headComponents={searchBar}
      bodyComponents={deviceList}
    />
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputContainer: {
    flex: 9,
    padding: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  searchIconContainer: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
});

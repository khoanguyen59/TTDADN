import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import NavigationTab from '../components/navigationTab';

export default function ScreenTemplate({
  screenIndex,
  navigation,
  headComponents,
  bodyComponents,
}) {
  const tabInfos = [
    {tabName: 'Device', imageSrc: require('../icons/deviceIcon.png'), key: '1'},
    {tabName: 'Adding', imageSrc: require('../icons/addingIcon.png'), key: '2'},
    {
      tabName: 'History',
      imageSrc: require('../icons/historyIcon.png'),
      key: '3',
    },
    {tabName: 'Timer', imageSrc: require('../icons/timerIcon.png'), key: '4'},
  ];

  const tabPressHandler = tabToNav => () => navigation.navigate(tabToNav);

  const displayTabs = tabInfos.map(info => (
    <NavigationTab
      key={info.key}
      selected={screenIndex == info.key}
      pressHandler={tabPressHandler(info.tabName)}
      imageSrc={info.imageSrc}
    />
  ));

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headContainer}>{headComponents}</View>
      <View style={styles.bodyContainer}>{bodyComponents}</View>
      <View style={styles.bottomContainer}>
        {/*legacy code*/
        /*<View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={tabPressHandler('Setting')}>
              <Image
                source={require('../icons/settingIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>*/}
        {displayTabs}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  headContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 8,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 36,
    width: '100%',
    maxWidth: 450,
  },
  bottomButtonContainer: {
    flex: 1,
  },
  image: {
    //...StyleSheet.absoluteFillObject,
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButton: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
});

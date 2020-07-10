import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
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
    {tabName: 'History', imageSrc: require('../icons/historyIcon.png'), key: '3',},
    {tabName: 'Timer', imageSrc: require('../icons/timerListIcon.png'), key: '4',},
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
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
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

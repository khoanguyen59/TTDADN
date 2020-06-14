import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

export default function NavigationTab({selected, pressHandler, imageSrc}) {
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
        style={selected ? styles.bottomButtonSelected : styles.bottomButton}
        onPress={() => pressHandler()}>
        <Image style={styles.image} source={imageSrc} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButtonContainer: {
    flex: 1,
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButton: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
  },
  bottomButtonSelected: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#2095f3',
  },
});

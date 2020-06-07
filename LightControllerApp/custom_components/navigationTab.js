import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

export default function NavigationTab({ pressHandler, imageSrc }) {
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => pressHandler()}>
        <Image
          source={imageSrc}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
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
});

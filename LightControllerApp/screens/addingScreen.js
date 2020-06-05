import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import ScreenTemplate from './screenTemplate';

export default function addingScreen({ navigation }) {
  const searchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeHolder='Search for a device...'
        />
        <Text style={styles.searchIcon}>Search</Text>
      </View>
    );
  };

  return (
    <ScreenTemplate
      navigation={ navigation }
      headComponents={ searchBar }/>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row'
  },
  textInput: {
    flex: 8,
    backgroundColor: 'rgb(199, 234, 247)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6
  },
  searchIcon: {
    flex: 2,
    backgroundColor: 'rgb(191, 139, 50)'
  }
});

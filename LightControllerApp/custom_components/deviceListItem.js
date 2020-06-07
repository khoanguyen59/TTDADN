import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';

export default function DeviceListItem({ item }) {
  return (
    <TouchableOpacity
      style={styles.item}
      >
      <View style={styles.item}>
        <Text style={styles.title}>
          {item.deviceType} {item.deviceID}
        </Text>
        {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  name: {
    fontSize: 16,
  },
})

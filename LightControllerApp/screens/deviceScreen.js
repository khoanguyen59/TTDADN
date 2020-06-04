import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

const RoomList = [
  {
    roomID: '101',
    roomName: 'Technical Room',
  },
  {
    roomID: '102',
    roomName: 'Business',
  },
  {
    roomID: '103',
    roomName: 'Sales',
  },
  {
    roomID: '201',
    roomName: 'Finance',
  },
  {
    roomID: '202',
    roomName: 'Human Resources',
  },
  {
    roomID: '301',
    roomName: 'Rest Room',
  },
];

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title.roomID}</Text>
      <Text style={styles.name}>{title.roomName}</Text>
    </View>
  );
}

class deviceScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Action" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  name: {
    fontSize: 16,
  },
});

export default deviceScreen;

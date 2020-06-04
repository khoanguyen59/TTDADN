import React from 'react';
import {SafeAreaView, Button, FlatList, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppNavigator from '../App';

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

class homeScreen extends React.Component {
  renderItem = ({item}) => {
    const {navigation} = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.navigation.navigate('Device')}>
        <Text style={styles.title}>{item.roomID}</Text>
        <Text style={styles.name}>{item.roomName}</Text>
      </TouchableOpacity>
    );
  };

  render = () => {
    const {navigation} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          navigation={navigation}
          data={RoomList}
          renderItem={this.renderItem}
          keyExtractor={item => item.roomID}
        />
      </SafeAreaView>
    );
  };
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

export default homeScreen;

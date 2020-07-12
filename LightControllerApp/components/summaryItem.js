import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class FlatListComponent extends Component {
  render = () => {
    return (
      <TouchableOpacity
        style={this.props[1] % 2 === 0 ? styles.item : styles.oddItem}>
        <Text style={styles.title}>Light {this.props[0].deviceID}</Text>
        <Text style={styles.title1}>{this.props[0].room}</Text>
        <Text style={styles.title}>{this.props[0].action}</Text>
        <Text style={styles.title}>{this.props[0].time}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  oddItem: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'gainsboro',
    padding: 10,
    marginHorizontal: 16,
  },
  title: {
    flex: 0.6,
    fontSize: 15,
    marginLeft: 8,
  },
  title1: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
  },
});

export default FlatListComponent;

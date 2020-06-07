import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class FlatListComponent extends Component {
  render = () => {
    return (
      <TouchableOpacity
        style={this.props[1] % 2 === 0 ? styles.item : styles.oddItem}>
        <Text style={styles.title}>Light {this.props[0].summaryID}</Text>
        <Text style={styles.title}>{this.props[0].summaryRoom}</Text>
        <Text style={styles.title}>{this.props[0].summaryAction}</Text>
        <Text style={styles.title}>
          {this.props[0].summaryAuto ? 'Auto' : 'Manual'}
        </Text>
        <Text style={styles.title}>{this.props[0].summaryTime}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  oddItem: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'gainsboro',
    padding: 5,
    marginHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
  },
});

export default FlatListComponent;

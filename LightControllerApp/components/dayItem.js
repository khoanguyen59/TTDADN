//This file defines weekday components for setTimerScreen
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

class WeekDayComponent extends Component {
  state = {
    selected: false,
  };

  toggleSelect = () => {
    this.setState({
      selected: !this.state.selected,
    });
  };

  render = () => {
    return (
      <TouchableOpacity onPress={() => this.toggleSelect()}>
        <View style={this.state.selected ? styles.itemPress : styles.item}>
          <Text style={styles.title}>{this.props.number}</Text>
          {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginLeft: 10,
  },
  itemPress: {
    borderWidth: 1,
    borderColor: 'green',
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginLeft: 10,
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 5,
  },
});

export default WeekDayComponent;

import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {selectedList} from '../screens/deviceScreen.js';

function removeA(arr) {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

class FlatListComponent extends Component {
  state = {
    selected: false,
  };

  toggleSelect = () => {
    if (this.props.deviceType === 'Light') {
      this.setState({
        selected: !this.state.selected,
      });
      if (!this.state.selected) {
        selectedList.push(this.props);
      } else {
        removeA(selectedList, this.props);
      }
    }
    console.log(selectedList);
  };

  renderTick = () => {
    if (this.state.selected) {
      return (
        <View>
          <Image
            source={require('../icons/greenTickIcon.png')}
            style={styles.image}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  render = () => {
    return (
      <TouchableOpacity
        style={this.props.deviceState ? styles.itemOn : styles.item}
        onPress={() => this.toggleSelect()}>
        <View>
          <Text style={styles.title}>
            {this.props.deviceType} {this.props.deviceID}
          </Text>
          {this.renderTick()}
          {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemOn: {
    backgroundColor: '#7cfc00',
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
  image: {
    ...StyleSheet.absoluteFillObject,
    width: 60,
    height: 60,
    top: -60,
    left: 200,
    resizeMode: 'contain',
  },
});

export default FlatListComponent;

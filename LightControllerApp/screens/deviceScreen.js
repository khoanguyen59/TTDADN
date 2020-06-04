import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

const DeviceList = [
  {
    deviceID: '01',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '01',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '01',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '01',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '01',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '01',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
];

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {title.deviceType} + " + {title.deviceID}
      </Text>
      {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
    </View>
  );
}

class deviceScreen extends React.Component {
  renderItem = ({item}) => {
    const {navigation} = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.navigation.navigate('Device')}>
        <View style={styles.item}>
          <Text style={styles.title}>
            {item.deviceType} + " + {item.deviceID}
          </Text>
          {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Button title="Action" />
          <Button title="List" />
        </View>
        <FlatList
          data={DeviceList}
          renderItem={this.renderItem}
          keyExtractor={item => item.deviceID}
        />
        <View style={styles.bottomButton}>
          <Button
            title="Setting"
            onPress={() => this.props.navigation.navigate('Setting')}
          />
          <Button
            title="Adding"
            onPress={() => this.props.navigation.navigate('Adding')}
          />
          <Button
            title="History"
            onPress={() => this.props.navigation.navigate('History')}
          />
          <Button
            title="Timer"
            onPress={() => this.props.navigation.navigate('Timer')}
          />
        </View>
      </View>
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
  bottomButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default deviceScreen;

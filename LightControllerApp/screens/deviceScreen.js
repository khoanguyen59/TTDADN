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
    deviceID: '02',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '03',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '04',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '05',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
  {
    deviceID: '06',
    deviceType: 'Light',
    deviceState: false,
    deviceRoom: '101',
  },
];

class deviceScreen extends React.Component {
  renderItem = ({item}) => {
    const {navigation} = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.navigation.navigate('Device')}>
        <View style={styles.item}>
          <Text style={styles.title}>
            {item.deviceType} {item.deviceID}
          </Text>
          {/*<Text style={styles.name}>{title.devicePosition}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    return (
      <View>
        <View style={styles.headContainer}>
          <Button title="Action" />
        </View>
        <FlatList
          data={DeviceList}
          renderItem={this.renderItem}
          keyExtractor={item => item.deviceID}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.bottomButtonContainer}>
            <Button
              title="Setting"
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Setting')}
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <Button
              title="Adding"
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Adding')}
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <Button
              title="History"
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('History')}
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <Button
              title="Timer"
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Timer')}
            />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  headContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
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
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 36,
    width: '100%',
    maxWidth: 450,
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  bottomButtonContainer: {
    flex: 1,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default deviceScreen;

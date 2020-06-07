import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';

class settingScreen extends React.Component {
  state = {
    switchVal1: false,
    switchVal2: false,
  };
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Button title="Control Mode" />
        </View>
        <View style={styles.switchContainer}>
          <View style={styles.switchContainer2}>
            <Switch
              style={styles.switch}
              onValueChange={value => this.setState({switchVal1: value})}
              value={this.state.switchVal1}
            />
            <Text style={styles.textStyle}>Auto/Manual</Text>
          </View>
          <View style={styles.switchContainer2}>
            <Switch
              style={styles.switch}
              onValueChange={value => this.setState({switchVal2: value})}
              value={this.state.switchVal2}
            />
            <Text style={styles.textStyle}>On/Off</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButtonOn}
              onPress={() => this.props.navigation.navigate('Device')}>
              <Image
                source={require('../icons/deviceIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Adding')}>
              <Image
                source={require('../icons/addingIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('History')}>
              <Image
                source={require('../icons/historyIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => this.props.navigation.navigate('Timer')}>
              <Image
                source={require('../icons/timerIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headContainer: {
    width: '100%',
    maxWidth: 450,
    flexDirection: 'column',
  },
  switchContainer: {
    alignSelf: 'center',
  },
  switchContainer2: {
    flexDirection: 'row',
  },
  switch: {
    transform: [{scaleX: 1.8}, {scaleY: 1.8}],
    paddingTop: 40,
  },
  textStyle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    height: 36,
    width: '100%',
    maxWidth: 450,
  },
  bottomButtonContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: 'auto',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButtonOn: {
    flex: 1,
    backgroundColor: '#2095f3',
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default settingScreen;

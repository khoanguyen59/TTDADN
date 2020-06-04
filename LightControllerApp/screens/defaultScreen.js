import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

var currentButton = '';

class defaultScreen extends React.Component {
  state = {
    selectedButton: currentButton,
  };

  render = () => {
    return (
      <View>
        <View style={styles.headContainer}>
          <Button title="Action" />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton1}
              onPress={
                (() => this.props.navigation.navigate('Setting'),
                this.setState({selectedButton: 'button1'}),
                (currentButton = this.state.selectedButton))
              }>
              <Image
                source={require('../icons/settingIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton2}
              onPress={
                (() => this.props.navigation.navigate('Adding'),
                this.setState({selectedButton: 'button2'})(
                  (currentButton = this.state.selectedButton),
                ))
              }>
              <Image
                source={require('../icons/addingIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton3}
              onPress={
                (() => this.props.navigation.navigate('History'),
                this.setState({selectedButton: 'button3'})(
                  (currentButton = this.state.selectedButton),
                ))
              }>
              <Image
                source={require('../icons/historyIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.bottomButton4}
              onPress={
                (() => this.props.navigation.navigate('Timer'),
                this.setState({selectedButton: 'button4'})(
                  (currentButton = this.state.selectedButton),
                ))
              }>
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
    marginBottom: 10,
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
  bottomButton1: {
    flex: 1,
    backgroundColor: currentButton === 'button1' ? '#2095f3' : 'white',
  },
  bottomButton2: {
    flex: 1,
    backgroundColor: currentButton === 'button2' ? '#2095f3' : 'white',
  },
  bottomButton3: {
    flex: 1,
    backgroundColor: currentButton === 'button3' ? '#2095f3' : 'white',
  },
  bottomButton4: {
    flex: 1,
    backgroundColor: currentButton === 'button4' ? '#2095f3' : 'white',
  },
});

export default defaultScreen;

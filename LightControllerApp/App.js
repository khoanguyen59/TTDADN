import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from './screens/homeScreen';
import deviceScreen from './screens/deviceScreen';

const AppNavigator = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name="Home" component={homeScreen} />
        <AppNavigator.Screen name="Device" component={deviceScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};
export default App;

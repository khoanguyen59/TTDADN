import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from './screens/homeScreen';
import deviceScreen from './screens/deviceScreen';
import settingScreen from './screens/settingScreen';
import setTimerScreen from './screens/setTimerScreen';
import historyScreen from './screens/historyScreen';
/*import addingScreen from './screens/addingScreen';

import timerScreen from './screens/timerScreen';*/

const AppNavigator = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name="Home" component={homeScreen} />
        <AppNavigator.Screen name="Device" component={deviceScreen} />
        <AppNavigator.Screen name="Setting" component={settingScreen} />
        <AppNavigator.Screen name="SetTimer" component={setTimerScreen} />
        <AppNavigator.Screen name="History" component={historyScreen} />
        {/*<AppNavigator.Screen name="Adding" component={addingScreen} />

  <AppNavigator.Screen name="Timer" component={timerScreen} />*/}
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};
export default App;

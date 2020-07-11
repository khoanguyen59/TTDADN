import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import MQTTConnection from './src/NewMQTTConnection';
import ProgressCircle from 'react-native-progress-circle';

const subscribeTopic = 'Topic/Light';
const publishTopic = 'Topic/LightD';
const myUserName = 'BKvm';
const myPassword = 'Hcmut_CSE_2020';

const uri = 'mqtt://52.230.26.121:1883';
//const uri = 'mqtt://52.187.125.59:1883';

MQTTConnection.create('kiet', subscribeTopic, publishTopic, 
  {
    uri: uri,
    user: myUserName,
    pass: myPassword,
  });

MQTTConnection.attachCallbacks(
  () => {
    console.log('MQTT onConnectionOpened');
    MQTTConnection.subscribe(subscribeTopic, 2);
    //this.client.publish(this.publishTopic, messagePublishFormat(this.switchValue), qos, false);
  },
  (err) => {
    console.log(`MQTT onConnectionClosed ${err}`);
  },
  (message) => {
    if (!message) return;
        
    console.log(`MQTT New message: ${message.data}`)
  },
  (error) => {
    console.error(`MQTT onError: ${error}`);
  },
);

export default function App() {

  const [switchValue, setSwitch] = useState(false);
  const [lightIntensity, setIntensity] = useState(200);
  
  const messagePublishFormat = (switchValue) => JSON.parse(JSON.stringify(`[{ "device_id": "LightD", "values": ["${switchValue ? 1 : 0}", "255"]}]`));

  renderCircle = () => {
    return (
      <ProgressCircle
        style={styles.circle}
        percent={lightIntensity / 255 * 100}
        radius={100}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff">
        <Text style={{fontSize: 18}}>{lightIntensity}/255</Text>
      </ProgressCircle>
    );
  };

  return (
    <View styles={styles.container}>
      <View style={styles.switchContainer}>
        {renderCircle()}
        <Switch
          style={styles.switch}
          onValueChange={value => {
            setSwitch(value);
            MQTTConnection.publish(publishTopic, messagePublishFormat(value), 2, false);
          }}
          value={switchValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  switchContainer: {
    marginTop: 100,
    alignSelf: 'center',
  },
  circle: {
    marginTop: 200,
  },
  switch: {
    marginTop: 50,
    alignSelf: 'center',
    transform: [{scaleX: 2}, {scaleY: 1.8}],
    paddingTop: 40,
  },
});

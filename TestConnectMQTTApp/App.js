import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, Switch} from 'react-native';
import MQTTConnection from './MQTTConnection';
import {Buffer} from 'buffer';
import ProgressCircle from 'react-native-progress-circle';
global.Buffer = Buffer;

export default function App() {
  const [switchValue, setSwitch] = useState(false);
  const [lightIntensity, setIntensity] = useState(200);
  useEffect(() => {
    this.mqttConnect = new MQTTConnection();
    this.mqttConnect.onMQTTConnect = this.onMQTTConnect;
    this.mqttConnect.onMQTTLost = this.onMQTTLost;
    this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived;
    this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered;

    this.mqttConnect.connect('broker.mqttdashboard.com', 8000);

    onMQTTConnect = () => {
      console.log('App onMQTTConnect');
      this.mqttConnect.subscribeChannel('khoa');
    };

    onMQTTLost = () => {
      console.log('App onMQTTLost');
    };

    onMQTTMessageArrived = message => {
      console.log('App onMQTTMessageArrived', message);
      console.log(
        'App onMQTTMessageArrived payLoadString: ',
        message.payloadString,
      );
      if (JSON.parse(message.payloadString)[0].device_id == 'Light') {
        setIntensity(JSON.parse(message.payloadString)[0].values[0]);
        console.log(lightIntensity);
      }
    };

    onMQTTMessageDelivered = message => {
      console.log('App onMQTTMessageDelivered', message);
    };

    return () => {
      this.mqttConnect.close();
    };
  }, [lightIntensity]);

  renderCircle = () => {
    return (
      <ProgressCircle
        style={styles.circle}
        percent={lightIntensity / 1024 * 100}
        radius={100}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff">
        <Text style={{fontSize: 18}}>{lightIntensity}/1024</Text>
      </ProgressCircle>
    );
  };

  return (
    <View styles={styles.container}>
      <View style={styles.switchContainer}>
        {this.renderCircle()}    
        <Switch
          style={styles.switch}
          onValueChange={value => {
            setSwitch(value);
            this.mqttConnect.send(
              'khoa',
              `[{ "device_id": "LightD", "values": ["${switchValue ? 0 : 1}", "255"]}]`
            );
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

import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import MQTTConnection from './MQTTConnection';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

export default function App() {

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
    };
    
    onMQTTMessageDelivered = message => {
      console.log('App onMQTTMessageDelivered', message);
    };

    return () => {
      this.mqttConnect.close();
    };
  }, []);

  return (
    <View styles={styles.container}>
      <Text>react_native_mqtt</Text>
      <Button
        title="Press me"
        onPress={() => this.mqttConnect.send('khoa', "Hello from the other side")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

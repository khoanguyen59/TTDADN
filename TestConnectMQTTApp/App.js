import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
//import MQTTConnection from './src/MQTTConnection';
import {Buffer} from 'buffer';
import ProgressCircle from 'react-native-progress-circle';
global.Buffer = Buffer;
import uuid from 'react-native-uuid';
import MQTT from 'react-native-mqtt-angelos3lex';

//const brokerAddr = 'broker.mqttdashboard.com';
//const brokerPort = 8000;

//const brokerAddr = '52.187.125.59';
//const brokerPort = 1883;
const subscribeTopic = 'Topic/Light';
const publishTopic = 'Topic/LightD';
const myUserName = 'BKvm';
const myPassword = 'Hcmut_CSE_2020';
const qos = 2;

//const uri = 'mqtt://test.mosquitto.org:1883';
const uri = 'mqtt://52.187.125.59:1883'
//const uri = 'mqtt://broker.hivemq.com:1883';

export default function App() {

  const [switchValue, setSwitch] = useState(false);
  const [lightIntensity, setIntensity] = useState(200);

  // useEffect(() => {
  //   this.mqttConnect = new MQTTConnection();
  //   this.mqttConnect.onMQTTConnect = this.onMQTTConnect;
  //   this.mqttConnect.onMQTTLost = this.onMQTTLost;
  //   this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived;
  //   this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered;

  //   this.mqttConnect.connect(brokerAddr, brokerPort);

  //   onMQTTConnect = () => {
  //     console.log('App onMQTTConnect');
  //     this.mqttConnect.subscribeChannel(subscribeTopic);
  //   };

  //   onMQTTLost = () => {
  //     console.log('App onMQTTLost');
  //   };

  //   onMQTTMessageArrived = message => {
  //     console.log('App onMQTTMessageArrived', message);
  //     console.log(
  //       'App onMQTTMessageArrived payLoadString: ',
  //       message.payloadString,
  //     );
  //     if (JSON.parse(message.payloadString)[0].device_id == 'Nhom 3') {
  //       setTimeout(() => {
  //         setIntensity(Number(JSON.parse(message.payloadString)[0].values[0]));
  //       }, 1000);
  //     }
  //     console.log(lightIntensity);
  //   };

  //   onMQTTMessageDelivered = message => {
  //     console.log('App onMQTTMessageDelivered', message);
  //   };

  //   return () => {
  //     this.mqttConnect.close();
  //   };
  // }, [lightIntensity]);

  //----------------------------------//;

  const currentTime = +new Date();
  let clientID = currentTime + uuid.v1();
  clientID = clientID.slice(0, 23);
  console.log('clientID:', clientID);
  
  useEffect(() => {
    const appClient = MQTT.createClient({
      uri: uri,
      clientId: clientID,
      user: myUserName,
      pass: myPassword,
    }).then((client) => {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg);
        });

        client.on('connect', function () {
          console.log('Connected to: ' + uri);
          client.subscribe(subscribeTopic, qos);
          client.publish(subscribeTopic, JSON.parse(JSON.stringify(`[{ "device_id": "Nhom 3", "values": ["${switchValue ? 1 : 0}", "255"]}]`)), qos, false);
        });

        client.connect();
      }).catch(function (err) {
          console.log(err);
      });
  }, [switchValue]);

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
        <Text style={{fontSize: 18}}>{lightIntensity}/1023</Text>
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
            //client.publish(publishTopic, [{ "device_id": "Nhom 3", "values": ["${switchValue ? 0 : 1}", "255"]}], qos, false);
            // this.mqttConnect.send(
            //   publishTopic,
            //   `[{ "device_id": "Nhom 3", "values": ["${switchValue ? 0 : 1}", "255"]}]`
            // );
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

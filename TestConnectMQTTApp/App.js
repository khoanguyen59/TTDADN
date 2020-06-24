import React,{useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import MQTTConnection from './src/MQTTConnection'
import {Buffer} from 'buffer'
global.Buffer = Buffer;


export default function App(){
  useEffect(()=>{
    this.mqttConnect = new MQTTConnection()
    this.mqttConnect.onMQTTConnect = this.onMQTTConnect
    this.mqttConnect.onMQTTLost = this.onMQTTLost
    this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived
    this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered

    this.mqttConnect.connect('broker.hivemq.com', 8000);

    onMQTTConnect = ()=>{
      console.log('connected');
      this.mqttConnect.subscribeChannel('testChannel');
    }
    onMQTTLost= ()=> {
      console.log('connect lost')
    }
    onMQTTMessageArrived = (message) => {
      console.log('onMQTTMessageArrived : ', message);
      console.log('onMQTTMessageArrived payloadString: ', message.payloadString);
    }
    onMQTTMessageDelivered = (message) => {
      console.log('onMQTTMessageDelivered : ', message);
    }

    return ()=>{
      this.connect.close();
    }

  }, [])


  return (
    <View style = {stypes.container}>
      <Text>"hello"</Text>
      <Button
        title = "send signal"
        onPress ={()=> this.mqttConnect.send('testChannel', "message")}
      />
    </View>
  )
}

const stypes = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
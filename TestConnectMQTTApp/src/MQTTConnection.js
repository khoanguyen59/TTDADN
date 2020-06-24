import init from 'react_native_mqtt';
import uuid from 'react-native-uuid';
import {AsyncStorage} from 'react-native';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync : {
    }
});

const defaultConnectOptions = {
    reconnect: false,
    cleanSession: true,
    mqttVersion: 3,
    keepAliveInterval: 60,
    timeout: 60
}

export default class MQTTConnection{
    constructor(){
        this.mqtt = null;
        this.QOS = 0;
        this.RETAIN = true;
    }

    connect(host, port, option = null){
        if(option) {
            this.QOS = option.QOS;
            this.RETAIN = option.retain;
        }

        let currentTime = +new Date();
        let ClientID = currentTime + uuid.v1();
        ClientID = ClientID.slice(0,23);
        console.log('ClientID: ', ClientID);
        
        this.mqtt = new Paho.MQTT.Client(host, port, ClientID);
        this.mqtt.onConnectionLost = (res) =>{
            this.onMQTTLost;
        };
        this.mqtt.onMessageArrived = (message) =>{
            this.onMQTTMessageArrived(message);
        };
        this.mqtt.onMessageDelivered = (message) => {
            this.onMQTTMessageDelivered(message);
        };

        const connectOption = option ? option : defaultConnectOptions;

        this.mqtt.connect({
            onSuccess: this.onMQTTSuccess,
            onFailure: this.onMQTTFailure,
            ...connectOption
        });    
    }
    onMQTTSuccess =() =>{
        this.onMQTTConnect();
    }
    onMQTTFailure = () => {
        this.onMQTTLost();
    }

    subscribeChannel(channel){
        console.log('MQTTConnection subscribeChannel:', channel);
        if(!this.mqtt || !this.mqtt.isConnected()){
            return;
        }
        this.mqtt.subscribe(channel);
    }

    unsubscribeChannel(channel){
        console.log('MQTTConnection unsubscribeChannel:', channel);
        if(!this.mqtt || !this.mqtt.isConnected()){
            return;
        }
        this.mqtt.unsubscribe(channel, this.QOS);
    }

    send(channel = null ,message){
        console.log('MQTTConnection send: ');
        if(!this.mqtt || !this.mqtt.isConnected()){
            return;
        }

        if(!channel || !message){
            return false;
        }

        console.log('MQTTConnection send publish channel : ',channel, 'QOS: ',this.QOS);
        this.mqtt.publish(channel,message, this.QOS, this.RETAIN);
    }

    close(){
        this.mqtt && this.mqtt.disconnect();
        this.mqtt = null;
    }
}

MQTTConnection.prototype.onMQTTConnect = null
MQTTConnection.prototype.onMQTTLost = null
MQTTConnection.prototype.onMQTTMessageArrived = null
MQTTConnection.prototype.onMQTTMessageDelivered = null
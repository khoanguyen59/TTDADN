import MQTT from 'react-native-mqtt-angelos3lex';
import uuid from 'react-native-uuid';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

const qos = 2;

module.exports = {  // cached singleton instance
    QOS: qos,
    props: null,

    randIdCreator() {
        // const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        // return `random${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}`;
        const currentTime = +new Date();
        let clientID = currentTime + uuid.v1();
        return clientID.slice(0, 23);
    },

    create(userID, subscribeTopic, publishTopic, connectionProps = {}) {
      if (userID && connectionProps) {
        // this.onConnectionOpened = this.onConnectionOpened.bind(this);
        // this.onConnectionClosed = this.onConnectionClosed.bind(this);
        // this.onError = this.onError.bind(this);
        // this.onMessageArrived = this.onMessageArrived.bind(this);
        this.disconnect = this.disconnect.bind(this);
  
        this.subscribeTopic = subscribeTopic;
        this.publishTopic = publishTopic;

        this.onConnectionOpened = () => {};
        this.onConnectionClosed = () => {};
        this.onMessageArrived = () => {};
        this.onError = () => {};
  
        const clientID = this.randIdCreator();
        console.log(connectionProps.uri);

        this.connProps = {
            uri: connectionProps.uri,
            clientId: `${userID}.${clientID}`,
            user: connectionProps.user,
            pass: connectionProps.pass,
            clean: true,
        }
  
        MQTT.createClient(this.connProps)
          .then((client) => {
            this.client = client;
            this.publish = this.publish.bind(this);
            this.subscribe = this.subscribe.bind(this);
            client.on('closed', this.onConnectionClosed);
            client.on('error', this.onError);
            client.on('message', this.onMessageArrived);
            client.on('connect', this.onConnectionOpened);
            client.connect();
          }).catch((err) => {
            console.error(`MQTT.createtClient error: ${err}`);
          });
      }
    },
  
    disconnect() {
      if (this.client) {
        console.log('Now killing open realtime connection.');
        this.client.disconnect();
      }
    },
  
    attachCallbacks(onConnectionOpened, onConnectionClosed, onMessageArrived, onError) {
        this.onConnectionOpened = onConnectionOpened;
        this.onConnectionClosed = onConnectionClosed;
        this.onMessageArrived = onMessageArrived;
        this.onError = onError;
    },

    publish(topic, payload, qos, retain) {
        this.client.publish(topic, payload, qos, retain);
    },

    subscribe(topic, qos){
        this.client.subscribe(topic, qos)
    }
  };
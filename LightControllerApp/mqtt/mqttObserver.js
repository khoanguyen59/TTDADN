import mqttSubject from './mqttSubject';

export default class MQTTObserver {
    constructor(onValuesUpdate) {
        this.subject = mqttSubject;
        this.onValuesUpdate = onValuesUpdate;
    }

    update(values) {
        console.log("Observe: " + JSON.stringify(values));
        this.onValuesUpdate(values);
    }
}
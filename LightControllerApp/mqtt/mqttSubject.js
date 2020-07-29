class MQTTSubject {
    constructor() {
        this.observers = []
    }

    registerObserver(observerToRegister) {
        this.observers.push(observerToRegister);
    }

    removeObserver(observerToRemove) {
        this.observers = this.observers.filter((observer) => observer !== observerToRemove);
    }

    notifyObservers(values) {
        this.observers.forEach((observer) => observer.update(values));
    }
}

const mqttSubject = new MQTTSubject();

export default mqttSubject;

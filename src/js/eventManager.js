
class EventManager {

    constructor() {
        this.events = new Map();
    }

    on(eventName, callback) {
        this.events.set(eventName, callback);
    }

    fire(eventName) {

        if (!this.events.has(eventName))
            throw new Error('Invalid event fired');

        let args = Array.prototype.slice.call(arguments);
        args.shift();

        this.events.get(eventName)(...args);
    }
}
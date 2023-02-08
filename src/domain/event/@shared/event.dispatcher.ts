import EventDispatcherInterface from "./event.dispatcher.interface";
import EventHandlerInterface from "./event.handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {

    }

    register(eventName: string, event: EventHandlerInterface): void {
        if (!!this.getEventHandlers[eventName] && this.getEventHandlers[eventName].length >= 0)
            return;

        this.eventHandlers[eventName] = [];

        this.eventHandlers[eventName].push(event);
    }

    unregister(eventName: string, event: EventHandlerInterface): void {
        if (!this.getEventHandlers[eventName])
            return;

        this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(x => x != event);

        if (this.eventHandlers[eventName].length > 0)
            return;

        delete this.eventHandlers[eventName];
    }

    unregisterAll(): void {
        this.eventHandlers = {}
    }
}
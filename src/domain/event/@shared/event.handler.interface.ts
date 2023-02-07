import EventInterface from "./event.interface";

export default interface EventHandlerInterface<TEvent extends EventInterface = EventInterface> {

    handle(event : TEvent) : void;
    
}
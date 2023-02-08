import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-mail-when-product-is-created";
import EventDispatcher from "./event.dispatcher";

describe("Domain events tests", () => {

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        eventDispatcher.register('ProductCreatedEventV2', eventHandler);

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();

    })

    it('should unregister all events', () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        eventDispatcher.register('ProductCreatedEventV2', eventHandler);

        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers).toMatchObject({});
    })
});
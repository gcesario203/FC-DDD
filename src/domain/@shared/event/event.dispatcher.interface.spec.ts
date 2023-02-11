import Product from "../../product/entity/product";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-mail-when-product-is-created";
import ProductCreatedEvent from "../../product/event/product.created.event";
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

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spy = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        const productCreatedEvent = new ProductCreatedEvent(new Product("1", "Teste", 12.2));

        eventDispatcher.notify(productCreatedEvent);

        expect(spy).toHaveBeenCalled();
    })
});
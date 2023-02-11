import Address from "../value-object/address";
import Customer from "../entity/customer";
import EventDispatcher from "../../@shared/event/event.dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address";
import CustomerCreatedEvent from "./customer.created";
import EnviaConsoleLog1Handler from "./handler/created-customer-console-log-1-handler";
import EnviaConsoleLog2Handler from "./handler/created-customer-console-log-2-handler";
import EnviaConsoleLogHandler from "./handler/customer-change-address-console-log-handler";

describe('Customer events unit tests', () => {

    it('should call at least once the EnviaConsoleLog1Handler and EnviaConsoleLog2Handler on CustomerCreatedEvent', () => {
        const eventDispatcher = new EventDispatcher();

        var customerCreatedFirstEventHandler = new EnviaConsoleLog1Handler();
        var customerCreatedSecondEventHandler = new EnviaConsoleLog2Handler();

        eventDispatcher.register('CustomerCreatedEvent', customerCreatedFirstEventHandler);
        eventDispatcher.register('CustomerCreatedEvent', customerCreatedSecondEventHandler);

        const spy1 = jest.spyOn(customerCreatedFirstEventHandler, "handle");
        const spy2 = jest.spyOn(customerCreatedSecondEventHandler, "handle");

        const customerCreatedEvent = new CustomerCreatedEvent(new Customer("1", "Frederich Engels"));

        eventDispatcher.notify(customerCreatedEvent);

        expect(spy1).toBeCalled();

        expect(spy2).toBeCalled();
    });

    it('should call at least once the Event EnviaConsoleLogHandler on CustomerChangeAddressEvent', () => {
        const eventDispatcher = new EventDispatcher();

        var customerChangeAddressHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register('CustomerChangeAddressEvent', customerChangeAddressHandler);

        const customer = new Customer("1", "Frederich Engels");

        const spy = jest.spyOn(customerChangeAddressHandler, "handle");

        const customerChangedAddress1 = new CustomerChangeAddressEvent(customer.changeAddress(new Address("Rua alcidia", "134476", "Americana", 21)));
        const customerChangedAddress2 = new CustomerChangeAddressEvent(customer.changeAddress(new Address("Av amizade", "136476", "Barra bonita", 124)));

        eventDispatcher.notify(customerChangedAddress1);
        eventDispatcher.notify(customerChangedAddress2);

        expect(spy).toBeCalledTimes(2);
    })
})
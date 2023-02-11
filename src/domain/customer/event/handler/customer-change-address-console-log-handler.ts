import EventHandlerInterface from "../../../@shared/event/event.handler.interface";
import Customer from "../../entity/customer";
import CustomerChangeAddressEvent from "../customer-change-address";

export default class EnviaConsoleLogHandler
               implements EventHandlerInterface<CustomerChangeAddressEvent>
{
    handle(event : CustomerChangeAddressEvent) : void
    {            
        const customerData = event.eventData as Customer;

        console.log(`Endereço do cliente: ${customerData.id}, ${customerData.name} alterado para: ${customerData.Address.street} - ${customerData.Address.number} - ${customerData.Address.city} - ${customerData.Address.zipCode}`)
    };
}
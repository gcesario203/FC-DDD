import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit tests', () => {

    it('should create a customer', () => {
        const customer = CustomerFactory.create("B.J Blazkowickz");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("B.J Blazkowickz");
        expect(customer.Address).toBeUndefined();
    });

    it('should create a customer with an address', () => {
        const address = new Address("Rua dos bobos", "12345874", "Americana", 12);

        const customer = CustomerFactory.createWithAddress("B.J Blazkowickz", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("B.J Blazkowickz");
        expect(customer.Address).toBe(address);

    });
})
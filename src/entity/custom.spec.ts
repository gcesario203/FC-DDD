import Address from "./address";
import Customer from "./customer";

describe("Cusstomer unit tests", () => {
    it("it should throw error when id is empty", () => {

        expect(() => {
            const customer = new Customer("", "Mauricio");

            return customer;
        }).toThrowError("Id is required")
    });

    it("it should throw error when name is empty", () => {

        expect(() => {
            const customer = new Customer("1", "");

            return customer;
        }).toThrowError("Name is required")
    });

    it("should change name", () => {
        const customer = new Customer("123", "Eliana");

        customer.changeName("Pablo");

        expect(customer.name).toBe("Pablo");
    });

    it("customer shouldnt have empty name", () => {
        const customer = new Customer("123", "Eliana");

        expect(() => customer.changeName("")).toThrowError("Name is required");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "Marcela");

        const address = new Address("rua dos bobos", "13475667", "Americana", 12);

        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    })
    it("should deactive customer", () => {
        const customer = new Customer("123", "Marcela");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it("shouldnt activate customer without address", () => {
        const customer = new Customer("123", "Marcela");

        expect(() => customer.activate()).toThrowError('Address is mandatory to activate a costumer');
    })
});
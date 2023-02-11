import { Sequelize } from "sequelize-typescript"
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe('Customer repository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should create a Customer', async () => {
        const CustomerRepo = new CustomerRepository();

        const customer = new Customer("1", "Teste");

        customer.changeAddress(new Address("rua dos bobos", "364447", "Americana", 12));

        await CustomerRepo.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel).not.toBe(undefined);
    });

    it("should update a Customer", async () => {
        const CustomerRepo = new CustomerRepository();
        const customer = new Customer("1", "Teste");

        customer.changeAddress(new Address("rua dos bobos", "364447", "Americana", 12));

        await CustomerRepo.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.id).toBe("1");

        customer.name = "aaa";

        await CustomerRepo.update(customer);

        const changedCustomer = await CustomerModel.findOne({ where: { id: "1" } });

        expect(changedCustomer.name).toBe("aaa");
    });

    it("should find a Customer by id", async () => {
        const CustomerRepo = new CustomerRepository();
        const customer = new Customer("1", "Teste");
        customer.changeAddress(new Address("rua dos bobos", "364447", "Americana", 12));

        await CustomerRepo.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        const foundedCustomer = await CustomerRepo.find("1");

        expect(customerModel.id).toBe(foundedCustomer.id);
    });

    it('should find all Customers', async () => {
        const CustomerRepo = new CustomerRepository();
        const customer = new Customer("1", "Teste");
        customer.changeAddress(new Address("rua dos bobos", "364447", "Americana", 12));

        await CustomerRepo.create(customer);

        const foundedCustomers =  await CustomerRepo.findAll();

        expect(foundedCustomers).toContainEqual(customer)
    })
})
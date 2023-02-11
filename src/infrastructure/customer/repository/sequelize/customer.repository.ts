import Customer from "../../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../db/sequelize/model/customer.model";


export default class CustomerRepository implements ICustomerRepository {
    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            city: entity.Address.city,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive()
        })
    };

    async update(entity: Customer): Promise<void> {

        await CustomerModel.update({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            city: entity.Address.city,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive()
        },
            {
                where: {
                    id: entity.id
                }
            });
    };

    async find(id: string): Promise<Customer> {
        const customerFromDb = await CustomerModel.findOne({ where: { id: id } });

        if (!!!customerFromDb)
            throw new Error("Customer not found")

        let customerToReturn = new Customer(customerFromDb.id, customerFromDb.name);

        customerToReturn.addRewardPoints(customerFromDb.rewardPoints);
        customerToReturn.changeAddress( new Address(customerFromDb.street, customerFromDb.zipCode, customerFromDb.city, customerFromDb.number));
        customerToReturn.active = customerFromDb.active;

        return customerToReturn;
    };

    async findAll(): Promise<Customer[]> {
        const CustomerModels = await CustomerModel.findAll();

        return CustomerModels.map(customerFromDb => {
            let customerToReturn = new Customer(customerFromDb.id, customerFromDb.name);

            customerToReturn.addRewardPoints(customerFromDb.rewardPoints);
            customerToReturn.changeAddress(new Address(customerFromDb.street, customerFromDb.zipCode, customerFromDb.city, customerFromDb.number));
            customerToReturn.active = customerFromDb.active;

            return customerToReturn;
        });
    };
}
import { Sequelize } from "sequelize-typescript"
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order-item";
import Product from "../../../domain/entity/product";
import CustomerModel from "../../db/sequelize/model/customer.model";
import OrderItemModel from "../../db/sequelize/model/order.item.model";
import OrderModel from "../../db/sequelize/model/order.model";
import ProductModel from "../../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe('Order repository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should create a new order', async ()=>{
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Alberto Cesar");

        customer.Address = new Address("Rua dos bobos", "13134", "SP", 123);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("1", "Bala do coco", 12.99);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 1, product.id);
        
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: orderModel.id,
            customer_id: customer.id,
            total: order.total(),
            items:[
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: orderModel.id,
                    product_id: product.id
                }
            ]
        })
    } )

})
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

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Alberto Cesar");

        customer.Address = new Address("Rua dos Mauricio de Nassau", "13134", "SP", 123);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("1", "Bala de coco", 12.99);

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
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id
                }
            ]
        })
    })

    it("it should find a order by id", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Alberto Cesar");

        customer.Address = new Address("Rua dos Mauricio de Nassau", "13134", "SP", 123);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("1", "Bala de coco", 12.99);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 1, product.id);

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        const createdOrder = await orderRepository.find("1");

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: createdOrder.id,
            customer_id: createdOrder.customerId,
            total: createdOrder.total(),
            items: order.items.map(orderItem => {
                return {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: createdOrder.id,
                    product_id: orderItem.productId
                }
            })
        })
    })

    it("it should find all orders from db", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Alberto Cesar");

        customer.Address = new Address("Rua dos Mauricio de Nassau", "13134", "SP", 123);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("1", "Bala de coco", 12.99);
        const productTwo = new Product("2", "Picanha", 30.00);
        const productThree = new Product("3", "Coca-cola", 50.00);

        await productRepository.create(product);
        await productRepository.create(productTwo);
        await productRepository.create(productThree);

        const orderItem = new OrderItem("1", product.name, product.price, 1, product.id);
        const orderItemTwo = new OrderItem("2", productTwo.name, productTwo.price, 3, productTwo.id);
        const orderItemThree = new OrderItem("3", productThree.name, productThree.price, 2, productThree.id);

        const order = new Order("1", customer.id, [orderItem]);
        const orderTwo = new Order("2", customer.id, [orderItemThree, orderItemTwo]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);
        await orderRepository.create(orderTwo);

        const ordersFromDb = await orderRepository.findAll();

        expect(ordersFromDb).toContainEqual(order);
    })

    it('should update a created order', async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Alberto Cesar");

        customer.Address = new Address("Rua dos Mauricio de Nassau", "13134", "SP", 123);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("1", "Bala de coco", 12.99);
        const productTwo = new Product("2", "Picanha", 30.00);
        const productThree = new Product("3", "Coca-cola", 50.00);
        const productFour = new Product("4", "Maizena", 2.00);

        await productRepository.create(product);
        await productRepository.create(productTwo);
        await productRepository.create(productThree);
        await productRepository.create(productFour);

        const orderItem = new OrderItem("1", product.name, product.price, 1, product.id);
        const orderItemTwo = new OrderItem("2", productTwo.name, productTwo.price, 3, productTwo.id);
        const orderItemThree = new OrderItem("3", productThree.name, productThree.price, 2, productThree.id);
        const orderItemFour = new OrderItem("4", productFour.name, productFour.price, 2, productFour.id);

        const order = new Order("1", customer.id, [orderItem]);
        const orderTwo = new Order("2", customer.id, [orderItemThree, orderItemTwo]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);
        await orderRepository.create(orderTwo);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map(orderItem => {
                return {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                }
            })
        });

        order.addOrderItem(orderItemFour);

        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(updatedOrderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map(orderItem => {
                return {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                }
            })
        });

    })
})
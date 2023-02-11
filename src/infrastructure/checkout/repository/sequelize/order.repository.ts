
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import IOrderRepository from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "../../db/sequelize/model/order.item.model";
import OrderModel from "../../db/sequelize/model/order.model";

export default class OrderRepository implements IOrderRepository {
    async update(entity: Order): Promise<void> {
        const entityToBeUpdated = await this.find(entity.id);

        if (!entityToBeUpdated)
            throw new Error("Order not found")

        await OrderModel.destroy({ where: { id: entityToBeUpdated.id }, cascade: true});

        await this.create(entity);
    }
    async find(id: string): Promise<Order> {
        const orderFromDb = await OrderModel.findOne({ where: { id: id }, include: { model: OrderItemModel } });

        if (!orderFromDb)
            throw new Error("Order not found")

        const orderItems = orderFromDb.items.map(orderItem => {
            return new OrderItem(orderItem.id, orderItem.name, orderItem.price, orderItem.quantity, orderItem.product_id);
        });

        return new Order(orderFromDb.id, orderFromDb.customer_id, orderItems);
    }
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: { model: OrderItemModel } });

        return orderModels.map(orderModel => {
            const orderItems = orderModel.items.map(orderItem => {
                return new OrderItem(orderItem.id, orderItem.name, orderItem.price, orderItem.quantity, orderItem.product_id);
            });

            return new Order(orderModel.id, orderModel.customer_id, orderItems)
        });
    }
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((orderItem) => ({
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                product_id: orderItem.productId,
                quantity: orderItem.quantity
            }))
        }, { include: [{ model: OrderItemModel }] })
    };
}
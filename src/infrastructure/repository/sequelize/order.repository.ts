import Order from "../../../domain/entity/order";
import OrderItemModel from "../../db/sequelize/model/order.item.model";
import OrderModel from "../../db/sequelize/model/order.model";

export default class OrderRepository {
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
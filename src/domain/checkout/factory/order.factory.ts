import Order from "../entity/order"
import OrderItem from "../entity/order-item"

interface OrderFactoryProps {
    id: string,
    customerId: string,
    items: {
        id: string,
        name: string,
        productId: string,
        quantity: number,
        price: number
    }[]
}
export default class OrderFactory {
    public static create(props: OrderFactoryProps): Order {
        return new Order(props.id, props.customerId, props.items.map(x => x = new OrderItem(x.id, x.name, x.price, x.quantity, x.productId)));
    }
}
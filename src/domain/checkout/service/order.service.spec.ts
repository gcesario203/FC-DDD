import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe('Order service unit tests', ()=>{

    it("should place an order", () => {
        const customer = new Customer("1", "Customer 1");

        const items = [
            new OrderItem("1", "item 1", 10, 1, "1"),
            new OrderItem("2", "item 2", 20, 2, "2"),
        ]

        const order = OrderService.placeOrder(customer, items);

        expect(customer.rewardPoints).toBe(25);
    })

    it("should get total of all orders", () => {
        const items = [
            new OrderItem("1", "Item 1", 10, 20, "1"), // 200
            new OrderItem("2", "Item 2", 10, 1, "2"), // 10
            new OrderItem("3", "Item 3", 10, 15, "3"), // 150
            new OrderItem("4", "Item 4", 10, 10, "4"), // 100
        ]
        
        const orders = [
            new Order("1", "1", items),
            new Order("2", "2", [items[0], items[1]]),
            new Order("3", "3", [items[1], items[3]]),
            new Order("4", "4", [items[2], items[0]]),
        ]

        const total = OrderService.total(orders);

        expect(total).toBe(1130)
    });
});
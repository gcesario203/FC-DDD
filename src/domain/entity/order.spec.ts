import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
    it("it should throw error when id is empty", () => {

        expect(() => {
            const order = new Order("", "123", []);

            return order;
        }).toThrowError("Id is required")
    });

    it("it should throw error when customerId is empty", () => {

        expect(() => {
            const order = new Order("1", "", []);

            return order;
        }).toThrowError('CustomerId is required')
    });

    it("order should have more then one item", () => {

        expect(() => {
            const order = new Order("1", "222", []);

            return order;
        }).toThrowError('A Order must have at least one item')
    });

    it('should calculate total order price', () => {
        const orderItens = [
            new OrderItem("1", "Arroz", 9, 2, "p1"),
            new OrderItem("2", "Feijão", 6, 3, "p2"),
            new OrderItem("3", "Carnona show", 45, 1, "p3")
        ]

        const order = new Order("1", "Almoço", orderItens);

        expect(order.total()).toBe(81);
    });

    it('Should throw error if at least one order item does not have at least one in quantity', () => {
        expect(() => {
            const orderItens = [
                new OrderItem("1", "Arroz", 9, -2, "p1"),
                new OrderItem("2", "Feijão", 6, 3, "p2"),
                new OrderItem("3", "Carnona show", -45, 1, "p3")
            ]

            const order = new Order("1", "Almoço", orderItens);
        })
        .toThrowError('The order have one or more order items without quantity')
    })
});
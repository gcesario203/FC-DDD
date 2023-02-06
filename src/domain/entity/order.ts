import OrderItem from "./order-item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;

        this._customerId = customerId;

        this._items = items;
        
        this._total = this.total();

        this.validate();
    }

    get id(): string{
        return this._id;
    }
    get customerId(): string{
        return this._customerId;
    }
    
    get items(): OrderItem[]{
        return this._items;
    }

    validate() {
        if (!!!this._id || this._id.length === 0)
            throw Error('Id is required');

        if (!!!this._customerId)
            throw Error('CustomerId is required');

        if(this._items.length === 0)
            throw Error('A Order must have at least one item')

        if(this._items.some(x => x.quantity <= 0))
            throw Error('The order have one or more order items without quantity')
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.getOrderItemTotalValue(), 0);
    }

    addOrderItem(orderItem : OrderItem) : void {
        const existingOrderItem = this._items.find(savedOrderItem => savedOrderItem.id === orderItem.id);

        if(!!existingOrderItem)
            return;

        this._items.push(orderItem);

        this._total = this.total();
    }
}
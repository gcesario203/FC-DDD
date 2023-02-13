import ProductFactory from "./product.factory";

describe('Product factory unit tests', () =>{

    it('should create a product type A (class Product)', ()=>{

        const product = ProductFactory.create("A", "Product A", 1.50);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1.50);

        expect(product.constructor.name).toBe("Product");
    });

    it('should create a product type B (class ProductDoubledValue)', ()=>{

        const product = ProductFactory.create("B", "Product B", 1.50);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(3.00);

        expect(product.constructor.name).toBe("ProductDoubledValue");
    });

    it('should thrown an exception when creating a unsupported product', () => {
        expect(() => ProductFactory.create("C", "Product B", 1.50)).toThrow("Product type not supported!");
    })
})
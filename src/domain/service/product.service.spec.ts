import Product from "../entity/product";
import ProductService from "./product.service";


describe('Product service unit tests', ()=>{
    it('should change the prices of all products', () =>{
        
        const products = [
            new Product("1", "Camiseta do flamengo", 100),
            new Product("2", "Camiseta do Vasco", 50)
        ];

        ProductService.increasePrice(products, 20);

        expect(products[0].price).toBe(120);
        expect(products[1].price).toBe(60);
    });


});
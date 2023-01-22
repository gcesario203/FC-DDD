import Product from "./product"

describe("Product unit tests", ()=>{
    it("should throw error when id is empty", ()=>{

        expect(() => new Product("", "aaa", 2)).toThrowError('Id is required');
    })

    it("should throw error when name is empty", ()=>{

        expect(() => new Product("1", "", 2)).toThrowError('Name is required');
    })

    it("should throw error when the price is less or equals 0", ()=>{

        expect(() => new Product("1", "xxx", -2000)).toThrowError('The price is less or equals 0');
    })

    it('should change name', ()=>{
        const product = new Product("1", "Camiseta confortavel", 150);

        product.changeName('Blusa confortavel');

        expect(product.name).toBe('Blusa confortavel')
    })

    it('should change name', ()=>{
        const product = new Product("1", "Camiseta confortavel", 150);

        product.changeName('Boné do MTST');

        product.changePrice(30);

        expect(product.price).toBe(30)
    })
})
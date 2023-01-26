import Product from "../entity/product";

export default class ProductService {
    static increasePrice(products: Product[], amount:number) : void {
        products.forEach(product => product.changePrice(product.price * ((amount / 100) + 1) ));
    }
}
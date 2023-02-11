import { Sequelize } from "sequelize-typescript"
import Product from "../../../../domain/product/entity/product";
import ProductModel from "../../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe('Product repository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should create a product', async () => {
        const productRepo = new ProductRepository();

        const product = new Product("1", "Teste", 300);

        await productRepo.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Teste",
            price: 300
        });
    });

    it("should update a product", async () => {
        const productRepo = new ProductRepository();
        const product = new Product("1", "Teste", 300);

        await productRepo.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Teste",
            price: 300
        });

        product.changeName('teste 2')
        product.changePrice(200);

        await productRepo.update(product);

        const changedProduct = await ProductModel.findOne({ where: { id: "1" } });

        expect(changedProduct.toJSON()).toStrictEqual({
            id: "1",
            name: "teste 2",
            price: 200
        });
    });

    it("should find a product by id", async () => {
        const productRepo = new ProductRepository();
        const product = new Product("1", "Teste", 300);

        await productRepo.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        const foundedProduct = await productRepo.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundedProduct.id,
            name: foundedProduct.name,
            price: foundedProduct.price
        });
    });

    it('should find all products', async () => {
        const productRepo = new ProductRepository();
        const product = new Product("1", "Teste", 300);

        await productRepo.create(product);

        const foundedProducts =  await productRepo.findAll();

        expect(foundedProducts).toContainEqual(product)
    })
})
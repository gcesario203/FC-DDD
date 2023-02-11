import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface IProductRepository extends RepositoryInterface<Product> {
    
}
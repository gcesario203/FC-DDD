import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/repository.interface";


export default interface IOrderRepository extends RepositoryInterface<Order> {};
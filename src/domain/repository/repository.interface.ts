export default interface RepositoryInterface<TEntity> {

    create(entity : TEntity) : Promise<void>;

    update(entity : TEntity) : Promise<void>;

    find(id: string) : Promise<TEntity>;

    findAll() : Promise<TEntity[]>;
}
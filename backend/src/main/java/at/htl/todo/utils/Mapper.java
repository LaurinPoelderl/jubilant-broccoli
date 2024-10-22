package at.htl.todo.utils;

public interface  Mapper<T, Z> {
    Z toResource(T entity);

    T fromResource(Z resource);
}

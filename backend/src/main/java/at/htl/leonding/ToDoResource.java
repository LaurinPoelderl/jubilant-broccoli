package at.htl.leonding;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

public interface ToDoResource extends PanacheRepository<ToDo> {
}
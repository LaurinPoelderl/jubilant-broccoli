package at.htl.leonding.todo;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ToDoRepository implements PanacheRepository<ToDo> {
}
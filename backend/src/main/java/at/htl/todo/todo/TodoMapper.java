package at.htl.todo.todo;

import at.htl.todo.utils.Mapper;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TodoMapper implements Mapper<Todo, TodoDTO> {

    @Override
    public TodoDTO toResource(Todo todo){
        return new TodoDTO(todo.id, todo.userId, todo.title, todo.completed);
    }

    @Override
    public Todo fromResource(TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.id = todoDTO.id();
        todo.userId = todoDTO.userId();
        todo.title = todoDTO.title();
        todo.completed = todoDTO.completed();
        return todo;
    }
}

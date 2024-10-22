package at.htl.todo.todo;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TodoMapper {
    TodoDTO toResource(Todo todo){
        return new TodoDTO(todo.id, todo.userId, todo.title, todo.completed);
    }

    Todo fromResource(TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.id = todoDTO.id();
        todo.userId = todoDTO.userId();
        todo.title = todoDTO.title();
        todo.completed = todoDTO.completed();
        return todo;
    }
}

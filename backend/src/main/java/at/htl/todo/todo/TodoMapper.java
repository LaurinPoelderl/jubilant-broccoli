package at.htl.todo.todo;

import at.htl.todo.user.User;
import at.htl.todo.user.UserRepository;
import at.htl.todo.utils.Mapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class TodoMapper implements Mapper<Todo, TodoDTO> {

    @Inject
    UserRepository userRepository;

    @Override
    public TodoDTO toResource(Todo todo){
        return new TodoDTO(todo.id, todo.user.id, todo.title, todo.completed);
    }

    @Override
    public Todo fromResource(TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.id = todoDTO.id();
        var user = userRepository.findByIdOptional(todoDTO.userId());
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User with id " + todoDTO.userId() + " not found");
        }
        todo.user = user.get();
        todo.title = todoDTO.title();
        todo.completed = todoDTO.completed();
        return todo;
    }
}

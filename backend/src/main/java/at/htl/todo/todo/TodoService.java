package at.htl.todo.todo;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.core.Context;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class TodoService {

    @Inject
    TodoRepository todoRepository;

    @Inject
    TodoMapper todoMapper;

    @Inject
    TodoSocket todoSocket;


    public List<TodoDTO> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(todoMapper::toResource)
                .toList();
    }

    public Optional<TodoDTO> findById(Long id) {
        return todoRepository.findByIdOptional(id)
                .map(todoMapper::toResource);
    }

    public TodoDTO save(TodoDTO dto, String username) {
        var todo = todoMapper.fromResource(dto);
        todoRepository.persist(todo);

        var createdTodoDTO = todoMapper.toResource(todo);
        todoSocket.broadcastTodoCreated(createdTodoDTO, username);

        return createdTodoDTO;
    }

    public Optional<TodoDTO> toggleCompleted(Long id, String username) {
        var todo = todoRepository.findByIdOptional(id);
        if (todo.isEmpty()) {
            return Optional.empty();
        }
        todo.get().completed = !todo.get().completed;

        var updatedTodoDTO = todoMapper.toResource(todo.get());

        todoSocket.broadcastTodoUpdated(updatedTodoDTO, username);

        return Optional.of(updatedTodoDTO);
    }

    public boolean delete(Long id, String username) {
        boolean deleted = todoRepository.deleteById(id);
        if (deleted) {
            todoSocket.broadcastTodoDeleted(id, username);
        }
        return deleted;
    }

}

package at.htl.leonding.todo;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ToDoMapper {
    ToDoDto toResource(ToDo toDo) {
        return new ToDoDto(toDo.id, toDo.userId, toDo.title, toDo.completed);
    }

    public ToDo fromResource(ToDoDto dto) {
        var toDo = new ToDo();
        toDo.id = dto.id();
        toDo.userId = dto.userId();
        toDo.completed = dto.completed();
        toDo.title = dto.title();
        return toDo;
    }
    
}

package at.htl.leonding.todo;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;

@Path("/todos")
@Produces(MediaType.APPLICATION_JSON)
public class ToDoResource {
    @Inject ToDoRepository todoRepository;
    @Inject ToDoMapper toDoMapper;
    @Inject ToDoSocket toDoSocket;

    @GET
    public List<ToDoDto> allTodos() {
        return todoRepository
            .findAll()
            .stream()
            .map(toDoMapper::toResource)
            .toList();
    }
    @POST
    @Transactional
    public Response save(ToDoDto todoDto) {
        var toDo = toDoMapper.fromResource(todoDto);
        todoRepository.persistAndFlush(toDo);
        //broadcast newTodo
        toDoSocket.broadcast("new Todo");

        var uri = UriBuilder
            .fromResource(ToDoResource.class)
            .path("" + toDo.id).build();
        return Response.created(uri).build();
    }
    @GET
    @Path("{id:[0-9]+}")
    public Response byID(@PathParam("id") long id) {
        var toDo = todoRepository.findByIdOptional(id);

        var response = toDo.isPresent() ? Response.ok(toDoMapper.toResource(toDo.get())) :
            Response.status(Response.Status.NOT_FOUND);
        return response.build();
    }
}

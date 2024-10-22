package at.htl.todo.todo;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;

@Path("todos")
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class TodoResource {

    @Inject
    TodoRepository todoRepository;

    @Inject
    TodoMapper todoMapper;

    @Inject
    UriInfo uriInfo;

    @GET
    public List<TodoDTO> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(todoMapper::toResource)
                .toList();
    }

    @GET
    @Path("{id:[0-9]+}")
    public Response getTodoById(@PathParam("id") Long id) {
        var todo = todoRepository.findByIdOptional(id);

        var response = todo.isPresent()
                ? Response.ok(todoMapper.toResource(todo.get()))
                : Response.status(Response.Status.NOT_FOUND);

        return response.build();
    }

    @POST
    public Response save(TodoDTO todoDTO) {
        var todo = todoMapper.fromResource(todoDTO);
        todoRepository.persist(todo);
        var uri = uriInfo.getAbsolutePathBuilder().path(todo.id.toString()).build();
        return Response
                .created(uri)
                .entity(todoMapper.toResource(todo))
                .build();
    }

}

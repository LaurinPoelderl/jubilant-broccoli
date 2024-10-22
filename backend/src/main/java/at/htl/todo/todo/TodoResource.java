package at.htl.todo.todo;

import io.quarkus.panache.common.Sort;
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
    TodoService todoService;

    @Inject
    UriInfo uriInfo;

    @GET
    public List<TodoDTO> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GET
    @Path("{id:[0-9]+}")
    public Response getTodoById(@PathParam("id") Long id) {
        var todo = todoService.findById(id);

        var response = todo.isPresent()
                ? Response.ok(todo.get())
                : Response.status(Response.Status.NOT_FOUND);

        return response.build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@HeaderParam("Identity") String username, TodoDTO todoDTO) {
        var todo = todoService.save(todoDTO, username);
        var uri = uriInfo.getAbsolutePathBuilder().path(todo.id().toString()).build();
        return Response
                .created(uri)
                .entity(todo)
                .build();
    }

    @PATCH
    @Path("{id:[0-9]+}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response toggleCompleted(@PathParam("id") Long id, @HeaderParam("Identity") String username, TodoDTO dto) {
        var todo = todoService.toggleCompleted(id, username);
        if (todo.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(todo.get()).build();
    }

    @DELETE
    @Path("{id:[0-9]+}")
    public Response delete(@PathParam("id") Long id, @HeaderParam("Identity") String username) {
        if(!todoService.delete(id, username)) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }

}

package at.htl.todo.user;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;

@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class UserResource {


    @Inject
    UserService userService;

    @Inject
    UriInfo uriInfo;

    @GET
    public List<UserDTO> getUsers() {
        return userService.getAllUsers();
    }

    @GET
    @Path("{id:[0-9]+}")
    public Response getUserById(Long id) {
        var user = userService.getUserById(id);

        var response = user.isPresent()
                ? Response.ok(user.get())
                : Response.status(Response.Status.NOT_FOUND);

        return response.build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveUser(UserDTO userDTO) {
        var user = userService.save(userDTO);

        URI uri = uriInfo.getAbsolutePathBuilder().path(user.id().toString()).build();
        return Response.created(uri)
                .entity(user)
                .build();
    }

    @DELETE
    @Path("{id:[0-9]+}")
    public Response deleteUser(Long id) {
        return userService.delete(id)
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }
}

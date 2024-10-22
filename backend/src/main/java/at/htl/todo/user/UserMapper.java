package at.htl.todo.user;

import at.htl.todo.utils.Mapper;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserMapper implements Mapper<User, UserDTO> {
    @Override
    public UserDTO toResource(User entity) {
        return new UserDTO(entity.id, entity.name, entity.username, entity.email);
    }

    @Override
    public User fromResource(UserDTO resource) {
        var user = new User();
        user.id = resource.id();
        user.name = resource.name();
        user.username = resource.username();
        user.email = resource.email();
        return user;
    }
}

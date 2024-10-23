package at.htl.todo.user;

import at.htl.todo.todo.TodoRepository;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
@Transactional
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    TodoRepository todoRepository;

    @Inject
    UserMapper userMapper;

    @Inject
    UserSocket userSocket;


    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResource)
                .toList();
    }


    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findByIdOptional(id)
                .map(userMapper::toResource);
    }

    public UserDTO save(UserDTO dto, String username) {
        var user = userMapper.fromResource(dto);
        userRepository.persist(user);
        var createdUserDTO = userMapper.toResource(user);
        userSocket.broadcastUserCreated(createdUserDTO, username);
        return createdUserDTO;
    }

    public boolean delete(Long id, String username) {
        User user = userRepository.findById(id);
        if (user == null) {
            Log.warnf("Attempted to delete user with id %d, but user does not exist.", id);
            return false;  // User does not exist, return false
        }

        long todosDeleted = todoRepository.delete("user.id = ?1", id);
        Log.infof("Deleted %d todos for user with id %d.", todosDeleted, id);

        boolean userDeleted = userRepository.deleteById(id);
        if (userDeleted) {
            userSocket.broadcastUserDeleted(id, username);
            Log.infof("User with id %d was successfully deleted.", id);
        } else {
            Log.errorf("Failed to delete user with id %d.", id);
        }

        return userDeleted;
    }

}

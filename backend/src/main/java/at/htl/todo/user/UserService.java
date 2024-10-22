package at.htl.todo.user;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;


    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResource)
                .toList();
    }


    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findByIdOptional(id)
                .map(userMapper::toResource);
    }

    public UserDTO save(UserDTO dto) {
        var user = userMapper.fromResource(dto);
        userRepository.persist(user);
        return userMapper.toResource(user);
    }

    public boolean delete(Long id) {
        return userRepository.deleteById(id);
    }
}

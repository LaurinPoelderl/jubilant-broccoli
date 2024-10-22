package at.htl.todo.user;

public record UserDTO (
        Long id,
        String name,
        String username,
        String email
) {
}

package at.htl.todo.todo;

public record TodoDTO(
    Long id,
    Long userId,
    String title,
    Boolean completed
) {
}

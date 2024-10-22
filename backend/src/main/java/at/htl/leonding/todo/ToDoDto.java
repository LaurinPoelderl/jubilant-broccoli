package at.htl.leonding.todo;

public record ToDoDto(
    Long id,
    Long userId,
    String title,
    boolean completed
) {
}

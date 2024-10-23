package at.htl.todo.todo;

import at.htl.todo.user.User;
import jakarta.persistence.*;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String title;
    public Boolean completed;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}


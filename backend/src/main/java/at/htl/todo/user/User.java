package at.htl.todo.user;


import at.htl.todo.todo.Todo;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    public String username;

    public String email;


    @OneToMany(mappedBy = "user")
    public List<Todo> todos;
}

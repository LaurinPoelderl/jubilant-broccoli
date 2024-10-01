import { Model, store } from "../features";
import { Todo } from "../features/todo";
import { User } from "../features/user";

export type UserTodos = {
  readonly user: User;
  readonly todos: Todo[];
};

export interface AppViewmodel {
  userTodos: UserTodos[];
}

export function createAppViewmodel(model: Model): AppViewmodel {
  const userTodos: Map<number, Todo[]> = new Map();
  model.todos.forEach((todo) => {
    const todos = userTodos.get(todo.userId) || [];
    todos.push(todo);
    userTodos.set(todo.userId, todos);
  });

  return {
    userTodos: model.users.map((user) => ({
      user: user,
      todos: userTodos.get(user.id) || [],
    })),
  };
}

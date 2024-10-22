// Author: Manuel Puchner, Jakob Schlager, Josef Stieg, Sophie Stöger, Sophie Binder

import { Model, store } from "../features";
import { Todo, toggleTodoCompleted } from "../features/todo";
import { DraftTodo } from "../features/todo/todo";
import { createTodo, deleteTodo } from "../features/todo/todo-service";
import { User } from "../features/user";
import { UserDraft } from "../features/user/user";
import { createUser, deleteUser } from "../features/user/user-service";
import { searchUser, selectUser } from "../features/user-search/user-search-service";

export type UserTodos = {
  readonly user: User;
  readonly todos: Todo[];
};

export interface AppViewmodel {
  userTodos: UserTodos[];
  toggleTodoCompleted: (event: CustomEvent) => Promise<void>;
  deleteTodo: (event: CustomEvent) => Promise<void>;
  createTodo: (event: CustomEvent) => Promise<void>;
  createUser: (event: CustomEvent) => Promise<void>;
  searchUser: (event: CustomEvent) => void;
  selectUser: (event: CustomEvent) => void;
  deleteUser: (event: CustomEvent) => void;
}

export function createAppViewmodel(model: Model): AppViewmodel {
  const userTodos: Map<User["id"], Todo[]> = new Map();
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
    toggleTodoCompleted: async (event: CustomEvent) => {
      const todoId = event.detail as Todo["id"];
      toggleTodoCompleted(todoId);
    },
    deleteTodo: async (event: CustomEvent) => {
      const todoId = event.detail as Todo["id"];
      deleteTodo(todoId);
    },
    createTodo: async (event: CustomEvent) => {
      const draft = event.detail as DraftTodo;
      createTodo(draft);
    },
    createUser: async (event: CustomEvent) => {
      const draft = event.detail as UserDraft;
      createUser(draft);
    },
    searchUser: (event: CustomEvent) => {
      const query = event.detail as string;
      searchUser(query);
    },
    selectUser: (event: CustomEvent) => {
      const selectedUser = event.detail as User;
      selectUser(selectedUser);
    },
    deleteUser: (event: CustomEvent) => {
      const user = event.detail as User;
      deleteUser(user.id);
    }
  };
}

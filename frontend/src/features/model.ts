import { BehaviorSubject } from "rxjs";
import { Todo } from "./todo";
import { User } from "./user";

export interface Model {
  readonly todos: Todo[];
  readonly users: User[];
}

const initialState: Model = {
  todos: [],
  users: [],
};

export const store = new BehaviorSubject<Model>(initialState);

import { BehaviorSubject } from "rxjs";
import { Todo } from "./todo";
import { User } from "./user";

export interface Model {
  readonly todos: Todo[];
  readonly users: User[];
  readonly userSearchQuery: string;
  readonly selectedUser?: User;
}

const initialState: Model = {
  todos: [],
  users: [],
  userSearchQuery: "",
  selectedUser: undefined,
};

export const store = new BehaviorSubject<Model>(initialState);

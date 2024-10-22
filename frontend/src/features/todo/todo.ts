import { User } from "../user";

export type Todo = {
  readonly userId: User["id"];
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
};

export type DraftTodo = Omit<Todo, "id" | "completed">;

export type User = {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
}

export type UserDraft = Omit<User, "id">;
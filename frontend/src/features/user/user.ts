export type User = {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
}

export type UserDraft = Omit<User, "id">;
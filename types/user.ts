export type CreateUserInput = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type CurrentUserObj = {
  id: number;
  nickname: string;
  email: string;
  password_digest: string;
  self_introduction?: string;
  created_at: string;
  updated_at: string;
};

export type UserObj = {
  id: number;
  nickname: string;
  email: string;
  password_digest: string;
  self_introduction?: string;
  created_at: string;
  updated_at: string;
  url: string;
};

export type UpdateUserInput = {
  event: React.MouseEvent;
  id: number;
  nickname: string;
  email: string;
  selfIntroduction: string;
  token: string;
};

export type deleteUserArg = {
  event: React.MouseEvent;
  userId: number;
  token: string;
};

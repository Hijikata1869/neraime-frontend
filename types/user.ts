export type CreateUserInput = {
  event: React.MouseEvent;
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginUserInput = {
  event: React.MouseEvent;
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
};

export type UpdateUserInput = {
  event: React.MouseEvent;
  id: number;
  nickname: string;
  email: string;
  selfIntroduction: string;
};

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

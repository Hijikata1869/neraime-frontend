export type CreateCrowdednessArg = {
  token: string;
  userId: number | undefined;
  storeId: number | undefined;
  dayOfWeek: string;
  time: string;
  level: string;
  memo?: string;
};

export type CreateCrowdednessArg = {
  token: string;
  userId: number | undefined;
  storeId: number | undefined;
  dayOfWeek: string;
  time: string;
  level: string;
  memo?: string;
};

export type CrowdednessProps = {
  storeId: number;
};

export type CrowdednessList = {
  id: number;
  user_id: number;
  store_id: number;
  day_of_week: string;
  time: string;
  level: string;
  memo?: string;
  created_at: string;
  updated_at: string;
}[];

export type DaylyCrowdednessList = {
  time: string;
  空いてる: number;
  普通: number;
  混雑: number;
  空き無し: number;
}[];

export type CrowdednessFromProps = {
  storeId: number;
};

import { CurrentUserObj } from "./user";

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

export type CrowdednessFormProps = {
  storeId: number;
};

export type LatestCrowdednessReviewsProps = {
  storeId: number;
};

// number_of_usefuls: number, is_useful: booleanを付け足したい
export type StoreCrowdednessReviews = {
  id: number;
  user_id: number;
  nickname: string;
  store_id: number;
  day_of_week: string;
  time: string;
  level: string;
  memo: string;
  created_at: string;
  updated_at: string;
  url: string;
  number_of_usefuls: number;
  is_useful: boolean;
}[];

export type StoreCrowdednessReviewProps = {
  reviews: StoreCrowdednessReviews | undefined;
  reFetchPost: () => void;
};

export type CrowdednessReviewsProps = {
  storeId: number;
};

export type UserCrowdedness = {
  id: number;
  user_id: number;
  store_id: number;
  store_name: string;
  day_of_week: string;
  time: string;
  level: string;
  memo?: string;
  created_at: string;
  updated_at: string;
  number_of_usefuls: number;
  is_useful: boolean;
}[];

export type UserCrowdednessCardProps = {
  reviews: UserCrowdedness | undefined;
  currentUser: CurrentUserObj | undefined;
  accessToken: string;
  reFetchPost: () => void;
};

export type LatestPosts = {
  id: number;
  user_id: number;
  store_id: number;
  nickname: string;
  store_name: string;
  day_of_week: string;
  time: string;
  level: string;
  memo?: string;
  created_at: string;
  updated_at: string;
  url: string;
  number_of_usefuls: number;
  is_useful: boolean;
}[];

export type CrowdednessReviewCardProps = {
  reviews: LatestPosts | undefined;
  reFetchPost: () => void;
};

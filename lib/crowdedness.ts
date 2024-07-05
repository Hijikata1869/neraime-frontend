import { CreateCrowdednessArg } from "@/types/crowdedness";

export const createCrowdedness = async (
  createCrowdednessArg: CreateCrowdednessArg
) => {
  const { userId, storeId, dayOfWeek, time, level, memo, token } =
    createCrowdednessArg;
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}crowdednesses`, {
    method: "POST",
    body: JSON.stringify({
      crowdedness: {
        user_id: userId,
        store_id: storeId,
        day_of_week: dayOfWeek,
        time: time,
        level: level,
        memo: memo,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "作成失敗";
    }
  });
};

export const fetchStoreCrowdedness = async (storeId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${storeId}/crowdedness_list`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

export const fetchDaylyStoreCrowdedness = async (
  storeId: number,
  dayOfWeek: string
) => {
  const params = { day_of_week: dayOfWeek };
  const query = new URLSearchParams(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${storeId}/dayly_crowdedness_list?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

export const fetchLatestCrowdednessReviews = async (storeId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${storeId}/latest_store_reviews`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

export const fetchCrowdednessReviews = async (storeId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${storeId}/all_store_reviews`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

export const fetchUserCrowdedness = async (userId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${userId}/formatted_crowdedness_list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得失敗";
    }
  });
};

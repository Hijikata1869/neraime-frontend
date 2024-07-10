export const createFavorite = async (storeId: number, token: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${storeId}/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "お気に入り登録できませんでした";
    }
  });
};

export const fetchCurrentUserFavoriteStores = async (token: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}current_user/favorite_stores`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).then(async (res) => {
    if (res.status == 200) {
      const data = await res.json();
      return data;
    } else throw "取得失敗";
  });
};

export const deleteFavorite = async (storeId: number, token: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${storeId}/favorites`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "削除失敗";
    }
  });
};

export const fetchUserFavoriteStores = async (id: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${id}/favorite_stores`,
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
      throw "取得できませんでした";
    }
  });
};

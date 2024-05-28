export const fetchStoreByName = async (storeName: string) => {
  const params = { name: storeName };
  const query = new URLSearchParams(params);

  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/show_by_name?${query}`,
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

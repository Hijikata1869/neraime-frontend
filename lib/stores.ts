import { StoreCreateArgs } from "@/types/store";

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

export const createStore = async (storeCreateArgs: StoreCreateArgs) => {
  const { name, address, prefecture, token } = storeCreateArgs;
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores`, {
    method: "POST",
    body: JSON.stringify({
      store: {
        name: name,
        address: address,
        prefecture: prefecture,
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

export const initialPrefecture = (address: string | undefined) => {
  let addressPrefecture;
  if (address?.includes("県")) {
    const prefecture = address.split("県")[0] + "県";
    addressPrefecture = prefecture;
  } else if (address?.includes("府")) {
    const prefecture = address.split("府")[0] + "府";
    addressPrefecture = prefecture;
  } else if (address?.includes("都")) {
    const prefecture = address.split("都")[0] + "都";
    addressPrefecture = prefecture;
  } else {
    const prefecture = address?.split("道")[0] + "道";
    addressPrefecture = prefecture;
  }
  return addressPrefecture;
};

export const fetchStore = async (id: number) => {
  return await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw "取得できませんでした";
    }
  });
};

export const fetchStoreByAddress = async (address: string) => {
  const params = { address: address };
  const query = new URLSearchParams(params);

  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/show_by_address?${query}`,
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

export const fetchStoresByPrefectureName = async (prefectureName: string) => {
  const params = { prefecture: prefectureName };
  const query = new URLSearchParams(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}stores/show_by_prefecture_name?${query}`,
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

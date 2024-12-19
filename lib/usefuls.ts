import { createUsefulArg, deleteUsefulArg } from "@/types/useful";

export const createUseful = async (createUsefulArg: createUsefulArg) => {
  const { crowdednessId, token } = createUsefulArg;
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}crowdedness/${crowdednessId}/useful`,
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
      const data = await res.json();
      throw `${data.message}`;
    }
  });
};

export const deleteUseful = async (deleteUsefulArg: deleteUsefulArg) => {
  const { crowdednessId, token } = deleteUsefulArg;
  return await fetch(
    `${process.env.NEXT_PUBLIC_RAILSAPI_URL}crowdedness/${crowdednessId}/useful`,
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
      const data = await res.json();
      throw `${data.message}`;
    }
  });
};

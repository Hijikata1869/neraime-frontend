import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { fetchStore } from "@/lib/stores";
import { StoreData } from "@/types";

export const Store: React.FC = () => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);
  const [store, setStore] = useState<StoreData>();

  useEffect(() => {
    if (!isNaN(storeId)) {
      fetchStore(storeId)
        .then((data) => {
          const storeData = data.store;
          return storeData;
        })
        .then((data) => {
          setStore(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [router.query.id]);

  return (
    <div className="w-full px-40">
      <div className="flex flex-col bg-white rounded-lg p-20">
        <h2 className="font-bold text-4xl mb-3">{store?.name}</h2>
        <p className="font-bold text-gray-400 ">{store?.address}</p>
      </div>
    </div>
  );
};

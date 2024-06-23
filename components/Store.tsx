import { useEffect, useState, memo } from "react";
import { useRouter } from "next/router";

import { fetchStore } from "@/lib/stores";
import { StoreData } from "@/types/store";

import { CrowdednessTable } from "./CrowdednessTable";
import { CrowdednessForm } from "./CrowdednessForm";
import { LatestCrowdednessReviews } from "./LatestCrowdednessReviews";

export const Store: React.FC = memo(() => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);

  const [store, setStore] = useState<StoreData>();
  const [isCrowdedness, setIsCrowdedness] = useState<boolean>(true);

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

  const onClickToggle = () => {
    setIsCrowdedness(!isCrowdedness);
  };

  return (
    <div className="w-full px-40 mb-20">
      <div className="flex flex-col bg-white rounded-lg p-20 mt-20">
        <div>
          <h2 className="font-bold text-4xl mb-3">{store?.name}</h2>
          <p className="text-gray-400 ">{store?.address}</p>
          <div className="flex justify-center mx-4 mt-10">
            {isCrowdedness ? (
              <>
                <button
                  onClick={onClickToggle}
                  className="border border-r-0 rounded rounded-r-none px-16 py-2 bg-emerald-950 text-gray-100 font-semibold"
                >
                  混雑度を見る
                </button>
                <button
                  onClick={onClickToggle}
                  className="border border-l-0 rounded rounded-l-none px-16 py-2 font-semibold text-gray-400"
                >
                  混雑度を投稿する
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClickToggle}
                  className="border border-r-0 rounded rounded-r-none px-16 py-2 font-semibold text-gray-400"
                >
                  混雑度を見る
                </button>
                <button
                  onClick={onClickToggle}
                  className="border border-l-0 rounded rounded-l-none px-16 py-2 bg-emerald-950 text-gray-100 font-semibold"
                >
                  混雑度を投稿する
                </button>
              </>
            )}
          </div>
          {isCrowdedness ? (
            <CrowdednessTable storeId={storeId} />
          ) : (
            <CrowdednessForm storeId={storeId} />
          )}
        </div>
      </div>
      <LatestCrowdednessReviews storeId={storeId} />
    </div>
  );
});

Store.displayName = "Store";

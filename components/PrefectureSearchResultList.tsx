import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchStoresByPrefectureName } from "@/lib/stores";

import { StoreDatas } from "@/types/store";

export const PrefectureSearchResultList: React.FC = memo(() => {
  const router = useRouter();
  const prefecture = router.query.prefecture as string | undefined;
  const [stores, setStores] = useState<StoreDatas | undefined>(undefined);

  useEffect(() => {
    if (prefecture !== undefined) {
      fetchStoresByPrefectureName(prefecture)
        .then(async (res) => {
          const stores = await res.stores;
          setStores(stores);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [prefecture]);

  const hundleClick = (storeId: number) => {
    router.push(`/stores/${storeId}`);
  };

  return (
    <div className="w-full px-40 mt-10 mb-20">
      <h1 className="font-bold text-2xl text-gray-900 mb-5">
        都道府県検索結果
      </h1>
      <div className="flex flex-col">
        {stores === undefined ? (
          <div className="flex flex-col items-center justify-center">
            <p className="pt-10 text-center font-bold text-gray-900">
              まだこの都道府県の施設は登録されていません。
            </p>
            <button
              className="mt-20 py-2 px-4 border border-gray-300 rounded text-sm hover:bg-neutral-200 transition"
              onClick={() => router.push("/search")}
            >
              店舗検索ページに戻る
            </button>
          </div>
        ) : (
          <>
            {stores.map((store) => (
              <div
                key={store.id}
                className="lg:w-3/4 md:w-3/4 m-4 p-6 bg-white rounded-2xl cursor-pointer shadow-sm"
                onClick={() => hundleClick(store.id)}
              >
                <h2 className="font-bold text-2xl text-gray-900 mb-4">
                  店舗名：{store.name}
                </h2>
                <p className="font-bold text-gray-500">住所：{store.address}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
});

PrefectureSearchResultList.displayName = "PrefectureSearchResultList";

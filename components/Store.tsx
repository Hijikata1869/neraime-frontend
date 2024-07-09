import { useEffect, useState, memo, useContext } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

import { CurrentUserContext } from "@/context/CurrentUserContext";

import { fetchStore } from "@/lib/stores";
import {
  createFavorite,
  fetchCurrentUserFavoriteStores,
  deleteFavorite,
} from "@/lib/favorites";
import { StoreData, StoreDatas } from "@/types/store";

import { CrowdednessTable } from "./CrowdednessTable";
import { CrowdednessForm } from "./CrowdednessForm";
import { LatestCrowdednessReviews } from "./LatestCrowdednessReviews";

const cookie = new Cookie();

export const Store: React.FC = memo(() => {
  const router = useRouter();
  const storeId = parseInt(router.query.id as string);
  const accessToken = cookie.get("access_token");

  const currentUserContext = useContext(CurrentUserContext);
  const { isLogin } = currentUserContext;

  const [store, setStore] = useState<StoreData>();
  const [isCrowdedness, setIsCrowdedness] = useState<boolean>(true);
  const [favoriteStores, setFavoriteStores] = useState<StoreDatas | undefined>(
    undefined
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

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

  useEffect(() => {
    setIsDisabled(true);
    isLogin &&
      fetchCurrentUserFavoriteStores(accessToken)
        .then(async (res) => {
          const data = await res.favorite_stores;
          setFavoriteStores(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsDisabled(false);
        });
  }, [isLogin, accessToken]);

  const onClickToggle = () => {
    setIsCrowdedness(!isCrowdedness);
  };

  const onClickCreateFavorite = () => {
    setIsDisabled(true);
    createFavorite(storeId, accessToken)
      .then(async (res) => {
        const data = await res.favorite_stores;
        setFavoriteStores(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  const onClickDeleteFavorite = () => {
    setIsDisabled(true);
    deleteFavorite(storeId, accessToken)
      .then(async (res) => {
        const data = await res.favorite_stores;
        setFavoriteStores(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  const isStoreInList = (
    storeList: StoreDatas | undefined,
    storeId: number
  ) => {
    return storeList?.some((store) => store.id === storeId);
  };

  return (
    <div className="w-full px-40 mb-20">
      <div className="flex flex-col bg-white rounded-lg p-20 mt-20">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-3xl mb-3">{store?.name}</h2>
            {isLogin && (
              <>
                {isStoreInList(favoriteStores, storeId) ? (
                  <button
                    className="px-4 py-2 bg-white rounded text-sky-500 hover:bg-sky-100 transition outline outline-sky-200 font-bold ml-5"
                    onClick={onClickDeleteFavorite}
                    disabled={isDisabled}
                  >
                    お気に入り解除
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-sky-500 rounded text-gray-50 hover:bg-sky-700 transition font-bold ml-5"
                    onClick={onClickCreateFavorite}
                    disabled={isDisabled}
                  >
                    お気に入りに追加
                  </button>
                )}
              </>
            )}
          </div>
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

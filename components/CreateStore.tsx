import { useContext, useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SearchContext } from "@/context/SearchContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Cookie from "universal-cookie";

// apis
import { createStore } from "@/lib/stores";
import { initialPrefecture } from "@/lib/stores";
import { fetchStoreByAddress } from "@/lib/stores";

import { StoreData } from "@/types/store";

import { PREFECTURES } from "@/constants";

const cookie = new Cookie();

export const CreateStore: React.FC = memo(() => {
  const router = useRouter();
  const token: string = cookie.get("access_token");
  const searchContext = useContext(SearchContext);
  const currentUserContext = useContext(CurrentUserContext);
  const { selectedCandidate } = searchContext;
  const { isLogin } = currentUserContext;
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [registeredStore, setRegisteredStore] = useState<
    StoreData | undefined
  >();

  useEffect(() => {
    const prefecture = initialPrefecture(selectedCandidate?.address);
    setSelectedPrefecture(prefecture);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedCandidate !== undefined) {
      fetchStoreByAddress(selectedCandidate.address)
        .then(async (res) => {
          const storeData = await res.store;
          return storeData;
        })
        .then((data) => {
          setRegisteredStore(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedCandidate]);

  const hundleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const createStoreArgs = {
      name: selectedCandidate!.name,
      address: selectedCandidate!.address,
      prefecture: selectedPrefecture,
      token: token,
    };
    createStore(createStoreArgs)
      .then(async (res) => {
        const storeId = await res.store.id;
        return storeId;
      })
      .then((storeId) => {
        router.push(`/stores/${storeId}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const hundleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrefecture(event.target.value);
  };

  return (
    <div className="w-full lg:px-40 md:px-20 px-10 pt-6 text-gray-900">
      <h1 className="font-bold text-3xl">店舗登録</h1>
      <div className="mt-10 lg:px-20">
        {selectedCandidate?.name.length ? (
          <>
            {registeredStore !== undefined ? (
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-gray-900">
                  すでに同じ施設が登録されているため、以下の店舗情報をクリックしてご覧ください。
                </p>
                <Link
                  href={`/stores/${registeredStore.id}`}
                  className="bg-white md:p-10 p-5 mt-10 shadow rounded"
                >
                  <p className="font-bold md:text-2xl text-gray-900 mb-2">
                    店舗名：{registeredStore.name}
                  </p>
                  <p className="md:text-sm text-xs text-gray-500">
                    住所：{registeredStore.address}
                  </p>
                </Link>
              </div>
            ) : (
              <>
                {isLogin ? (
                  <>
                    <p className="mb-10 font-semibold">
                      選択していただいた店舗の情報はまだ登録されていませんでした。店舗情報を登録していただくことで混雑状況を投稿・閲覧できるようになります。以下の内容でお間違えなければ登録するボタンをクリックしてご登録をお願いします。
                    </p>
                    <div className="flex flex-col md:m-4 p-6 bg-white rounded-2xl shadow-sm">
                      <h1 className="font-bold mb-2">
                        店舗名：{selectedCandidate?.name}
                      </h1>
                      <p className="font-bold mb-2">
                        住所：{selectedCandidate?.address}
                      </p>
                      <div className="flex">
                        <p className="font-bold">都道府県：</p>
                        <select
                          className="border rounded border-gray-500"
                          value={selectedPrefecture}
                          onChange={hundleChange}
                        >
                          <option value="">選択してください</option>
                          {PREFECTURES.map((prefecture, index) => (
                            <option key={index} value={prefecture}>
                              {prefecture}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="text-xs text-red-700">
                        所在の都道府県が正しくない場合は選択し直してください
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="rounded bg-cyan-600 text-amber-50 py-4 px-20 mt-10 hover:bg-cyan-700 transition"
                        onClick={(event) => hundleClick(event)}
                      >
                        登録する
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <p className="font-bold text-gray-900">
                        選択していただいた店舗はまだ登録されていませんでした。店舗登録はログイン後ご利用していただける機能です。
                        <br />
                        ログイン、または新規登録をお願いします。
                      </p>
                    </div>
                    <div>
                      <button
                        className="py-4 px-6 mt-10 rounded transition mr-4 bg-sky-500 text-white hover:bg-sky-700"
                        onClick={() => router.push("/sign-in")}
                      >
                        ログイン・新規登録はこちら
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">
              選択された店舗がありません。店舗の検索結果から、店舗を選び直してください。
            </p>
            <button
              className="mt-20 py-2 px-4 border border-gray-300 rounded text-sm hover:bg-neutral-200 transition"
              onClick={() => router.push("/search")}
            >
              店舗検索ページに戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

CreateStore.displayName = "CreateStore";

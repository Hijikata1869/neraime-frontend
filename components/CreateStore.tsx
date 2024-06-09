import { useContext, useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext";

// apis
import { createStore } from "@/lib/stores";
import { initialPrefecture } from "@/lib/stores";

import { PREFECTURES } from "@/constants";

export const CreateStore: React.FC = memo(() => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);
  const { selectedCandidate } = searchContext;
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  console.log(selectedCandidate?.name.length);

  useEffect(() => {
    const prefecture = initialPrefecture(selectedCandidate?.address);
    setSelectedPrefecture(prefecture);
    // eslint-disable-next-line
  }, []);

  const hundleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const createStoreArgs = {
      name: selectedCandidate!.name,
      address: selectedCandidate!.address,
      prefecture: selectedPrefecture,
    };
    createStore(createStoreArgs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const hundleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrefecture(event.target.value);
  };

  return (
    <div className="w-full lg:px-44 pt-6 text-gray-900">
      <h1 className="font-bold text-3xl">店舗登録</h1>
      <div className="mt-10 lg:px-20">
        {selectedCandidate?.name.length ? (
          <>
            <p className="mb-10">
              選択していただいた店舗の情報はまだ登録されていませんでした。店舗情報を登録していただくことで混雑状況を投稿・閲覧できるようになります。以下の内容でお間違えなければ登録するボタンをクリックしてご登録をお願いします。
            </p>
            <div className="flex flex-col m-4 p-6 bg-white rounded-2xl shadow-sm">
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
                className="rounded bg-emerald-700 text-amber-50 py-4 px-20 mt-10 hover:bg-emerald-950 transition"
                onClick={(event) => hundleClick(event)}
              >
                登録する
              </button>
            </div>
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

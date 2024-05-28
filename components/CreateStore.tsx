import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";

export const CreateStore: React.FC = () => {
  const searchContext = useContext(SearchContext);
  const { selectedCandidate } = searchContext;

  const hundleClick = () => {};

  return (
    <div className="w-full lg:px-44 pt-6 text-gray-900">
      <h1 className="font-bold text-3xl">店舗登録</h1>
      <div className="mt-10 lg:px-20">
        <p className="mb-10">
          選択していただいた店舗の情報はまだ登録されていませんでした。店舗情報を登録していただくことで混雑状況を投稿・閲覧できるようになります。以下の内容でお間違えなければ登録するボタンをクリックしてご登録をお願いします。
        </p>
        <div className="flex flex-col m-4 p-6 bg-white rounded-2xl shadow-sm">
          <h1 className="font-bold mb-2">店舗名：{selectedCandidate?.name}</h1>
          <p className="font-bold">住所：{selectedCandidate?.address}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="rounded bg-emerald-700 text-amber-50 py-4 px-20 mt-10 hover:bg-emerald-950 transition"
            onClick={hundleClick}
          >
            登録する
          </button>
        </div>
      </div>
    </div>
  );
};

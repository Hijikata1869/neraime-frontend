import { useContext, memo } from "react";
import { useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext";

// apis
import { fetchStoreByName } from "@/lib/stores";

export const ResultsList = memo(() => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);
  const { candidates, setSelectedCandidate } = searchContext;

  const hundleClick = (
    event: React.MouseEvent,
    storeName: string,
    address: string
  ) => {
    event.preventDefault();
    const targetStore = { name: storeName, address: address };
    setSelectedCandidate(targetStore);
    fetchStoreByName(storeName)
      .then((res) => {
        const storeId = res.store.id;
        return storeId;
      })
      .then((storeId) => {
        router.push(`/stores/${storeId}`);
      })
      .catch(() => {
        router.push("/stores/new");
      });
  };

  return (
    <>
      <div className="w-full pt-6 lg:px-44">
        <h1 className="font-bold text-3xl text-gray-900">検索結果</h1>
        {candidates?.length ? null : (
          <div className="flex flex-col items-center justify-center">
            <p className="pt-10 text-center">
              検索結果はありませんでした。キーワードを変えて再度検索し直してください。
            </p>
            <button
              className="mt-20 py-2 px-4 border border-gray-300 rounded text-sm hover:bg-neutral-200 transition"
              onClick={() => router.push("/search")}
            >
              店舗検索ページに戻る
            </button>
          </div>
        )}
        <div className="flex flex-col items-center">
          {candidates?.map((candidate) => (
            <div
              className="lg:w-3/4 md:w-3/4 m-4 p-6 bg-white rounded-2xl cursor-pointer shadow-sm"
              key={candidate.place_id}
              onClick={(event) =>
                hundleClick(event, candidate.name, candidate.formatted_address)
              }
            >
              <h2 className="font-bold text-2xl text-gray-900 mb-4">
                店舗名：{candidate.name}
              </h2>
              <p className="font-bold text-gray-500">
                住所：{candidate.formatted_address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

ResultsList.displayName = "ResultsList";
